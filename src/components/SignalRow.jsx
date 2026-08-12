import { useState } from "react"
import { pillClassForScope, pillClassForSignalType, REGULATORY_ACCENT } from "../lib/colors.js"
import { REGULATORY_SIGNAL_TYPES, HIGH_RELEVANCE_THRESHOLD } from "../lib/relevance.js"
import Checkbox from "./Checkbox.jsx"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

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

function SignalRow({ item, reviewed, onToggleReviewed, selected, onToggleSelect }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const isRegulatory = REGULATORY_SIGNAL_TYPES.has(item.signalType)
  const isHighRelevance = (item.outreachRelevance ?? 0) >= HIGH_RELEVANCE_THRESHOLD

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${item.headline}\n\n${item.summary}\n${item.sourceUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard access can be denied by the browser; fail silently.
    }
  }

  return (
    <article
      className={`group relative flex gap-3 overflow-hidden rounded-lg border bg-white/60 p-4 backdrop-blur-sm transition-all duration-200 ease-spring hover:-translate-y-0.5 dark:bg-zinc-900/60 ${
        reviewed
          ? "border-slate-200 opacity-60 dark:border-zinc-800"
          : "border-slate-200 hover:border-slate-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-zinc-700"
      } ${selected ? "ring-2 ring-indigo-500/40" : ""}`}
    >
      {/* Persistent marker so regulatory/pain-point and high-relevance
          signals stand out while scrolling the unfiltered feed, not just
          when a quick filter is applied. Severity (rose) takes priority
          over general relevance (indigo) when a card is both. */}
      {(isRegulatory || isHighRelevance) && (
        <span
          aria-hidden="true"
          title={isRegulatory ? "Regulatory / pain-point signal" : "High outreach relevance"}
          className={`absolute inset-y-0 left-0 w-1 ${isRegulatory ? REGULATORY_ACCENT.swatch : "bg-indigo-500"}`}
        />
      )}

      <div className="pt-1">
        <Checkbox checked={selected} onChange={() => onToggleSelect(item.id)} label={`Select ${item.headline}`} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <time className="font-mono text-xs font-semibold tabular-nums text-slate-500 dark:text-zinc-400">
            {formatDate(item.date)}
          </time>
          <span
            title={item.scope === "micro" ? "Account-level signal — specific to one company" : "Market-level signal — broader industry or economic context"}
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${pillClassForScope(item.scope)}`}
          >
            {item.scope}
          </span>
          <span
            title={`Signal type: ${item.signalType}`}
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${pillClassForSignalType(item.signalType)}`}
          >
            {item.signalType}
          </span>
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs font-medium text-slate-400 hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-indigo-400"
          >
            {domainFromUrl(item.sourceUrl)} &#8599;
          </a>
        </div>

        <h3 className="mb-1.5 text-[15px] font-semibold leading-snug text-slate-900 dark:text-zinc-50">
          {item.headline}
        </h3>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mb-3 block w-full text-left"
          aria-expanded={expanded}
        >
          <p
            className={`text-sm leading-relaxed text-slate-600 dark:text-zinc-400 ${expanded ? "" : "line-clamp-1"}`}
          >
            {item.summary}
          </p>
          <span className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            {expanded ? "Show less" : "Show more"}
          </span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-[11px] font-semibold text-violet-600 dark:text-violet-400">
            {item.entity}
          </span>

          <div className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopy}
              title="Copy headline, summary, and source link"
              className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
            >
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              type="button"
              onClick={() => onToggleReviewed(item.id)}
              title={reviewed ? "Mark as not yet reviewed" : "Mark as reviewed"}
              className={`rounded-md border px-2 py-1 text-xs font-medium transition-colors ${
                reviewed
                  ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                  : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
              }`}
            >
              {reviewed ? "Reviewed" : "Mark Reviewed"}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default SignalRow
