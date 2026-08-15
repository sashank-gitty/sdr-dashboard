-- Manually-claimed accounts: an SDR finding an unassigned (or any other)
-- account in the feed and marking it as their own, so it can be tracked
-- as a first-class list the same way starred accounts are, but shared
-- across devices/browsers instead of living in one browser's
-- localStorage. This does NOT change territory ownership (owningAes,
-- accountStatus) — it's a personal "I'm working this" flag layered on
-- top of the derived account, not a rewrite of the territory book.
--
-- account_key matches accountKey() in src/lib/accountModel.js (the same
-- normalized key every derived account is keyed by), so a claim survives
-- the account's display name changing between a book match and a bare
-- entity string.
--
-- No auth, same as reviews/reviewed_at: this app has no login system and
-- is explicitly single-user, so there's one claims list, not one per AE.
CREATE TABLE IF NOT EXISTS account_claims (
  account_key  TEXT PRIMARY KEY,
  account_name TEXT NOT NULL,
  note         TEXT,
  claimed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
