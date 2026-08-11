// What the ingest pipeline queries Google News RSS for. Kept as plain
// data (not derived from the DB) so it's trivial to edit without touching
// ingest logic. Add/remove strings freely — each becomes one RSS query
// per cron run. Raw compound labels from the old static dataset (e.g.
// "AFCA / general insurance sector") were deliberately NOT reused here;
// they make poor search queries. These are clean, single-subject terms.

export const VENDOR_WATCHLIST = [
  "Qualtrics",
  "Medallia",
  "NICE CXone",
  "Genesys",
  "Verint",
  "Zendesk",
  "Glassbox",
  "UserTesting",
  "Sprinklr",
  "Alchemer",
  "AskNicely",
  "Culture Amp",
  "Perceptyx",
  "Leapsome",
  "Tracksuit",
  "Kantar",
  "Ipsos",
  "Nielsen NIQ",
  "Dynata",
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

export const FULL_WATCHLIST = [
  ...VENDOR_WATCHLIST,
  ...ACCOUNT_WATCHLIST,
  ...REGULATORY_WATCHLIST,
  ...MACRO_WATCHLIST,
]
