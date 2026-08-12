import { createHash } from "node:crypto"
import { sql } from "./_lib/db.js"
import { fetchWatchlist } from "./_lib/fetchNews.js"
import { normalizeItem } from "./_lib/normalize.js"
import { FULL_WATCHLIST } from "./_lib/watchlist.js"

// Hard cap on LLM normalization calls per run — bounds both cost and
// Vercel function execution time regardless of how many raw RSS items
// come back across the whole watchlist.
const MAX_ITEMS_PER_RUN = 25

function cleanTitle(rawTitle) {
  // Google News RSS titles are typically "Real Headline - Publisher Name".
  // Strip the trailing " - Publisher" segment when present.
  const parts = rawTitle.split(" - ")
  return parts.length > 1 ? parts.slice(0, -1).join(" - ").trim() : rawTitle.trim()
}

function toDateString(date) {
  if (!date || Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10)
  return date.toISOString().slice(0, 10)
}

function idFor(dedupeKey) {
  return `news-${createHash("sha1").update(dedupeKey).digest("hex").slice(0, 16)}`
}

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  const authHeader = req.headers.authorization
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  const summary = { queried: FULL_WATCHLIST.length, rawItems: 0, afterDedupe: 0, normalized: 0, inserted: 0, errors: [] }

  try {
    const existing = await sql`SELECT dedupe_key FROM signals`
    const existingKeys = new Set(existing.map((r) => r.dedupe_key))

    const rawItems = await fetchWatchlist(FULL_WATCHLIST)
    summary.rawItems = rawItems.length

    const seenInBatch = new Set()
    const candidates = rawItems
      .filter((item) => {
        if (existingKeys.has(item.sourceUrl)) return false
        if (seenInBatch.has(item.sourceUrl)) return false
        seenInBatch.add(item.sourceUrl)
        return true
      })
      .sort((a, b) => (b.pubDate?.getTime() ?? 0) - (a.pubDate?.getTime() ?? 0))
      .slice(0, MAX_ITEMS_PER_RUN)

    summary.afterDedupe = candidates.length

    // Bounded concurrency again — sequential Claude calls for up to
    // MAX_ITEMS_PER_RUN items would otherwise dominate the function's
    // execution time on their own.
    const NORMALIZE_CONCURRENCY = 4
    const queue = [...candidates]

    async function worker() {
      while (queue.length) {
        const raw = queue.shift()
        try {
          const normalized = await normalizeItem(raw)
          if (!normalized) continue
          summary.normalized += 1

          const dedupeKey = raw.sourceUrl
          await sql`
            INSERT INTO signals (id, headline, summary, source_url, date, scope, entity, signal_type, practice_area, origin, dedupe_key, outreach_relevance)
            VALUES (
              ${idFor(dedupeKey)},
              ${cleanTitle(raw.title)},
              ${normalized.summary},
              ${raw.sourceUrl},
              ${toDateString(raw.pubDate)},
              ${normalized.scope},
              ${normalized.entity},
              ${normalized.signalType},
              ${normalized.practiceArea},
              'news',
              ${dedupeKey},
              ${normalized.outreachRelevance}
            )
            ON CONFLICT (dedupe_key) DO NOTHING
          `
          summary.inserted += 1
        } catch (err) {
          console.error("ingest: failed on item", raw.sourceUrl, err)
          summary.errors.push({ url: raw.sourceUrl, message: err.message })
        }
      }
    }

    await Promise.all(Array.from({ length: NORMALIZE_CONCURRENCY }, worker))

    res.status(200).json(summary)
  } catch (err) {
    console.error("POST /api/ingest failed:", err)
    res.status(500).json({ error: "Ingestion run failed", message: err.message, summary })
  }
}
