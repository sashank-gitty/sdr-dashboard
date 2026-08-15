import { sql } from "./_lib/db.js"

// Manually-claimed accounts — GET lists them all, POST claims or
// unclaims one. One endpoint for both directions, same shape as
// api/reviews.js: a boolean flips the row rather than separate
// claim/unclaim routes. No auth: this app has no login system and is
// explicitly single-user, same trust boundary as everything else here.
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const rows = await sql`SELECT account_key, account_name, note, claimed_at FROM account_claims ORDER BY claimed_at DESC`
      res.status(200).json(
        rows.map((row) => ({
          accountKey: row.account_key,
          accountName: row.account_name,
          note: row.note,
          claimedAt: row.claimed_at,
        })),
      )
    } catch (err) {
      console.error("GET /api/claims failed:", err)
      res.status(500).json({ error: "Failed to load claimed accounts" })
    }
    return
  }

  if (req.method === "POST") {
    const { accountKey, accountName, claimed, note } = req.body ?? {}

    if (typeof accountKey !== "string" || !accountKey) {
      res.status(400).json({ error: "accountKey must be a non-empty string" })
      return
    }
    if (typeof claimed !== "boolean") {
      res.status(400).json({ error: "claimed must be a boolean" })
      return
    }

    try {
      if (claimed) {
        if (typeof accountName !== "string" || !accountName) {
          res.status(400).json({ error: "accountName must be a non-empty string" })
          return
        }
        await sql`
          INSERT INTO account_claims (account_key, account_name, note)
          VALUES (${accountKey}, ${accountName}, ${note ?? null})
          ON CONFLICT (account_key)
          DO UPDATE SET account_name = EXCLUDED.account_name, note = EXCLUDED.note
        `
      } else {
        await sql`DELETE FROM account_claims WHERE account_key = ${accountKey}`
      }
      res.status(200).json({ accountKey, claimed })
    } catch (err) {
      console.error("POST /api/claims failed:", err)
      res.status(500).json({ error: "Failed to update claimed account" })
    }
    return
  }

  res.status(405).json({ error: "Method not allowed" })
}
