import { groupForSignal, groupLabel } from "./signalGroups.js"
import { HIGH_RELEVANCE_THRESHOLD } from "./relevance.js"

// The account layer.
//
// The reference product is account-centric: an account is the primary
// object and signals hang off it. This pipeline is signal-centric —
// signals are primary and accounts are a derived tag. Rather than
// re-ingest anything, this module inverts the existing data: every signal
// already carries matchedAccounts (territory-book hits), entity (the
// company or topic it's about), owningAes, accountStatus and patches,
// which is everything an account rollup needs.
//
// Two kinds of account come out of this:
//
//   managed   — the signal matched the territory book, so a real AE owns
//               it. matchedAccounts is the authority.
//   unmanaged — no book match, but the signal is micro-scope and names a
//               company. This is the whitespace the Unassigned coverage
//               switch already surfaces, promoted to a first-class row so
//               it can be opened, scored and worked like any other account.
//
// Macro signals ("the Australian retail sector") name no company and
// therefore produce no account at all — they stay in the feed as market
// context and are attributed to accounts only through patch tagging.

const DAY_MS = 24 * 60 * 60 * 1000

function parseDate(dateString) {
  return new Date(`${dateString}T00:00:00`)
}

// The account key has to agree with the ingest pipeline's
// normalizeAccountName() or the same company would split into two rows
// (one from a book match, one from the entity string). Kept in sync
// deliberately: lowercase, strip punctuation and the common ANZ company
// suffixes, collapse whitespace.
const COMPANY_SUFFIXES =
  /\b(pty|ltd|limited|inc|incorporated|corp|corporation|llc|plc|group|holdings|australia|australian|nz|new zealand)\b/g

export function accountKey(name) {
  return String(name)
    .toLowerCase()
    // Parenthetical qualifiers are dropped before anything else: entity
    // strings arrive as "NICE (CXone)" and "Nielsen (NIQ)" alongside bare
    // "NICE" and "Nielsen" for the same company, and keeping the
    // parenthetical would file one company under two accounts. Ticker and
    // brand qualifiers are the only thing that appears in parens here.
    .replace(/\([^)]*\)/g, " ")
    .replace(/[.,'"&]/g, " ")
    .replace(COMPANY_SUFFIXES, " ")
    .replace(/\s+/g, " ")
    .trim()
}

// Which account names a signal should be filed under. A book match wins
// outright — it's the precision-first path and carries the owning AE. A
// micro signal with no match still names a company worth tracking, so it
// files under its entity. A macro signal files under nothing.
function accountNamesFor(signal) {
  const matched = signal.matchedAccounts ?? []
  if (matched.length) return matched
  if (signal.scope === "micro" && signal.entity) return [signal.entity]
  return []
}

// Recency decay: a signal from today counts fully, one from 90 days ago
// counts for almost nothing. Half-life of ~21 days, which lines up with
// how long an outreach trigger stays worth mentioning on a call.
function recencyWeight(date, now) {
  const days = Math.max(0, (now - date) / DAY_MS)
  return Math.pow(0.5, days / 21)
}

// A 0-100 account score, mirroring how the reference product leads its
// account table with a single number.
//
// Three things decide it, in the order a rep would weigh them:
//   relevance (55%) — the best outreach trigger this account has produced,
//                     using the same 1-5 rubric the feed already ranks on
//   recency   (30%) — how warm the account is right now
//   volume    (15%) — sustained activity, capped so one noisy account
//                     can't run away with the top of the table
//
// Deliberately not a black box: scoreBreakdown() returns the three parts
// so the account page can show its working rather than an unexplained
// number.
export function scoreAccount(signals, now = Date.now()) {
  if (!signals.length) return { score: 0, relevance: 0, recency: 0, volume: 0 }

  // Unscored rows count as the neutral mid-tier 3, matching how the feed
  // sort treats them. Scoring them 0 instead would be a statement that
  // the account is a bad prospect, when the truth is only that the row
  // predates relevance scoring — and with most of a seed dataset
  // unscored, that mistake drags every account to the bottom of the
  // table at once and makes the whole column look broken.
  const maxRelevance = Math.max(...signals.map((s) => s.outreachRelevance ?? 3))
  const relevance = Math.min(1, maxRelevance / 5)

  const newest = Math.max(...signals.map((s) => parseDate(s.date).getTime()))
  const recency = recencyWeight(newest, now)

  // Weighted by recency so a burst of activity last week counts for more
  // than the same burst last quarter.
  const weighted = signals.reduce((sum, s) => sum + recencyWeight(parseDate(s.date).getTime(), now), 0)
  const volume = Math.min(1, weighted / 8)

  const score = Math.round(100 * (0.55 * relevance + 0.3 * recency + 0.15 * volume))
  return { score: Math.max(0, Math.min(100, score)), relevance, recency, volume }
}

export const PRIORITY_TIERS = [
  { id: "p1", label: "P1", min: 80 },
  { id: "p2", label: "P2", min: 55 },
  { id: "p3", label: "P3", min: 25 },
  { id: "none", label: "No Priority", min: 0 },
]

export function priorityFor(score) {
  return PRIORITY_TIERS.find((tier) => score >= tier.min) ?? PRIORITY_TIERS[PRIORITY_TIERS.length - 1]
}

// The plain-English rollup under an account's name in the feed —
// "Featured in media mentioning Revenue, opened roles mentioning CEO, and
// published a document" in the reference product. Built from the groups
// actually present rather than a template, and capped at three clauses so
// a busy account doesn't produce a paragraph.
export function rollupSentence(signals) {
  if (!signals.length) return "No recent signals"

  const counts = new Map()
  for (const signal of signals) {
    const id = groupForSignal(signal)
    counts.set(id, (counts.get(id) ?? 0) + 1)
  }

  const phrases = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, count]) => {
      const label = groupLabel(id).toLowerCase()
      return count === 1 ? `1 ${label} signal` : `${count} ${label} signals`
    })

  if (phrases.length === 1) return capitalize(phrases[0])
  if (phrases.length === 2) return capitalize(`${phrases[0]} and ${phrases[1]}`)
  return capitalize(`${phrases[0]}, ${phrases[1]}, and ${phrases[2]}`)
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

// Builds the full account list from a signal array. O(n) over signals
// plus a sort, so it's cheap enough to run inside a useMemo on every
// filter change rather than being cached separately.
export function deriveAccounts(signals, now = Date.now()) {
  const byKey = new Map()

  for (const signal of signals) {
    for (const name of accountNamesFor(signal)) {
      const key = accountKey(name)
      if (!key) continue

      let account = byKey.get(key)
      if (!account) {
        account = {
          key,
          name,
          signals: [],
          patches: new Set(),
          aes: new Set(),
          status: null,
          managed: false,
        }
        byKey.set(key, account)
      }

      account.signals.push(signal)
      for (const patch of signal.patches ?? []) account.patches.add(patch)
      for (const ae of signal.owningAes ?? []) account.aes.add(ae)

      // A book match anywhere upgrades the account to managed, and its
      // canonical (book) name wins over an entity string scraped from a
      // headline — "CBA" and "Commonwealth Bank of Australia" should
      // present under one name, and the book's is the right one.
      if ((signal.matchedAccounts ?? []).includes(name)) {
        account.managed = true
        account.name = name
        if (signal.accountStatus) account.status = signal.accountStatus
      }
    }
  }

  return [...byKey.values()]
    .map((account) => {
      const sorted = [...account.signals].sort((a, b) => (a.date < b.date ? 1 : -1))
      const breakdown = scoreAccount(sorted, now)
      const highRelevanceCount = sorted.filter(
        (s) => (s.outreachRelevance ?? 0) >= HIGH_RELEVANCE_THRESHOLD,
      ).length

      return {
        key: account.key,
        name: account.name,
        signals: sorted,
        signalCount: sorted.length,
        highRelevanceCount,
        unreviewedCount: sorted.filter((s) => !s.reviewed).length,
        patches: [...account.patches],
        aes: [...account.aes],
        status: account.status ?? (account.managed ? "prospect" : null),
        managed: account.managed,
        firstSeen: sorted[sorted.length - 1]?.date ?? null,
        lastSignalDate: sorted[0]?.date ?? null,
        score: breakdown.score,
        scoreBreakdown: breakdown,
        priority: priorityFor(breakdown.score),
        rollup: rollupSentence(sorted),
      }
    })
    .sort((a, b) => b.score - a.score || b.signalCount - a.signalCount)
}

export function findAccount(accounts, key) {
  return accounts.find((account) => account.key === key) ?? null
}
