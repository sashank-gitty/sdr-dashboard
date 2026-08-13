-- Practice-area taxonomy: the dashboard originally only tracked Customer
-- Experience signals. Expanding coverage to Employee Experience and
-- Strategy & Research (market research: synthetic data, speed to insight,
-- UX/UI testing, video feedback, brand tracking) needs a way to tell those
-- apart from CX at a glance, alongside scope and signal_type.
--
-- NOT NULL with a default (rather than nullable, unlike outreach_relevance
-- and reviewed_at) because every signal genuinely belongs to one of the
-- three areas — there's no "not yet classified" state worth representing.
-- The default backfills every pre-existing row as 'cx', which matches
-- reality: everything ingested before this migration was CX-only.
ALTER TABLE signals ADD COLUMN IF NOT EXISTS practice_area TEXT NOT NULL DEFAULT 'cx'
  CHECK (practice_area IN ('cx', 'ex', 'market_research'));

CREATE INDEX IF NOT EXISTS signals_practice_area_idx ON signals (practice_area);
