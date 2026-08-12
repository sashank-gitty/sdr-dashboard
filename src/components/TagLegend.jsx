import { SIGNAL_TYPE_COLOR_LEGEND, SCOPE_COLOR_LEGEND, PRACTICE_AREA_COLOR_LEGEND } from "../lib/colors.js"

function LegendRow({ swatch, label, examples }) {
  return (
    <div className="flex items-start gap-2 py-1">
      <span className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${swatch}`} />
      <p className="text-xs leading-snug text-slate-600 dark:text-zinc-400">
        <span className="font-semibold text-slate-800 dark:text-zinc-200">{label}</span>
        {" "}&mdash; {examples}
      </p>
    </div>
  )
}

function TagLegend() {
  return (
    <div className="mb-3 rounded-lg border border-slate-200 bg-white/60 p-3 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 xl:grid-cols-3">
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
            Practice Area Colors
          </p>
          {PRACTICE_AREA_COLOR_LEGEND.map((entry) => (
            <LegendRow key={entry.label} {...entry} />
          ))}
        </div>
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
            Signal Type Colors
          </p>
          {SIGNAL_TYPE_COLOR_LEGEND.map((entry) => (
            <LegendRow key={entry.label} {...entry} />
          ))}
        </div>
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
            Scope Colors
          </p>
          {SCOPE_COLOR_LEGEND.map((entry) => (
            <LegendRow key={entry.label} {...entry} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TagLegend
