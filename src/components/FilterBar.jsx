function FilterBar({
  search,
  onSearchChange,
  scope,
  onScopeChange,
  entity,
  onEntityChange,
  signalType,
  onSignalTypeChange,
  entityOptions,
  signalTypeOptions,
}) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search headlines and summaries..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="filter-selects">
        <select value={scope} onChange={(e) => onScopeChange(e.target.value)}>
          <option value="all">All scopes</option>
          <option value="macro">Macro</option>
          <option value="micro">Micro</option>
        </select>

        <select value={entity} onChange={(e) => onEntityChange(e.target.value)}>
          <option value="all">All entities</option>
          {entityOptions.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>

        <select value={signalType} onChange={(e) => onSignalTypeChange(e.target.value)}>
          <option value="all">All signal types</option>
          {signalTypeOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default FilterBar
