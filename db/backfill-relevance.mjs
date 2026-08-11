// One-time backfill: scores every existing signal that predates
// ingest-time relevance scoring (Issue 3). Safe to re-run — only
// targets rows where outreach_relevance IS NULL, so it's a no-op once
// everything has a score.
//
//   node --env-file=.env.local db/backfill-relevance.mjs
//
// Requires DATABASE_URL and ANTHROPIC_API_KEY (same env pull as seeding).
import { sql } from "../api/_lib/db.js"
import { scoreRelevance } from "../api/_lib/scoreRelevance.js"

const CONCURRENCY = 4

async function main() {
  const rows = await sql`SELECT id, headline, summary, entity, scope, signal_type AS "signalType" FROM signals WHERE outreach_relevance IS NULL`

  console.log(`Scoring ${rows.length} signal(s) with no outreach_relevance yet...`)

  let scored = 0
  let failed = 0
  const queue = [...rows]

  async function worker() {
    while (queue.length) {
      const row = queue.shift()
      try {
        const relevance = await scoreRelevance(row)
        if (relevance === null) {
          failed += 1
          continue
        }
        await sql`UPDATE signals SET outreach_relevance = ${relevance} WHERE id = ${row.id}`
        scored += 1
      } catch (err) {
        console.error(`Failed on ${row.id}:`, err.message)
        failed += 1
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  console.log(`Done. Scored: ${scored}, failed: ${failed}.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
