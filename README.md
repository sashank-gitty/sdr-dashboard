# SDR Dashboard

A single-page competitor and industry news/signal intelligence dashboard, built with React, Vite, and Tailwind CSS v4.

## What it does

- KPI summary row (total signals, weekly trend, regulatory/pain-point signals, entities tracked) with sparklines
- 30-day macro vs. micro signal volume chart
- Tabbed, filterable signal queue (All / Macro / Micro) with quick filter pills (This Week, Regulatory & Pain Points, Leadership Moves, Competitor Moves)
- Per-signal quick actions: copy to clipboard, mark reviewed
- Right-rail activity stream + rule-based weekly highlights (most active entity, leading signal type, regulatory pressure)
- Sidebar filters by date range, scope (macro/micro), entity, and signal type — filters combine
- Global search plus a `Cmd/Ctrl+K` command palette for fast lookup and quick actions
- Full dark / light theme support (persisted to `localStorage`, defaults to system preference)

## Data

All content lives in `src/data/data.json`. Each item follows this shape:

```json
{
  "id": "unique-string",
  "headline": "string",
  "summary": "string, 2-3 sentences",
  "sourceUrl": "https://...",
  "date": "YYYY-MM-DD",
  "scope": "macro or micro",
  "entity": "string",
  "signalType": "funding | leadership change | product launch | hiring | partnership | pain point | earnings | regulation"
}
```

To add new items, edit that file — the app reads it directly, no build step required.

## Development

```
npm install
npm run dev
```

## Build

```
npm run build
```

Outputs a static site to `dist/`, ready to deploy on Vercel.
