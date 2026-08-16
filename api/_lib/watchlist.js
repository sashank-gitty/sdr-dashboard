// What the ingest pipeline queries Google News RSS for — your own brand
// plus every tracked competitor, imported from shared/competitors.js so
// this list and the frontend's Competitor Intelligence page (which needs
// the same names to recognize a signal as vendor news) can never drift
// apart. Add/remove vendors there, not here; each becomes one RSS query
// per cron run either way. Raw compound labels from the old static
// dataset (e.g. "AFCA / general insurance sector") were deliberately NOT
// reused here; they make poor search queries. These are clean,
// single-subject terms.
//
// Originally CX-only. Expanded to cover all three Qualtrics practice
// areas — CX, EX, and Strategy & Research (market research) — since the
// account base for those spans every industry, not just financial
// services. See shared/practiceAreas.js for how normalize.js classifies
// what comes back.
import { VENDOR_WATCHLIST } from "../../shared/competitors.js"

export { VENDOR_WATCHLIST }

// The account queries are derived from the AE territory book
// (api/_lib/accountRegistry.js) rather than hand-written. The previous
// hand-written list watched the ANZ enterprise majors — CBA, NAB,
// Westpac, Telstra, Qantas, Woolworths — and not one of them appears in
// any of the four AEs' territories, which are corporate/mid-market. So
// every account-level signal the pipeline collected was about companies
// nobody on this team can sell to.
//
// The territory book has ~1,700 accounts and the cron runs once a day,
// so they cannot all be queried by name every run. Coverage is split:
//
//   - Customers (~105) are queried by name on rotation. They're the
//     highest-value watch (renewal risk, expansion, churn) and small
//     enough to cycle through in a few days.
//   - Prospects rotate per AE on a weekly budget (see below), so every
//     territory advances at the same rate. Their coverage is still
//     topped up by the thematic patch tagging the normalizer applies to
//     sector and regulatory news, which lands in a patch view without
//     needing the account named at all.
//
// Tune the per-run constants below against the `queried` figure in
// the /api/ingest response summary if the function starts running long.
import { ACCOUNT_REGISTRY } from "./accountRegistry.js"

const CUSTOMER_QUERIES_PER_RUN = 25

// Prospect coverage is budgeted PER AE PER WEEK rather than as one
// per-run slice off a single ~1,600-deep alphabetical list.
//
// The old shape took 10 prospects a day off that one list. Because the
// list is sorted by name and territories are not evenly spread through
// the alphabet, any given week's slice could sit almost entirely inside
// one or two AEs' patches — so a rep could go weeks with no named-account
// queries running for their territory at all, and the imbalance was
// invisible from the ingest summary.
//
// Budgeting per AE makes the guarantee explicit and even: every AE gets
// ACCOUNTS_PER_AE_PER_WEEK of their own prospects queried by name each
// week, no matter how large or small their book is. The week's block is
// then dealt across the seven days so a single run still only carries a
// few extra queries — with four AEs at 20/week that is ~11 a day, which
// is close to the 10/day the flat rotation was already doing. Run cost
// is therefore roughly unchanged; what changes is who the queries are
// spent on.
const ACCOUNTS_PER_AE_PER_WEEK = 20
const DAYS_PER_WEEK = 7

// Registry names are legal entity names, frequently in caps
// ("BRIDGESTONE MINING SOLUTIONS AUSTRALIA PTY LTD"). Google News does
// better with the trading name, so drop the legal suffix and de-shout.
function toSearchQuery(name) {
  const trimmed = name
    .replace(/\([^)]*\)/g, " ")
    .replace(
      /\b(pty\.?|proprietary|ltd\.?|limited|inc\.?|incorporated|llc|plc)\b/gi,
      " ",
    )
    .replace(/[.,]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  // Only re-case names that are shouted; leave "Rea Group Ltd." alone.
  const deShouted =
    trimmed === trimmed.toUpperCase()
      ? trimmed
          .toLowerCase()
          .replace(/\b[a-z]/g, (c) => c.toUpperCase())
      : trimmed
  return deShouted
}

function queriesFor(status) {
  return [
    ...new Set(
      ACCOUNT_REGISTRY.filter((a) => (a.status ?? null) === status)
        .map((a) => toSearchQuery(a.name))
        // A one-word query like "Aon" returns mostly noise; the
        // normalizer would skip it anyway, so don't spend the fetch.
        .filter((q) => q.length >= 8),
    ),
  ].sort()
}

export const CUSTOMER_ACCOUNT_QUERIES = queriesFor("customer")
export const PROSPECT_ACCOUNT_QUERIES = queriesFor("prospect")

// The same prospect queries, bucketed by the AE whose patch they sit in,
// so each territory can be rotated through independently.
//
// An account owned by two AEs is filed under the first — it produces the
// same query string either way, and the dedupe in accountQueriesForRun
// keeps it from being fetched twice in a run where both AEs surface it.
function prospectQueriesByAe() {
  const byAe = new Map()
  for (const account of ACCOUNT_REGISTRY) {
    if ((account.status ?? null) !== "prospect") continue
    const query = toSearchQuery(account.name)
    if (query.length < 8) continue
    const ae = account.aes?.[0] ?? "unassigned"
    if (!byAe.has(ae)) byAe.set(ae, new Set())
    byAe.get(ae).add(query)
  }
  // Sorted on both axes so a given (week, day) always produces the same
  // queries — the rotation has to be reproducible to be auditable.
  return new Map(
    [...byAe.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([ae, queries]) => [ae, [...queries].sort()]),
  )
}

export const PROSPECT_QUERIES_BY_AE = prospectQueriesByAe()

// Deterministic day-indexed window so consecutive daily runs advance
// through the list instead of re-querying the same slice. Wraps around.
function rotatingSlice(list, size, dayIndex) {
  if (list.length === 0 || size <= 0) return []
  if (list.length <= size) return list
  const start = (dayIndex * size) % list.length
  const end = start + size
  return end <= list.length
    ? list.slice(start, end)
    : [...list.slice(start), ...list.slice(0, end - list.length)]
}

// This week's block of accounts for one AE. Wraps like rotatingSlice, so
// the rotation runs indefinitely and every account in a book comes up
// before any of them comes up a second time.
function weekBlock(list, perWeek, weekIndex) {
  if (list.length === 0 || perWeek <= 0) return []
  if (list.length <= perWeek) return list
  const start = (weekIndex * perWeek) % list.length
  const end = start + perWeek
  return end <= list.length
    ? list.slice(start, end)
    : [...list.slice(start), ...list.slice(0, end - list.length)]
}

// Deal one AE's weekly block across the seven days, so a run carries a
// few accounts per AE rather than the whole week's worth on Monday.
// Dealt round-robin rather than in contiguous chunks so that a short
// block (an AE with fewer than seven prospects left in the cycle) still
// spreads across the week instead of landing entirely on day 0.
function dayShare(block, dayOfWeek) {
  return block.filter((_, i) => i % DAYS_PER_WEEK === dayOfWeek)
}

/**
 * Today's named-prospect queries: each AE's slice of their own weekly
 * budget. Deterministic for a given date.
 */
export function prospectQueriesForRun(date = new Date()) {
  const dayIndex = Math.floor(date.getTime() / 86_400_000)
  const weekIndex = Math.floor(dayIndex / DAYS_PER_WEEK)
  const dayOfWeek = ((dayIndex % DAYS_PER_WEEK) + DAYS_PER_WEEK) % DAYS_PER_WEEK

  const queries = []
  for (const list of PROSPECT_QUERIES_BY_AE.values()) {
    queries.push(
      ...dayShare(weekBlock(list, ACCOUNTS_PER_AE_PER_WEEK, weekIndex), dayOfWeek),
    )
  }
  return queries
}

export function accountQueriesForRun(date = new Date()) {
  const dayIndex = Math.floor(date.getTime() / 86_400_000)
  // Deduped across the two sources: an account can legitimately appear in
  // both the customer rotation and an AE's prospect block if the book
  // lists it twice under different statuses.
  return [
    ...new Set([
      ...rotatingSlice(CUSTOMER_ACCOUNT_QUERIES, CUSTOMER_QUERIES_PER_RUN, dayIndex),
      ...prospectQueriesForRun(date),
    ]),
  ]
}

export const REGULATORY_WATCHLIST = [
  "AFCA Australia complaints",
  "ASIC Australia enforcement",
  "APRA Australia",
  "Reserve Bank of Australia cash rate",
  "Fair Work Commission Australia",
  "OAIC Australia privacy",
  "Commerce Commission New Zealand",
]

export const MACRO_WATCHLIST = [
  "Australian mortgage stress",
  "Australian retail sector customer experience",
  "Australian consumer confidence",
  "New Zealand consumer confidence",
  "Australia insurance claims regulation",
]

// Market entry and local expansion — companies arriving in ANZ, getting
// licensed to sell here, or standing up a local entity.
//
// This is whitespace hunting, and it's a different motion from the rest
// of the watchlist. Everything above looks for news about accounts
// someone already owns; these queries look for companies that are on
// nobody's list yet. A global business that just won an Australian
// licence has a real local team being hired, a launch to run, and no
// incumbent vendor relationship here — and because they're unassigned,
// whoever finds them first gets them.
//
// The signal-type taxonomy already had "new entrant" for exactly this,
// but nothing was searching for it, so the class never got collected.
// Pair these with the Unassigned view in the dashboard.
export const MARKET_ENTRY_WATCHLIST = [
  "expands into Australia",
  "launches in Australia",
  "enters Australian market",
  "opens Australian office",
  "Australian expansion global company",
  "AFSL Australian financial services licence granted",
  "APRA licence granted",
  "ASIC licence granted new",
  "Reserve Bank New Zealand licence granted",
  "enters New Zealand market",
  "establishes Australian subsidiary",
  "appoints Australia country manager",
  "appoints managing director Australia",
  "first Australian hire global expansion",
]

// Employee Experience: engagement, lifecycle, workplace culture, and the
// regulatory/legislative side of the ANZ employment relationship (pay
// equity reporting, right to disconnect, enterprise bargaining) — all of
// it a live outreach trigger for EX buyers (typically CHRO/CPO/People
// teams) the same way AFCA/ASIC news is for CX buyers.
export const EX_WATCHLIST = [
  "employee engagement survey Australia",
  "employee experience strategy ANZ",
  "workplace culture Australia",
  "Fair Work Commission enterprise agreement",
  "Fair Work Commission right to disconnect",
  "WGEA gender pay gap Australia",
  "Australian HR technology",
  "employee attrition Australia",
  "return to office policy Australia",
  "Great Place To Work Australia",
]

// Strategy & Research / market research: synthetic data and AI-simulated
// respondents, speed-to-insight, UX/UI and concept testing, video
// feedback, and brand tracking — the buying signals for Qualtrics'
// Edge/Strategy & Research line, distinct from CX and EX.
export const MARKET_RESEARCH_WATCHLIST = [
  "brand tracking Australia",
  "market research industry Australia",
  "synthetic data market research",
  "AI synthetic respondents research",
  "UX research Australia",
  "concept testing consumer research",
  "video feedback user research",
  "consumer insights Australia",
  "ad testing Australia marketing",
]

// Everything except the account queries is stable run to run — these
// are themes, not names, so there's nothing to rotate through.
export const STANDING_WATCHLIST = [
  ...VENDOR_WATCHLIST,
  ...REGULATORY_WATCHLIST,
  ...MACRO_WATCHLIST,
  ...MARKET_ENTRY_WATCHLIST,
  ...EX_WATCHLIST,
  ...MARKET_RESEARCH_WATCHLIST,
]

/**
 * The queries for one ingest run: the standing thematic watchlist plus
 * today's rotating slice of named territory accounts.
 */
export function watchlistForRun(date = new Date()) {
  return [...STANDING_WATCHLIST, ...accountQueriesForRun(date)]
}
