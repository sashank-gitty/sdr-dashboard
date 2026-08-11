import { useState } from "react"
import { colorForScope, colorForSignalType } from "../lib/colors.js"

function FilterSection({ title, options, selected, onToggle, colorFor, scrollable }) {
  const [open, setOpen] = useState(
    () => typeof window === "undefined" || window.innerWidth > 900,
  )

  return (
    <div className="filter-section">
      <button
        type="button"
        className="filter-section-header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={`chevron ${open ? "chevron-open" : ""}`}>&#9656;</span>
        <span className="filter-section-title">{title}</span>
        {selected.length > 0 && (
          <span className="filter-section-count">{selected.length}</span>
        )}
      </button>

      {open && (
        <div className={`filter-section-body ${scrollable ? "scrollable" : ""}`}>
          {options.map((option) => (
            <label key={option} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
              />
              {colorFor && (
                <span
                  className="filter-swatch"
                  style={{ background: colorFor(option) }}
                />
              )}
              <span className="filter-checkbox-label">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

function Sidebar({
  scopeOptions,
  entityOptions,
  signalTypeOptions,
  scopeFilter,
  entityFilter,
  signalTypeFilter,
  onToggleScope,
  onToggleEntity,
  onToggleSignalType,
  onClearAll,
}) {
  const activeCount =
    scopeFilter.length + entityFilter.length + signalTypeFilter.length

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Filters</span>
        {activeCount > 0 && <span className="sidebar-active-count">{activeCount} active</span>}
        <button
          type="button"
          className="clear-all-btn"
          onClick={onClearAll}
          disabled={activeCount === 0}
        >
          Clear all
        </button>
      </div>

      <FilterSection
        title="Scope"
        options={scopeOptions}
        selected={scopeFilter}
        onToggle={onToggleScope}
        colorFor={colorForScope}
      />

      <FilterSection
        title="Signal type"
        options={signalTypeOptions}
        selected={signalTypeFilter}
        onToggle={onToggleSignalType}
        colorFor={colorForSignalType}
      />

      <FilterSection
        title="Entity"
        options={entityOptions}
        selected={entityFilter}
        onToggle={onToggleEntity}
        scrollable
      />
    </aside>
  )
}

export default Sidebar
