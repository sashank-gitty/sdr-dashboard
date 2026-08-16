// Canonical competitor/vendor list — single source of truth, mirroring
// how shared/practiceAreas.js and shared/patches.js work for their own
// dimensions. Two very different jobs read this same list:
//
//   1. The ingest pipeline (api/_lib/watchlist.js) uses it to build the
//      Google News queries that keep this list "constantly scanning" —
//      one query per name, every cron run.
//   2. The frontend uses it to recognize when a signal's entity IS one of
//      these vendors, so it can be routed to Competitor Intelligence
//      instead of being treated like a sales prospect. A competitor can
//      never be "approached" the way an account is — nobody is going to
//      cold-email Sprinklr — so a signal about one needs a different
//      question asked of it: not "how do I sell into this," but "what
//      does this mean for how I position against them."
//
// Deliberately excludes Qualtrics itself (OWN_BRAND below): Qualtrics
// news is neither a sales prospect nor a competitor, so it's tracked
// separately and shown nowhere as either.
//
// This list is a living one, not a fixed taxonomy — the CX/EX/MR vendor
// landscape changes, so add a name here whenever a new one shows up
// worth tracking (Lattice was added this way, found showing up
// mislabeled as a prospect account before it was on this list at all).
// Nothing else in the app needs to change: ingestion, the "don't treat
// this as a sales prospect" filter, and the Competitor Intelligence page
// all read from this one array.
// `aliases` covers the shortened form a headline (and the LLM entity
// extraction over it) commonly uses for a compound vendor name — "NICE"
// for "NICE CXone", "Glint" for "Microsoft Viva Glint" — so a signal
// still gets recognized as competitor news even when the article never
// spells out the full product name. Deliberately a curated, explicit
// list rather than an automatic "first word of the name" rule: several
// of these compounds start with a word ("Microsoft", "Workday") that's
// far too generic on its own to safely treat as this vendor whenever it
// appears, the same reason api/_lib/matchAccounts.js won't loose-match a
// short, common token against the territory book either.
export const COMPETITORS = [
  // CX
  { name: "Medallia", practiceArea: "cx" },
  { name: "NICE CXone", practiceArea: "cx", aliases: ["NICE", "NICE inContact"] },
  { name: "Genesys", practiceArea: "cx" },
  { name: "Verint", practiceArea: "cx" },
  { name: "Zendesk", practiceArea: "cx" },
  { name: "Glassbox", practiceArea: "cx" },
  { name: "Sprinklr", practiceArea: "cx" },
  { name: "Forsta", practiceArea: "cx" },
  // EX
  { name: "Culture Amp", practiceArea: "ex" },
  { name: "Perceptyx", practiceArea: "ex" },
  { name: "Leapsome", practiceArea: "ex" },
  { name: "Lattice", practiceArea: "ex" },
  { name: "Workday Peakon", practiceArea: "ex", aliases: ["Peakon"] },
  { name: "Microsoft Viva Glint", practiceArea: "ex", aliases: ["Viva Glint", "Glint"] },
  { name: "Alchemer", practiceArea: "ex" },
  { name: "AskNicely", practiceArea: "ex" },
  // Market research / Strategy & Research
  { name: "Kantar", practiceArea: "market_research" },
  { name: "Ipsos", practiceArea: "market_research" },
  { name: "Nielsen NIQ", practiceArea: "market_research", aliases: ["Nielsen", "NIQ"] },
  { name: "Dynata", practiceArea: "market_research" },
  { name: "YouGov", practiceArea: "market_research" },
  { name: "System1 Research", practiceArea: "market_research", aliases: ["System1"] },
  { name: "Zappi", practiceArea: "market_research" },
  { name: "Attest", practiceArea: "market_research" },
  { name: "GWI GlobalWebIndex", practiceArea: "market_research", aliases: ["GWI", "GlobalWebIndex"] },
  { name: "UserTesting", practiceArea: "market_research" },
  { name: "Tracksuit", practiceArea: "market_research" },
]

// Your own brand. Kept in the news watchlist (still worth knowing when
// your own company is in the press) but excluded from both the
// "prospect account" derivation and the competitor list — it's neither.
export const OWN_BRAND = "Qualtrics"

// What the ingest pipeline queries Google News RSS for: your own brand
// plus every tracked competitor, one query per name per cron run.
export const VENDOR_WATCHLIST = [OWN_BRAND, ...COMPETITORS.map((c) => c.name)]

export const COMPETITOR_NAMES = COMPETITORS.map((c) => c.name)

// Same normalization shape as accountKey() in src/lib/accountModel.js —
// lowercase, strip punctuation — but deliberately simpler: vendor names
// here are short, clean, and don't carry the "Pty Ltd" / "Holdings"
// legal-suffix noise a real ANZ account name does, so there's nothing to
// strip beyond case and punctuation.
function normalize(name) {
  return String(name ?? "")
    .toLowerCase()
    .replace(/[.,'"()]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

const COMPETITOR_KEYS = new Map()
for (const competitor of COMPETITORS) {
  COMPETITOR_KEYS.set(normalize(competitor.name), competitor)
  for (const alias of competitor.aliases ?? []) {
    COMPETITOR_KEYS.set(normalize(alias), competitor)
  }
}
const OWN_BRAND_KEY = normalize(OWN_BRAND)

// A signal's `entity` is free text an LLM wrote from a headline — usually
// the exact vendor name, sometimes with a trailing qualifier ("Sprinklr
// Inc.", "Medallia (Calabrio)"). Match the whole string first, then fall
// back to checking whether a known vendor name sits inside it.
export function matchCompetitor(entity) {
  const key = normalize(entity)
  if (!key) return null
  const exact = COMPETITOR_KEYS.get(key)
  if (exact) return exact
  for (const [competitorKey, competitor] of COMPETITOR_KEYS) {
    if (key.includes(competitorKey)) return competitor
  }
  return null
}

export function isCompetitorEntity(entity) {
  return matchCompetitor(entity) !== null
}

export function isOwnBrandEntity(entity) {
  const key = normalize(entity)
  return Boolean(key) && (key === OWN_BRAND_KEY || key.includes(OWN_BRAND_KEY))
}

// True for anything that should be kept out of the "prospect account"
// derivation — your own brand and every tracked competitor. Neither is a
// company an SDR is ever going to call.
export function isVendorEntity(entity) {
  return isOwnBrandEntity(entity) || isCompetitorEntity(entity)
}
