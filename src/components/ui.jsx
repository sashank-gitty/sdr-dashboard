import { useEffect, useRef, useState } from "react"
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon } from "./icons.jsx"

// Shared presentational primitives. Everything here is stateless styling
// or self-contained interaction — no data shape from this app leaks in,
// so the same components serve the feed, the account table and search.

export function PageHeader({ title, actions, children }) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-zinc-50">{title}</h1>
        {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}

export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function SectionTitle({ children, hint }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-zinc-50">{children}</h2>
      {hint && (
        <span
          title={hint}
          className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-slate-300 text-[10px] font-semibold text-slate-400 dark:border-zinc-600 dark:text-zinc-500"
        >
          i
        </span>
      )}
    </div>
  )
}

export function Button({ variant = "secondary", className = "", children, ...props }) {
  const variants = {
    primary:
      "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700 disabled:bg-slate-200 disabled:border-slate-200 disabled:text-slate-400 dark:disabled:bg-zinc-800 dark:disabled:border-zinc-800 dark:disabled:text-zinc-600",
    secondary:
      "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:text-slate-900 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:text-zinc-100",
    outline:
      "bg-transparent text-indigo-600 border-indigo-500/40 hover:bg-indigo-500/5 hover:border-indigo-500/60 dark:text-indigo-400",
    ghost:
      "bg-transparent text-slate-500 border-transparent hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
  }
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Pill({ tone = "slate", className = "", children }) {
  const tones = {
    slate: "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-zinc-400 dark:border-zinc-600/40",
    indigo: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400",
    emerald: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
    amber: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
    rose: "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",
    sky: "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400",
    violet: "bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400",
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium whitespace-nowrap ${tones[tone] ?? tones.slate} ${className}`}
    >
      {children}
    </span>
  )
}

// The account score, rendered as the reference product does it: a filled
// disc whose tint tracks the number, so a table can be scanned by color
// before any digit is read.
export function ScoreBadge({ score, size = "md" }) {
  const tone =
    score >= 80
      ? "bg-indigo-600 text-white"
      : score >= 55
        ? "bg-indigo-500/20 text-indigo-700 dark:bg-indigo-500/25 dark:text-indigo-300"
        : score >= 25
          ? "bg-slate-200 text-slate-600 dark:bg-zinc-700 dark:text-zinc-300"
          : "bg-slate-100 text-slate-400 dark:bg-zinc-800 dark:text-zinc-500"
  const sizes = {
    sm: "h-6 w-6 text-[10px]",
    md: "h-7 w-7 text-[11px]",
    lg: "h-10 w-10 text-sm",
  }
  return (
    <span
      title={`Account score ${score} / 100`}
      className={`inline-flex flex-shrink-0 items-center justify-center rounded-full font-bold tabular-nums ${tone} ${sizes[size]}`}
    >
      {score}
    </span>
  )
}

export function PriorityPill({ priority }) {
  const tones = { p1: "emerald", p2: "amber", p3: "rose", none: "slate" }
  const arrows = { p1: "⌃", p2: "⌃", p3: "⌄", none: "" }
  return (
    <Pill tone={tones[priority.id]}>
      {arrows[priority.id] && <span aria-hidden="true">{arrows[priority.id]}</span>}
      {priority.label}
    </Pill>
  )
}

// Company mark. No logo CDN is reachable from this app and inventing one
// would mean hotlinking third-party assets, so this derives a stable
// monogram + hue from the name instead. Same input always yields the same
// swatch, which is what makes a table scannable.
export function AccountAvatar({ name, size = "md" }) {
  const hues = [
    "bg-indigo-500",
    "bg-sky-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-violet-500",
    "bg-teal-500",
    "bg-fuchsia-500",
  ]
  let hash = 0
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash << 5) - hash + name.charCodeAt(i)
    hash |= 0
  }
  const hue = hues[Math.abs(hash) % hues.length]
  const initials = name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const sizes = { sm: "h-6 w-6 text-[10px]", md: "h-8 w-8 text-[11px]", lg: "h-12 w-12 text-base" }
  return (
    <span
      aria-hidden="true"
      className={`inline-flex flex-shrink-0 items-center justify-center rounded-lg font-bold text-white ${hue} ${sizes[size]}`}
    >
      {initials || "?"}
    </span>
  )
}

// Horizontal tab strip with counts. Scrolls rather than wraps: the strip
// is a single row in the reference product and wrapping it would push the
// list content down unpredictably as counts change.
export function TabStrip({ tabs, active, onChange, className = "" }) {
  return (
    <div className={`-mx-1 overflow-x-auto scrollbar-thin ${className}`}>
      <div className="flex min-w-max items-center gap-1 border-b border-slate-200 px-1 dark:border-zinc-800">
        {tabs.map((tab) => {
          const isActive = tab.id === active
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              aria-current={isActive ? "true" : undefined}
              className={`relative inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-2.5 text-[13px] font-medium transition-colors ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`inline-flex h-4 min-w-4 items-center justify-center rounded px-1 text-[10px] font-semibold tabular-nums ${
                    isActive
                      ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400"
                      : "bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:text-zinc-400"
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {isActive && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-indigo-500" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Sub-navigation for the account detail page — same role as the tab strip
// but without counts and without the underline rail, matching how the
// reference product separates "which record" from "which slice of it".
export function SubNav({ tabs, active, onChange }) {
  return (
    <div className="-mx-1 overflow-x-auto scrollbar-thin">
      <div className="flex min-w-max items-center gap-1 px-1">
        {tabs.map((tab) => {
          const isActive = tab.id === active
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100"
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Filter dropdown. A native <select> under a styled shell: it gets the
// platform's own picker on touch devices for free, which a custom
// listbox would have to reimplement badly.
export function FilterSelect({ label, value, options, onChange, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        aria-label={label}
        className={`w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-[13px] outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 ${
          value ? "text-slate-900 dark:text-zinc-100" : "text-slate-400 dark:text-zinc-500"
        }`}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-slate-900 dark:text-zinc-100">
            {option.label}
            {option.count !== undefined ? ` (${option.count})` : ""}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
    </div>
  )
}

export function SearchInput({ value, onChange, placeholder = "Search...", className = "", inputRef }) {
  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-[13px] text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
      />
    </div>
  )
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-2.5"
    >
      <span
        className={`relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors ${
          checked ? "bg-indigo-600" : "bg-slate-300 dark:bg-zinc-700"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-0.5"
          }`}
        />
      </span>
      {label && <span className="text-[13px] text-slate-700 dark:text-zinc-300">{label}</span>}
    </button>
  )
}

export function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }) {
  const from = total === 0 ? 0 : page * pageSize + 1
  const to = Math.min(total, (page + 1) * pageSize)
  const lastPage = Math.max(0, Math.ceil(total / pageSize) - 1)

  return (
    <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 px-4 py-3 text-[12px] text-slate-500 dark:text-zinc-400">
      <label className="flex items-center gap-2">
        Rows per page:
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded border border-slate-200 bg-white px-1.5 py-1 text-[12px] text-slate-700 outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>

      <span className="tabular-nums">
        {from}&ndash;{to} of {total}
      </span>

      <div className="flex items-center gap-0.5">
        <PagerButton onClick={() => onPageChange(0)} disabled={page === 0} label="First page">
          <ChevronLeftIcon className="h-3.5 w-3.5" />
          <ChevronLeftIcon className="-ml-2.5 h-3.5 w-3.5" />
        </PagerButton>
        <PagerButton onClick={() => onPageChange(page - 1)} disabled={page === 0} label="Previous page">
          <ChevronLeftIcon className="h-4 w-4" />
        </PagerButton>
        <PagerButton onClick={() => onPageChange(page + 1)} disabled={page >= lastPage} label="Next page">
          <ChevronRightIcon className="h-4 w-4" />
        </PagerButton>
        <PagerButton onClick={() => onPageChange(lastPage)} disabled={page >= lastPage} label="Last page">
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <ChevronRightIcon className="-ml-2.5 h-3.5 w-3.5" />
        </PagerButton>
      </div>
    </div>
  )
}

function PagerButton({ onClick, disabled, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-7 w-7 items-center justify-center rounded text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
    >
      {children}
    </button>
  )
}

// Shown wherever a panel exists in the reference layout but this
// pipeline ingests nothing that could fill it. Naming the missing source
// explicitly is the point: an empty panel that explains itself is a
// roadmap item, while a silently blank one reads as a bug — and a
// plausibly-populated one would be a fabrication.
export function NotIngested({ title, sources, note }) {
  return (
    <Card className="p-6">
      <p className="text-sm font-semibold text-slate-900 dark:text-zinc-100">{title}</p>
      <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-slate-500 dark:text-zinc-400">{note}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {sources.map((source) => (
          <Pill key={source} tone="slate">
            {source}
          </Pill>
        ))}
      </div>
    </Card>
  )
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-semibold text-slate-900 dark:text-zinc-100">{title}</p>
      {description && <p className="mt-1 max-w-sm text-[13px] text-slate-500 dark:text-zinc-400">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

// Wraps every occurrence of `term` in the given text so search results
// and the detail drawer can show *why* a row matched. Returns an array of
// nodes rather than HTML — no dangerouslySetInnerHTML, so a headline
// containing markup can't inject anything.
export function Highlight({ text, term }) {
  if (!term || !text) return text ?? null
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const parts = String(text).split(new RegExp(`(${escaped})`, "gi"))
  return parts.map((part, index) =>
    part.toLowerCase() === term.toLowerCase() ? (
      <mark
        key={index}
        className="rounded-sm bg-indigo-500/20 px-0.5 font-medium text-indigo-700 dark:bg-indigo-500/30 dark:text-indigo-200"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

export function Modal({ open, onClose, title, children, footer }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] dark:bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
      >
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-zinc-50">{title}</h2>
        <div className="mt-4">{children}</div>
        {footer && <div className="mt-6 flex items-center gap-2">{footer}</div>}
      </div>
    </div>
  )
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-slate-500 dark:text-zinc-400">{label}</span>
      {children}
    </label>
  )
}

export function TextInput({ className = "", ...props }) {
  return (
    <input
      type="text"
      className={`w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 ${className}`}
      {...props}
    />
  )
}

export function Radio({ name, value, checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="h-4 w-4 accent-indigo-600"
      />
      <span className="text-[13px] text-slate-700 dark:text-zinc-300">{label}</span>
    </label>
  )
}

// Collapsible section used throughout the detail drawer.
export function Collapsible({ title, defaultOpen = true, action, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className="border-b border-slate-200 py-4 last:border-b-0 dark:border-zinc-800">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="inline-flex flex-1 items-center gap-2 text-left"
        >
          <ChevronDownIcon
            className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform dark:text-zinc-500 ${
              open ? "" : "-rotate-90"
            }`}
          />
          <h3 className="text-[15px] font-semibold text-slate-900 dark:text-zinc-50">{title}</h3>
        </button>
        {action}
      </div>
      {open && <div className="mt-3 pl-6">{children}</div>}
    </section>
  )
}
