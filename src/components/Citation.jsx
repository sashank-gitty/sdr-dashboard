import { iconForSignal, groupForSignal } from "../lib/signalGroups.js"

// The citation badge — the single most load-bearing UI element on the
// account page.
//
// Every synthesized claim (a key insight, a value-pyramid bullet, a
// technology reference) is followed by one or more of these, each keyed
// to the signal it came from. Clicking one opens that signal in the
// drawer. That traceability is what separates a derived brief from a
// generated one: nothing on the page asserts anything the reader can't
// click through to the source of, so a rep can quote it on a call
// knowing exactly where it came from.
//
// Tinted by signal group so a dense run of them reads as a distribution
// (mostly hiring / mostly filings) before any number is read.
const GROUP_TONES = {
  news: "bg-sky-500/10 text-sky-700 hover:bg-sky-500/20 dark:text-sky-300",
  leadership: "bg-violet-500/10 text-violet-700 hover:bg-violet-500/20 dark:text-violet-300",
  earnings: "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-300",
  funding: "bg-teal-500/10 text-teal-700 hover:bg-teal-500/20 dark:text-teal-300",
  research: "bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 dark:text-amber-300",
  regulatory: "bg-rose-500/10 text-rose-700 hover:bg-rose-500/20 dark:text-rose-300",
  transformation: "bg-indigo-500/10 text-indigo-700 hover:bg-indigo-500/20 dark:text-indigo-300",
  community: "bg-pink-500/10 text-pink-700 hover:bg-pink-500/20 dark:text-pink-300",
  other: "bg-slate-500/10 text-slate-600 hover:bg-slate-500/20 dark:text-zinc-400",
}

export function CitationBadge({ signal, index, onOpen }) {
  const Icon = iconForSignal(signal)
  const tone = GROUP_TONES[groupForSignal(signal)] ?? GROUP_TONES.other

  return (
    <button
      type="button"
      onClick={() => onOpen(signal.id)}
      title={`${signal.headline} — ${signal.date}`}
      className={`ml-1 inline-flex translate-y-[-1px] items-center gap-0.5 rounded px-1 py-px align-middle text-[10px] font-semibold tabular-nums transition-colors ${tone}`}
    >
      {index}
      <Icon className="h-2.5 w-2.5" />
    </button>
  )
}

// A run of citations after a claim.
export function Citations({ signals, indexOf, onOpen }) {
  if (!signals?.length) return null
  return (
    <span className="whitespace-nowrap">
      {signals.map((signal) => (
        <CitationBadge key={signal.id} signal={signal} index={indexOf(signal)} onOpen={onOpen} />
      ))}
    </span>
  )
}
