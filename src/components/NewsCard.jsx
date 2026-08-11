function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`)
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function NewsCard({ item }) {
  return (
    <article className="news-card">
      <div className="news-card-header">
        <h2 className="news-card-headline">{item.headline}</h2>
        <span className="news-card-date">{formatDate(item.date)}</span>
      </div>

      <p className="news-card-summary">{item.summary}</p>

      <div className="news-card-tags">
        <span className="pill pill-scope">{item.scope}</span>
        <span className="pill pill-entity">{item.entity}</span>
        <span className="pill pill-signal">{item.signalType}</span>
      </div>

      <a
        className="news-card-source"
        href={item.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        View source ↗
      </a>
    </article>
  )
}

export default NewsCard
