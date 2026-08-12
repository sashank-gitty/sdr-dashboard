// Canonical practice areas — single source of truth shared between the
// frontend's badge color mapping (src/lib/colors.js) and the ingest
// pipeline's LLM normalization prompt (api/_lib/normalize.js), mirroring
// how shared/signalTypes.js works for signal types. Every signal belongs
// to exactly one of these (see db/migrations/004_add_practice_area.sql —
// the column is NOT NULL, no "unclassified" state).
//
// - "cx": Customer Experience — journey analytics, contact center,
//   digital CX, customer feedback/NPS/CSAT.
// - "ex": Employee Experience — engagement, pulse listening, lifecycle
//   (onboarding/exit), 360 feedback, manager effectiveness, workplace
//   regulation (Fair Work, pay equity reporting).
// - "market_research": Strategy & Research — synthetic data/panels,
//   speed-to-insight, UX/UI and concept testing, video feedback, brand
//   tracking, conjoint/MaxDiff.
export const PRACTICE_AREAS = ["cx", "ex", "market_research"]

export const PRACTICE_AREA_LABELS = {
  cx: "CX",
  ex: "EX",
  market_research: "Market Research",
}
