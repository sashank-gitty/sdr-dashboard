-- AE patch attribution (see shared/patches.js). Answers "whose
-- territory does this land in?", which is orthogonal to practice_area's
-- "which product does this sell?".
--
-- Arrays rather than a single value, unlike practice_area: a signal can
-- legitimately hit several territories (a Fair Work ruling touches
-- every employer of scale) or none at all (a competitor's funding round
-- is vendor news, not territory news). An empty array is a real,
-- meaningful state here, so these are NOT NULL DEFAULT '{}' rather than
-- nullable — there's no "unknown" to represent, only "none".
--
-- Two independent sources feed these columns, and it's worth keeping
-- the distinction in mind when querying:
--   - matched_accounts / owning_aes / account_status come from
--     deterministic name matching against the territory book
--     (api/_lib/matchAccounts.js). High confidence, low coverage.
--   - patches may additionally be populated by the ingest normalizer's
--     thematic judgment for signals that name no account at all.
--     Broader coverage, softer confidence.
-- A row with a non-empty matched_accounts is the strong case: a named
-- account in someone's book is in the news today.

ALTER TABLE signals ADD COLUMN IF NOT EXISTS patches TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE signals ADD COLUMN IF NOT EXISTS matched_accounts TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE signals ADD COLUMN IF NOT EXISTS owning_aes TEXT[] NOT NULL DEFAULT '{}';

-- Nullable, unlike the arrays above: most signals match no account at
-- all, and "this signal is about nobody's account" is genuinely absent
-- information rather than an empty set.
ALTER TABLE signals ADD COLUMN IF NOT EXISTS account_status TEXT
  CHECK (account_status IN ('customer', 'prospect'));

-- GIN rather than btree: every read of these columns is a containment
-- test ("which signals land in the FSI patch?"), which is what GIN
-- indexes arrays for.
CREATE INDEX IF NOT EXISTS signals_patches_idx ON signals USING GIN (patches);
CREATE INDEX IF NOT EXISTS signals_owning_aes_idx ON signals USING GIN (owning_aes);
CREATE INDEX IF NOT EXISTS signals_matched_accounts_idx ON signals USING GIN (matched_accounts);
