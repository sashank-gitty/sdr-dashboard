# SDR Dashboard

A single-page competitor and industry news/signal intelligence dashboard, built with React, Vite, and Tailwind CSS v4.

## What it does

- KPI summary row (total signals, weekly trend, regulatory/pain-point signals, entities tracked) with sparklines
- 30-day macro vs. micro signal volume chart
- Tabbed, filterable signal queue (All / Macro / Micro) with quick filter pills (This Week, Regulatory & Pain Points, Leadership Moves, Competitor Moves)
- Per-signal quick actions: copy to clipboard, mark reviewed
- Right-rail activity stream + rule-based weekly highlights (most active entity, leading signal type, regulatory pressure)
- Sidebar filters by date range, patch, AE, practice area (CX / EX / Market Research), scope (macro/micro), entity, and signal type — filters combine
- Per-AE patch views: filter to a territory (FSI / TMT / Goods & Services / HCLS / Locations / Public Sector) or to a single AE, and share the result as a link
- "Named accounts only" toggle to drop macro and vendor news and see just the signals naming a real account in the territory book
- Global search plus a `Cmd/Ctrl+K` command palette for fast lookup and quick actions
- Full dark / light theme support (persisted to `localStorage`, defaults to system preference)

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
   the strong case, and what the "Named accounts only" toggle keeps.
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

### Sharing a patch view

The patch, AE and named-accounts filters are mirrored into the query
string, so any view can be handed to the rep who owns it as a link:

```
/?patch=fsi                     FSI signals
/?ae=Terence%20Fong             everything in Terence's territory
/?patch=tmt&accounts=1          TMT, named accounts only
```

"Copy link to this view" in the sidebar copies the current one. A link
overrides whatever that browser last had selected, so it works for
someone who has used the dashboard before. Unrecognized patch values are
ignored rather than filtering the feed down to nothing.

These filters rescope the whole page — KPI tiles, volume chart and
highlights rail, not just the feed — so a shared link reads as that
rep's dashboard rather than the team's numbers with a filtered list
underneath. The remaining filters (date range, practice area, signal
type, search) stay feed-only and personal to each viewer.

## Data pipeline

Signal data lives in Postgres (Neon, connected via Vercel's native integration), not in the JS bundle. Architecture:

- **`GET /api/signals`** — the frontend fetches this at runtime instead of importing a static file.
- **`POST /api/ingest`** — pulls Google News RSS for a watchlist of tracked entities/topics (`api/_lib/watchlist.js`), dedupes against existing rows, normalizes new items into the schema via a Claude API call (`api/_lib/normalize.js`), attributes them to AE patches (`api/_lib/matchAccounts.js`), and inserts them. Triggered on a daily cron (`vercel.json`), protected by `CRON_SECRET`.
- **`db/migrations/001_create_signals.sql`** — the `signals` table schema.
- **`db/seed.mjs`** — one-time migration of the old static dataset into Postgres (skips the placeholder `example.com` entries).

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
  "signalType": "see shared/signalTypes.js for the canonical list",
  "practiceArea": "cx | ex | market_research — see shared/practiceAreas.js",
  "origin": "seed | news | community",
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
3. **Run the migrations**: open the Neon/Postgres query editor in the Vercel dashboard and run each file in `db/migrations/` in order (`001_...` through `005_...` as of this writing — check the directory for the current last one).
4. **Seed existing data**: locally, `vercel env pull .env.local`, then `node --env-file=.env.local db/seed.mjs`.
5. **Backfill patch attribution** on rows that predate migration 005: `node --env-file=.env.local db/backfill-patches.mjs`. Safe to re-run; pass `--all` to re-tag everything after changing the territory book or the patch definitions.
6. **Verify ingestion manually before trusting the cron**: `curl -H "Authorization: Bearer $CRON_SECRET" https://<your-deploy>/api/ingest` and check the response summary (`queried`, `rawItems`, `afterDedupe`, `normalized`, `inserted`, `accountMatched`, `errors`).

Not yet verified end-to-end (blocked by this dev environment's network policy, needs checking against a real deploy): the Google News RSS fetch and redirect-resolution, and actual Claude normalization output quality. Also worth knowing: Vercel Hobby plan cron jobs are capped at once/day and function execution time is capped — `vercel.json` requests `maxDuration: 60` for `/api/ingest`, but if the watchlist or `MAX_ITEMS_PER_RUN` (25) turns out too slow for your plan's actual limits, trim either in `api/_lib/watchlist.js` / `api/ingest.js`. Watch the first few post-deploy `summary` responses from `/api/ingest` closely for this.

On watchlist size: a run queries the 58 standing thematic queries plus a rotating slice of named territory accounts (25 customers + 10 prospects), so ~93 per run, up from ~70. `api/_lib/fetchNews.js`'s fetch concurrency is 10. The territory book has ~1,700 accounts and the cron runs daily, so they can't all be queried by name every run — customers cycle every few days, prospects far more slowly, and the thematic patch tagging is what gives prospects their real coverage. The two per-run constants at the top of `api/_lib/watchlist.js` are the dials.

Also watch `accountMatched` in the ingest summary. If it sits at zero run after run, the watchlist and the territory book have drifted apart and the patch views are running on thematic tags alone. That is exactly what had happened before the territory book was wired in: the hand-written account watchlist tracked the ANZ enterprise majors (CBA, NAB, Westpac, Telstra, Qantas, Woolworths) and not one of them appears in any of the four AEs' territories, which are corporate/mid-market.

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
