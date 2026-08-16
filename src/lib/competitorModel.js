import { matchCompetitor, COMPETITORS } from "../../shared/competitors.js"
import { rollupSentence } from "./accountModel.js"

// The competitor layer — deliberately separate from accountModel.js's
// deriveAccounts(). An account is a company you could sell into; a
// competitor is a company whose news you read for a completely different
// reason (how to position against them), and the two should never mix in
// the same list. deriveAccounts() already excludes every entity in
// shared/competitors.js for exactly this reason — this module is where
// those signals actually belong.

const DAY_MS = 24 * 60 * 60 * 1000

function parseDate(dateString) {
  return new Date(`${dateString}T00:00:00`)
}

// Same recency-decay shape as scoreAccount() in accountModel.js (21-day
// half-life), but there's no "relevance" component here — relevance is
// about how good an outreach trigger a signal is, which has no meaning
// for a competitor. What matters for a competitor is simply how much is
// happening with them lately, so "activity" is recency-weighted volume
// alone.
function recencyWeight(date, now) {
  const days = Math.max(0, (now - date) / DAY_MS)
  return Math.pow(0.5, days / 21)
}

export function deriveCompetitors(signals, now = Date.now()) {
  const byKey = new Map()

  for (const signal of signals) {
    const competitor = matchCompetitor(signal.entity)
    if (!competitor) continue

    const key = competitor.name.toLowerCase()
    let entry = byKey.get(key)
    if (!entry) {
      entry = { key, name: competitor.name, practiceArea: competitor.practiceArea, signals: [] }
      byKey.set(key, entry)
    }
    entry.signals.push(signal)
  }

  // Every tracked competitor gets a row even at zero signals — a
  // competitor with nothing new is still worth seeing on the page (it
  // says "nothing to update your positioning on this one right now"),
  // the same way SIGNAL_GROUPS tabs show a zero count rather than
  // disappearing.
  for (const competitor of COMPETITORS) {
    const key = competitor.name.toLowerCase()
    if (!byKey.has(key)) {
      byKey.set(key, { key, name: competitor.name, practiceArea: competitor.practiceArea, signals: [] })
    }
  }

  return [...byKey.values()]
    .map((entry) => {
      const sorted = [...entry.signals].sort((a, b) => (a.date < b.date ? 1 : -1))
      const activity = sorted.reduce((sum, s) => sum + recencyWeight(parseDate(s.date).getTime(), now), 0)
      return {
        key: entry.key,
        name: entry.name,
        practiceArea: entry.practiceArea,
        signals: sorted,
        signalCount: sorted.length,
        lastSignalDate: sorted[0]?.date ?? null,
        activity,
        rollup: sorted.length ? rollupSentence(sorted) : "Nothing new tracked yet",
      }
    })
    .sort((a, b) => b.activity - a.activity || b.signalCount - a.signalCount)
}

export function findCompetitor(competitors, key) {
  return competitors.find((c) => c.key === key) ?? null
}
