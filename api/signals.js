import { sql } from "./_lib/db.js"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  try {
    // to_char avoids the classic node-postgres DATE-to-local-midnight
    // timezone footgun — we want the exact YYYY-MM-DD stored, no shifting.
    const { rows } = await sql`
      SELECT
        id,
        headline,
        summary,
        source_url AS "sourceUrl",
        to_char(date, 'YYYY-MM-DD') AS date,
        scope,
        entity,
        signal_type AS "signalType",
        origin
      FROM signals
      ORDER BY date DESC, created_at DESC
    `

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600")
    res.status(200).json(rows)
  } catch (err) {
    console.error("GET /api/signals failed:", err)
    res.status(500).json({ error: "Failed to load signals" })
  }
}
