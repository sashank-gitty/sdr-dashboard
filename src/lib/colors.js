// Semantic pill styling. Every signal type is assigned an intentional
// accent rather than an arbitrary one: rose is reserved exclusively for
// the highest-urgency category (regulation / pain point — signals that
// need a reaction), amber/orange read as notable-but-lower-urgency
// pressure (new entrant, restructure), emerald/teal reads as a positive
// business signal, indigo/violet as a strategic/primary shift, and
// slate/cyan/sky/fuchsia round out the remaining neutral-to-notable
// categories. Classes are full literal strings (not built by concatenation)
// so Tailwind's scanner picks them up. Rose is intentionally not reused
// anywhere else in this map — see REGULATORY_ACCENT below, which is the
// single source of truth this same rose is pulled from in the KPI tile,
// the highlights rail, and each feed card's persistent accent border.
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
  "new entrant": "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
  restructure: "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400",
  regulation: "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",
  "pain point": "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",
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

// Practice area (see shared/practiceAreas.js): a third, independent
// dimension alongside scope and signal type, so CX/EX/Market Research
// stay visually distinct from both the severity accent (rose, reserved
// for regulatory) and the relevance accent (indigo) introduced earlier.
const PRACTICE_AREA_STYLES = {
  cx: "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400",
  ex: "bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400",
  market_research: "bg-teal-500/10 text-teal-600 border-teal-500/20 dark:text-teal-400",
}

export const PRACTICE_AREA_LABELS = {
  cx: "CX",
  ex: "EX",
  market_research: "Market Research",
}

// AE patch (see shared/patches.js) — the territory dimension. Rose and
// indigo are deliberately absent: both are already spoken for as the
// severity and relevance accents, and a patch is a neutral fact about
// which rep owns a signal, never a statement about its urgency.
const PATCH_STYLES = {
  fsi: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  tmt: "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400",
  goods_services: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
  hcls: "bg-teal-500/10 text-teal-600 border-teal-500/20 dark:text-teal-400",
  locations: "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20 dark:text-fuchsia-400",
  public_sector: "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-zinc-400 dark:border-zinc-500/20",
}

export { PATCH_LABELS } from "../../shared/patches.js"

export function pillClassForPatch(patch) {
  return `${PILL_BASE} ${PATCH_STYLES[patch] ?? PATCH_STYLES.public_sector}`
}

// A signal that names an account someone actually owns is the strongest
// thing in the feed, so it gets emerald (an existing relationship, a
// renewal or expansion angle) or amber (a named prospect, a net-new
// angle) rather than another neutral grey pill.
const ACCOUNT_STATUS_STYLES = {
  customer: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  prospect: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
}

export function pillClassForAccountStatus(status) {
  return `${PILL_BASE} ${ACCOUNT_STATUS_STYLES[status] ?? ACCOUNT_STATUS_STYLES.prospect}`
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

export function pillClassForPracticeArea(practiceArea) {
  return `${PILL_BASE} ${PRACTICE_AREA_STYLES[practiceArea] ?? PRACTICE_AREA_STYLES.cx}`
}

// Used for chart strokes / dots where a hex value is required instead of a class.
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

// Legend copy for the color families above — grouped by the same intent
// described there, not a 1:1 per-signal-type listing (that already exists
// in the Signal Type filter checklist, swatch and all).
export const SIGNAL_TYPE_COLOR_LEGEND = [
  { swatch: "bg-rose-500", label: "Highest urgency — needs a reaction", examples: "regulation, pain point" },
  { swatch: "bg-emerald-500", label: "Positive business signal", examples: "funding, earnings, partnership" },
  { swatch: "bg-amber-500", label: "Notable pressure", examples: "new entrant, restructure" },
  { swatch: "bg-indigo-500", label: "Strategic / primary shift", examples: "leadership change, digital transformation" },
  { swatch: "bg-sky-500", label: "Other market signal", examples: "product launch, research shift, analyst report, market shift, brand move" },
]

export const SCOPE_COLOR_LEGEND = [
  { swatch: "bg-indigo-500", label: "Micro", examples: "account-level signal" },
  { swatch: "bg-slate-400", label: "Macro", examples: "market-level signal" },
]

export const PRACTICE_AREA_COLOR_LEGEND = [
  { swatch: "bg-sky-500", label: "Customer Experience", examples: "journey analytics, contact center, digital CX" },
  { swatch: "bg-violet-500", label: "Employee Experience", examples: "engagement, lifecycle, workplace culture" },
  { swatch: "bg-teal-500", label: "Market Research", examples: "synthetic data, UX/UI testing, video feedback, brand tracking" },
]

export const PATCH_COLOR_LEGEND = [
  { swatch: "bg-emerald-500", label: "FSI", examples: "banks, insurers, super, wealth, fintech, professional services" },
  { swatch: "bg-sky-500", label: "TMT", examples: "software, telco, media" },
  { swatch: "bg-amber-500", label: "Goods & Services", examples: "FMCG, mining, energy, agriculture, manufacturing, transport" },
  { swatch: "bg-teal-500", label: "HCLS", examples: "hospitals, aged care, pharma, biotech" },
  { swatch: "bg-fuchsia-500", label: "Locations", examples: "retail, hospitality, travel, property" },
  { swatch: "bg-slate-400", label: "Public Sector", examples: "government, agencies, defence, public education" },
]
