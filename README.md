# SDR Dashboard

An account intelligence dashboard for ANZ SDR/AE territory work, built
with React, Vite, and Tailwind CSS v4. Signals are ingested from news,
scored for outreach relevance by an LLM, attributed to AE territories,
and presented account-first.

## Structure

A top nav of destinations, with signals opening in a slide-over drawer
from anywhere. The drawer's "What This Means" section goes past the
one-line reason/action pair to a fuller read: what this class of trigger
usually means for the account, who inside or around it actually feels it
(customers, employees, the market), and several concrete outreach angles
rather than one generic action line — see
[Signal and account insight depth](#signal-and-account-insight-depth)
below. "Open source" always stays one click away for verifying the
underlying article.

**Magic** — the landing screen. Four counters, the three agents that make
up the pipeline (Signal and Research are live; Outreach is not built and
says so), and "Start Here": accounts carrying at least one high-relevance
signal, ranked by score.

**Global Feed** — signals nested under the account they name, rather than
a flat chronological list. Each account block carries a plain-English
rollup, a score, and a signal count. Filter by owner, type, priority,
patch and date range; tab across signal groups; export the filtered set
as CSV.

**Accounts** — the full derived account table. Sortable on every column,
with a 0–100 score, a P1–P3 priority tier, toggleable columns, starring,
claiming (see below), CSV export, and an **Add Account** button for a
company that isn't in the dashboard at all yet — see
[Adding a brand-new account](#adding-a-brand-new-account) below.

**My Accounts** — the same table, pre-filtered to whatever's been
manually claimed. An account is *derived* from the territory book and
signals — nobody "owns" it in this app unless a book match says so — but
an SDR working the unassigned whitespace, or a good account sitting on
someone else's patch, still wants a personal list of "the ones I'm
tracking." Claiming an account (the pin icon on any Accounts row, or "Add
to My Accounts" on the account page) adds it here without touching
territory ownership at all. Persisted server-side (`account_claims`
table, `api/claims.js`) rather than to `localStorage` the way starring
is, so the list is the same wherever the dashboard is opened — see
[Manually claimed accounts](#manually-claimed-accounts) below.

**Account detail** — eight tabs:

- *Fast Facts* — signal timeline bucketed by recency (7 / 30 / 180 days),
  signal mix, and the account information panel (shows "Claimed on" once
  an account's been added to My Accounts)
- *Summary* — "What You Need to Know": Key Insights (now paired with a
  plain-English read on what the trigger means for the account and a
  suggested outreach angle, not just a signal count), People Updates, Top
  News, every line carrying citation badges that open the source signal
- *Signals* — the account's full signal list, grouped
- *Value* — a value pyramid (Company Goals, Business Strategy, Challenges
  and Obstacles, Value Paths) built from the account's own signals
- *Custom* — persona-keyed discovery questions for the practice areas the
  account's signals touch
- *Research* — the score breakdown, shown rather than hidden, plus every
  source
- *Contacts* / *Tech* — deliberately empty, each naming what would fill it

**Search** — full-text across headlines, summaries, entities, matched
accounts, signal type, patch and practice area, with signal-group tabs,
saved alerts, and multi-word queries: every word has to appear somewhere
in a result (not as one exact phrase), so "leadership survey" finds a
headline where those two words are apart, and every matched word is
highlighted individually in the results. Matched results with a query
sort by relevance then recency, so the strongest trigger leads rather
than whatever's merely newest. Saved alerts (`src/lib/useAlerts.js`)
re-run the same matching logic (`src/lib/textMatch.js`) live against the
current signal set.

**Alerts** — saved queries that re-run live against the current signal
set. No email is sent yet; the page says so rather than implying
otherwise.

Throughout: a `Cmd/Ctrl+K` command palette, dark/light theme persisted to
`localStorage`, and a "synced Xh ago" indicator that turns amber past 36
hours or on a failed run, so a quiet cron and a dead cron don't look the
same.

### Account scoring

Accounts are **derived from signals**, not stored: every signal already
carries `matchedAccounts`, `entity`, `owningAes`, `accountStatus` and
`patches`, which is everything a rollup needs. A territory-book match
makes an account *managed*; a micro-scope signal that names a company
with no book match makes it *unassigned* — the whitespace view, promoted
to a first-class row. Macro signals name no company and produce no
account.

The score weights the best outreach trigger (55%), how warm the account is
right now (30%), and sustained activity (15%). Unscored signals count as
the neutral mid-tier 3, matching the feed sort — scoring them 0 would
assert "bad prospect" when the truth is "predates relevance scoring".

### What is deliberately not generated

The Executive Perspective, Contacts and Tech panels are empty by choice.
Filling them would mean inventing executive quotes, contacts and tech
stacks for real companies from news headlines, and a rep would repeat that
on a call. Each panel names the source that would populate it instead.
Everything else on an account page is either copied verbatim from an
ingested signal or computed from those signals, and every synthesized line
carries a citation badge back to its source.

### Signal and account insight depth

`src/lib/signalInsights.js` is what powers the signal drawer's "What This
Means" section and the extra lines under each account's Key Insights: an
account-impact read, who inside or around the account actually feels it,
and several concrete outreach angles instead of the single generic action
line the drawer used to show.

It follows the same hard rule as `accountBrief.js` above: nothing in it
invents a fact about a real company. Every sentence is keyed off fields
already on the signal — its signal-type group (`signalGroups.js`),
practice area, account status, score — the same inputs `signalReason.js`
already uses for the one-line reason/action pair. It's a template
lookup, not a model call: a "leadership change" signal gets the same
impact/angle text whether it's about Bank A or Company B, because what's
generically true of *a new leader reviewing vendor relationships* is the
part this module can say with confidence — the specific fact stays
entirely in the headline and summary above it, and citing/opening the
original article is always one click away ("Open source").

`scoreMeaning()` adds a plain-language line to "Why this scored N" —
what a 4 or 5 versus a 3 versus lower actually means for whether to open
with this signal standalone or use it as supporting context — on top of
the existing rubric-tier text pulled from `shared/relevanceRubric.js`.

## Hosting

Runs on Vercel today. `server/index.mjs` (zero-dependency), the
`Dockerfile`, and `npm run ingest` are everything needed to run it
anywhere else — see **[HOSTING.md](./HOSTING.md)** for the three routes,
TLS and domain setup, and the authentication you need to add before
pointing a domain at it (there is none today).

## AE patches

Signals carry an AE-patch attribution alongside practice area. Practice
area answers "which product does this sell?"; patch answers "whose
territory does this land in?" — see `shared/patches.js` for the
taxonomy, which matches the vertical labels the AE territory
spreadsheets already use.

Unlike practice area, patch is set-valued. A signal can land in several
patches (a Fair Work ruling touches every employer of scale) or in none
(a competitor's funding round is vendor news, not territory news). Two
independent sources populate it:

1. **Named-account matching** (`api/_lib/matchAccounts.js`) resolves a
   signal's entity against the territory book and, on a hit, records the
   account, the owning AE, and whether they're a customer or a prospect.
   Deterministic and precision-first — a wrong match would file a signal
   into the wrong rep's territory, which is worse than no match. This is
   the strong case, and what the Account Coverage switch isolates in
   either direction.
2. **Thematic tagging** by the ingest normalizer, for the majority of
   signals that name no account at all. Broader coverage, softer
   confidence — this is how sector and regulatory news reaches the reps
   whose accounts it bears on without naming any of them.

### The territory book

`api/_lib/accountRegistry.js` is generated from the AEs' territory
spreadsheets by `scripts/build-account-registry.py`. The spreadsheets
themselves are deliberately not in this repo — they carry revenue,
pipeline and contact data — and only four fields are carried across:
account name, patch, owning AE, and customer-vs-prospect.

Regenerate it whenever the AEs re-cut their territories, then commit the
result:

```
python3 scripts/build-account-registry.py /path/to/territory-files/
node --env-file=.env.local db/backfill-patches.mjs --all
```

The script is zero-dependency (stdlib `zipfile` + `ElementTree`; an
.xlsx is a zip of XML) and prints a patch distribution plus any accounts
whose patch had to be inferred, which are worth spot-checking. It's the
only place that needs editing if a sheet is renamed or a column moves.

The registry is server-side only. It is not imported anywhere under
`src/`, so the account book never ships in the browser bundle — the
derived tags travel to the client on each signal row instead.

### Whitespace: finding unassigned accounts

Patch views answer "what's happening to accounts we own". The **Unassigned**
setting on the Account Coverage switch answers the opposite question, and
it exists because a thin territory is a normal situation: which named
companies are in the news that match *nothing* in the territory book?

A signal qualifies as unassigned when it matched no account, has micro
scope (a macro story about "the Australian retail sector" names no
company to call), and carries at least one patch. That last condition is
what keeps the view useful — the ingest normalizer deliberately assigns
no patch to vendor and competitor news, so a NICE product launch is
filtered out even though it is also a named company nobody owns.

Combine it with a patch to scope the hunt: `?patch=fsi&accounts=unassigned`
is "financial services companies in the news that nobody is covering".

Two things feed this view specifically:

- **`MARKET_ENTRY_WATCHLIST`** in `api/_lib/watchlist.js` — queries for
  companies arriving in ANZ: winning a local licence (AFSL, APRA,
  RBNZ), registering a local entity, opening an office, appointing a
  first country manager. The `new entrant` signal type already existed
  in the taxonomy, but nothing was searching for it, so the class was
  never collected at all.
- **The relevance rubric** (`shared/relevanceRubric.js`) scores ANZ
  market entry as a 5 whether or not the company is on anyone's account
  list. Without that it scored mid-tier and sank below the fold, since
  the rest of the rubric is written around tracked accounts. Changing
  the rubric changes the bar for everything, so rescore existing rows
  with `db/backfill-relevance.mjs --all` after editing it — without
  `--all` the script skips rows that already have a (stale) score.

### Manually claimed accounts

Claiming is deliberately separate from territory ownership. `account.aes`
/ `owningAes` come from the territory book (`api/_lib/accountRegistry.js`)
and mean "whose patch is this" — that's derived from signals and never
written to directly. Claiming means "I'm personally tracking this one,"
independent of whether the book has an owner for it at all: the classic
case is finding a good account in the Unassigned whitespace view above,
or in a signal from a colleague's patch, and wanting to keep an eye on it
without pretending the territory book says it's yours.

- **`db/migrations/009_add_account_claims.sql`** — `account_claims`
  table: `account_key` (matches `accountKey()` in
  `src/lib/accountModel.js`, so a claim survives an account's display
  name changing between a book match and a bare entity string),
  `account_name`, `note`, `claimed_at`.
- **`api/claims.js`** — `GET` lists every claimed account; `POST
  {accountKey, accountName, claimed}` claims or unclaims one. No auth,
  same as `api/reviews.js` and the rest of this app: single-user, no
  login system, one shared claims list rather than one per AE.
- **`src/lib/useClaims.js`** — fetches the list once in `App.jsx` and
  exposes an optimistic claim/unclaim toggle (same rollback-on-failure
  shape as the reviewed-state toggle), passed down to the Accounts, My
  Accounts and account-detail pages so the pin icon reads the same state
  everywhere.

### Adding a brand-new account

Claiming (above) tracks an account that's already in the dashboard
because a signal already named it. **Add Account** — the button on the
Accounts and My Accounts pages — is for the account that *isn't* in the
dashboard at all yet: something an SDR found themselves (a LinkedIn post,
a job ad, a conversation) rather than something the news pipeline turned
up. The form takes an account name, what was found, a signal type
(including a new **hiring signal** type — see below), practice area, and
optionally a patch, source link, date and outreach-relevance score.

Submitting it does three things at once, no page reload needed:

1. **Inserts one real signal row** (`POST /api/manual-signal` →
   `api/manual-signal.js`) with `origin: 'manual'`, entity set to the
   typed account name, and scope always `'micro'` — the same
   deterministic `attributeEntity()` lookup the real ingest pipeline uses
   (`api/_lib/matchAccounts.js`) runs against the account name, so if it
   *is* a territory-book account, the signal gets filed under the book's
   canonical name and real owner automatically. No LLM call: unlike
   `api/ingest.js`'s normalizer, which is inferring structure from raw
   RSS text it didn't write, the person filling out this form is already
   the source of truth for what they typed.
2. **Shows up immediately** — the response is pushed straight into the
   frontend's signal list, so the new account is live on Accounts, My
   Accounts and its own account page the moment the modal closes.
3. **Optionally claims it** — "Add to My Accounts" is checked by default,
   since you're the one adding it; unchecking it just adds the account
   without also claiming it.

**Ongoing coverage**, not just the one signal: `api/ingest.js` now also
reads every claimed account's name from `account_claims` and folds it
into that day's watchlist alongside the standing territory-book queries
(`api/_lib/watchlist.js`), so a manually-added or claimed account keeps
turning up in the daily Google News search going forward — same bounded
cost as everything else the pipeline queries, capped by
`MAX_ITEMS_PER_RUN` and the monthly Claude API budget guardrail
(`api/_lib/budget.js`); nothing about adding an account raises those
caps. A deployment that hasn't yet run migration 009 degrades gracefully
here — the claimed-accounts query is wrapped in its own try/catch, so a
missing `account_claims` table just means the ingest run falls back to
the standing watchlist rather than failing outright.

**Hiring signal** (`shared/signalTypes.js`, `"hiring"` group in
`src/lib/signalGroups.js`) is a new signal type that only this manual
path produces — the automated pipeline ingests news, not job postings, so
it has no way to detect one on its own. An open req, especially at
leadership level, is exactly the kind of thing an SDR notices before it
ever becomes news, and now has a real category and its own "What This
Means" content (`src/lib/signalInsights.js`) instead of getting force-fit
into "leadership change," which means someone's already been appointed.

A manual signal without a source link (nothing typed into "Source link")
stores an empty string rather than `NULL` — `source_url` is `NOT NULL` in
the schema — and the UI treats that as "no link" everywhere a signal's
source would normally show (the drawer, the feed row, the account page's
source list), rather than rendering a broken link.

### Sharing a patch view

Patch, AE and account coverage are facets in the shared URL state
(`src/lib/useUrlState.js`), like practice area and scope, so any view is
already a link that can be handed to the rep who owns it:

```
/?patch=fsi                        FSI signals
/?ae=Terence%20Fong                everything in Terence's territory
/?patch=tmt&accounts=named         TMT, accounts someone already owns
/?patch=fsi&accounts=unassigned    FSI whitespace — companies nobody covers
```

They compose with every other facet, so
`?patch=fsi&practice=ex&relevance=high&signal=<id>` is a valid, shareable
state.

"Copy link to this view" in the sidebar copies the current URL.
Unrecognized patch values are ignored rather than filtering the feed
down to nothing.

The territory facets rescope the whole page — KPI tiles, volume chart
and highlights rail, not just the feed — so a shared link reads as that
rep's dashboard rather than the team's numbers with a filtered list
underneath. That's what separates them from the other facets: practice
area, scope, signal type and the date range narrow what you're looking
at within a dashboard, while patch, AE and account coverage decide whose
dashboard it is.

## Data pipeline

Signal data lives in Postgres (Neon, connected via Vercel's native integration), not in the JS bundle. Architecture:

- **`GET /api/signals`** — the frontend fetches this at runtime instead of importing a static file.
- **`POST /api/ingest`** — pulls Google News RSS for a watchlist of tracked entities/topics (`api/_lib/watchlist.js`), dedupes against existing rows, normalizes new items into the schema via a Claude API call (`api/_lib/normalize.js`), attributes them to AE patches (`api/_lib/matchAccounts.js`), and inserts them. Triggered on a daily cron (`vercel.json`), protected by `CRON_SECRET`.
- **`db/migrations/`** — schema, applied in order (001 core table through 007 llm spend ledger — check the directory for the current last one).
- **`db/seed.mjs`** — one-time migration of the old static dataset into Postgres (skips the placeholder `example.com` entries).
- **`db/backfill-relevance.mjs`** — one-time relevance scoring pass for rows that predate ingest-time scoring.
- **`POST /api/reviews`** — durable "Mark Reviewed" state, `{ids, reviewed}` bulk update.
- **`GET /api/ingest-status`** — the most recent `ingest_runs` row (success/error, counts, timestamp), so the frontend can show "last synced" without inferring it from `signals.created_at`, which doesn't move on a run that found nothing new. Every `/api/ingest` invocation logs one row here regardless of outcome.
- **`GET/POST /api/claims`** — durable "manually claimed account" state (see [Manually claimed accounts](#manually-claimed-accounts)), independent of the derived `matchedAccounts`/`owningAes` fields above.
- **`POST /api/manual-signal`** — adds a brand-new account and its first signal from something an SDR found outside the pipeline (see [Adding a brand-new account](#adding-a-brand-new-account)). No LLM call; runs the same deterministic territory match `api/ingest.js` uses.

Row shape (camelCase over the wire, snake_case in Postgres):

```json
{
  "id": "string",
  "headline": "string",
  "summary": "string, 2-3 sentences",
  "sourceUrl": "https://...",
  "date": "YYYY-MM-DD",
  "scope": "macro | micro",
  "entity": "string",
  "signalType": "see shared/signalTypes.js for the canonical list, or 'community insight' for last30days-derived rows",
  "practiceArea": "cx | ex | market_research — see shared/practiceAreas.js",
  "origin": "seed | news | community",
  "outreachRelevance": "integer 1-5, or null if not yet scored",
  "reviewed": "boolean",
  "patches": ["fsi", "tmt", "..."],
  "matchedAccounts": ["accounts in the AE territory book this names"],
  "owningAes": ["AEs who own those accounts"],
  "accountStatus": "customer | prospect | null"
}
```

### One-time setup (required before this works)

1. **Connect Postgres**: Vercel dashboard → your project → Storage → Connect Database → choose Neon (or Vercel Marketplace → Neon) → Connect to Project. This injects `DATABASE_URL` automatically — no secret to copy/paste.
2. **Set env vars** (Vercel dashboard → Project → Settings → Environment Variables):
   - `ANTHROPIC_API_KEY` — used by the ingest pipeline's normalization step.
   - `CRON_SECRET` — any random string you generate; Vercel automatically sends it as `Authorization: Bearer $CRON_SECRET` when invoking the cron job, and `/api/ingest` checks it matches.
   - `DASHBOARD_PASSWORD` — **required**, and fails closed: with this unset, `middleware.js` returns a 503 to every single request (including your own) rather than serving the app. This is the whole-deployment HTTP Basic auth password — see the Security section in [HOSTING.md](./HOSTING.md). Any value works; you'll be prompted for it (alongside the username) the first time you open the dashboard in a browser.
   - `DASHBOARD_USER` — optional, defaults to `sdr` if unset.
3. **Run the migrations**: open the Neon/Postgres query editor in the Vercel dashboard and run each file in `db/migrations/` in order (`001_...` through `010_...` as of this writing — check the directory for the current last one).
4. **Seed existing data**: locally, `vercel env pull .env.local`, then `node --env-file=.env.local db/seed.mjs`.
5. **Backfill patch attribution** on rows that predate migration 005: `node --env-file=.env.local db/backfill-patches.mjs`. Safe to re-run; pass `--all` to re-tag everything after changing the territory book or the patch definitions.
6. **Backfill relevance scoring** on rows that predate ingest-time scoring: `node --env-file=.env.local db/backfill-relevance.mjs`. Safe to re-run; pass `--all` to rescore everything after editing `shared/relevanceRubric.js` (changing the rubric changes the bar for every row, not just new ones).
7. **Verify ingestion manually before trusting the cron**: `curl -H "Authorization: Bearer $CRON_SECRET" https://<your-deploy>/api/ingest` and check the response summary (`queried`, `rawItems`, `afterDedupe`, `normalized`, `inserted`, `accountMatched`, `errors`).
8. **Optional — load territory commercial data**: the `/territory` page (portfolio totals, product-line mix, win:loss, worklists) reads from a `territory_accounts` table that nothing in steps 1-7 populates. `db/load-territory.mjs` reads the four AE spreadsheets from a local path — they're deliberately never committed to this public repo, since they carry named-customer ARR and pipeline — and writes only to Postgres: `node --env-file=.env.local db/load-territory.mjs /path/to/AE-spreadsheets/`. Skip this and the Territory page just renders empty rather than erroring; nothing else in the app depends on this table.

Verified live against a real deployment and database: RSS fetch, redirect resolution, Claude normalization, and relevance scoring all confirmed working. Worth knowing: Vercel Hobby plan cron jobs are capped at once/day and function execution time is capped — `vercel.json` requests `maxDuration: 60` for `/api/ingest`, but if the watchlist or `MAX_ITEMS_PER_RUN` (25) turns out too slow for your plan's actual limits, trim either in `api/_lib/watchlist.js` / `api/ingest.js`. Watch the first few post-deploy `summary` responses from `/api/ingest` closely for this.

**Preview deployments use an isolated Neon database branch** (configured when the Postgres integration was connected). Any new migration needs running on *both* the production and preview branches, or the preview deployment will 500 on a missing column until it's caught up — this has bitten twice already. Worth turning off Preview branching to remove the recurring foot-gun if you don't specifically need isolated preview data.

On watchlist size: a run queries the 72 standing thematic queries (including the market-entry set) plus a rotating slice of named territory accounts (25 customers + 10 prospects), so ~107 per run, up from ~70. `api/_lib/fetchNews.js`'s fetch concurrency is 10. The territory book has ~1,700 accounts and the cron runs daily, so they can't all be queried by name every run — customers cycle every few days, prospects far more slowly, and the thematic patch tagging is what gives prospects their real coverage. The two per-run constants at the top of `api/_lib/watchlist.js` are the dials.

Also watch `accountMatched` in the ingest summary. If it sits at zero run after run, the watchlist and the territory book have drifted apart and the patch views are running on thematic tags alone. That is exactly what had happened before the territory book was wired in: the hand-written account watchlist tracked the ANZ enterprise majors (CBA, NAB, Westpac, Telstra, Qantas, Woolworths) and not one of them appears in any of the four AEs' territories, which are corporate/mid-market.

### Monthly Claude API budget guardrail

`api/_lib/budget.js` enforces a hard **$10/calendar-month** ceiling on Claude API spend from the ingest normalizer, independent of how often `/api/ingest` runs. Every normalization call's real token usage (`response.usage`) is logged to the `llm_spend` table immediately after the call, priced at Sonnet's standing list rate ($3/$15 per MTok — priced above the introductory rate on purpose, so the cap still holds once that expires on 2026-08-31). Before each call, `normalizeItem` sums this month's spend and throws `BudgetExceededError` once it's at or above `MONTHLY_BUDGET_USD`; `api/ingest.js` catches that, stops pulling further candidates for the rest of the run, and reports `summary.budgetExceeded: true` (visible in `/api/ingest-status`) instead of silently truncating the feed. To change the cap, edit `MONTHLY_BUDGET_USD` in `api/_lib/budget.js`. This is what makes it safe to run ingest more often than daily (see `HOSTING.md` for the self-hosted hourly-cron path) without an open-ended cost tail — `MAX_ITEMS_PER_RUN` bounds worst-case spend per run, and this guardrail bounds it for the month regardless of how many runs happen.

## Community signals (Issue 5)

A third data source beyond the news pipeline: `last30days` (a separate Claude Code skill) run locally against tracked entities, transformed into the same schema, and pushed in as `origin: 'community'` rows — visually distinct in the feed (pink left-border accent + badge). This cannot run on Vercel; it needs a real Claude Code session with genuine internet access, which a serverless function doesn't have. See `scripts/local/README.md` for the full setup (manual push via `db/push-community-signals.mjs`, or a semi-scheduled local `launchd` job) — the scheduled version is built but not yet verified end-to-end against a real macOS machine.

## Development

```
npm install
npm run dev
```

`npm run dev` only runs the Vite frontend — `/api/*` routes need `vercel dev` (or a deployed environment) to actually execute, since they're Vercel serverless functions, not part of the Vite dev server.

## Build

```
npm run build
```

Outputs a static site to `dist/`, ready to deploy on Vercel. (`vite build` only builds the frontend; the `/api/*` functions are deployed separately by Vercel at deploy time, not exercised by this command.)
