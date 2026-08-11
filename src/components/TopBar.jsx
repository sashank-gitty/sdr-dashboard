const DATE_RANGES = [
  { value: "7", label: "7d" },
  { value: "30", label: "30d" },
  { value: "90", label: "90d" },
  { value: "all", label: "All" },
]

function TopBar({ search, onSearchChange, dateRange, onDateRangeChange, shown, total }) {
  return (
    <div className="top-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search headlines and summaries..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="date-range-group" role="group" aria-label="Date range">
        {DATE_RANGES.map((range) => (
          <button
            key={range.value}
            type="button"
            className={`date-range-btn ${dateRange === range.value ? "active" : ""}`}
            onClick={() => onDateRangeChange(range.value)}
          >
            {range.label}
          </button>
        ))}
      </div>

      <div className="results-count">
        Showing {shown} of {total}
      </div>
    </div>
  )
}

export default TopBar
