import { useState } from "react"
import { pillClassForScope, pillClassForSignalType } from "../lib/colors.js"

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

function SignalRow({ item, reviewed, onToggleReviewed }) {
  const [copied, setCopied] = useState(false)

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
      className={`group rounded-lg border bg-white/60 p-4 backdrop-blur-sm transition-all dark:bg-zinc-900/60 ${
        reviewed
          ? "border-slate-200 opacity-60 dark:border-zinc-800"
          : "border-slate-200 hover:border-slate-300 hover:shadow-sm dark:border-zinc-800 dark:hover:border-zinc-700"
      }`}
    >
      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <time className="font-mono text-xs font-semibold tabular-nums text-slate-500 dark:text-zinc-400">
          {formatDate(item.date)}
        </time>
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${pillClassForScope(item.scope)}`}>
          {item.scope}
        </span>
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${pillClassForSignalType(item.signalType)}`}>
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

      <h2 className="mb-1.5 text-[15px] font-semibold leading-snug text-slate-900 dark:text-zinc-50">
        {item.headline}
      </h2>

      <p className="mb-3 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">{item.summary}</p>

      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-[11px] font-semibold text-violet-600 dark:text-violet-400">
          {item.entity}
        </span>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={() => onToggleReviewed(item.id)}
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
    </article>
  )
}

export default SignalRow
