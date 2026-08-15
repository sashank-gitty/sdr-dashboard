import { sql } from "./_lib/db.js"
import { attributeEntity } from "./_lib/matchAccounts.js"
import { SIGNAL_TYPES } from "../shared/signalTypes.js"
import { PATCHES } from "../shared/patches.js"
import { PRACTICE_AREAS } from "../shared/practiceAreas.js"

function todayString() {
  return new Date().toISOString().slice(0, 10)
}

function isValidDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00:00`).getTime())
}

// Adds a brand-new account to the dashboard from something an SDR found
// themselves — a LinkedIn post, a job ad, a conversation — rather than
// something the automated news pipeline turned up. Deliberately no LLM
// call: the person submitting this form is already the source of truth
// for what they typed, unlike api/ingest.js's normalizer, which is
// inferring structure from raw RSS text it didn't write.
//
// The account itself isn't a separate row anywhere — same as everywhere
// else in this app, it's derived the moment this signal exists (see
// src/lib/accountModel.js). This endpoint's only job is to insert one
// well-formed signal and hand back its territory attribution so the
// frontend can add it to the dashboard immediately, no refetch needed.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  const {
    accountName,
    headline,
    summary,
    signalType,
    practiceArea,
    patch,
    sourceUrl,
    date,
    outreachRelevance,
  } = req.body ?? {}

  if (typeof accountName !== "string" || !accountName.trim()) {
    res.status(400).json({ error: "accountName is required" })
    return
  }
  if (typeof headline !== "string" || !headline.trim()) {
    res.status(400).json({ error: "headline is required — what did you find?" })
    return
  }
  if (!SIGNAL_TYPES.includes(signalType)) {
    res.status(400).json({ error: `signalType must be one of: ${SIGNAL_TYPES.join(", ")}` })
    return
  }
  if (!PRACTICE_AREAS.includes(practiceArea)) {
    res.status(400).json({ error: `practiceArea must be one of: ${PRACTICE_AREAS.join(", ")}` })
    return
  }
  if (patch != null && !PATCHES.includes(patch)) {
    res.status(400).json({ error: `patch must be one of: ${PATCHES.join(", ")}` })
    return
  }
  if (date != null && !isValidDate(date)) {
    res.status(400).json({ error: "date must be YYYY-MM-DD" })
    return
  }
  if (outreachRelevance != null && !(Number.isInteger(outreachRelevance) && outreachRelevance >= 1 && outreachRelevance <= 5)) {
    res.status(400).json({ error: "outreachRelevance must be an integer 1-5, or omitted" })
    return
  }

  const trimmedAccountName = accountName.trim()
  const trimmedHeadline = headline.trim()
  const trimmedSummary = typeof summary === "string" && summary.trim() ? summary.trim() : trimmedHeadline
  const trimmedSourceUrl = typeof sourceUrl === "string" ? sourceUrl.trim() : ""
  const rowDate = date ?? todayString()

  // Deterministic, same lookup the real ingest pipeline uses — a hit
  // here means this account already has a real owner in the territory
  // book, and that book match wins over whatever the user typed for
  // patch (see matchAccounts.js: "this is Terence's account" beats a
  // guess at a vertical).
  const attribution = attributeEntity(trimmedAccountName)
  const patches = attribution.patches.length ? attribution.patches : patch ? [patch] : []

  const id = `manual-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
  // Real articles still dedupe on their URL like every other origin, so
  // pasting the same job ad or article twice doesn't create two rows.
  // Without a URL, the generated id is already unique.
  const dedupeKey = trimmedSourceUrl || `manual:${id}`

  try {
    await sql`
      INSERT INTO signals (id, headline, summary, source_url, date, scope, entity, signal_type, practice_area, origin, dedupe_key, outreach_relevance, patches, matched_accounts, owning_aes, account_status)
      VALUES (
        ${id},
        ${trimmedHeadline},
        ${trimmedSummary},
        ${trimmedSourceUrl},
        ${rowDate},
        'micro',
        ${trimmedAccountName},
        ${signalType},
        ${practiceArea},
        'manual',
        ${dedupeKey},
        ${outreachRelevance ?? null},
        ${patches},
        ${attribution.matchedAccounts},
        ${attribution.owningAes},
        ${attribution.accountStatus}
      )
      ON CONFLICT (dedupe_key) DO NOTHING
    `

    res.status(201).json({
      id,
      headline: trimmedHeadline,
      summary: trimmedSummary,
      sourceUrl: trimmedSourceUrl,
      date: rowDate,
      scope: "micro",
      entity: trimmedAccountName,
      signalType,
      practiceArea,
      origin: "manual",
      outreachRelevance: outreachRelevance ?? null,
      reviewed: false,
      patches,
      matchedAccounts: attribution.matchedAccounts,
      owningAes: attribution.owningAes,
      accountStatus: attribution.accountStatus,
    })
  } catch (err) {
    console.error("POST /api/manual-signal failed:", err)
    res.status(500).json({ error: "Failed to add account" })
  }
}
