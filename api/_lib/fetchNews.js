import Parser from "rss-parser"

const parser = new Parser({ timeout: 10000 })

function googleNewsRssUrl(query) {
  const params = new URLSearchParams({ q: query, hl: "en-AU", gl: "AU", ceid: "AU:en" })
  return `https://news.google.com/rss/search?${params.toString()}`
}

// Google News RSS links are Google-hosted redirect/decoy URLs, not the
// publisher's real article URL — following the HTTP redirect recovers the
// real one in most cases, which matters for trust (Issue 2: cards should
// link somewhere real and show the actual publisher domain, not
// news.google.com). This isn't 100% reliable — some of Google's newer
// encoded links resolve via client-side JS rather than a plain HTTP
// redirect, so callers should treat a still-news.google.com result as
// "best effort, not guaranteed" rather than a bug.
async function resolveCanonicalUrl(googleNewsLink) {
  try {
    const res = await fetch(googleNewsLink, { redirect: "follow", signal: AbortSignal.timeout(8000) })
    return res.url || googleNewsLink
  } catch {
    return googleNewsLink
  }
}

export async function fetchQuery(query) {
  const feed = await parser.parseURL(googleNewsRssUrl(query))

  const items = await Promise.all(
    (feed.items ?? []).slice(0, 10).map(async (item) => ({
      title: item.title ?? "",
      snippet: item.contentSnippet ?? item.content ?? "",
      pubDate: item.pubDate ? new Date(item.pubDate) : null,
      sourceUrl: await resolveCanonicalUrl(item.link),
      matchedQuery: query,
    })),
  )

  return items.filter((item) => item.title && item.sourceUrl)
}

// Runs queries with bounded concurrency rather than one-at-a-time — a
// plain sequential loop over ~30 watchlist entries (each doing an RSS
// fetch plus up to 10 redirect-resolution fetches) is slow enough to risk
// tripping Vercel's function timeout. Concurrency is capped, not
// unbounded, to avoid hammering Google News from a single IP.
const CONCURRENCY = 5

export async function fetchWatchlist(watchlist) {
  const results = []
  const queue = [...watchlist]

  async function worker() {
    while (queue.length) {
      const query = queue.shift()
      try {
        const items = await fetchQuery(query)
        results.push(...items)
      } catch (err) {
        console.error(`RSS fetch failed for query "${query}":`, err.message)
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker))
  return results
}
