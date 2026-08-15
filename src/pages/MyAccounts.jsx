import { useMemo, useState } from "react"
import { PATCH_LABELS, PATCHES } from "../../shared/patches.js"
import { useLocalStorageState } from "../lib/useLocalStorageState.js"
import AccountsTable from "../components/AccountsTable.jsx"
import { PageHeader, FilterSelect, SearchInput, EmptyState, Card, Button } from "../components/ui.jsx"
import { PinIcon, DownloadIcon } from "../components/icons.jsx"

// The account list for whatever the SDR manually marked as theirs — found
// in the feed, on someone else's patch, or in the unassigned whitespace,
// and pinned so it's easy to find again without re-filtering the full
// Accounts table every time. Same columns and behaviour as Accounts, just
// pre-filtered to `claims` and sorted by claim date instead of score by
// default.
function MyAccounts({ accounts, claims, loading, isClaimed, onToggleClaim }) {
  const [search, setSearch] = useState("")
  const [patch, setPatch] = useState(null)
  const [starred, setStarred] = useLocalStorageState("sdr-dashboard-starred-accounts", [])
  const toggleStar = (key) => {
    setStarred((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  const claimedByKey = useMemo(() => new Map(claims.map((c) => [c.accountKey, c])), [claims])

  const claimedAccounts = useMemo(
    () => accounts.filter((account) => claimedByKey.has(account.key)),
    [accounts, claimedByKey],
  )

  // Claims that don't resolve to a live account (its signals aged out of
  // the derived set, or it hasn't been re-derived yet after a rename) —
  // surfaced rather than silently dropped, since the claim itself is
  // still real and the SDR would otherwise wonder where it went.
  const orphanedClaims = useMemo(
    () => claims.filter((c) => !accounts.some((a) => a.key === c.accountKey)),
    [claims, accounts],
  )

  const claimedAtLookup = (key) => claimedByKey.get(key)?.claimedAt ?? null

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return claimedAccounts.filter((account) => {
      if (patch && !account.patches.includes(patch)) return false
      if (query && !account.name.toLowerCase().includes(query)) return false
      return true
    })
  }, [claimedAccounts, patch, search])

  const handleExport = () => {
    const header = ["Account", "Status", "Owner", "Patches", "Signals", "Priority", "Score", "Claimed on"]
    const rows = filtered.map((a) => [
      a.name,
      a.status ?? "unassigned",
      a.aes.join("; "),
      a.patches.map((p) => PATCH_LABELS[p] ?? p).join("; "),
      a.signalCount,
      a.priority.label,
      a.score,
      (claimedAtLookup(a.key) ?? "").slice(0, 10),
    ])
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `my-accounts-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <PageHeader
        title="My Accounts"
        actions={
          <Button variant="outline" onClick={handleExport} disabled={!filtered.length}>
            <DownloadIcon className="h-4 w-4" />
            Export
          </Button>
        }
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <SearchInput value={search} onChange={setSearch} placeholder="Search my accounts..." className="col-span-2 sm:col-span-1" />
          <FilterSelect
            label="Patch"
            value={patch}
            onChange={setPatch}
            options={PATCHES.map((p) => ({ value: p, label: PATCH_LABELS[p] }))}
          />
        </div>
      </PageHeader>

      {claims.length === 0 && !loading ? (
        <Card>
          <EmptyState
            title="No accounts claimed yet"
            description={
              'Found a good account — unassigned, or on someone else’s patch — that you want to track as your own? Open it and click the pin icon (or "Add to My Accounts") on its page, or on any row in the Accounts table, to add it here.'
            }
          />
        </Card>
      ) : (
        <>
          <AccountsTable
            accounts={filtered}
            loading={loading}
            starred={starred}
            onToggleStar={toggleStar}
            isClaimed={isClaimed}
            claimedAt={claimedAtLookup}
            onToggleClaim={onToggleClaim}
            columnsStorageKey="sdr-dashboard-my-account-columns"
            defaultColumns={["type", "owner", "patch", "signals", "priority", "claimed"]}
            showClaimedColumn
            defaultSort={{ key: "claimed", dir: "desc" }}
            emptyTitle="No claimed accounts match these filters"
            emptyDescription="Clear the search or patch filter to see everything you've claimed."
          />

          {orphanedClaims.length > 0 && (
            <Card className="mt-4 p-4">
              <p className="flex items-center gap-1.5 text-[13px] font-medium text-slate-700 dark:text-zinc-300">
                <PinIcon className="h-4 w-4 text-slate-400 dark:text-zinc-500" />
                {orphanedClaims.length} claimed {orphanedClaims.length === 1 ? "account has" : "accounts have"} no current signals
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-500 dark:text-zinc-400">
                Still claimed, just nothing recent to show a row for: {orphanedClaims.map((c) => c.accountName).join(", ")}.
              </p>
            </Card>
          )}
        </>
      )}
    </>
  )
}

export default MyAccounts
