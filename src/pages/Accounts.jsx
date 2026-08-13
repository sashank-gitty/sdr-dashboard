import { useMemo, useState } from "react"
import { linkProps } from "../lib/router.js"
import { deriveAccounts } from "../lib/accountModel.js"
import { PATCH_LABELS, PATCHES, AE_NAMES } from "../../shared/patches.js"
import { useLocalStorageState } from "../lib/useLocalStorageState.js"
import {
  PageHeader,
  Card,
  Button,
  Pill,
  ScoreBadge,
  PriorityPill,
  AccountAvatar,
  FilterSelect,
  SearchInput,
  Pagination,
  EmptyState,
} from "../components/ui.jsx"
import { StarIcon, EyeIcon, ChevronDownIcon, DownloadIcon } from "../components/icons.jsx"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function formatDate(dateString) {
  if (!dateString) return "—"
  const [year, month, day] = dateString.split("-").map(Number)
  return `${String(day).padStart(2, "0")} ${MONTHS[month - 1]} ${year}`
}

// Every column the table can show. `always` columns can't be hidden —
// without a name and a score the row stops being identifiable or
// rankable, which is the whole point of the table.
const COLUMNS = [
  { id: "name", label: "Name", always: true },
  { id: "type", label: "Type" },
  { id: "owner", label: "Owner" },
  { id: "patch", label: "Patch" },
  { id: "signals", label: "Signals" },
  { id: "priority", label: "Priority" },
  { id: "score", label: "Score", always: true },
  { id: "lastSignal", label: "Last Signal" },
  { id: "firstSeen", label: "First Seen" },
]

const SORTABLE = {
  name: (a, b) => a.name.localeCompare(b.name),
  signals: (a, b) => a.signalCount - b.signalCount,
  score: (a, b) => a.score - b.score,
  lastSignal: (a, b) => String(a.lastSignalDate ?? "").localeCompare(String(b.lastSignalDate ?? "")),
  firstSeen: (a, b) => String(a.firstSeen ?? "").localeCompare(String(b.firstSeen ?? "")),
  priority: (a, b) => a.score - b.score,
}

function ColumnsMenu({ visible, onToggle }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <Button variant="ghost" onClick={() => setOpen((v) => !v)}>
        <EyeIcon className="h-4 w-4" />
        Columns
        <ChevronDownIcon className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute right-0 z-20 mt-1 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            {COLUMNS.map((column) => (
              <label
                key={column.id}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] ${
                  column.always
                    ? "cursor-not-allowed text-slate-400 dark:text-zinc-600"
                    : "cursor-pointer text-slate-700 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                <input
                  type="checkbox"
                  checked={column.always || visible.includes(column.id)}
                  disabled={column.always}
                  onChange={() => onToggle(column.id)}
                  className="h-3.5 w-3.5 accent-indigo-600"
                />
                {column.label}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function Accounts({ signals, loading }) {
  const [search, setSearch] = useState("")
  const [owner, setOwner] = useState(null)
  const [type, setType] = useState(null)
  const [priority, setPriority] = useState(null)
  const [patch, setPatch] = useState(null)
  const [minScore, setMinScore] = useState(null)
  const [sort, setSort] = useState({ key: "score", dir: "desc" })
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(25)

  const [starred, setStarred] = useLocalStorageState("sdr-dashboard-starred-accounts", [])
  const [visibleColumns, setVisibleColumns] = useLocalStorageState("sdr-dashboard-account-columns", [
    "type",
    "owner",
    "patch",
    "signals",
    "priority",
    "lastSignal",
  ])

  const accounts = useMemo(() => deriveAccounts(signals), [signals])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    const result = accounts.filter((account) => {
      if (owner && !account.aes.includes(owner)) return false
      if (patch && !account.patches.includes(patch)) return false
      if (priority && account.priority.id !== priority) return false
      if (minScore && account.score < Number(minScore)) return false
      if (type === "customer" && account.status !== "customer") return false
      if (type === "prospect" && account.status !== "prospect") return false
      if (type === "unassigned" && account.managed) return false
      if (type === "starred" && !starred.includes(account.key)) return false
      if (query && !account.name.toLowerCase().includes(query)) return false
      return true
    })

    const comparator = SORTABLE[sort.key]
    if (comparator) {
      result.sort((a, b) => (sort.dir === "asc" ? comparator(a, b) : comparator(b, a)))
    }
    return result
  }, [accounts, owner, patch, priority, minScore, type, search, starred, sort])

  const pageRows = filtered.slice(page * pageSize, (page + 1) * pageSize)

  const toggleStar = (key) => {
    setStarred((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  const toggleColumn = (id) => {
    setVisibleColumns((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))
  }

  const shows = (id) => COLUMNS.find((c) => c.id === id)?.always || visibleColumns.includes(id)

  const handleSort = (key) => {
    if (!SORTABLE[key]) return
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" }))
  }

  const handleExport = () => {
    const header = ["Account", "Status", "Owner", "Patches", "Signals", "Priority", "Score", "Last signal"]
    const rows = filtered.map((a) => [
      a.name,
      a.status ?? "unassigned",
      a.aes.join("; "),
      a.patches.map((p) => PATCH_LABELS[p] ?? p).join("; "),
      a.signalCount,
      a.priority.label,
      a.score,
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

  const SortHeader = ({ id, label, className = "" }) => (
    <th scope="col" className={`px-3 py-2.5 text-left font-medium ${className}`}>
      {SORTABLE[id] ? (
        <button
          type="button"
          onClick={() => handleSort(id)}
          className={`inline-flex items-center gap-1 transition-colors hover:text-slate-900 dark:hover:text-zinc-100 ${
            sort.key === id ? "text-slate-900 dark:text-zinc-100" : ""
          }`}
        >
          {label}
          {sort.key === id && (
            <ChevronDownIcon className={`h-3 w-3 transition-transform ${sort.dir === "asc" ? "rotate-180" : ""}`} />
          )}
        </button>
      ) : (
        label
      )}
    </th>
  )

  return (
    <>
      <PageHeader
        title="Accounts"
        actions={
          <Button variant="outline" onClick={handleExport} disabled={!filtered.length}>
            <DownloadIcon className="h-4 w-4" />
            Export
          </Button>
        }
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <SearchInput value={search} onChange={setSearch} placeholder="Search accounts..." className="col-span-2 sm:col-span-1" />
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
              { value: "starred", label: "Starred" },
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
          <FilterSelect
            label="Min score"
            value={minScore}
            onChange={setMinScore}
            options={[
              { value: "80", label: "80+" },
              { value: "55", label: "55+" },
              { value: "25", label: "25+" },
            ]}
          />
        </div>
      </PageHeader>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2 dark:border-zinc-800">
          <p className="px-1 text-[12px] text-slate-500 dark:text-zinc-400">
            <span className="font-semibold tabular-nums text-slate-900 dark:text-zinc-100">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "account" : "accounts"}
          </p>
          <ColumnsMenu visible={visibleColumns} onToggle={toggleColumn} />
        </div>

        {loading ? (
          <div className="space-y-2 p-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-11 animate-pulse rounded-lg bg-slate-100 dark:bg-zinc-800/60" />
            ))}
          </div>
        ) : pageRows.length === 0 ? (
          <EmptyState
            title="No accounts match these filters"
            description="Accounts are derived from signals that name a company. Only macro-scope market signals produce none at all."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-[13px]">
              <thead className="border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 dark:border-zinc-800 dark:text-zinc-400">
                <tr>
                  <SortHeader id="name" label="Name" className="pl-4" />
                  {shows("type") && <SortHeader id="type" label="Type" />}
                  {shows("owner") && <SortHeader id="owner" label="Owner" />}
                  {shows("patch") && <SortHeader id="patch" label="Patch" />}
                  {shows("signals") && <SortHeader id="signals" label="Signals" />}
                  {shows("priority") && <SortHeader id="priority" label="Priority" />}
                  <SortHeader id="score" label="Score" />
                  {shows("lastSignal") && <SortHeader id="lastSignal" label="Last Signal" />}
                  {shows("firstSeen") && <SortHeader id="firstSeen" label="First Seen" />}
                  <th scope="col" className="w-10 px-3 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/70">
                {pageRows.map((account) => (
                  <tr key={account.key} className="transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800/40">
                    <td className="py-2 pl-4 pr-3">
                      <a
                        {...linkProps(`/accounts/${encodeURIComponent(account.key)}`)}
                        className="flex items-center gap-2.5"
                      >
                        <AccountAvatar name={account.name} size="sm" />
                        <span className="truncate font-medium text-slate-900 hover:text-indigo-600 dark:text-zinc-100 dark:hover:text-indigo-400">
                          {account.name}
                        </span>
                      </a>
                    </td>
                    {shows("type") && (
                      <td className="px-3 py-2">
                        {account.status ? (
                          <Pill tone={account.status === "customer" ? "emerald" : "amber"}>
                            {account.status === "customer" ? "Customer" : "Prospect"}
                          </Pill>
                        ) : (
                          <Pill tone="slate">Unassigned</Pill>
                        )}
                      </td>
                    )}
                    {shows("owner") && (
                      <td className="px-3 py-2 text-slate-600 dark:text-zinc-300">
                        {account.aes.length ? account.aes.join(", ") : <span className="text-slate-400 dark:text-zinc-600">—</span>}
                      </td>
                    )}
                    {shows("patch") && (
                      <td className="px-3 py-2 text-slate-600 dark:text-zinc-300">
                        {account.patches.length ? (
                          account.patches.map((p) => PATCH_LABELS[p] ?? p).join(", ")
                        ) : (
                          <span className="text-slate-400 dark:text-zinc-600">—</span>
                        )}
                      </td>
                    )}
                    {shows("signals") && (
                      <td className="px-3 py-2 tabular-nums text-slate-600 dark:text-zinc-300">
                        {account.signalCount}
                        {account.highRelevanceCount > 0 && (
                          <span className="ml-1.5 text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                            {account.highRelevanceCount} high
                          </span>
                        )}
                      </td>
                    )}
                    {shows("priority") && (
                      <td className="px-3 py-2">
                        <PriorityPill priority={account.priority} />
                      </td>
                    )}
                    <td className="px-3 py-2">
                      <ScoreBadge score={account.score} size="sm" />
                    </td>
                    {shows("lastSignal") && (
                      <td className="px-3 py-2 whitespace-nowrap tabular-nums text-slate-500 dark:text-zinc-400">
                        {formatDate(account.lastSignalDate)}
                      </td>
                    )}
                    {shows("firstSeen") && (
                      <td className="px-3 py-2 whitespace-nowrap tabular-nums text-slate-500 dark:text-zinc-400">
                        {formatDate(account.firstSeen)}
                      </td>
                    )}
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => toggleStar(account.key)}
                        aria-label={starred.includes(account.key) ? "Unstar account" : "Star account"}
                        aria-pressed={starred.includes(account.key)}
                        className={`transition-colors ${
                          starred.includes(account.key)
                            ? "text-amber-400 hover:text-amber-500"
                            : "text-slate-300 hover:text-slate-500 dark:text-zinc-600 dark:hover:text-zinc-400"
                        }`}
                      >
                        <StarIcon filled={starred.includes(account.key)} className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="border-t border-slate-200 dark:border-zinc-800">
            <Pagination
              page={page}
              pageSize={pageSize}
              total={filtered.length}
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

export default Accounts
