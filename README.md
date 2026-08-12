# SDR Dashboard

A single-page competitor and industry news/signal intelligence dashboard, built with React, Vite, and Tailwind CSS v4.

## What it does

- KPI summary row (total signals, weekly trend, regulatory/pain-point signals, entities tracked) with sparklines
- 30-day macro vs. micro signal volume chart
- Main feed ranked by LLM-scored outreach relevance (not just recency), one-line collapsed summaries that expand on click
- Tabbed, filterable signal queue (All / Macro / Micro) with quick filter pills (High Relevance, This Week, Regulatory & Pain Points, Leadership Moves, Competitor Moves)
- Per-signal quick actions: copy to clipboard, mark reviewed (durable — backed by Postgres, not localStorage)
- Right-rail activity stream + rule-based weekly highlights (most active entity, leading signal type, regulatory pressure)
- Sidebar filters by date range, scope (macro/micro), entity, and signal type — filters combine
- Global search plus a `Cmd/Ctrl+K` command palette for fast lookup and quick actions
- Full dark / light theme support (persisted to `localStorage`, defaults to system preference)

## Data pipeline

Signal data lives in Postgres (Neon, connected via Vercel's native integration), not in the JS bundle. Architecture:

- **`GET /api/signals`** — the frontend fetches this at runtime instead of importing a static file.
- **`POST /api/ingest`** — pulls Google News RSS for a watchlist of tracked entities/topics (`api/_lib/watchlist.js`), dedupes against existing rows, normalizes new items into the schema via a Claude API call (`api/_lib/normalize.js`), and inserts them. Triggered on a daily cron (`vercel.json`), protected by `CRON_SECRET`.
- **`db/migrations/`** — schema, applied in order (001 core table, 002 `outreach_relevance`, 003 `reviewed_at`).
- **`db/seed.mjs`** — one-time migration of the old static dataset into Postgres (skips the placeholder `example.com` entries).
- **`db/backfill-relevance.mjs`** — one-time relevance scoring pass for rows that predate ingest-time scoring.
- **`POST /api/reviews`** — durable "Mark Reviewed" state, `{ids, reviewed}` bulk update.

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
  "origin": "seed | news | community",
  "outreachRelevance": "integer 1-5, or null if not yet scored",
  "reviewed": "boolean"
}
```

### One-time setup (required before this works)

1. **Connect Postgres**: Vercel dashboard → your project → Storage → Connect Database → choose Neon (or Vercel Marketplace → Neon) → Connect to Project. This injects `DATABASE_URL` automatically — no secret to copy/paste.
2. **Set env vars** (Vercel dashboard → Project → Settings → Environment Variables):
   - `ANTHROPIC_API_KEY` — used by the ingest pipeline's normalization step.
   - `CRON_SECRET` — any random string you generate; Vercel automatically sends it as `Authorization: Bearer $CRON_SECRET` when invoking the cron job, and `/api/ingest` checks it matches.
3. **Run the migration**: open the Neon/Postgres query editor in the Vercel dashboard and run the contents of `db/migrations/001_create_signals.sql`.
4. **Seed existing data**: locally, `vercel env pull .env.local`, then `node --env-file=.env.local db/seed.mjs`.
5. **Verify ingestion manually before trusting the cron**: `curl -H "Authorization: Bearer $CRON_SECRET" https://<your-deploy>/api/ingest` and check the response summary (`queried`, `rawItems`, `afterDedupe`, `normalized`, `inserted`, `errors`).

Verified live against a real deployment and database: RSS fetch, redirect resolution, Claude normalization, and relevance scoring all confirmed working. Worth knowing: Vercel Hobby plan cron jobs are capped at once/day and function execution time is capped — `vercel.json` requests `maxDuration: 60` for `/api/ingest`, but if the watchlist (currently 39 queries) or `MAX_ITEMS_PER_RUN` (25) turns out too slow for your plan's actual limits, trim either in `api/_lib/watchlist.js` / `api/ingest.js`.

**Preview deployments use an isolated Neon database branch** (configured when the Postgres integration was connected). Any new migration needs running on *both* the production and preview branches, or the preview deployment will 500 on a missing column until it's caught up — this has bitten twice already. Worth turning off Preview branching to remove the recurring foot-gun if you don't specifically need isolated preview data.

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
