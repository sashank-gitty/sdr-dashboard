-- Core signal feed. Mirrors the shape the frontend already expects
-- (see src/data/data.json for the legacy static shape) plus the columns
-- needed to run a real ingestion pipeline: dedupe, provenance, timestamps.
CREATE TABLE IF NOT EXISTS signals (
  id             TEXT PRIMARY KEY,
  headline       TEXT NOT NULL,
  summary        TEXT NOT NULL,
  source_url     TEXT NOT NULL,
  date           DATE NOT NULL,
  scope          TEXT NOT NULL CHECK (scope IN ('macro', 'micro')),
  entity         TEXT NOT NULL,
  signal_type    TEXT NOT NULL,

  -- Where this row came from. 'seed' = migrated from the old static
  -- data.json, 'news' = the RSS/news ingest pipeline (Issue 1), reserved
  -- for future use: 'community' = last30days-derived signals (Issue 5).
  origin         TEXT NOT NULL DEFAULT 'news' CHECK (origin IN ('seed', 'news', 'community')),

  -- Dedupe key so re-running ingestion against the same article is a
  -- no-op instead of a duplicate row. Normalized source URL by default;
  -- ingestion can fall back to a content hash when a feed reuses URLs.
  dedupe_key     TEXT NOT NULL UNIQUE,

  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS signals_date_idx ON signals (date DESC);
CREATE INDEX IF NOT EXISTS signals_entity_idx ON signals (entity);
CREATE INDEX IF NOT EXISTS signals_scope_idx ON signals (scope);
CREATE INDEX IF NOT EXISTS signals_signal_type_idx ON signals (signal_type);
