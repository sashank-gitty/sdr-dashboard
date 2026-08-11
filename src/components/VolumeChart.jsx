const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function formatShortDate(dateString) {
  const [, month, day] = dateString.split("-").map(Number)
  return `${MONTHS[month - 1]} ${day}`
}

function buildPath(values, width, height, max) {
  const stepX = width / Math.max(values.length - 1, 1)
  return values
    .map((v, i) => {
      const x = i * stepX
      const y = height - (v / max) * height
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(" ")
}

function VolumeChart({ buckets }) {
  const width = 640
  const height = 160
  const macro = buckets.map((b) => b.macro)
  const micro = buckets.map((b) => b.micro)
  const max = Math.max(...macro, ...micro, 1)

  const macroPath = buildPath(macro, width, height, max)
  const microPath = buildPath(micro, width, height, max)
  const macroArea = `${macroPath} L${width},${height} L0,${height} Z`
  const microArea = `${microPath} L${width},${height} L0,${height} Z`

  const first = buckets[0]
  const mid = buckets[Math.floor(buckets.length / 2)]
  const last = buckets[buckets.length - 1]

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none" role="img" aria-label="Signal volume, macro vs micro, last 30 days">
        <path d={microArea} className="fill-indigo-500/10" stroke="none" />
        <path d={microPath} className="stroke-indigo-500 dark:stroke-indigo-400" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d={macroArea} className="fill-slate-400/10 dark:fill-zinc-400/10" stroke="none" />
        <path d={macroPath} className="stroke-slate-400 dark:stroke-zinc-500" fill="none" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="mt-1 flex justify-between text-[11px] font-medium tabular-nums text-slate-400 dark:text-zinc-500">
        <span>{formatShortDate(first.date)}</span>
        <span>{formatShortDate(mid.date)}</span>
        <span>{formatShortDate(last.date)}</span>
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-zinc-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0.5 w-3 rounded-full bg-indigo-500 dark:bg-indigo-400" />
          Micro (account-level)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0.5 w-3 rounded-full bg-slate-400 dark:bg-zinc-500" style={{ backgroundImage: "repeating-linear-gradient(90deg, currentColor 0 4px, transparent 4px 7px)" }} />
          Macro (market-level)
        </span>
      </div>
    </div>
  )
}

export default VolumeChart
