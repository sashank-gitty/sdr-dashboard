function Sparkline({ values, width = 96, height = 28, className = "", strokeClassName = "stroke-indigo-500 dark:stroke-indigo-400" }) {
  if (!values.length) return null

  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = max - min || 1
  const stepX = width / Math.max(values.length - 1, 1)

  const points = values.map((v, i) => {
    const x = i * stepX
    const y = height - ((v - min) / range) * height
    return [x, y]
  })

  const linePath = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ")
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={areaPath} className={strokeClassName} fill="currentColor" opacity="0.08" stroke="none" />
      <path d={linePath} className={strokeClassName} fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default Sparkline
