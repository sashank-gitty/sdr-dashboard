// One-time migration: loads the legacy static src/data/data.json into the
// new `signals` table, skipping known placeholder rows (Issue 2 — every
// entry sourced from example.com is fake seed data, never real). Run once
// after the Postgres integration is connected:
//
//   node db/seed.mjs
//
// Requires DATABASE_URL to be set in the shell — e.g. via
// `vercel env pull .env.local` first, then `source .env.local` or run
// with `node --env-file=.env.local db/seed.mjs`.
import { sql } from "../api/_lib/db.js"
import legacyData from "../src/data/data.json" with { type: "json" }

const isPlaceholder = (item) => new URL(item.sourceUrl).hostname.endsWith("example.com")

async function main() {
  const realItems = legacyData.filter((item) => !isPlaceholder(item))
  const skipped = legacyData.length - realItems.length

  console.log(`Seeding ${realItems.length} signals (skipping ${skipped} example.com placeholder rows)...`)

  for (const item of realItems) {
    // Older rows in data.json predate the practiceArea/outreachRelevance
    // fields (Issue: EX/market-research expansion) — fall back to the
    // same 'cx' the DB column itself defaults to, and leave relevance
    // null for the existing backfill pass to fill in, exactly matching
    // pre-expansion behavior for those rows.
    await sql`
      INSERT INTO signals (id, headline, summary, source_url, date, scope, entity, signal_type, practice_area, origin, dedupe_key, outreach_relevance)
      VALUES (
        ${item.id}, ${item.headline}, ${item.summary}, ${item.sourceUrl}, ${item.date},
        ${item.scope}, ${item.entity}, ${item.signalType}, ${item.practiceArea ?? "cx"},
        'seed', ${item.sourceUrl}, ${item.outreachRelevance ?? null}
      )
      ON CONFLICT (dedupe_key) DO NOTHING
    `
  }

  console.log("Done.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
