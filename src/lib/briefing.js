import { HIGH_RELEVANCE_THRESHOLD } from "./relevance.js"

// Same solid hues colors.js tints to 10% for the patch pills, so the
// breakdown bars on the briefing page read as "the same fact, drawn
// bigger" rather than a second, disagreeing color scheme.
const PATCH_SWATCH = {
  fsi: "bg-emerald-500",
  tmt: "bg-sky-500",
  goods_services: "bg-amber-500",
  hcls: "bg-teal-500",
  locations: "bg-fuchsia-500",
  public_sector: "bg-slate-400",
}

function latestCreatedAt(signals) {
  return signals.reduce((max, s) => {
    if (!s.createdAt) return max
    const t = new Date(s.createdAt).getTime()
    return t > max ? t : max
  }, 0)
}

// Anchored to the feed's own most recent createdAt rather than the
// browser clock — the same trick lib/metrics.js uses for "today", so
// "new since yesterday" still reads sensibly if the cron missed a night
// or the page is opened well after a run, instead of silently going to
// zero.
export function computeBriefing(signals) {
  const anchor = latestCreatedAt(signals)
  const cutoff = anchor - 24 * 3600 * 1000

  const newSinceYesterday = signals
    .filter((s) => s.createdAt && new Date(s.createdAt).getTime() >= cutoff)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const highRelevance = signals.filter((s) => (s.outreachRelevance ?? 0) >= HIGH_RELEVANCE_THRESHOLD)
  const accountMatched = signals.filter((s) => (s.matchedAccounts ?? []).length > 0)
  const unreviewed = signals.filter((s) => !s.reviewed)

  const patchTally = new Map()
  for (const signal of signals) {
    for (const patch of signal.patches ?? []) {
      patchTally.set(patch, (patchTally.get(patch) ?? 0) + 1)
    }
  }
  const patchCounts = [...patchTally.entries()]
    .map(([patch, count]) => ({ patch, count, swatch: PATCH_SWATCH[patch] ?? "bg-slate-400" }))
    .sort((a, b) => b.count - a.count)

  return {
    total: signals.length,
    newSinceYesterday,
    highRelevance,
    accountMatched,
    unreviewed,
    patchCounts,
    anchor: anchor ? new Date(anchor) : null,
  }
}
