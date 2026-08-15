-- Territory account book with commercial detail: what each account
-- spends, on which product lines, and what we've won and lost there.
--
-- This is deliberately a DATABASE table and not a generated file in the
-- repo, unlike api/_lib/accountRegistry.js. That registry carries only
-- name/patch/AE/customer-flag precisely so it was safe to commit; this
-- table carries named-customer ARR, renewal exposure and lost deal
-- values, which are not safe to commit to a public repository. The
-- loader (db/load-territory.mjs) reads the AE spreadsheets from a local
-- path and writes here — the source files never enter git.
--
-- Served by /api/territory, which sits behind the Basic-auth middleware.

CREATE TABLE IF NOT EXISTS territory_accounts (
  -- normalizeAccountName() output from api/_lib/matchAccounts.js, so a
  -- signal's matched_accounts can join straight onto this.
  account_key      TEXT PRIMARY KEY,
  account_name     TEXT NOT NULL,
  ae               TEXT NOT NULL,
  vertical         TEXT,
  country          TEXT,
  territory_priority TEXT,
  icp              TEXT,
  segment          TEXT,
  is_customer      BOOLEAN NOT NULL DEFAULT FALSE,

  -- Firmographics as the AE books record them. revenue_musd is in
  -- millions because that is the unit the source columns use.
  revenue_musd     NUMERIC(14,2) DEFAULT 0,
  employees        INTEGER DEFAULT 0,

  -- Current spend, split by product line where the source book has the
  -- split (Tristan's and Terence's do; Jared's and James's carry a
  -- single combined figure, which lands in arr with the parts left 0).
  arr              NUMERIC(14,2) DEFAULT 0,
  cx_arr           NUMERIC(14,2) DEFAULT 0,
  ex_arr           NUMERIC(14,2) DEFAULT 0,
  mr_arr           NUMERIC(14,2) DEFAULT 0,
  rs_spend         NUMERIC(14,2) DEFAULT 0,

  open_pipeline    NUMERIC(14,2) DEFAULT 0,
  lost_pipeline_py NUMERIC(14,2) DEFAULT 0,
  won_all_time     NUMERIC(14,2) DEFAULT 0,

  engaged_l30      INTEGER DEFAULT 0,
  engaged_l90      INTEGER DEFAULT 0,

  -- Which lines the account actually holds, e.g. {CX,MR}. Derived at
  -- load time from the *_arr columns so the cross-sell views don't have
  -- to recompute it per query.
  lines_held       TEXT[] NOT NULL DEFAULT '{}',

  source_file      TEXT,
  loaded_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS territory_accounts_ae_idx ON territory_accounts (ae);
CREATE INDEX IF NOT EXISTS territory_accounts_customer_idx ON territory_accounts (is_customer);
CREATE INDEX IF NOT EXISTS territory_accounts_arr_idx ON territory_accounts (arr DESC);
