import { useMemo, useState } from "react"
import { linkProps } from "../lib/router.js"
import { deriveAccounts } from "../lib/accountModel.js"
import { SIGNAL_GROUPS, countByGroup, filterByGroup, iconForSignal, groupForSignal } from "../lib/signalGroups.js"
import { PATCH_LABELS, PATCHES, AE_NAMES } from "../../shared/patches.js"
import { pillClassForSignalType } from "../lib/colors.js"
import { HIGH_RELEVANCE_THRESHOLD } from "../lib/relevance.js"
import {
  PageHeader,
  Card,
  Button,
  Pill,
  ScoreBadge,
  AccountAvatar,
  TabStrip,
  FilterSelect,
  SearchInput,
  Pagination,
  EmptyState,
  SectionTitle,
} from "../components/ui.jsx"
import { DownloadIcon, ChevronDownIcon } from "../components/icons.jsx"
import SkeletonRow from "../components/SkeletonRow.jsx"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number)
  return `${String(day).padStart(2, "0")} ${MONTHS[month - 1]} ${year}`
}

const RANGE_OPTIONS = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
]

function withinRange(signal, days) {
  if (!days) return true
  const cutoff = new Date()
  cutoff.setHours(0, 0, 0, 0)
  cutoff.setDate(cutoff.getDate() - Number(days))
  return new Date(`${signal.date}T00:00:00`) >= cutoff
}

// One account block: a header row carrying the account's identity and
// rollup, then its individual signals nested beneath. The nesting is what
// makes this different from a flat feed — it answers "what is happening
// at each account" rather than "what happened most recently".
function AccountBlock({ account, signals, onOpenSignal }) {
  const [expanded, setExpanded] = useState(true)
  const visible = expanded ? signals : signals.slice(0, 3)

  return (
    <div className="border-b border-slate-200 last:border-b-0 dark:border-zinc-800">
      <div className="flex items-start gap-3 bg-slate-50/70 px-4 py-3 dark:bg-zinc-900/40">
        <AccountAvatar name={account.name} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <a
              {...linkProps(`/accounts/${encodeURIComponent(account.key)}`)}
              className="truncate text-[14px] font-semibold text-slate-900 hover:text-indigo-600 dark:text-zinc-50 dark:hover:text-indigo-400"
            >
              {account.name}
            </a>
            {account.status && (
              <Pill tone={account.status === "customer" ? "emerald" : "amber"}>
                {account.status === "customer" ? "Customer" : "Prospect"}
              </Pill>
            )}
            {!account.managed && <Pill tone="slate">Unassigned</Pill>}
            <span className="text-[12px] text-slate-400 dark:text-zinc-500">
              {[
                account.patches.map((p) => PATCH_LABELS[p] ?? p).join(", "),
                account.aes.join(", "),
              ]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </div>
          <p className="mt-0.5 truncate text-[12px] text-slate-500 dark:text-zinc-400">{account.rollup}</p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <ScoreBadge score={account.score} size="sm" />
          <Pill tone="slate">
            {signals.length} {signals.length === 1 ? "Signal" : "Signals"}
          </Pill>
        </div>
      </div>

      <ul>
        {visible.map((signal) => {
          const Icon = iconForSignal(signal)
          const isHigh = (signal.outreachRelevance ?? 0) >= HIGH_RELEVANCE_THRESHOLD
          return (
            <li key={signal.id}>
              <button
                type="button"
                onClick={() => onOpenSignal(signal.id)}
                className="flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800/40"
              >
                <span
                  className={`mt-0.5 inline-flex flex-shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium ${pillClassForSignalType(signal.signalType)}`}
                >
                  <Icon className="h-3 w-3" />
                  {signal.signalType}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] text-slate-700 dark:text-zinc-200">
                    {signal.headline}
                  </span>
                </span>
                {isHigh && <Pill tone="indigo">High</Pill>}
                <span className="flex-shrink-0 text-[12px] tabular-nums text-slate-400 dark:text-zinc-500">
                  {formatDate(signal.date)}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {signals.length > 3 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-center gap-1 px-4 py-2 text-[12px] font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800/40 dark:hover:text-zinc-100"
        >
          <ChevronDownIcon className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
          {expanded ? "Show fewer" : `Show all ${signals.length} signals`}
        </button>
      )}
    </div>
  )
}

function GlobalFeed({ signals, loading, onOpenSignal }) {
  const [search, setSearch] = useState("")
  const [owner, setOwner] = useState(null)
  const [type, setType] = useState(null)
  const [priority, setPriority] = useState(null)
  const [patch, setPatch] = useState(null)
  const [range, setRange] = useState("30")
  const [group, setGroup] = useState("all")
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const scoped = useMemo(() => signals.filter((s) => withinRange(s, range)), [signals, range])

  const accounts = useMemo(() => deriveAccounts(scoped), [scoped])

  const filteredAccounts = useMemo(() => {
    const query = search.trim().toLowerCase()
    return accounts.filter((account) => {
      if (owner && !account.aes.includes(owner)) return false
      if (patch && !account.patches.includes(patch)) return false
      if (priority && account.priority.id !== priority) return false
      if (type === "customer" && account.status !== "customer") return false
      if (type === "prospect" && account.status !== "prospect") return false
      if (type === "unassigned" && account.managed) return false
      if (query) {
        const haystack = `${account.name} ${account.signals.map((s) => s.headline).join(" ")}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }
      // A group filter narrows to accounts that have at least one signal
      // in that group — an account whose every signal is filtered out
      // shouldn't render as an empty block.
      if (group !== "all" && !account.signals.some((s) => groupForSignal(s) === group)) return false
      return true
    })
  }, [accounts, owner, patch, priority, type, search, group])

  const groupCounts = useMemo(() => countByGroup(scoped), [scoped])

  const tabs = useMemo(
    () => [
      { id: "all", label: "All", count: groupCounts.all },
      ...SIGNAL_GROUPS.map((g) => ({ id: g.id, label: g.label, count: groupCounts[g.id] ?? 0 })),
    ],
    [groupCounts],
  )

  const pageAccounts = filteredAccounts.slice(page * pageSize, (page + 1) * pageSize)

  const handleExport = () => {
    const header = ["Account", "Status", "Owner", "Patches", "Score", "Priority", "Signals", "Last signal"]
    const rows = filteredAccounts.map((a) => [
      a.name,
      a.status ?? "unassigned",
      a.aes.join("; "),
      a.patches.map((p) => PATCH_LABELS[p] ?? p).join("; "),
      a.score,
      a.priority.label,
      a.signalCount,
      a.lastSignalDate ?? "",
    ])
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `accounts-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <PageHeader
        title="Global Feed"
        actions={
          <Button variant="outline" onClick={handleExport} disabled={!filteredAccounts.length}>
            <DownloadIcon className="h-4 w-4" />
            Export Accounts
          </Button>
        }
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <SearchInput value={search} onChange={setSearch} placeholder="Search..." className="col-span-2 sm:col-span-1" />
          <FilterSelect
            label="Owner"
            value={owner}
            onChange={setOwner}
            options={AE_NAMES.map((name) => ({ value: name, label: name }))}
          />
          <FilterSelect
            label="Type"
            value={type}
            onChange={setType}
            options={[
              { value: "customer", label: "Customer" },
              { value: "prospect", label: "Prospect" },
              { value: "unassigned", label: "Unassigned" },
            ]}
          />
          <FilterSelect
            label="Priority"
            value={priority}
            onChange={setPriority}
            options={[
              { value: "p1", label: "P1" },
              { value: "p2", label: "P2" },
              { value: "p3", label: "P3" },
              { value: "none", label: "No Priority" },
            ]}
          />
          <FilterSelect
            label="Patch"
            value={patch}
            onChange={setPatch}
            options={PATCHES.map((p) => ({ value: p, label: PATCH_LABELS[p] }))}
          />
          <FilterSelect label="Date range" value={range} onChange={(v) => setRange(v ?? "30")} options={RANGE_OPTIONS} />
        </div>
      </PageHeader>

      <SectionTitle hint="Signals grouped by the account they name. Accounts with no territory-book match appear as Unassigned — companies in the news that nobody is covering.">
        Recent Account Signals
      </SectionTitle>

      <Card className="overflow-hidden">
        <div className="px-4 pt-2">
          <TabStrip
            tabs={tabs}
            active={group}
            onChange={(id) => {
              setGroup(id)
              setPage(0)
            }}
          />
        </div>

        {loading ? (
          <div className="space-y-3 p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : pageAccounts.length === 0 ? (
          <EmptyState
            title="No accounts match these filters"
            description="Try widening the date range or clearing a filter — macro-scope market signals name no company, so they never produce an account row."
          />
        ) : (
          <div>
            {pageAccounts.map((account) => (
              <AccountBlock
                key={account.key}
                account={account}
                signals={filterByGroup(account.signals, group)}
                onOpenSignal={onOpenSignal}
              />
            ))}
          </div>
        )}

        {filteredAccounts.length > 0 && (
          <div className="border-t border-slate-200 dark:border-zinc-800">
            <Pagination
              page={page}
              pageSize={pageSize}
              total={filteredAccounts.length}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size)
                setPage(0)
              }}
            />
          </div>
        )}
      </Card>
    </>
  )
}

export default GlobalFeed
