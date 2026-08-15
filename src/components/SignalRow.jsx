import { useState } from "react"
import {
  pillClassForSignalType,
  pillClassForPatch,
  pillClassForAccountStatus,
  PATCH_LABELS,
  REGULATORY_ACCENT,
} from "../lib/colors.js"
import { REGULATORY_SIGNAL_TYPES, HIGH_RELEVANCE_THRESHOLD } from "../lib/relevance.js"
import { matchesAccountCoverage } from "../lib/accountCoverage.js"
import { buildSignalReason, REASON_TONE_STYLES } from "../lib/signalReason.js"
import Checkbox from "./Checkbox.jsx"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const MAX_INLINE_PATCHES = 2

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number)
  return `${day} ${MONTHS[month - 1]} ${year}`
}

function formatShortDate(dateString) {
  const [, month, day] = dateString.split("-").map(Number)
  return `${day} ${MONTHS[month - 1]}`
}

function domainFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

// The accent that runs down the left edge of every card, and the tone dot on
// the reason line, are one decision (severity → relevance), resolved here
// once so the two can't disagree. Community origin is shown as a plain
// label elsewhere on the card instead of its own accent color — it's
// provenance, not a priority signal, and doesn't earn a third color.
function accentFor({ isRegulatory, isHighRelevance }) {
  if (isRegulatory) return { swatch: REGULATORY_ACCENT.swatch, title: "Regulatory / pain-point signal" }
  if (isHighRelevance) return { swatch: "bg-indigo-500", title: "High outreach relevance" }
  return null
}

function SignalRow({
  item,
  reviewed,
  onToggleReviewed,
  onOpen,
  selected,
  onToggleSelect,
  compact = false,
  showCheckbox = true,
}) {
  const [copied, setCopied] = useState(false)

  const isRegulatory = REGULATORY_SIGNAL_TYPES.has(item.signalType)
  const isHighRelevance = (item.outreachRelevance ?? 0) >= HIGH_RELEVANCE_THRESHOLD
  const isCommunity = item.origin === "community"

  const patches = item.patches ?? []
  const matchedAccounts = item.matchedAccounts ?? []
  const owningAes = item.owningAes ?? []
  const isUnassigned = matchesAccountCoverage(item, "unassigned")

  const reason = buildSignalReason(item)
  const toneStyles = REASON_TONE_STYLES[reason.tone] ?? REASON_TONE_STYLES.neutral
  const accent = accentFor({ isRegulatory, isHighRelevance })

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${item.headline}\n\n${item.summary}\n${item.sourceUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard access can be denied by the browser; fail silently.
    }
  }

  // Compact / table mode: one aligned row per signal, tuned for scanning a
  // long feed at speed (the Stripe/Clay table posture). Colour is stripped
  // back to just the priority tone dot and the relevance figure — everything
  // else that a comfortable card spells out in pills is one open away.
  if (compact) {
    return (
      <article
        className={`group flex items-center gap-3 rounded-md border bg-white/60 px-3 py-2 backdrop-blur-sm transition-colors dark:bg-zinc-900/60 ${
          reviewed
            ? "border-slate-200 opacity-60 dark:border-zinc-800"
            : "border-slate-200 hover:border-slate-300 dark:border-zinc-800 dark:hover:border-zinc-700"
        } ${selected ? "ring-2 ring-indigo-500/40" : ""}`}
      >
        {showCheckbox && (
          <Checkbox checked={selected} onChange={() => onToggleSelect(item.id)} label={`Select ${item.headline}`} />
        )}
        <span
          className={`h-2 w-2 flex-shrink-0 rounded-full ${accent ? accent.swatch : toneStyles.dot}`}
          title={reason.label}
          aria-hidden="true"
        />
        <time className="hidden w-16 flex-shrink-0 font-mono text-xs font-semibold tabular-nums text-slate-500 dark:text-zinc-400 sm:block">
          {formatShortDate(item.date)}
        </time>
        <span
          className={`hidden w-28 flex-shrink-0 truncate rounded-full px-2 py-0.5 text-center text-[11px] font-semibold capitalize md:inline-block ${pillClassForSignalType(item.signalType)}`}
        >
          {item.signalType}
        </span>
        <button
          type="button"
          onClick={() => onOpen(item.id)}
          className="min-w-0 flex-1 truncate text-left text-sm font-medium text-slate-800 transition-colors hover:text-indigo-600 dark:text-zinc-200 dark:hover:text-indigo-400"
          title={item.headline}
        >
          <span className="font-semibold text-slate-900 dark:text-zinc-50">{item.entity}</span>
          {" — "}
          {item.headline}
        </button>
        <span
          title={`Outreach relevance ${item.outreachRelevance ?? "—"} / 5`}
          className={`flex-shrink-0 font-mono text-xs font-semibold tabular-nums ${
            isHighRelevance ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-zinc-500"
          }`}
        >
          R{item.outreachRelevance ?? "—"}
        </span>
        {item.sourceUrl && (
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden flex-shrink-0 text-xs font-medium text-slate-400 hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-indigo-400 lg:block"
          >
            {domainFromUrl(item.sourceUrl)} &#8599;
          </a>
        )}
        <button
          type="button"
          onClick={() => onToggleReviewed(item.id)}
          title={reviewed ? "Mark as not yet reviewed" : "Mark as reviewed"}
          className={`flex-shrink-0 rounded-md border px-2 py-1 text-xs font-medium transition-colors ${
            reviewed
              ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
              : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
          }`}
        >
          {reviewed ? "Reviewed" : "Review"}
        </button>
      </article>
    )
  }

  // Comfortable mode. Practice-area and scope pills that used to sit in the
  // metadata row have moved into the detail panel — the reason line below the
  // headline now carries the "why act, and whose account" read those pills
  // were standing in for, so the card face is both leaner and more directed.
  return (
    <article
      className={`group relative flex gap-3 overflow-hidden rounded-lg border bg-white/60 p-4 backdrop-blur-sm transition-all duration-200 ease-spring hover:-translate-y-0.5 dark:bg-zinc-900/60 ${
        reviewed
          ? "border-slate-200 opacity-60 dark:border-zinc-800"
          : "border-slate-200 hover:border-slate-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-zinc-700"
      } ${selected ? "ring-2 ring-indigo-500/40" : ""}`}
    >
      {accent && (
        <span
          aria-hidden="true"
          title={accent.title}
          className={`absolute inset-y-0 left-0 w-1 ${accent.swatch}`}
        />
      )}

      {showCheckbox && (
        <div className="pt-1">
          <Checkbox checked={selected} onChange={() => onToggleSelect(item.id)} label={`Select ${item.headline}`} />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <time className="font-mono text-xs font-semibold tabular-nums text-slate-500 dark:text-zinc-400">
            {formatDate(item.date)}
          </time>
          {isCommunity && (
            <span
              title="Sourced from community research (last30days), not the news pipeline"
              className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-500 dark:border-zinc-700 dark:text-zinc-400"
            >
              Community
            </span>
          )}
          <span
            title={`Signal type: ${item.signalType}`}
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${pillClassForSignalType(item.signalType)}`}
          >
            {item.signalType}
          </span>
          {item.sourceUrl && (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs font-medium text-slate-400 hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-indigo-400"
            >
              {domainFromUrl(item.sourceUrl)} &#8599;
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => onOpen(item.id)}
          className="mb-1.5 block text-left text-[15px] font-semibold leading-snug text-slate-900 transition-colors hover:text-indigo-600 dark:text-zinc-50 dark:hover:text-indigo-400"
        >
          {item.headline}
        </button>

        {/* Why this signal is where it is in the feed — the per-item rationale
            (Rhythm / 6sense) that turns a ranked list into an explained one. */}
        <p className={`mb-2 flex items-center gap-1.5 text-xs font-medium ${toneStyles.text}`}>
          <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${toneStyles.dot}`} aria-hidden="true" />
          {reason.label}
        </p>

        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">{item.summary}</p>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-[11px] font-semibold text-violet-600 dark:text-violet-400">
            {item.entity}
          </span>

          {matchedAccounts.length > 0 && (
            <span
              title={
                `${item.accountStatus === "customer" ? "Existing customer" : "Prospect"} in ` +
                `${owningAes.length ? owningAes.join(" / ") : "the"} territory: ` +
                matchedAccounts.join(", ")
              }
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${pillClassForAccountStatus(item.accountStatus)}`}
            >
              {item.accountStatus === "customer" ? "Customer" : "Prospect"}
              {owningAes.length > 0 && ` · ${owningAes.join(" / ")}`}
            </span>
          )}

          {isUnassigned && (
            <span
              title="Unassigned — this company matched no account in the territory book"
              className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400"
            >
              Unassigned
            </span>
          )}

          {patches.slice(0, MAX_INLINE_PATCHES).map((patch) => (
            <span
              key={patch}
              title={`Patch: ${PATCH_LABELS[patch] ?? patch}`}
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${pillClassForPatch(patch)}`}
            >
              {PATCH_LABELS[patch] ?? patch}
            </span>
          ))}
          {patches.length > MAX_INLINE_PATCHES && (
            <span
              title={`Also: ${patches
                .slice(MAX_INLINE_PATCHES)
                .map((p) => PATCH_LABELS[p] ?? p)
                .join(", ")}`}
              className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-500 dark:border-zinc-700 dark:text-zinc-400"
            >
              +{patches.length - MAX_INLINE_PATCHES}
            </span>
          )}

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
