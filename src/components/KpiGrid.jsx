import Sparkline from "./Sparkline.jsx"

function TrendBadge({ pct, delta, positiveIsGood = true, invert = false }) {
  if (pct === null) {
    return <span className="text-xs font-medium text-slate-400 dark:text-zinc-500">no prior data</span>
  }

  const isFlat = delta === 0
  const isUp = delta > 0
  const isGood = invert ? !isUp : isUp
  const colorClass = isFlat
    ? "text-slate-400 dark:text-zinc-500"
    : (positiveIsGood ? isGood : !isGood)
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-rose-600 dark:text-rose-400"

  const arrow = isFlat ? "→" : isUp ? "↑" : "↓"

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold tabular-nums ${colorClass}`}>
      {arrow} {Math.abs(pct)}%<span className="font-normal text-slate-400 dark:text-zinc-500">vs last week</span>
    </span>
  )
}

function KpiCard({ label, value, sub, sparkValues, sparkClassName, children }) {
  return (
    <div className="group rounded-lg border border-slate-200 bg-white/60 p-4 backdrop-blur-sm transition-all hover:border-slate-300 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">{label}</p>
        {sparkValues && (
          <Sparkline values={sparkValues} width={72} height={24} strokeClassName={sparkClassName} />
        )}
      </div>
      <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-slate-900 dark:text-zinc-50">{value}</p>
      <div className="mt-1.5">{sub ?? children}</div>
    </div>
  )
}

function KpiGrid({ metrics }) {
  const dailyTotals = metrics.dailyBuckets.map((b) => b.total)
  const riskDelta = metrics.riskThisWeekCount - metrics.riskLastWeekCount

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        label="Total Signals Tracked"
        value={metrics.totalSignals}
        sparkValues={dailyTotals}
        sparkClassName="stroke-indigo-500 dark:stroke-indigo-400"
        sub={<span className="text-xs text-slate-400 dark:text-zinc-500">last 30 days of activity</span>}
      />

      <KpiCard
        label="Signals This Week"
        value={metrics.thisWeekCount}
        sub={<TrendBadge pct={metrics.weekOverWeekPct} delta={metrics.weekOverWeekDelta} />}
      />

      <KpiCard
        label="Regulatory &amp; Pain-Point Signals"
        value={metrics.riskThisWeekCount}
        sub={
          <span className="inline-flex items-center gap-1 text-xs font-semibold tabular-nums text-amber-600 dark:text-amber-400">
            {riskDelta === 0 ? "→" : riskDelta > 0 ? "↑" : "↓"} {Math.abs(riskDelta)}
            <span className="font-normal text-slate-400 dark:text-zinc-500">vs last week</span>
          </span>
        }
      />

      <KpiCard
        label="Entities Tracked"
        value={metrics.entitiesTracked}
        sub={
          <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
            <span className="font-mono tabular-nums text-slate-700 dark:text-zinc-300">{metrics.entitiesThisWeek}</span> active this week
          </span>
        }
      />
    </div>
  )
}

export default KpiGrid
