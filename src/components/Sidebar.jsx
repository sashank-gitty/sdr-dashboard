import { useState } from "react"
import { pillClassForScope, pillClassForSignalType, pillClassForPracticeArea, PRACTICE_AREA_LABELS } from "../lib/colors.js"

const DATE_RANGES = [
  { value: "7", label: "7d" },
  { value: "30", label: "30d" },
  { value: "90", label: "90d" },
  { value: "all", label: "All" },
]

function swatchClassFor(colorFor, option) {
  if (!colorFor) return null
  const classes = colorFor(option)
  const bgMatch = classes.match(/(?:^|\s)(bg-\S+)/)
  return bgMatch ? bgMatch[1].replace("/10", "") : "bg-slate-400"
}

const SEARCHABLE_THRESHOLD = 8

function FilterSection({ title, options, selected, onToggle, colorFor, labelFor }) {
  const [open, setOpen] = useState(
    () => typeof window === "undefined" || window.innerWidth > 900,
  )
  const [query, setQuery] = useState("")

  const showSearch = options.length > SEARCHABLE_THRESHOLD
  const visibleOptions = showSearch && query.trim()
    ? options.filter((o) => o.toLowerCase().includes(query.trim().toLowerCase()))
    : options

  return (
    <div className="border-b border-slate-200 py-3 dark:border-zinc-800">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 text-left text-sm font-semibold text-slate-700 dark:text-zinc-200"
      >
        <span className={`inline-block text-[10px] text-slate-400 transition-transform duration-200 ease-spring dark:text-zinc-500 ${open ? "rotate-90" : ""}`}>
          &#9656;
        </span>
        <span className="flex-1">{title}</span>
        {selected.length > 0 && (
          <span className="rounded-full bg-indigo-500/10 px-1.5 py-0.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
            {selected.length}
          </span>
        )}
      </button>

      {open && (
        <div className="mt-2">
          {showSearch && (
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Filter ${title.toLowerCase()}...`}
              className="mb-1.5 w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-indigo-500"
            />
          )}
          <div className="flex max-h-56 flex-col gap-0.5 overflow-y-auto scrollbar-thin">
            {visibleOptions.length === 0 ? (
              <p className="px-1.5 py-1 text-xs text-slate-400 dark:text-zinc-500">No matches.</p>
            ) : (
              visibleOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-[13px] text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800/80"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() => onToggle(option)}
                    className="h-3.5 w-3.5 flex-shrink-0 accent-indigo-600"
                  />
                  {colorFor && (
                    <span className={`h-2 w-2 flex-shrink-0 rounded-full ${swatchClassFor(colorFor, option)}`} />
                  )}
                  <span className={labelFor ? "truncate" : "truncate capitalize"}>
                    {labelFor ? labelFor(option) : option}
                  </span>
                </label>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Sidebar({
  dateRange,
  onDateRangeChange,
  practiceAreaOptions,
  scopeOptions,
  entityOptions,
  signalTypeOptions,
  practiceAreaFilter,
  scopeFilter,
  entityFilter,
  signalTypeFilter,
  onTogglePracticeArea,
  onToggleScope,
  onToggleEntity,
  onToggleSignalType,
  onClearAll,
}) {
  const activeCount =
    practiceAreaFilter.length + scopeFilter.length + entityFilter.length + signalTypeFilter.length

  return (
    <aside className="flex h-full flex-col gap-1 overflow-y-auto border-r border-slate-200 bg-white/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/40 lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)]">
      <div className="mb-1 flex items-center gap-2 pb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Filters</span>
        {activeCount > 0 && (
          <span className="rounded-full bg-indigo-500/10 px-1.5 py-0.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
            {activeCount} active
          </span>
        )}
        <button
          type="button"
          onClick={onClearAll}
          disabled={activeCount === 0}
          className="ml-auto rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900 disabled:cursor-default disabled:opacity-40 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
        >
          Clear all
        </button>
      </div>

      <div className="border-b border-slate-200 pb-3 dark:border-zinc-800">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Date Range</p>
        <div className="flex overflow-hidden rounded-md border border-slate-200 dark:border-zinc-800">
          {DATE_RANGES.map((range) => (
            <button
              key={range.value}
              type="button"
              onClick={() => onDateRangeChange(range.value)}
              className={`flex-1 py-1.5 text-xs font-semibold transition-colors ${
                dateRange === range.value
                  ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <FilterSection
        title="Practice Area"
        options={practiceAreaOptions}
        selected={practiceAreaFilter}
        onToggle={onTogglePracticeArea}
        colorFor={pillClassForPracticeArea}
        labelFor={(v) => PRACTICE_AREA_LABELS[v] ?? v}
      />

      <FilterSection
        title="Scope"
        options={scopeOptions}
        selected={scopeFilter}
        onToggle={onToggleScope}
        colorFor={pillClassForScope}
      />

      <FilterSection
        title="Signal Type"
        options={signalTypeOptions}
        selected={signalTypeFilter}
        onToggle={onToggleSignalType}
        colorFor={pillClassForSignalType}
      />

      <FilterSection
        title="Entity"
        options={entityOptions}
        selected={entityFilter}
        onToggle={onToggleEntity}
      />
    </aside>
  )
}

export default Sidebar
