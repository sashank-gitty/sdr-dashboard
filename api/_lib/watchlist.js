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

export const ACCOUNT_WATCHLIST = [
  "Commonwealth Bank of Australia",
  "National Australia Bank",
  "Westpac",
  "ANZ Bank Australia",
  "Bendigo Bank",
  "Bank of Sydney",
  "Woolworths customer experience",
  "Coles Flybuys",
  "Telstra customer experience",
  "Qantas customer experience",
  "OneNZ",
  "Nufarm",
]

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

export const FULL_WATCHLIST = [
  ...VENDOR_WATCHLIST,
  ...ACCOUNT_WATCHLIST,
  ...REGULATORY_WATCHLIST,
  ...MACRO_WATCHLIST,
  ...EX_WATCHLIST,
  ...MARKET_RESEARCH_WATCHLIST,
]
