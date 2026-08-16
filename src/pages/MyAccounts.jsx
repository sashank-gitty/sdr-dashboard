import { useMemo, useState } from "react"
import { PATCH_LABELS, PATCHES } from "../../shared/patches.js"
import { useLocalStorageState } from "../lib/useLocalStorageState.js"
import { accountKey } from "../lib/accountModel.js"
import AccountsTable from "../components/AccountsTable.jsx"
import {
  PageHeader,
  FilterSelect,
  SearchInput,
  EmptyState,
  Card,
  Button,
  Modal,
  Field,
  TextInput,
  Textarea,
  SectionTitle,
} from "../components/ui.jsx"
import { DownloadIcon, PlusIcon, TrashIcon } from "../components/icons.jsx"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function formatDate(dateString) {
  if (!dateString) return "—"
  const [year, month, day] = String(dateString).slice(0, 10).split("-").map(Number)
  return `${String(day).padStart(2, "0")} ${MONTHS[month - 1]} ${year}`
}

// The manual "add an account" flow King asked for, in place of writing
// company names into the Mac Notes app: a name and a reason for tracking
// it, saved through the same claim mechanism the pin icon already uses
// (see useClaims.js) so it lives in exactly one place going forward. No
// signal has to exist yet — that's the point. If news about it shows up
// later, it surfaces as a normal claimed account above; until then it
// shows in the "Added Manually" list below.
function AddAccountModal({ open, onClose, onAdd }) {
  const [name, setName] = useState("")
  const [note, setNote] = useState("")

  const handleClose = () => {
    setName("")
    setNote("")
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return
    onAdd(accountKey(trimmedName), trimmedName, note.trim() || null)
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="Add Account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Company name">
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Woolworths Group"
            autoFocus
            required
          />
        </Field>
        <Field label="Why you're reaching out (optional)">
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Met their CX lead at a conference, following up in Q3"
            rows={3}
          />
        </Field>
        <div className="flex items-center gap-2 pt-1">
          <Button type="submit" variant="primary" disabled={!name.trim()}>
            Add to My Accounts
          </Button>
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}

// The account list for whatever the SDR manually marked as theirs — found
// in the feed, on someone else's patch, or in the unassigned whitespace,
// and pinned so it's easy to find again without re-filtering the full
// Accounts table every time. Same columns and behaviour as Accounts, just
// pre-filtered to `claims` and sorted by claim date instead of score by
// default.
function MyAccounts({ accounts, claims, loading, isClaimed, onToggleClaim }) {
  const [search, setSearch] = useState("")
  const [patch, setPatch] = useState(null)
  const [addOpen, setAddOpen] = useState(false)
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
          <div className="flex items-center gap-2">
            <Button variant="primary" onClick={() => setAddOpen(true)}>
              <PlusIcon className="h-4 w-4" />
              Add Account
            </Button>
            <Button variant="outline" onClick={handleExport} disabled={!filtered.length}>
              <DownloadIcon className="h-4 w-4" />
              Export
            </Button>
          </div>
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
            title="No accounts tracked yet"
            description={
              'Click "Add Account" above to track a company by name and jot down why you\'re reaching out — no need for it to already have a signal. Or found a good account in the feed? Click the pin icon (or "Add to My Accounts") on its page to add it here instead.'
            }
            action={
              <Button variant="primary" onClick={() => setAddOpen(true)}>
                <PlusIcon className="h-4 w-4" />
                Add Account
              </Button>
            }
          />
        </Card>
      ) : (
        <>
          {filtered.length === 0 && orphanedClaims.length === 0 ? (
            <Card>
              <EmptyState
                title="No claimed accounts match these filters"
                description="Clear the search or patch filter to see everything you've claimed."
              />
            </Card>
          ) : (
            filtered.length > 0 && (
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
            )
          )}

          {orphanedClaims.length > 0 && (
            <>
              <SectionTitle hint="Companies you've added by name with nothing in the news yet. They'll move into the table above automatically the moment a signal about them shows up.">
                Added Manually — Watching for News
              </SectionTitle>
              <div className="space-y-2">
                {orphanedClaims.map((c) => (
                  <Card key={c.accountKey} className="flex flex-wrap items-start gap-3 p-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-[13.5px] font-bold text-ink-900 dark:text-zinc-50">{c.accountName}</p>
                      {c.note ? (
                        <p className="mt-1 text-[12.5px] leading-relaxed text-body-600 dark:text-zinc-300">{c.note}</p>
                      ) : (
                        <p className="mt-1 text-[12.5px] italic text-body-500 dark:text-zinc-500">No note added</p>
                      )}
                      <p className="mt-1.5 text-[11px] text-slate-400 dark:text-zinc-500">Added {formatDate(c.claimedAt)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      className="flex-shrink-0"
                      onClick={() => onToggleClaim(c.accountKey, c.accountName, false)}
                    >
                      <TrashIcon className="h-4 w-4" />
                      Remove
                    </Button>
                  </Card>
                ))}
              </div>
            </>
          )}
        </>
      )}

      <AddAccountModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={(key, name, note) => onToggleClaim(key, name, true, note)}
      />
    </>
  )
}

export default MyAccounts
