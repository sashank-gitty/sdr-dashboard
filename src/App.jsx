import { useEffect, useMemo, useRef, useState } from "react"
import Sidebar from "./components/Sidebar.jsx"
import FilterDrawer from "./components/FilterDrawer.jsx"
import Header from "./components/Header.jsx"
import KpiGrid from "./components/KpiGrid.jsx"
import VolumeChart from "./components/VolumeChart.jsx"
import SignalQueue from "./components/SignalQueue.jsx"
import SignalDetailPanel from "./components/SignalDetailPanel.jsx"
import ActivityPanel from "./components/ActivityPanel.jsx"
import CommandPalette from "./components/CommandPalette.jsx"
import ErrorState from "./components/ErrorState.jsx"
import { useTheme } from "./lib/useTheme.js"
import { useLocalStorageState } from "./lib/useLocalStorageState.js"
import { useUrlState } from "./lib/useUrlState.js"
import { computeMetrics } from "./lib/metrics.js"
import { HIGH_RELEVANCE_THRESHOLD } from "./lib/relevance.js"
import { isQuickFilterActive, clearPatchFor } from "./lib/quickFilters.js"

const DATE_RANGE_DAYS = { "7": 7, "30": 30, "90": 90 }
const EMPTY_ARRAY = []

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

function App() {
  const { theme, toggleTheme } = useTheme()
  const searchInputRef = useRef(null)

  // Filters, search, tab-equivalents, and the open signal all live in the
  // URL now (Issue: none of this was bookmarkable or shareable before —
  // it lived only in component state or localStorage). Display prefs that
  // aren't "state someone else should be able to open via a link" —
  // sidebar collapsed, theme — stay in localStorage below.
  const [urlState, updateUrl] = useUrlState()

  const search = urlState.q ?? ""
  const dateRange = urlState.range ?? "all"
  const practiceAreaFilter = urlState.practice ?? EMPTY_ARRAY
  const scopeFilter = urlState.scope ?? EMPTY_ARRAY
  const entityFilter = urlState.entity ?? EMPTY_ARRAY
  const signalTypeFilter = urlState.type ?? EMPTY_ARRAY
  const relevanceOnly = urlState.relevance === "high"
  const unreviewedOnly = urlState.reviewed === "false"
  const openSignalId = urlState.signal ?? null

  const [sidebarOpen, setSidebarOpen] = useLocalStorageState("sdr-dashboard-sidebar-open", true)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [signals, setSignals] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setFetchError(null)

    fetch("/api/signals", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setSignals(data)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === "AbortError") return
        setFetchError(err.message || "Failed to load signals")
        setLoading(false)
      })

    return () => controller.abort()
  }, [reloadToken])

  useEffect(() => {
    function handleKey(e) {
      const isEditable = ["INPUT", "TEXTAREA"].includes(e.target.tagName)

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setPaletteOpen(true)
        return
      }

      if (e.key === "/" && !isEditable) {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  const practiceAreaOptions = useMemo(
    () => [...new Set(signals.map((item) => item.practiceArea))].sort(),
    [signals],
  )
  const entityOptions = useMemo(
    () => [...new Set(signals.map((item) => item.entity))].sort(),
    [signals],
  )
  const signalTypeOptions = useMemo(
    () => [...new Set(signals.map((item) => item.signalType))].sort(),
    [signals],
  )

  // Pure chronological order — used wherever "recent" needs to actually
  // mean recent (the activity timeline, weekly metrics), independent of
  // how the main feed is ranked.
  const chronologicalItems = useMemo(
    () => [...signals].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [signals],
  )

  // Main feed order: outreach relevance first (Issue 3 — "most important
  // priority should be if it's relevant enough to base outreach on"),
  // date as the tiebreak within the same relevance tier. Rows that
  // haven't been scored yet (pre-backfill, or a normalization skip) get
  // a neutral mid-tier default rather than sinking to the bottom or
  // unfairly floating to the top.
  const sortedItems = useMemo(
    () =>
      [...signals].sort((a, b) => {
        const relDiff = (b.outreachRelevance ?? 3) - (a.outreachRelevance ?? 3)
        if (relDiff !== 0) return relDiff
        return a.date < b.date ? 1 : -1
      }),
    [signals],
  )

  const metrics = useMemo(() => computeMetrics(chronologicalItems), [chronologicalItems])

  // Filtered on everything except scope, so the scope control's own
  // counts (Macro/Micro/All) reflect every other active filter without
  // being circular about scope itself.
  const filteredItemsExceptScope = useMemo(() => {
    const query = search.trim().toLowerCase()
    const rangeDays = DATE_RANGE_DAYS[dateRange]
    const cutoff = rangeDays
      ? (() => {
          const d = new Date()
          d.setHours(0, 0, 0, 0)
          d.setDate(d.getDate() - rangeDays)
          return d
        })()
      : null

    return sortedItems.filter((item) => {
      if (practiceAreaFilter.length && !practiceAreaFilter.includes(item.practiceArea)) return false
      if (entityFilter.length && !entityFilter.includes(item.entity)) return false
      if (signalTypeFilter.length && !signalTypeFilter.includes(item.signalType)) return false
      if (cutoff && new Date(`${item.date}T00:00:00`) < cutoff) return false
      if (relevanceOnly && (item.outreachRelevance ?? 0) < HIGH_RELEVANCE_THRESHOLD) return false
      if (unreviewedOnly && item.reviewed) return false

      if (query) {
        const haystack = `${item.headline} ${item.summary} ${item.entity}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }

      return true
    })
  }, [sortedItems, search, dateRange, practiceAreaFilter, entityFilter, signalTypeFilter, relevanceOnly, unreviewedOnly])

  const scopeCounts = useMemo(
    () => ({
      all: filteredItemsExceptScope.length,
      macro: filteredItemsExceptScope.filter((i) => i.scope === "macro").length,
      micro: filteredItemsExceptScope.filter((i) => i.scope === "micro").length,
    }),
    [filteredItemsExceptScope],
  )

  const filteredItems = useMemo(
    () =>
      scopeFilter.length
        ? filteredItemsExceptScope.filter((item) => scopeFilter.includes(item.scope))
        : filteredItemsExceptScope,
    [filteredItemsExceptScope, scopeFilter],
  )

  const activeFilterCount =
    practiceAreaFilter.length +
    scopeFilter.length +
    entityFilter.length +
    signalTypeFilter.length +
    (relevanceOnly ? 1 : 0) +
    (unreviewedOnly ? 1 : 0)

  const openItem = useMemo(() => signals.find((s) => s.id === openSignalId) ?? null, [signals, openSignalId])
  const relatedItems = useMemo(() => {
    if (!openItem) return []
    return signals
      .filter((s) => s.id !== openItem.id && s.entity === openItem.entity)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, 5)
  }, [signals, openItem])

  const setSearch = (value) => updateUrl({ q: value || undefined })
  const setDateRange = (value) => updateUrl({ range: value === "all" ? undefined : value })
  const setScopeFilter = (values) => updateUrl({ scope: values.length ? values : undefined })
  const toggleFacet = (key, currentList, value) => updateUrl({ [key]: toggleValue(currentList, value) })
  const toggleQuickFilter = (quickFilter) => {
    updateUrl(isQuickFilterActive(quickFilter, urlState) ? clearPatchFor(quickFilter) : quickFilter.patch)
  }
  const openSignal = (id) => updateUrl({ signal: id }, { push: true })
  const closeSignal = () => updateUrl({ signal: undefined })

  const handleClearAll = () => {
    updateUrl({
      practice: undefined,
      scope: undefined,
      entity: undefined,
      type: undefined,
      relevance: undefined,
      reviewed: undefined,
      range: undefined,
    })
  }

  const handleClearEverything = () => {
    handleClearAll()
    updateUrl({ q: undefined })
  }

  // "Mark Reviewed" is durable server state (Issue 4), not localStorage —
  // updates optimistically so the UI stays snappy, then rolls back per-item
  // to whatever it actually was before if the write fails.
  const postReview = async (ids, reviewed) => {
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids, reviewed }),
    })
    if (!res.ok) throw new Error(`Server responded ${res.status}`)
  }

  const handleToggleReviewed = (id) => {
    const current = signals.find((s) => s.id === id)
    if (!current) return
    const next = !current.reviewed

    setSignals((prev) => prev.map((s) => (s.id === id ? { ...s, reviewed: next } : s)))

    postReview([id], next).catch((err) => {
      console.error("Failed to update review state:", err)
      setSignals((prev) => prev.map((s) => (s.id === id ? { ...s, reviewed: !next } : s)))
    })
  }

  const handleMarkManyReviewed = (ids) => {
    const idSet = new Set(ids)
    const previous = new Map(signals.filter((s) => idSet.has(s.id)).map((s) => [s.id, s.reviewed]))

    setSignals((prev) => prev.map((s) => (idSet.has(s.id) ? { ...s, reviewed: true } : s)))

    postReview(ids, true).catch((err) => {
      console.error("Failed to update review state:", err)
      setSignals((prev) =>
        prev.map((s) => (idSet.has(s.id) ? { ...s, reviewed: previous.get(s.id) ?? s.reviewed } : s)),
      )
    })
  }

  if (fetchError) {
    return <ErrorState message={fetchError} onRetry={() => setReloadToken((t) => t + 1)} />
  }

  const sidebarProps = {
    dateRange,
    onDateRangeChange: setDateRange,
    scopeFilter,
    scopeCounts,
    onScopeChange: setScopeFilter,
    practiceAreaOptions,
    entityOptions,
    signalTypeOptions,
    practiceAreaFilter,
    entityFilter,
    signalTypeFilter,
    onTogglePracticeArea: (v) => toggleFacet("practice", practiceAreaFilter, v),
    onToggleEntity: (v) => toggleFacet("entity", entityFilter, v),
    onToggleSignalType: (v) => toggleFacet("type", signalTypeFilter, v),
    urlState,
    onToggleQuickFilter: toggleQuickFilter,
    activeFilterCount,
    onClearAll: handleClearAll,
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <h1 className="sr-only">SDR Command Center &mdash; Signal Intelligence Dashboard</h1>
      <Header
        search={search}
        onSearchChange={setSearch}
        searchInputRef={searchInputRef}
        onOpenPalette={() => setPaletteOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        activeFilterCount={activeFilterCount}
        onOpenMobileFilters={() => setMobileFiltersOpen(true)}
      />

      <FilterDrawer open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} {...sidebarProps} />

      <div className="flex flex-col lg:flex-row">
        <div
          className={`hidden flex-shrink-0 overflow-hidden transition-all duration-300 ease-spring lg:block ${
            sidebarOpen ? "lg:w-60 lg:opacity-100" : "lg:w-0 lg:opacity-0"
          }`}
        >
          <div className="lg:w-60">
            <Sidebar {...sidebarProps} />
          </div>
        </div>

        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6">
          <div className="mb-5">
            <KpiGrid metrics={metrics} />
          </div>

          <div className="mb-6 rounded-lg border border-slate-200 bg-white/60 p-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
              Signal Volume &mdash; Last 30 Days
            </h2>
            <VolumeChart buckets={metrics.dailyBuckets} />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <SignalQueue
              items={filteredItems}
              onToggleReviewed={handleToggleReviewed}
              onMarkManyReviewed={handleMarkManyReviewed}
              onOpenSignal={openSignal}
              loading={loading}
              onClearEverything={handleClearEverything}
            />
            <div className="xl:sticky xl:top-[73px] xl:self-start">
              <ActivityPanel recentItems={chronologicalItems.slice(0, 8)} metrics={metrics} />
            </div>
          </div>
        </main>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        items={sortedItems}
        onSelectItem={(item) => openSignal(item.id)}
        onClearFilters={handleClearEverything}
        onToggleTheme={toggleTheme}
      />

      <SignalDetailPanel
        item={openItem}
        open={Boolean(openItem)}
        onClose={closeSignal}
        onToggleReviewed={handleToggleReviewed}
        relatedItems={relatedItems}
        onSelectRelated={(id) => openSignal(id)}
      />
    </div>
  )
}

export default App
