import { useEffect, useState } from "react"
import { pillClassForScope, pillClassForSignalType, pillClassForPracticeArea, PRACTICE_AREA_LABELS } from "../lib/colors.js"
import { relevanceTierText } from "../lib/relevanceTiers.js"
import { buildSignalReason, REASON_TONE_STYLES } from "../lib/signalReason.js"

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

// Right-side slide-over rather than a routed page — the list stays
// mounted and scrolled to where it was underneath, so opening a signal to
// read the full summary doesn't cost the "at a glance, scan many" value
// the rest of the dashboard is built around. Deep-linkable via ?signal=.
function SignalDetailPanel({ item, open, onClose, onToggleReviewed, relatedItems, onSelectRelated }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    function onKey(e) {
      if (open && e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  if (!item) return null

  const practiceAreaLabel = PRACTICE_AREA_LABELS[item.practiceArea] ?? PRACTICE_AREA_LABELS.cx
  const tierText = relevanceTierText(item.outreachRelevance ?? null)
  const reason = buildSignalReason(item)
  const reasonTone = REASON_TONE_STYLES[reason.tone] ?? REASON_TONE_STYLES.neutral

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
    <div className="fixed inset-0 z-50" aria-hidden={!open} style={{ pointerEvents: open ? "auto" : "none" }}>
      <div
        className={`absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.headline}
        className={`absolute inset-y-0 right-0 flex w-full max-w-[480px] flex-col overflow-y-auto border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-spring dark:border-zinc-800 dark:bg-zinc-950 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-zinc-800">
          <time className="font-mono text-xs font-semibold tabular-nums text-slate-500 dark:text-zinc-400">
            {formatDate(item.date)}
          </time>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
          >
            &#10005;
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5">
          <div className="flex flex-wrap gap-1.5">
            <span
              title={`Practice area: ${practiceAreaLabel}`}
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${pillClassForPracticeArea(item.practiceArea)}`}
            >
              {practiceAreaLabel}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${pillClassForScope(item.scope)}`}
            >
              {item.scope}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${pillClassForSignalType(item.signalType)}`}
            >
              {item.signalType}
            </span>
          </div>

          <h2 className="text-lg font-semibold leading-snug text-slate-900 dark:text-zinc-50">{item.headline}</h2>

          <p className={`-mt-2 flex items-center gap-1.5 text-xs font-medium ${reasonTone.text}`}>
            <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${reasonTone.dot}`} aria-hidden="true" />
            {reason.label}
          </p>

          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-[11px] font-semibold text-violet-600 dark:text-violet-400">
              {item.entity}
            </span>
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-slate-400 hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-indigo-400"
            >
              {domainFromUrl(item.sourceUrl)} &#8599;
            </a>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">{item.summary}</p>

          {tierText && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/60">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Why this scored a {item.outreachRelevance}
              </p>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">{tierText}</p>
            </div>
          )}

          <div className="rounded-lg border border-dashed border-slate-300 p-3 dark:border-zinc-700">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              What this means
            </p>
            <p className="text-sm text-slate-400 dark:text-zinc-500">
              Downstream impact for consumers, employees, and leadership isn&rsquo;t generated yet &mdash; reserved
              for a later pass.
            </p>
          </div>

          {relatedItems.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Other signals &mdash; {item.entity}
              </p>
              <div className="flex flex-col gap-1">
                {relatedItems.map((related) => (
                  <button
                    key={related.id}
                    type="button"
                    onClick={() => onSelectRelated(related.id)}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-slate-600 transition-colors hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800/80"
                  >
                    <time className="flex-shrink-0 font-mono text-xs tabular-nums text-slate-400 dark:text-zinc-500">
                      {formatDate(related.date)}
                    </time>
                    <span className="truncate">{related.headline}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto flex items-center gap-2 border-t border-slate-200 pt-4 dark:border-zinc-800">
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
            >
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              type="button"
              onClick={() => onToggleReviewed(item.id)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                item.reviewed
                  ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                  : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
              }`}
            >
              {item.reviewed ? "Reviewed" : "Mark Reviewed"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignalDetailPanel
