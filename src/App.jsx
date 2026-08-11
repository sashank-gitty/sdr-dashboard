import { useMemo, useState } from "react"
import FilterBar from "./components/FilterBar.jsx"
import NewsCard from "./components/NewsCard.jsx"
import newsData from "./data/data.json"
import "./App.css"

function App() {
  const [search, setSearch] = useState("")
  const [scope, setScope] = useState("all")
  const [entity, setEntity] = useState("all")
  const [signalType, setSignalType] = useState("all")

  const entityOptions = useMemo(
    () => [...new Set(newsData.map((item) => item.entity))].sort(),
    [],
  )

  const signalTypeOptions = useMemo(() => {
    const knownTypes = [
      "funding",
      "leadership change",
      "pain point",
      "product launch",
      "regulation",
      "market shift",
      "new entrant",
      "customer incident",
      "employee incident",
      "brand move",
      "research shift",
      "digital transformation",
      "restructure",
      "analyst report",
    ]
    const dataTypes = newsData.map((item) => item.signalType)
    return [...new Set([...knownTypes, ...dataTypes])].sort()
  }, [])

  const sortedItems = useMemo(
    () => [...newsData].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [],
  )

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()

    return sortedItems.filter((item) => {
      if (scope !== "all" && item.scope !== scope) return false
      if (entity !== "all" && item.entity !== entity) return false
      if (signalType !== "all" && item.signalType !== signalType) return false

      if (query) {
        const haystack = `${item.headline} ${item.summary}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }

      return true
    })
  }, [sortedItems, search, scope, entity, signalType])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Competitor &amp; Industry News</h1>
        <p className="app-subtitle">
          Tracking signals across the CX competitive landscape
        </p>
      </header>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        scope={scope}
        onScopeChange={setScope}
        entity={entity}
        onEntityChange={setEntity}
        signalType={signalType}
        onSignalTypeChange={setSignalType}
        entityOptions={entityOptions}
        signalTypeOptions={signalTypeOptions}
      />

      <div className="results-count">
        {filteredItems.length} of {sortedItems.length} items
      </div>

      <main className="card-feed">
        {filteredItems.length === 0 ? (
          <p className="empty-state">No items match the current filters.</p>
        ) : (
          filteredItems.map((item) => <NewsCard key={item.id} item={item} />)
        )}
      </main>
    </div>
  )
}

export default App
