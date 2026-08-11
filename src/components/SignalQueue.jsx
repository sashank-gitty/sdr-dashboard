import { useMemo, useState } from "react"
import SignalRow from "./SignalRow.jsx"
import SkeletonRow from "./SkeletonRow.jsx"

const TABS = [
  { id: "all", label: "All Signals" },
  { id: "macro", label: "Macro" },
  { id: "micro", label: "Micro" },
]

const COMPETITOR_SIGNAL_TYPES = new Set(["product launch", "new entrant", "brand move"])
const RISK_SIGNAL_TYPES = new Set(["regulation", "pain point"])

const PILLS = [
  { id: "all", label: "All" },
  { id: "this-week", label: "This Week" },
  { id: "regulatory", label: "Regulatory & Pain Points" },
  { id: "leadership", label: "Leadership Moves" },
  { id: "competitor", label: "Competitor Moves" },
]

function daysBetween(a, b) {
  return Math.round((a.getTime() - b.getTime()) / (24 * 60 * 60 * 1000))
}

function SignalQueue({ items, today, reviewedIds, onToggleReviewed, loading }) {
  const [activeTab, setActiveTab] = useState("all")
  const [activePill, setActivePill] = useState("all")

  const tabCounts = useMemo(
    () => ({
      all: items.length,
      macro: items.filter((i) => i.scope === "macro").length,
      micro: items.filter((i) => i.scope === "micro").length,
    }),
    [items],
  )

  const tabFiltered = useMemo(
    () => (activeTab === "all" ? items : items.filter((i) => i.scope === activeTab)),
    [items, activeTab],
  )

  const pillFiltered = useMemo(() => {
    switch (activePill) {
      case "this-week":
        return tabFiltered.filter((i) => daysBetween(today, new Date(`${i.date}T00:00:00`)) <= 6)
      case "regulatory":
        return tabFiltered.filter((i) => RISK_SIGNAL_TYPES.has(i.signalType))
      case "leadership":
        return tabFiltered.filter((i) => i.signalType === "leadership change")
      case "competitor":
        return tabFiltered.filter((i) => COMPETITOR_SIGNAL_TYPES.has(i.signalType))
      default:
        return tabFiltered
    }
  }, [tabFiltered, activePill, today])

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-1 border-b border-slate-200 dark:border-zinc-800">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-3 py-2 text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            {tab.label}{" "}
            <span className="font-mono text-xs tabular-nums text-slate-400 dark:text-zinc-500">
              ({tabCounts[tab.id]})
            </span>
            {activeTab === tab.id && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-indigo-500" />
            )}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {PILLS.map((pill) => (
          <button
            key={pill.id}
            type="button"
            onClick={() => setActivePill(pill.id)}
            className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
              activePill === pill.id
                ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
        ) : pillFiltered.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 py-10 text-center text-sm text-slate-400 dark:border-zinc-700 dark:text-zinc-500">
            No signals match the current filters.
          </p>
        ) : (
          pillFiltered.map((item) => (
            <SignalRow
              key={item.id}
              item={item}
              reviewed={reviewedIds.has(item.id)}
              onToggleReviewed={onToggleReviewed}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default SignalQueue
