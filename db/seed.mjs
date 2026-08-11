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
    await sql`
      INSERT INTO signals (id, headline, summary, source_url, date, scope, entity, signal_type, origin, dedupe_key)
      VALUES (${item.id}, ${item.headline}, ${item.summary}, ${item.sourceUrl}, ${item.date}, ${item.scope}, ${item.entity}, ${item.signalType}, 'seed', ${item.sourceUrl})
      ON CONFLICT (dedupe_key) DO NOTHING
    `
  }

  console.log("Done.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
