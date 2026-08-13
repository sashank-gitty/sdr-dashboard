import { REGULATORY_SIGNAL_TYPES, HIGH_RELEVANCE_THRESHOLD } from "./relevance.js"
import { matchesAccountCoverage } from "./accountCoverage.js"

// One concise line answering "why is this worth acting on, and why here?" —
// the same per-item rationale Salesloft Rhythm and 6sense surface next to a
// prioritized action, rather than leaving the reader to infer it from a
// coloured bar. Draws only on fields already present on a signal, and its
// priority order deliberately mirrors the card's left accent border
// (severity → named account → whitespace → general relevance) so the written
// reason and the colour can never contradict each other.
//
// `tone` maps to the same governed accent families used everywhere else
// (see lib/colors.js): rose = highest urgency, emerald/amber = a named
// customer/prospect in the book, indigo = relevance or claimable whitespace,
// slate = background context.
export function buildSignalReason(item) {
  const rel = item.outreachRelevance ?? 0
  const matched = item.matchedAccounts ?? []
  const aes = item.owningAes ?? []
  const extra = matched.length > 1 ? ` +${matched.length - 1}` : ""
  const who = aes.length ? aes.join(" / ") : "your patch"

  // A company in someone's territory book being in the news today is the
  // whole point of the patch views, so it outranks every other reason.
  if (matched.length > 0) {
    if (item.accountStatus === "customer") {
      return { label: `Customer in the news — ${matched[0]}${extra} (${who})`, tone: "customer" }
    }
    return { label: `Prospect in the news — ${matched[0]}${extra} (${who})`, tone: "prospect" }
  }

  if (REGULATORY_SIGNAL_TYPES.has(item.signalType)) {
    return { label: "Regulatory / pain-point pressure — fastest path to a timely angle", tone: "urgent" }
  }

  // The inverse of a matched account, and just as worth acting on: a named
  // company in the news that nobody in the territory book owns yet.
  if (matchesAccountCoverage(item, "unassigned")) {
    return { label: "Named company, unowned — whitespace to claim", tone: "whitespace" }
  }

  if (rel >= HIGH_RELEVANCE_THRESHOLD) {
    return { label: "Strong, specific outreach trigger", tone: "relevant" }
  }
  if (rel === 3) {
    return { label: "Supporting context for a conversation already underway", tone: "neutral" }
  }
  return { label: "Background market intelligence", tone: "neutral" }
}

// Leading-dot / text colour per tone. Kept here rather than in the row so
// the reason line and any other consumer stay in lockstep.
export const REASON_TONE_STYLES = {
  urgent: { dot: "bg-rose-500", text: "text-rose-600 dark:text-rose-400" },
  customer: { dot: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" },
  prospect: { dot: "bg-amber-500", text: "text-amber-600 dark:text-amber-400" },
  whitespace: { dot: "bg-indigo-500", text: "text-indigo-600 dark:text-indigo-400" },
  relevant: { dot: "bg-indigo-500", text: "text-indigo-600 dark:text-indigo-400" },
  neutral: { dot: "bg-slate-400 dark:bg-zinc-600", text: "text-slate-500 dark:text-zinc-400" },
}
