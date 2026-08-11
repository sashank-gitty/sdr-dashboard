# SDR Dashboard

A single-page competitor and industry news dashboard, built with React and Vite.

## What it does

- Card-based feed of news/signal items, newest first
- Filter by scope (macro/micro), entity, and signal type — filters combine
- Search box filters by headline and summary text
- Live count of visible items

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
