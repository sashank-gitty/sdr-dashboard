// Canonical AE patches (industry verticals), mirroring how
// shared/practiceAreas.js and shared/signalTypes.js work. This is the
// dimension that answers "whose territory does this signal land in?",
// which is orthogonal to practice area ("which product does it sell?").
//
// The labels come from the vertical taxonomy the AE territory
// spreadsheets already use in their "Vertical" / "Deployment Vertical"
// columns, so a signal tagged "tmt" here means the same thing it means
// in Terence's territory export. Tristan's file uses a finer-grained
// financial-services breakdown (banking / insurance / investments /
// fintech / private equity) — those all roll up into "fsi", with the
// original label preserved as the account's subVertical.
//
// Unlike practice area, a signal can belong to MORE THAN ONE patch (a
// Fair Work ruling hits every employer) or to NONE (a Qualtrics product
// launch is vendor news, not territory news). So this is stored as an
// array, not a single value.
export const PATCHES = ["fsi", "tmt", "goods_services", "hcls", "locations", "public_sector"]

export const PATCH_LABELS = {
  fsi: "FSI",
  tmt: "TMT",
  goods_services: "Goods & Services",
  hcls: "HCLS",
  locations: "Locations",
  public_sector: "Public Sector",
}

// Longer descriptions, used in the ingest prompt so the model classifies
// against the same definitions a human would, and in the UI legend.
export const PATCH_DESCRIPTIONS = {
  fsi: "Financial Services & Insurance — banks, mutuals, credit unions, insurers, insurance brokers, superannuation, wealth/investment platforms, fintech, private equity, and professional services (accounting, legal, consulting).",
  tmt: "Technology, Media & Telco — software and IT services, telecommunications and broadband, broadcast/publishing/streaming media, marketing and data businesses.",
  goods_services: "Goods & Services — FMCG and food, mining and resources, energy and utilities, agriculture, manufacturing, industrials, engineering and construction, transport and logistics, wholesale and distribution, automotive.",
  hcls: "Healthcare & Life Sciences — hospitals and health services, private health insurers where the signal is clinical rather than financial, aged care, pharmaceuticals, biotech, medical devices.",
  locations: "Locations — retail chains, hospitality, tourism and travel, leisure and venues, real estate and property, facilities management. Businesses whose experience problem is physically distributed across sites.",
  public_sector: "Public Sector — federal, state and local government, government agencies, defence, public education.",
}

// The AE roster these patches were derived from, and each AE's primary
// patch. Used for the "whose patch" filter and for falling back to a
// sensible patch when an account's own vertical cell was blank. Keep in
// sync with scripts/build-account-registry.mjs when the team changes.
export const AE_ROSTER = [
  { name: "Tristan", primaryPatch: "fsi" },
  { name: "Terence Fong", primaryPatch: "tmt" },
  { name: "James Locke", primaryPatch: "goods_services" },
  { name: "Jared Dries", primaryPatch: "goods_services" },
]

export const AE_NAMES = AE_ROSTER.map((ae) => ae.name)

export const AE_PRIMARY_PATCH = Object.fromEntries(
  AE_ROSTER.map((ae) => [ae.name, ae.primaryPatch]),
)

export const ACCOUNT_STATUSES = ["customer", "prospect"]
