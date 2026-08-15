import { REGULATORY_SIGNAL_TYPES } from "./relevance.js"

// Color is reserved for the few things that are genuinely a "look here
// first" signal — regulatory/pain-point urgency (rose), high relevance
// (indigo), and a matched account's customer/prospect status (emerald/
// amber). Everything else that used to be its own tinted pill (signal
// type, practice area, patch, scope) is now the same neutral
// bordered-text chip: with every metadata field independently colored,
// no single color meant anything — a page of rainbow pills reads as
// noise, not signal. Classes are full literal strings (not built by
// concatenation) so Tailwind's scanner picks them up.
const PILL_BASE = "border"

const NEUTRAL_PILL = "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-zinc-400 dark:border-zinc-500/20"
const REGULATORY_PILL = "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400"

export const PRACTICE_AREA_LABELS = {
  cx: "CX",
  ex: "EX",
  market_research: "Market Research",
}

export { PATCH_LABELS } from "../../shared/patches.js"

export function pillClassForPatch() {
  return `${PILL_BASE} ${NEUTRAL_PILL}`
}

// A signal that names an account someone actually owns is the strongest
// thing in the feed, so it gets emerald (an existing relationship, a
// renewal or expansion angle) or amber (a named prospect, a net-new
// angle) rather than another neutral grey pill. Kept colored deliberately
// — this is one of the few pills that's a real priority signal, not
// decoration.
const ACCOUNT_STATUS_STYLES = {
  customer: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  prospect: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
}

export function pillClassForAccountStatus(status) {
  return `${PILL_BASE} ${ACCOUNT_STATUS_STYLES[status] ?? ACCOUNT_STATUS_STYLES.prospect}`
}

// The one signal-type distinction worth a color: regulation / pain point
// is the highest-urgency category, and rose is reserved for it alone
// (see REGULATORY_ACCENT below, the same rose used for the feed card's
// left accent and reason-line dot). Every other signal type is neutral.
export function pillClassForSignalType(signalType) {
  if (REGULATORY_SIGNAL_TYPES.has(signalType)) return `${PILL_BASE} ${REGULATORY_PILL}`
  return `${PILL_BASE} ${NEUTRAL_PILL}`
}

export function pillClassForScope() {
  return `${PILL_BASE} ${NEUTRAL_PILL}`
}

export function pillClassForPracticeArea() {
  return `${PILL_BASE} ${NEUTRAL_PILL}`
}

// Used for chart strokes / dots where a hex value is required instead of
// a class (VolumeChart's macro/micro lines) — unrelated to the pill
// palette above, kept as its own two-color scale.
export const SCOPE_HEX = {
  macro: "#64748b",
  micro: "#6366f1",
}

// Single accent used everywhere Regulatory & Pain-Point needs to read as
// the highest-urgency category — the KPI tile, the highlights rail dot,
// and each feed card's persistent left accent all pull from this one
// object instead of hardcoding the color independently in three places.
export const REGULATORY_ACCENT = {
  swatch: "bg-rose-500",
  text: "text-rose-600 dark:text-rose-400",
  border: "border-rose-500/30 hover:border-rose-500/50 dark:border-rose-500/30 dark:hover:border-rose-500/50",
  borderLeft: "border-l-rose-500",
}
