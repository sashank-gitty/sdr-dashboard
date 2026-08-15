// Canonical signal types — single source of truth shared between the
// frontend's badge color mapping (src/lib/colors.js) and the ingest
// pipeline's LLM normalization prompt (api/_lib/normalize.js), so the two
// can't silently drift apart. New types can still appear (colors.js has a
// deterministic fallback palette for anything not listed here), but the
// ingest prompt is instructed to prefer these first.
export const SIGNAL_TYPES = [
  "funding",
  "earnings",
  "partnership",
  "product launch",
  "research shift",
  "analyst report",
  "market shift",
  "brand move",
  "leadership change",
  "digital transformation",
  "new entrant",
  "restructure",
  "regulation",
  "pain point",
  // Not produced by the automated pipeline — it ingests news, not job
  // postings — but a real category once a signal can be entered manually
  // (api/manual-signal.js): an open req, especially at leadership level,
  // is exactly the kind of thing an SDR finds on LinkedIn before it ever
  // becomes news.
  "hiring signal",
]

export const SCOPES = ["macro", "micro"]
