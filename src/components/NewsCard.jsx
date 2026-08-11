import { colorForScope, colorForSignalType } from "../lib/colors.js"

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number)
  return `${day} ${MONTHS[month - 1]} ${year}`
}

function domainFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

function NewsCard({ item }) {
  const signalColor = colorForSignalType(item.signalType)

  return (
    <article className="news-card" style={{ borderLeftColor: signalColor }}>
      <div className="news-card-header">
        <span className="news-card-date">{formatDate(item.date)}</span>
        <a
          className="news-card-source"
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {domainFromUrl(item.sourceUrl)} &#8599;
        </a>
      </div>

      <h2 className="news-card-headline">{item.headline}</h2>

      <p className="news-card-summary">{item.summary}</p>

      <div className="news-card-tags">
        <span
          className="pill"
          style={{ color: colorForScope(item.scope), background: `${colorForScope(item.scope)}26` }}
        >
          {item.scope}
        </span>
        <span className="pill pill-entity">{item.entity}</span>
        <span
          className="pill"
          style={{ color: signalColor, background: `${signalColor}26` }}
        >
          {item.signalType}
        </span>
      </div>
    </article>
  )
}

export default NewsCard
