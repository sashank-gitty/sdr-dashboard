import { useEffect, useMemo, useRef, useState } from "react"
import SignalRow from "./SignalRow.jsx"
import SkeletonRow from "./SkeletonRow.jsx"
import Checkbox from "./Checkbox.jsx"

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

function SignalQueue({
  items,
  today,
  reviewedIds,
  onToggleReviewed,
  onMarkManyReviewed,
  loading,
  activeTab,
  onTabChange,
  activePill,
  onPillChange,
  onClearEverything,
}) {
  const [selectedIds, setSelectedIds] = useState(() => new Set())
  const tabsRef = useRef(null)

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

  // Selection is scoped to what's currently visible — stale picks from a
  // previous filter shouldn't silently linger in the bulk-action count.
  useEffect(() => {
    setSelectedIds((prev) => {
      const visibleIds = new Set(pillFiltered.map((i) => i.id))
      const next = new Set([...prev].filter((id) => visibleIds.has(id)))
      return next.size === prev.size ? prev : next
    })
  }, [pillFiltered])

  const allVisibleSelected = pillFiltered.length > 0 && pillFiltered.every((i) => selectedIds.has(i.id))
  const someVisibleSelected = pillFiltered.some((i) => selectedIds.has(i.id))

  const toggleSelectAll = () => {
    setSelectedIds(allVisibleSelected ? new Set() : new Set(pillFiltered.map((i) => i.id)))
  }

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleBulkMarkReviewed = () => {
    onMarkManyReviewed([...selectedIds])
    setSelectedIds(new Set())
  }

  return (
    <div>
      <div ref={tabsRef} className="sticky top-[57px] z-20 -mx-1 mb-4 bg-slate-50/95 px-1 pt-1 backdrop-blur-sm dark:bg-zinc-950/95">
        <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 dark:border-zinc-800">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
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
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-indigo-500 transition-all duration-300 ease-spring" />
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 py-3">
          {PILLS.map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => onPillChange(pill.id)}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-200 ease-spring ${
                activePill === pill.id
                  ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                  : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
              }`}
            >
              {pill.label}
            </button>
          ))}

          {pillFiltered.length > 0 && (
            <div className="ml-auto flex items-center gap-2">
              <div
                onClick={toggleSelectAll}
                className="flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                <Checkbox checked={allVisibleSelected} indeterminate={!allVisibleSelected && someVisibleSelected} onChange={toggleSelectAll} label="Select all visible signals" />
                {selectedIds.size > 0 ? `${selectedIds.size} selected` : "Select all"}
              </div>
              {selectedIds.size > 0 && (
                <button
                  type="button"
                  onClick={handleBulkMarkReviewed}
                  className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 transition-colors hover:bg-emerald-500/20 dark:text-emerald-400"
                >
                  Mark {selectedIds.size} Reviewed
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
        ) : pillFiltered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-slate-300 py-12 text-center dark:border-zinc-700">
            <p className="text-sm text-slate-400 dark:text-zinc-500">No signals match the current filters.</p>
            <button
              type="button"
              onClick={onClearEverything}
              className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
            >
              Clear filters
            </button>
          </div>
        ) : (
          pillFiltered.map((item) => (
            <SignalRow
              key={item.id}
              item={item}
              reviewed={reviewedIds.has(item.id)}
              onToggleReviewed={onToggleReviewed}
              selected={selectedIds.has(item.id)}
              onToggleSelect={toggleSelectOne}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default SignalQueue
