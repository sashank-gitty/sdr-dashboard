// Semantic pill styling. Every signal type is assigned an intentional
// accent rather than an arbitrary one: emerald/teal reads as a positive
// business signal, amber/orange as pressure or urgency worth acting on,
// rose as competitive threat, indigo/violet as a strategic/primary shift,
// and slate/cyan/sky/fuchsia round out the remaining neutral-to-notable
// categories. Classes are full literal strings (not built by concatenation)
// so Tailwind's scanner picks them up.
const PILL_BASE = "border"

const SIGNAL_TYPE_STYLES = {
  funding: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  earnings: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  partnership: "bg-teal-500/10 text-teal-600 border-teal-500/20 dark:text-teal-400",
  "product launch": "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400",
  "research shift": "bg-cyan-500/10 text-cyan-600 border-cyan-500/20 dark:text-cyan-400",
  "analyst report": "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-zinc-400 dark:border-zinc-500/20",
  "market shift": "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-zinc-400 dark:border-zinc-500/20",
  "brand move": "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20 dark:text-fuchsia-400",
  "leadership change": "bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400",
  "digital transformation": "bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400",
  "new entrant": "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",
  restructure: "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400",
  regulation: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
  "pain point": "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
}

const FALLBACK_STYLES = [
  "bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400",
  "bg-teal-500/10 text-teal-600 border-teal-500/20 dark:text-teal-400",
  "bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400",
  "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400",
]

const SCOPE_STYLES = {
  macro: "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-zinc-400 dark:border-zinc-500/20",
  micro: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400",
}

function hashString(value) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function pillClassForSignalType(signalType) {
  const known = SIGNAL_TYPE_STYLES[signalType]
  if (known) return `${PILL_BASE} ${known}`
  return `${PILL_BASE} ${FALLBACK_STYLES[hashString(signalType) % FALLBACK_STYLES.length]}`
}

export function pillClassForScope(scope) {
  return `${PILL_BASE} ${SCOPE_STYLES[scope] ?? SCOPE_STYLES.macro}`
}

// Used for chart strokes / dots where a hex value is required instead of a class.
export const SCOPE_HEX = {
  macro: "#64748b",
  micro: "#6366f1",
}
