import { useMemo, useState } from "react"
import Sidebar from "./components/Sidebar.jsx"
import TopBar from "./components/TopBar.jsx"
import NewsCard from "./components/NewsCard.jsx"
import newsData from "./data/data.json"
import "./App.css"

const DATE_RANGE_DAYS = { "7": 7, "30": 30, "90": 90 }

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

function App() {
  const [search, setSearch] = useState("")
  const [dateRange, setDateRange] = useState("all")
  const [scopeFilter, setScopeFilter] = useState([])
  const [entityFilter, setEntityFilter] = useState([])
  const [signalTypeFilter, setSignalTypeFilter] = useState([])

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
        const haystack = `${item.headline} ${item.summary}`.toLowerCase()
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

  return (
    <div className="app">
      <Sidebar
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

      <div className="main">
        <TopBar
          search={search}
          onSearchChange={setSearch}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          shown={filteredItems.length}
          total={sortedItems.length}
        />

        <main className="card-feed">
          {filteredItems.length === 0 ? (
            <p className="empty-state">No items match the current filters.</p>
          ) : (
            filteredItems.map((item) => <NewsCard key={item.id} item={item} />)
          )}
        </main>
      </div>
    </div>
  )
}

export default App
