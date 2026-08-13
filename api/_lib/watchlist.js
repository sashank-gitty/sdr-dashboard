// What the ingest pipeline queries Google News RSS for. Kept as plain
// data (not derived from the DB) so it's trivial to edit without touching
// ingest logic. Add/remove strings freely — each becomes one RSS query
// per cron run. Raw compound labels from the old static dataset (e.g.
// "AFCA / general insurance sector") were deliberately NOT reused here;
// they make poor search queries. These are clean, single-subject terms.
//
// Originally CX-only. Expanded to cover all three Qualtrics practice
// areas — CX, EX, and Strategy & Research (market research) — since the
// account base for those spans every industry, not just financial
// services. See shared/practiceAreas.js for how normalize.js classifies
// what comes back.

export const VENDOR_WATCHLIST = [
  // CX
  "Qualtrics",
  "Medallia",
  "NICE CXone",
  "Genesys",
  "Verint",
  "Zendesk",
  "Glassbox",
  "Sprinklr",
  "Forsta",
  // EX
  "Culture Amp",
  "Perceptyx",
  "Leapsome",
  "Workday Peakon",
  "Microsoft Viva Glint",
  "Alchemer",
  "AskNicely",
  // Market research / Strategy & Research
  "Kantar",
  "Ipsos",
  "Nielsen NIQ",
  "Dynata",
  "YouGov",
  "System1 Research",
  "Zappi",
  "Attest",
  "GWI GlobalWebIndex",
  "UserTesting",
  "Tracksuit",
]

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
//   - Prospects rotate too, but a ~1,600-deep list cycles slowly, so
//     name-matching is opportunistic for them. Their real coverage
//     comes from the thematic patch tagging the normalizer applies to
//     sector and regulatory news, which lands in a patch view without
//     needing the account named at all.
//
// Tune the two per-run constants below against the `queried` figure in
// the /api/ingest response summary if the function starts running long.
import { ACCOUNT_REGISTRY } from "./accountRegistry.js"

const CUSTOMER_QUERIES_PER_RUN = 25
const PROSPECT_QUERIES_PER_RUN = 10

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

export function accountQueriesForRun(date = new Date()) {
  const dayIndex = Math.floor(date.getTime() / 86_400_000)
  return [
    ...rotatingSlice(CUSTOMER_ACCOUNT_QUERIES, CUSTOMER_QUERIES_PER_RUN, dayIndex),
    ...rotatingSlice(PROSPECT_ACCOUNT_QUERIES, PROSPECT_QUERIES_PER_RUN, dayIndex),
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
