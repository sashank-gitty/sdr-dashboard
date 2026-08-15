-- Lets an SDR add a signal directly from something they found themselves
-- (a LinkedIn post, a job ad, a conversation) rather than only from the
-- automated news pipeline or a last30days community run. See
-- api/manual-signal.js — no LLM call involved, since the person entering
-- it is already the source of truth for what they typed.
ALTER TABLE signals DROP CONSTRAINT IF EXISTS signals_origin_check;
ALTER TABLE signals ADD CONSTRAINT signals_origin_check
  CHECK (origin IN ('seed', 'news', 'community', 'manual'));
