import { useEffect, useMemo, useRef, useState } from "react"
import Sidebar from "./components/Sidebar.jsx"
import FilterDrawer from "./components/FilterDrawer.jsx"
import Header from "./components/Header.jsx"
import KpiGrid from "./components/KpiGrid.jsx"
import VolumeChart from "./components/VolumeChart.jsx"
import SignalQueue from "./components/SignalQueue.jsx"
import ActivityPanel from "./components/ActivityPanel.jsx"
import CommandPalette from "./components/CommandPalette.jsx"
import ErrorState from "./components/ErrorState.jsx"
import { useTheme } from "./lib/useTheme.js"
import { useLocalStorageState } from "./lib/useLocalStorageState.js"
import { computeMetrics } from "./lib/metrics.js"
import { readViewFromUrl, writeViewToUrl } from "./lib/patchViewUrl.js"
import { PATCHES, PATCH_LABELS } from "../shared/patches.js"
import { matchesAccountCoverage, ACCOUNT_COVERAGE_LABELS } from "./lib/accountCoverage.js"

const DATE_RANGE_DAYS = { "7": 7, "30": 30, "90": 90 }

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

// A view arriving by URL is an explicit instruction ("show me the FSI
// feed") and outranks whatever this browser last had selected. Read
// once at module scope so the initial render already has it and the
// feed never flashes the wrong contents first.
const urlView = readViewFromUrl()

function App() {
  const { theme, toggleTheme } = useTheme()
  const searchInputRef = useRef(null)

  const [search, setSearch] = useState("")
  const [dateRange, setDateRange] = useLocalStorageState("sdr-dashboard-date-range", "all")
  const [practiceAreaFilter, setPracticeAreaFilter] = useLocalStorageState("sdr-dashboard-practice-area-filter", [])
  const [scopeFilter, setScopeFilter] = useLocalStorageState("sdr-dashboard-scope-filter", [])
  const [entityFilter, setEntityFilter] = useLocalStorageState("sdr-dashboard-entity-filter", [])
  const [signalTypeFilter, setSignalTypeFilter] = useLocalStorageState("sdr-dashboard-signal-type-filter", [])
  const [patchFilter, setPatchFilter] = useLocalStorageState(
    "sdr-dashboard-patch-filter",
    [],
    urlView?.patchFilter,
  )
  const [aeFilter, setAeFilter] = useLocalStorageState(
    "sdr-dashboard-ae-filter",
    [],
    urlView?.aeFilter,
  )
  const [accountCoverage, setAccountCoverage] = useLocalStorageState(
    "sdr-dashboard-account-coverage",
    "all",
    urlView?.accountCoverage,
  )
  const [viewLinkCopied, setViewLinkCopied] = useState(false)
  const [activeTab, setActiveTab] = useLocalStorageState("sdr-dashboard-active-tab", "all")
  const [activePill, setActivePill] = useLocalStorageState("sdr-dashboard-active-pill", "all")
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
  const scopeOptions = useMemo(
    () => [...new Set(signals.map((item) => item.scope))].sort(),
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
  // Patches list every canonical patch rather than only those present in
  // the feed, so an empty patch reads as "nothing landed in your
  // territory this week" instead of vanishing from the sidebar.
  const patchOptions = PATCHES
  const aeOptions = useMemo(
    () => [...new Set(signals.flatMap((item) => item.owningAes ?? []))].sort(),
    [signals],
  )

  // The territory filters are a different kind of filter from the rest.
  // Practice area, signal type and the date range narrow what you're
  // looking at within your own dashboard; patch and AE decide whose
  // dashboard it is. So these apply above the feed, to the KPI tiles,
  // volume chart and highlights rail as well — otherwise a rep opening
  // their own patch link would read the whole team's numbers.
  const territoryItems = useMemo(() => {
    if (!patchFilter.length && !aeFilter.length && accountCoverage === "all") return signals
    return signals.filter((item) => {
      if (patchFilter.length && !(item.patches ?? []).some((p) => patchFilter.includes(p))) {
        return false
      }
      if (aeFilter.length && !(item.owningAes ?? []).some((a) => aeFilter.includes(a))) {
        return false
      }
      if (!matchesAccountCoverage(item, accountCoverage)) return false
      return true
    })
  }, [signals, patchFilter, aeFilter, accountCoverage])

  // Pure chronological order — used wherever "recent" needs to actually
  // mean recent (the activity timeline, weekly metrics), independent of
  // how the main feed is ranked.
  const chronologicalItems = useMemo(
    () => [...territoryItems].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [territoryItems],
  )

  // Main feed order: outreach relevance first (Issue 3 — "most important
  // priority should be if it's relevant enough to base outreach on"),
  // date as the tiebreak within the same relevance tier. Rows that
  // haven't been scored yet (pre-backfill, or a normalization skip) get
  // a neutral mid-tier default rather than sinking to the bottom or
  // unfairly floating to the top.
  const sortedItems = useMemo(
    () =>
      [...territoryItems].sort((a, b) => {
        const relDiff = (b.outreachRelevance ?? 3) - (a.outreachRelevance ?? 3)
        if (relDiff !== 0) return relDiff
        return a.date < b.date ? 1 : -1
      }),
    [territoryItems],
  )

  const metrics = useMemo(() => computeMetrics(chronologicalItems), [chronologicalItems])

  const filteredItems = useMemo(() => {
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
      if (scopeFilter.length && !scopeFilter.includes(item.scope)) return false
      if (entityFilter.length && !entityFilter.includes(item.entity)) return false
      if (signalTypeFilter.length && !signalTypeFilter.includes(item.signalType)) return false
      if (cutoff && new Date(`${item.date}T00:00:00`) < cutoff) return false

      if (query) {
        const haystack =
          `${item.headline} ${item.summary} ${item.entity} ${(item.matchedAccounts ?? []).join(" ")}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }

      return true
    })
  }, [sortedItems, search, dateRange, practiceAreaFilter, scopeFilter, entityFilter, signalTypeFilter])

  // Keep the address bar in step with the territory filters so the
  // current view is always shareable, not just after pressing a button.
  useEffect(() => {
    writeViewToUrl({ patchFilter, aeFilter, accountCoverage })
  }, [patchFilter, aeFilter, accountCoverage])

  const handleCopyViewLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setViewLinkCopied(true)
      setTimeout(() => setViewLinkCopied(false), 1500)
    } catch {
      // Clipboard access can be denied by the browser; fail silently,
      // the URL is in the address bar to copy by hand either way.
    }
  }

  const activeFilterCount =
    practiceAreaFilter.length +
    scopeFilter.length +
    entityFilter.length +
    signalTypeFilter.length +
    patchFilter.length +
    aeFilter.length +
    (accountCoverage === "all" ? 0 : 1)

  const handleClearAll = () => {
    setPracticeAreaFilter([])
    setScopeFilter([])
    setEntityFilter([])
    setSignalTypeFilter([])
    setPatchFilter([])
    setAeFilter([])
    setAccountCoverage("all")
  }

  const handleClearEverything = () => {
    handleClearAll()
    setSearch("")
    setActiveTab("all")
    setActivePill("all")
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

      <FilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        practiceAreaOptions={practiceAreaOptions}
        scopeOptions={scopeOptions}
        entityOptions={entityOptions}
        signalTypeOptions={signalTypeOptions}
        patchOptions={patchOptions}
        aeOptions={aeOptions}
        practiceAreaFilter={practiceAreaFilter}
        scopeFilter={scopeFilter}
        entityFilter={entityFilter}
        signalTypeFilter={signalTypeFilter}
        patchFilter={patchFilter}
        aeFilter={aeFilter}
        accountCoverage={accountCoverage}
        onTogglePracticeArea={(v) => setPracticeAreaFilter((list) => toggleValue(list, v))}
        onToggleScope={(v) => setScopeFilter((list) => toggleValue(list, v))}
        onToggleEntity={(v) => setEntityFilter((list) => toggleValue(list, v))}
        onToggleSignalType={(v) => setSignalTypeFilter((list) => toggleValue(list, v))}
        onTogglePatch={(v) => setPatchFilter((list) => toggleValue(list, v))}
        onToggleAe={(v) => setAeFilter((list) => toggleValue(list, v))}
        onAccountCoverageChange={setAccountCoverage}
        onClearAll={handleClearAll}
        onCopyViewLink={handleCopyViewLink}
        viewLinkCopied={viewLinkCopied}
      />

      <div className="flex flex-col lg:flex-row">
        <div
          className={`hidden flex-shrink-0 overflow-hidden transition-all duration-300 ease-spring lg:block ${
            sidebarOpen ? "lg:w-60 lg:opacity-100" : "lg:w-0 lg:opacity-0"
          }`}
        >
          <div className="lg:w-60">
            <Sidebar
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              practiceAreaOptions={practiceAreaOptions}
              scopeOptions={scopeOptions}
              entityOptions={entityOptions}
              signalTypeOptions={signalTypeOptions}
              patchOptions={patchOptions}
              aeOptions={aeOptions}
              practiceAreaFilter={practiceAreaFilter}
              scopeFilter={scopeFilter}
              entityFilter={entityFilter}
              signalTypeFilter={signalTypeFilter}
              patchFilter={patchFilter}
              aeFilter={aeFilter}
              accountCoverage={accountCoverage}
              onTogglePracticeArea={(v) => setPracticeAreaFilter((list) => toggleValue(list, v))}
              onToggleScope={(v) => setScopeFilter((list) => toggleValue(list, v))}
              onToggleEntity={(v) => setEntityFilter((list) => toggleValue(list, v))}
              onToggleSignalType={(v) => setSignalTypeFilter((list) => toggleValue(list, v))}
              onTogglePatch={(v) => setPatchFilter((list) => toggleValue(list, v))}
              onToggleAe={(v) => setAeFilter((list) => toggleValue(list, v))}
              onAccountCoverageChange={setAccountCoverage}
              onClearAll={handleClearAll}
              onCopyViewLink={handleCopyViewLink}
              viewLinkCopied={viewLinkCopied}
            />
          </div>
        </div>

        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6">
          {/* The territory filters rescope every number on the page, not
              just the feed, so say so plainly — otherwise a smaller KPI
              count reads as signals having gone missing. */}
          {(patchFilter.length > 0 || aeFilter.length > 0 || accountCoverage !== "all") && (
            <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-indigo-500/20 bg-indigo-500/5 px-3 py-2 text-xs text-slate-600 dark:text-zinc-300">
              <span className="font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Patch view
              </span>
              <span>
                {[
                  patchFilter.map((p) => PATCH_LABELS[p] ?? p).join(", "),
                  aeFilter.join(", "),
                  accountCoverage === "all" ? "" : ACCOUNT_COVERAGE_LABELS[accountCoverage].toLowerCase(),
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
              <span className="text-slate-400 dark:text-zinc-500">
                &mdash; every figure below is scoped to this view
              </span>
              <button
                type="button"
                onClick={() => {
                  setPatchFilter([])
                  setAeFilter([])
                  setAccountCoverage("all")
                }}
                className="ml-auto rounded-md border border-slate-200 px-2 py-0.5 font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
              >
                Show all patches
              </button>
            </div>
          )}

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
              today={metrics.today}
              onToggleReviewed={handleToggleReviewed}
              onMarkManyReviewed={handleMarkManyReviewed}
              loading={loading}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              activePill={activePill}
              onPillChange={setActivePill}
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
        onSelectItem={(item) => setSearch(item.headline)}
        onClearFilters={handleClearEverything}
        onToggleTheme={toggleTheme}
      />
    </div>
  )
}

export default App
