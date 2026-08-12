// One-time backfill: tags every existing signal with AE patch
// attribution, for rows that predate migration 005.
//
//   node --env-file=.env.local db/backfill-patches.mjs
//   node --env-file=.env.local db/backfill-patches.mjs --all
//
// Two passes per row:
//   1. Deterministic account matching against the AE territory book.
//      Free, instant, and authoritative when it hits.
//   2. For rows that matched no account, one Claude call to judge which
//      patches the signal thematically bears on — the same judgment the
//      ingest normalizer now makes inline for new rows.
//
// By default this only touches rows with no patch data yet, so it's
// safe to re-run and a no-op once everything is tagged. Pass --all to
// re-tag every row instead, which is what you want after editing the
// territory book or the patch definitions.
//
// Requires DATABASE_URL and ANTHROPIC_API_KEY (same env pull as seeding).
import Anthropic from "@anthropic-ai/sdk"
import { sql } from "../api/_lib/db.js"
import { attributeEntity } from "../api/_lib/matchAccounts.js"
import { PATCHES, PATCH_DESCRIPTIONS } from "../shared/patches.js"

const CONCURRENCY = 4
const retagAll = process.argv.includes("--all")

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You classify market-intelligence signals by which industry territory ("patch") they bear on, for a team of Australian/New Zealand sales reps selling Qualtrics experience-management software.

The patches are:
${PATCHES.map((p) => `- "${p}": ${PATCH_DESCRIPTIONS[p]}`).join("\n")}

Judge by who the signal affects, not by who it mentions. A prudential ruling on general insurers is ["fsi"]. A Fair Work decision on award wages hits every employer of scale, so ["goods_services", "locations", "hcls"] and so on.

Respond with ONLY a JSON array of patch identifiers, for example ["fsi"] or ["tmt","goods_services"]. Return an empty array [] when the signal has no industry angle at all — vendor product news, competitor funding rounds, and research-methodology stories are about the market being sold into, not about any one territory. Prefer two or three well-chosen patches over listing all six; listing everything is the same as listing nothing. No prose, no markdown fences.`

async function classifyPatches({ headline, summary, entity }) {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 100,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Entity: ${entity}\nHeadline: ${headline}\nSummary: ${summary}`,
      },
    ],
  })

  const text = response.content.find((block) => block.type === "text")?.text ?? ""
  let parsed
  try {
    parsed = JSON.parse(text.trim())
  } catch {
    console.warn(`  ! non-JSON patch response, treating as none: ${text.slice(0, 80)}`)
    return []
  }
  if (!Array.isArray(parsed)) return []
  return [...new Set(parsed.filter((p) => PATCHES.includes(p)))]
}

async function main() {
  const rows = retagAll
    ? await sql`SELECT id, headline, summary, entity FROM signals`
    : await sql`
        SELECT id, headline, summary, entity FROM signals
        WHERE cardinality(patches) = 0 AND cardinality(matched_accounts) = 0
      `

  console.log(
    `Tagging ${rows.length} signal(s)${retagAll ? " (re-tagging all)" : " with no patch data yet"}...`,
  )

  let accountMatched = 0
  let thematicOnly = 0
  let untagged = 0
  let failed = 0
  const queue = [...rows]

  async function worker() {
    while (queue.length) {
      const row = queue.shift()
      try {
        const attribution = attributeEntity(row.entity)

        let patches = attribution.patches
        if (attribution.matchedAccounts.length) {
          accountMatched += 1
        } else {
          patches = await classifyPatches(row)
          if (patches.length) thematicOnly += 1
          else untagged += 1
        }

        await sql`
          UPDATE signals SET
            patches = ${patches},
            matched_accounts = ${attribution.matchedAccounts},
            owning_aes = ${attribution.owningAes},
            account_status = ${attribution.accountStatus}
          WHERE id = ${row.id}
        `
      } catch (err) {
        console.error(`Failed on ${row.id}:`, err.message)
        failed += 1
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  console.log(
    `Done. Matched a territory account: ${accountMatched}, thematic patch only: ${thematicOnly}, ` +
      `no patch (vendor/market news): ${untagged}, failed: ${failed}.`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
