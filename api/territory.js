import { sql } from "./_lib/db.js"

// Territory commercial intelligence: spend by product line, cross-sell
// gaps, win/loss by vertical, and the warm re-engagement list.
//
// Everything here is named-customer commercial data. It is safe to serve
// only because middleware.js puts Basic auth in front of the whole
// deployment — if that ever comes off, this route goes with it.
//
// Aggregates are computed in SQL rather than shipping 1,700 account rows
// to the browser: the page needs totals and a handful of ranked lists,
// and the full book has no reason to sit in a client-side bundle.

const TOP_N = 12

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  try {
    // Portfolio totals, plus the multi-line vs single-line comparison
    // that is the whole cross-sell argument. Only rows whose book
    // carries a per-line split (lines_held non-empty) can answer the
    // second question, so those two figures are scoped to them.
    const [totals] = await sql`
      SELECT
        COUNT(*)::int                                             AS accounts,
        COUNT(*) FILTER (WHERE is_customer)::int                  AS customers,
        COALESCE(SUM(arr), 0)                                     AS arr,
        COALESCE(SUM(open_pipeline), 0)                           AS open_pipeline,
        COALESCE(SUM(lost_pipeline_py), 0)                        AS lost_py,
        COALESCE(SUM(won_all_time), 0)                            AS won_all_time,
        COALESCE(SUM(cx_arr), 0)                                  AS cx_arr,
        COALESCE(SUM(ex_arr), 0)                                  AS ex_arr,
        COALESCE(SUM(mr_arr), 0)                                  AS mr_arr,
        COALESCE(SUM(rs_spend), 0)                                AS rs_spend
      FROM territory_accounts
    `

    const [mix] = await sql`
      SELECT
        COUNT(*) FILTER (WHERE cardinality(lines_held) > 1)::int   AS multi_count,
        COALESCE(AVG(arr) FILTER (WHERE cardinality(lines_held) > 1), 0) AS multi_avg,
        COALESCE(SUM(arr) FILTER (WHERE cardinality(lines_held) > 1), 0) AS multi_arr,
        COUNT(*) FILTER (WHERE cardinality(lines_held) = 1)::int   AS single_count,
        COALESCE(AVG(arr) FILTER (WHERE cardinality(lines_held) = 1), 0) AS single_avg,
        COALESCE(SUM(arr) FILTER (WHERE cardinality(lines_held) = 1), 0) AS single_arr
      FROM territory_accounts
      WHERE is_customer AND cardinality(lines_held) > 0
    `

    const byAe = await sql`
      SELECT ae,
             COUNT(*)::int                            AS accounts,
             COUNT(*) FILTER (WHERE is_customer)::int AS customers,
             COALESCE(SUM(arr), 0)                    AS arr,
             COALESCE(SUM(open_pipeline), 0)          AS open_pipeline,
             COALESCE(SUM(lost_pipeline_py), 0)       AS lost_py
      FROM territory_accounts
      GROUP BY ae
      ORDER BY arr DESC
    `

    // Verticals with a meaningful sample only — a two-account vertical
    // produces a win:loss ratio that reads as signal and isn't.
    const byVertical = await sql`
      SELECT COALESCE(NULLIF(vertical, ''), 'Unspecified') AS vertical,
             COUNT(*)::int                            AS accounts,
             COUNT(*) FILTER (WHERE is_customer)::int AS customers,
             COALESCE(SUM(arr), 0)                    AS arr,
             COALESCE(SUM(won_all_time), 0)           AS won_all_time,
             COALESCE(SUM(lost_pipeline_py), 0)       AS lost_py
      FROM territory_accounts
      GROUP BY 1
      HAVING COUNT(*) >= 8
      ORDER BY won_all_time DESC
    `

    // Single-line customers, biggest first: the cross-sell worklist.
    const crossSell = await sql`
      SELECT account_key, account_name, ae, vertical, arr, lines_held
      FROM territory_accounts
      WHERE is_customer AND cardinality(lines_held) = 1
      ORDER BY arr DESC
      LIMIT ${TOP_N}
    `

    // Prospects that already ran an evaluation we lost. Warmest thing in
    // a territory after a live customer.
    const winBack = await sql`
      SELECT account_key, account_name, ae, vertical, lost_pipeline_py, employees, engaged_l90
      FROM territory_accounts
      WHERE NOT is_customer AND lost_pipeline_py > 0
      ORDER BY lost_pipeline_py DESC
      LIMIT ${TOP_N}
    `

    const [winBackTotal] = await sql`
      SELECT COUNT(*)::int AS n, COALESCE(SUM(lost_pipeline_py), 0) AS total
      FROM territory_accounts WHERE NOT is_customer AND lost_pipeline_py > 0
    `

    // Never touched, but someone there is already engaging with us.
    const warm = await sql`
      SELECT account_key, account_name, ae, vertical, revenue_musd, employees, engaged_l90
      FROM territory_accounts
      WHERE NOT is_customer AND arr = 0 AND engaged_l90 > 0
      ORDER BY engaged_l90 DESC, revenue_musd DESC
      LIMIT ${TOP_N}
    `

    const [loadedAt] = await sql`SELECT MAX(loaded_at) AS loaded_at FROM territory_accounts`

    res.setHeader("Cache-Control", "no-store")
    res.status(200).json({
      totals, mix, byAe, byVertical, crossSell, winBack,
      winBackTotal, warm,
      loadedAt: loadedAt?.loaded_at ?? null,
    })
  } catch (err) {
    // A missing table is the expected state until the migration and
    // loader have been run, and it deserves a clearer answer than 500.
    if (/relation .*territory_accounts.* does not exist/i.test(err.message ?? "")) {
      res.status(503).json({
        error: "not_loaded",
        message:
          "territory_accounts table does not exist yet. Run db/migrate.mjs, then " +
          "db/load-territory.mjs pointed at the AE spreadsheets.",
      })
      return
    }
    console.error("GET /api/territory failed:", err)
    res.status(500).json({ error: "Failed to load territory data" })
  }
}
