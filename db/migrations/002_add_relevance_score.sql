-- Outreach-relevance score (Issue 3). Nullable: existing rows need a
-- one-time backfill pass (db/backfill-relevance.mjs) before they have a
-- value; new rows get scored inline during ingestion from here on.
ALTER TABLE signals ADD COLUMN IF NOT EXISTS outreach_relevance SMALLINT
  CHECK (outreach_relevance BETWEEN 1 AND 5);

CREATE INDEX IF NOT EXISTS signals_relevance_idx ON signals (outreach_relevance DESC);
