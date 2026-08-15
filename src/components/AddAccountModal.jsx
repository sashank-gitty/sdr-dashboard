import { useState } from "react"
import { SIGNAL_TYPES } from "../../shared/signalTypes.js"
import { PATCH_LABELS, PATCHES } from "../../shared/patches.js"
import { PRACTICE_AREA_LABELS } from "../lib/colors.js"
import { Modal, Field, TextInput, TextArea, FilterSelect, Radio, Toggle } from "./ui.jsx"

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const SIGNAL_TYPE_OPTIONS = SIGNAL_TYPES.map((t) => ({ value: t, label: capitalize(t) }))
const PATCH_OPTIONS = PATCHES.map((p) => ({ value: p, label: PATCH_LABELS[p] }))
const RELEVANCE_OPTIONS = [
  { value: "5", label: "5 — Immediate, specific trigger" },
  { value: "4", label: "4 — Strong trigger" },
  { value: "3", label: "3 — Supporting context" },
  { value: "2", label: "2 — Background intel" },
  { value: "1", label: "1 — Minimal relevance" },
]

const EMPTY_FORM = {
  accountName: "",
  headline: "",
  summary: "",
  signalType: "",
  practiceArea: "cx",
  patch: null,
  sourceUrl: "",
  date: "",
  relevance: null,
  trackAsMine: true,
}

// A whole new account — one that has no signals in the dashboard yet —
// built from something the SDR found themselves rather than something
// the automated pipeline turned up. Submitting inserts one real signal
// row (api/manual-signal.js) with the account name as its entity, so the
// account exists the moment this closes, no refresh needed. Checking
// "Add to My Accounts" (on by default — you're the one adding it) also
// claims it, and every future daily ingest run additionally searches
// Google News by this account's name, same as any other tracked account.
function AddAccountModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const set = (patch) => setForm((prev) => ({ ...prev, ...patch }))

  const reset = () => {
    setForm(EMPTY_FORM)
    setError(null)
  }

  const handleClose = () => {
    if (submitting) return
    reset()
    onClose()
  }

  const handleSubmit = async () => {
    if (!form.accountName.trim()) {
      setError("Account name is required.")
      return
    }
    if (!form.headline.trim()) {
      setError("Say what you found — that becomes the signal's headline.")
      return
    }
    if (!form.signalType) {
      setError("Pick the closest signal type.")
      return
    }

    setSubmitting(true)
    setError(null)
    try {
      await onSubmit({
        accountName: form.accountName.trim(),
        headline: form.headline.trim(),
        summary: form.summary.trim() || undefined,
        signalType: form.signalType,
        practiceArea: form.practiceArea,
        patch: form.patch ?? undefined,
        sourceUrl: form.sourceUrl.trim() || undefined,
        date: form.date || undefined,
        outreachRelevance: form.relevance ? Number(form.relevance) : undefined,
        trackAsMine: form.trackAsMine,
      })
      reset()
      onClose()
    } catch (err) {
      setError(err.message || "Failed to add this account. Try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add Account"
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="ml-auto rounded-lg bg-indigo-600 px-3 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
          >
            {submitting ? "Adding…" : "Add to Dashboard"}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-[12px] leading-relaxed text-slate-500 dark:text-zinc-400">
          For an account that isn't in the dashboard yet — something you found yourself (LinkedIn, a job ad, a
          conversation) rather than something the news pipeline picked up. This creates the account and its first
          signal right away, and adds the account name to future daily searches so any real news about it keeps
          showing up here too.
        </p>

        <Field label="Account Name">
          <TextInput
            value={form.accountName}
            onChange={(e) => set({ accountName: e.target.value })}
            placeholder="e.g. Acme Financial Group"
            autoFocus
          />
        </Field>

        <Field label="What did you find?">
          <TextInput
            value={form.headline}
            onChange={(e) => set({ headline: e.target.value })}
            placeholder="e.g. Hiring a Head of CX — new role, posted this week"
          />
        </Field>

        <Field label="Details (optional)">
          <TextArea
            value={form.summary}
            onChange={(e) => set({ summary: e.target.value })}
            placeholder="Anything else you know — where you saw it, who mentioned it, why it's worth tracking."
            rows={3}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Signal Type">
            <FilterSelect
              label="Signal type"
              value={form.signalType || null}
              onChange={(v) => set({ signalType: v })}
              options={SIGNAL_TYPE_OPTIONS}
            />
          </Field>
          <Field label="Patch (optional)">
            <FilterSelect label="Patch" value={form.patch} onChange={(v) => set({ patch: v })} options={PATCH_OPTIONS} />
          </Field>
        </div>

        <div>
          <p className="mb-1.5 text-[12px] font-medium text-slate-500 dark:text-zinc-400">Practice Area</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {Object.entries(PRACTICE_AREA_LABELS).map(([id, label]) => (
              <Radio
                key={id}
                name="practiceArea"
                value={id}
                checked={form.practiceArea === id}
                onChange={(v) => set({ practiceArea: v })}
                label={label}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Source link (optional)">
            <TextInput
              value={form.sourceUrl}
              onChange={(e) => set({ sourceUrl: e.target.value })}
              placeholder="https://..."
            />
          </Field>
          <Field label="Date (optional)">
            <input
              type="date"
              value={form.date}
              onChange={(e) => set({ date: e.target.value })}
              max={new Date().toISOString().slice(0, 10)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-900 outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </Field>
        </div>

        <Field label="How strong an outreach trigger is this? (optional)">
          <FilterSelect
            label="Not sure"
            value={form.relevance}
            onChange={(v) => set({ relevance: v })}
            options={RELEVANCE_OPTIONS}
          />
        </Field>

        <Toggle checked={form.trackAsMine} onChange={(v) => set({ trackAsMine: v })} label="Add to My Accounts" />

        {error && (
          <p className="rounded-lg border border-rose-500/30 bg-rose-500/5 px-3 py-2 text-[12px] text-rose-600 dark:text-rose-400">
            {error}
          </p>
        )}
      </div>
    </Modal>
  )
}

export default AddAccountModal
