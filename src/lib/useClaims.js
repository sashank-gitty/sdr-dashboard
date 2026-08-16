import { useEffect, useState } from "react"

// Manually-claimed accounts — the SDR marking "this one's mine" on an
// account they found and want to track, independent of territory-book
// ownership. Persisted server-side (api/claims.js) rather than
// localStorage like starred accounts, so the list is the same list
// whichever device or browser opens the dashboard.
//
// Same optimistic-update-with-rollback shape as handleToggleReviewed in
// App.jsx: flip local state immediately, then reconcile with the server,
// undoing the flip (via a functional update, so it never reads a stale
// closure of `claims`) if the write fails.
export function useClaims() {
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch("/api/claims", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setClaims(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === "AbortError") return
        // Best-effort, like the sync-status fetch: a missing /api/claims
        // (e.g. `npm run dev` without `vercel dev`) shouldn't block the
        // rest of the app, it just means nothing shows as claimed yet.
        setLoading(false)
      })
    return () => controller.abort()
  }, [])

  const isClaimed = (key) => claims.some((c) => c.accountKey === key)
  const claimedAt = (key) => claims.find((c) => c.accountKey === key)?.claimedAt ?? null
  const noteFor = (key) => claims.find((c) => c.accountKey === key)?.note ?? null

  // `note` is what makes this double as "add an account manually": the
  // pin toggle on an existing row calls this with no note (undefined ->
  // null), while the "+ Add Account" flow on My Accounts calls it with a
  // company name that may have no live signals at all and a reason for
  // tracking it — same claim mechanism either way, just with the note
  // filled in.
  const setClaim = (accountKey, accountName, claimed, note = null) => {
    const optimisticRow = { accountKey, accountName, claimedAt: new Date().toISOString(), note }

    setClaims((prev) => (claimed ? [optimisticRow, ...prev.filter((c) => c.accountKey !== accountKey)] : prev.filter((c) => c.accountKey !== accountKey)))

    fetch("/api/claims", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountKey, accountName, claimed, note }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded ${res.status}`)
      })
      .catch((err) => {
        console.error("Failed to update claimed account:", err)
        setClaims((prev) => (claimed ? prev.filter((c) => c.accountKey !== accountKey) : [optimisticRow, ...prev]))
      })
  }

  return { claims, loading, isClaimed, claimedAt, noteFor, setClaim }
}
