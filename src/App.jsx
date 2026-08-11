import { useEffect, useMemo, useRef, useState } from "react"
import Sidebar from "./components/Sidebar.jsx"
import Header from "./components/Header.jsx"
import KpiGrid from "./components/KpiGrid.jsx"
import VolumeChart from "./components/VolumeChart.jsx"
import SignalQueue from "./components/SignalQueue.jsx"
import ActivityPanel from "./components/ActivityPanel.jsx"
import CommandPalette from "./components/CommandPalette.jsx"
import { useTheme } from "./lib/useTheme.js"
import { useLocalStorageState } from "./lib/useLocalStorageState.js"
import { computeMetrics } from "./lib/metrics.js"
import newsData from "./data/data.json"

const DATE_RANGE_DAYS = { "7": 7, "30": 30, "90": 90 }

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

function App() {
  const { theme, toggleTheme } = useTheme()
  const searchInputRef = useRef(null)

  const [search, setSearch] = useState("")
  const [dateRange, setDateRange] = useLocalStorageState("sdr-dashboard-date-range", "all")
  const [scopeFilter, setScopeFilter] = useLocalStorageState("sdr-dashboard-scope-filter", [])
  const [entityFilter, setEntityFilter] = useLocalStorageState("sdr-dashboard-entity-filter", [])
  const [signalTypeFilter, setSignalTypeFilter] = useLocalStorageState("sdr-dashboard-signal-type-filter", [])
  const [activeTab, setActiveTab] = useLocalStorageState("sdr-dashboard-active-tab", "all")
  const [activePill, setActivePill] = useLocalStorageState("sdr-dashboard-active-pill", "all")
  const [reviewedIds, setReviewedIds] = useLocalStorageState("sdr-dashboard-reviewed-ids", [])
  const [sidebarOpen, setSidebarOpen] = useLocalStorageState("sdr-dashboard-sidebar-open", true)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const reviewedSet = useMemo(() => new Set(reviewedIds), [reviewedIds])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 150)
    return () => clearTimeout(timer)
  }, [])

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

  const scopeOptions = useMemo(
    () => [...new Set(newsData.map((item) => item.scope))].sort(),
    [],
  )
  const entityOptions = useMemo(
    () => [...new Set(newsData.map((item) => item.entity))].sort(),
    [],
  )
  const signalTypeOptions = useMemo(
    () => [...new Set(newsData.map((item) => item.signalType))].sort(),
    [],
  )

  const sortedItems = useMemo(
    () => [...newsData].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [],
  )

  const metrics = useMemo(() => computeMetrics(sortedItems), [sortedItems])

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
      if (scopeFilter.length && !scopeFilter.includes(item.scope)) return false
      if (entityFilter.length && !entityFilter.includes(item.entity)) return false
      if (signalTypeFilter.length && !signalTypeFilter.includes(item.signalType)) return false
      if (cutoff && new Date(`${item.date}T00:00:00`) < cutoff) return false

      if (query) {
        const haystack = `${item.headline} ${item.summary} ${item.entity}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }

      return true
    })
  }, [sortedItems, search, dateRange, scopeFilter, entityFilter, signalTypeFilter])

  const handleClearAll = () => {
    setScopeFilter([])
    setEntityFilter([])
    setSignalTypeFilter([])
  }

  const handleClearEverything = () => {
    handleClearAll()
    setSearch("")
    setActiveTab("all")
    setActivePill("all")
  }

  const handleToggleReviewed = (id) => {
    setReviewedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]))
  }

  const handleMarkManyReviewed = (ids) => {
    setReviewedIds((prev) => [...new Set([...prev, ...ids])])
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <Header
        search={search}
        onSearchChange={setSearch}
        searchInputRef={searchInputRef}
        onOpenPalette={() => setPaletteOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      <div className="flex flex-col lg:flex-row">
        <div
          className={`flex-shrink-0 overflow-hidden transition-all duration-300 ease-spring ${
            sidebarOpen ? "lg:w-64 lg:opacity-100" : "lg:w-0 lg:opacity-0"
          }`}
        >
          <div className="lg:w-64">
            <Sidebar
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              scopeOptions={scopeOptions}
              entityOptions={entityOptions}
              signalTypeOptions={signalTypeOptions}
              scopeFilter={scopeFilter}
              entityFilter={entityFilter}
              signalTypeFilter={signalTypeFilter}
              onToggleScope={(v) => setScopeFilter((list) => toggleValue(list, v))}
              onToggleEntity={(v) => setEntityFilter((list) => toggleValue(list, v))}
              onToggleSignalType={(v) => setSignalTypeFilter((list) => toggleValue(list, v))}
              onClearAll={handleClearAll}
            />
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

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <SignalQueue
              items={filteredItems}
              today={metrics.today}
              reviewedIds={reviewedSet}
              onToggleReviewed={handleToggleReviewed}
              onMarkManyReviewed={handleMarkManyReviewed}
              loading={loading}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              activePill={activePill}
              onPillChange={setActivePill}
              onClearEverything={handleClearEverything}
            />
            <ActivityPanel recentItems={sortedItems.slice(0, 8)} metrics={metrics} />
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
