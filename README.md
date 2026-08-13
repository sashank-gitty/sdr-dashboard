# SDR Dashboard

An account intelligence dashboard for ANZ SDR/AE territory work, built
with React, Vite, and Tailwind CSS v4. Signals are ingested from news,
scored for outreach relevance by an LLM, attributed to AE territories,
and presented account-first.

## Structure

Five destinations off a top nav, with signals opening in a slide-over
drawer from anywhere.

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
and CSV export.

**Account detail** — eight tabs:

- *Fast Facts* — signal timeline bucketed by recency (7 / 30 / 180 days),
  signal mix, and the account information panel
- *Summary* — "What You Need to Know": Key Insights, People Updates, Top
  News, every line carrying citation badges that open the source signal
- *Signals* — the account's full signal list, grouped
- *Value* — a value pyramid (Company Goals, Business Strategy, Challenges
  and Obstacles, Value Paths) built from the account's own signals
- *Custom* — persona-keyed discovery questions for the practice areas the
  account's signals touch
- *Research* — the score breakdown, shown rather than hidden, plus every
  source
- *Contacts* / *Tech* — deliberately empty, each naming what would fill it

**Search** — full-text across headlines, summaries, entities and matched
accounts, with signal-group tabs, term highlighting in results, and saved
alerts.

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
- **`db/migrations/`** — schema, applied in order (001 core table through 006 ingest run log — check the directory for the current last one).
- **`db/seed.mjs`** — one-time migration of the old static dataset into Postgres (skips the placeholder `example.com` entries).
- **`db/backfill-relevance.mjs`** — one-time relevance scoring pass for rows that predate ingest-time scoring.
- **`POST /api/reviews`** — durable "Mark Reviewed" state, `{ids, reviewed}` bulk update.
- **`GET /api/ingest-status`** — the most recent `ingest_runs` row (success/error, counts, timestamp), so the frontend can show "last synced" without inferring it from `signals.created_at`, which doesn't move on a run that found nothing new. Every `/api/ingest` invocation logs one row here regardless of outcome.

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
3. **Run the migrations**: open the Neon/Postgres query editor in the Vercel dashboard and run each file in `db/migrations/` in order (`001_...` through `006_...` as of this writing — check the directory for the current last one).
4. **Seed existing data**: locally, `vercel env pull .env.local`, then `node --env-file=.env.local db/seed.mjs`.
5. **Backfill patch attribution** on rows that predate migration 005: `node --env-file=.env.local db/backfill-patches.mjs`. Safe to re-run; pass `--all` to re-tag everything after changing the territory book or the patch definitions.
6. **Verify ingestion manually before trusting the cron**: `curl -H "Authorization: Bearer $CRON_SECRET" https://<your-deploy>/api/ingest` and check the response summary (`queried`, `rawItems`, `afterDedupe`, `normalized`, `inserted`, `accountMatched`, `errors`).

Verified live against a real deployment and database: RSS fetch, redirect resolution, Claude normalization, and relevance scoring all confirmed working. Worth knowing: Vercel Hobby plan cron jobs are capped at once/day and function execution time is capped — `vercel.json` requests `maxDuration: 60` for `/api/ingest`, but if the watchlist or `MAX_ITEMS_PER_RUN` (25) turns out too slow for your plan's actual limits, trim either in `api/_lib/watchlist.js` / `api/ingest.js`. Watch the first few post-deploy `summary` responses from `/api/ingest` closely for this.

**Preview deployments use an isolated Neon database branch** (configured when the Postgres integration was connected). Any new migration needs running on *both* the production and preview branches, or the preview deployment will 500 on a missing column until it's caught up — this has bitten twice already. Worth turning off Preview branching to remove the recurring foot-gun if you don't specifically need isolated preview data.

On watchlist size: a run queries the 72 standing thematic queries (including the market-entry set) plus a rotating slice of named territory accounts (25 customers + 10 prospects), so ~107 per run, up from ~70. `api/_lib/fetchNews.js`'s fetch concurrency is 10. The territory book has ~1,700 accounts and the cron runs daily, so they can't all be queried by name every run — customers cycle every few days, prospects far more slowly, and the thematic patch tagging is what gives prospects their real coverage. The two per-run constants at the top of `api/_lib/watchlist.js` are the dials.

Also watch `accountMatched` in the ingest summary. If it sits at zero run after run, the watchlist and the territory book have drifted apart and the patch views are running on thematic tags alone. That is exactly what had happened before the territory book was wired in: the hand-written account watchlist tracked the ANZ enterprise majors (CBA, NAB, Westpac, Telstra, Qantas, Woolworths) and not one of them appears in any of the four AEs' territories, which are corporate/mid-market.

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
