import { useEffect, useState } from "react"
import {
  PageHeader,
  Card,
  Pill,
  SectionTitle,
  EmptyState,
  SectionNote,
  Eyebrow,
  GradientText,
  StatTile,
} from "../components/ui.jsx"

// Territory commercial view: what the book is worth, where it concentrates,
// and the three worklists the spend data makes obvious — cross-sell,
// win-back, and warm-but-untouched.
//
// Every figure comes from /api/territory, which reads the territory_accounts
// table. Nothing here ships in the bundle; the page is empty until the
// loader has been pointed at the AE spreadsheets.

function fmtMoney(n) {
  const v = Number(n) || 0
  if (Math.abs(v) >= 1e6) return `$${(v / 1e6).toFixed(2)}M`
  if (Math.abs(v) >= 1e3) return `$${Math.round(v / 1e3)}K`
  return `$${Math.round(v)}`
}

function pct(part, whole) {
  if (!whole) return "0%"
  return `${((part / whole) * 100).toFixed(1)}%`
}

// One shared bar row: label, proportional track, value. Single hue —
// these are magnitude comparisons within one series, not categories.
function BarRow({ label, sub, value, max, display, tone = "brand" }) {
  const width = max > 0 ? Math.max((Math.abs(value) / max) * 100, 2) : 2
  const fill = tone === "loss" ? "bg-rose-500" : "bg-brand-600"
  return (
    <div className="flex items-center gap-3">
      <div className="w-44 flex-shrink-0">
        <p className="truncate text-[13px] font-semibold text-ink-900 dark:text-zinc-200">{label}</p>
        {sub && <p className="truncate text-[11px] text-body-500 dark:text-zinc-500">{sub}</p>}
      </div>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800">
        <div className={`h-full rounded-full ${fill}`} style={{ width: `${width}%` }} />
      </div>
      <span className="w-20 flex-shrink-0 text-right text-[12.5px] font-semibold tabular-nums text-body-600 dark:text-zinc-300">
        {display}
      </span>
    </div>
  )
}

function AccountTable({ columns, rows, empty }) {
  if (!rows.length) return <p className="px-1 py-3 text-[13px] text-body-500 dark:text-zinc-400">{empty}</p>
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-[13px]">
        <thead>
          <tr className="border-b border-slate-200 dark:border-zinc-800">
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={`whitespace-nowrap pb-2 pr-3 text-[10.5px] font-semibold uppercase tracking-wider text-slate-400 last:pr-0 dark:text-zinc-500 ${
                  c.num ? "text-right" : "text-left"
                }`}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/70">
          {rows.map((r, i) => (
            <tr key={r.account_key ?? i} className="transition-colors hover:bg-section dark:hover:bg-zinc-800/40">
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={`py-2.5 pr-3 align-baseline ${
                    c.num ? "text-right font-semibold tabular-nums text-body-600 dark:text-zinc-300" : ""
                  }`}
                >
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Territory() {
  const [state, setState] = useState({ phase: "loading" })

  useEffect(() => {
    const controller = new AbortController()
    fetch("/api/territory", { signal: controller.signal })
      .then(async (res) => {
        const body = await res.json().catch(() => null)
        if (res.status === 503 && body?.error === "not_loaded") {
          setState({ phase: "not_loaded", message: body.message })
          return
        }
        if (!res.ok) {
          setState({ phase: "error", message: body?.error ?? `Server responded ${res.status}` })
          return
        }
        // A 200 whose body didn't parse as JSON leaves `body` null — which
        // happens under plain `vite dev`, where /api/* isn't served and the
        // SPA fallback returns index.html. Without this the page destructures
        // null and white-screens instead of showing its own error state.
        if (!body) {
          setState({ phase: "error", message: "The territory endpoint returned a response that wasn't JSON." })
          return
        }
        setState({ phase: "loaded", data: body })
      })
      .catch((err) => {
        if (err.name === "AbortError") return
        setState({ phase: "error", message: err.message || "Request failed" })
      })
    return () => controller.abort()
  }, [])

  if (state.phase === "loading") {
    return (
      <>
        <PageHeader title="Territory" />
        <div className="space-y-3">
          <div className="h-32 animate-pulse rounded-xl bg-slate-100 dark:bg-zinc-800/60" />
          <div className="h-64 animate-pulse rounded-xl bg-slate-100 dark:bg-zinc-800/60" />
        </div>
      </>
    )
  }

  if (state.phase === "not_loaded") {
    return (
      <>
        <PageHeader title="Territory" />
        <Card>
          <EmptyState
            title="Territory data not loaded yet"
            description={
              "Run the migration, then point the loader at the AE spreadsheets on your machine: " +
              "node --env-file=.env.local db/migrate.mjs && node --env-file=.env.local db/load-territory.mjs <dir>. " +
              "The spreadsheets stay local — only the parsed rows go to Postgres."
            }
          />
        </Card>
      </>
    )
  }

  if (state.phase === "error") {
    return (
      <>
        <PageHeader title="Territory" />
        <Card className="p-5">
          <p className="text-[13px] font-semibold text-rose-600 dark:text-rose-400">Couldn&rsquo;t load territory data</p>
          <p className="mt-1 text-[12.5px] text-body-500 dark:text-zinc-400">{state.message}</p>
        </Card>
      </>
    )
  }

  const { totals, mix, byAe, byVertical, crossSell, winBack, winBackTotal, warm, loadedAt } = state.data
  const t = totals ?? {}
  const productMax = Math.max(Number(t.cx_arr) || 0, Number(t.ex_arr) || 0, Number(t.mr_arr) || 0, Number(t.rs_spend) || 0)
  const productTotal = (Number(t.cx_arr) || 0) + (Number(t.ex_arr) || 0) + (Number(t.mr_arr) || 0) + (Number(t.rs_spend) || 0)
  const aeMax = Math.max(...byAe.map((a) => Number(a.arr) || 0), 1)
  const multiAvg = Number(mix?.multi_avg) || 0
  const singleAvg = Number(mix?.single_avg) || 0
  const gap = singleAvg > 0 ? multiAvg / singleAvg : 0

  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow>Commercial view</Eyebrow>}
        title={
          <>
            The <GradientText>Territory</GradientText>
          </>
        }
      >
        <p className="text-[13px] leading-relaxed text-body-600 dark:text-zinc-400">
          Commercial view of the four AE books &mdash; what each account spends, on which lines, and where the
          gaps are.
          {loadedAt && ` Loaded ${new Date(loadedAt).toLocaleDateString()}.`}
        </p>
      </PageHeader>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatTile label="Accounts" value={(t.accounts ?? 0).toLocaleString()} sub="across all books" tone="ink" />
        <StatTile
          label="Customers"
          value={(t.customers ?? 0).toLocaleString()}
          sub={`${pct(t.customers, t.accounts)} penetration`}
          tone="ink"
        />
        <StatTile
          label="Total ARR"
          value={fmtMoney(t.arr)}
          sub={`avg ${fmtMoney(t.customers ? t.arr / t.customers : 0)}`}
        />
        <StatTile label="Open pipeline" value={fmtMoney(t.open_pipeline)} sub="software + research" tone="ink" />
        <StatTile
          label="Lost last year"
          value={fmtMoney(t.lost_py)}
          sub={`vs ${fmtMoney(t.won_all_time)} won`}
          tone="rose"
        />
      </div>

      {gap > 1 && (
        <Card className="mb-6 border-brand-200 bg-brand-50 p-5 dark:border-brand-500/30 dark:bg-brand-500/5">
          <Eyebrow>The cross-sell case</Eyebrow>
          <p className="mt-2.5 text-[15px] leading-relaxed text-body-600 dark:text-zinc-200">
            Customers on more than one product line average{" "}
            <span className="font-bold tabular-nums text-ink-900 dark:text-zinc-50">{fmtMoney(multiAvg)}</span>.
            Single-line customers average{" "}
            <span className="font-bold tabular-nums text-ink-900 dark:text-zinc-50">{fmtMoney(singleAvg)}</span> &mdash;
            a <span className="font-bold text-brand-600 dark:text-brand-400">{gap.toFixed(1)}&times; gap</span>. There
            are {mix.single_count} single-line customers holding {fmtMoney(mix.single_arr)}.
          </p>
        </Card>
      )}

      {productTotal > 0 && (
        <>
          <SectionTitle hint="Only the books that carry a per-line split contribute here; the others record one combined spend figure.">
            What people spend on
          </SectionTitle>
          <Card className="mb-6 p-5">
            <div className="space-y-3">
              <BarRow label="CX" sub="Customer Experience" value={t.cx_arr} max={productMax} display={fmtMoney(t.cx_arr)} />
              <BarRow label="MR" sub="Market Research / S&R" value={t.mr_arr} max={productMax} display={fmtMoney(t.mr_arr)} />
              <BarRow label="EX" sub="Employee Experience" value={t.ex_arr} max={productMax} display={fmtMoney(t.ex_arr)} />
              <BarRow label="RS" sub="Research Services" value={t.rs_spend} max={productMax} display={fmtMoney(t.rs_spend)} />
            </div>
            <SectionNote>
              CX is {pct(t.cx_arr, productTotal)} of all split product spend.
            </SectionNote>
          </Card>
        </>
      )}

      <SectionTitle hint="Won all-time against last year's lost pipeline. Below 1.0x means we lost more than we won in that vertical.">
        Where we win
      </SectionTitle>
      <Card className="mb-6 p-5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-[13px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-zinc-800">
                {["Vertical", "Accounts", "Customers", "Penetration", "ARR", "Win : loss"].map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={`whitespace-nowrap pb-2 pr-3 text-[10.5px] font-semibold uppercase tracking-wider text-slate-400 last:pr-0 dark:text-zinc-500 ${
                      i === 0 ? "text-left" : "text-right"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/70">
              {byVertical.map((v) => {
                const won = Number(v.won_all_time) || 0
                const lost = Number(v.lost_py) || 0
                const ratio = lost > 0 ? won / lost : null
                const losing = ratio !== null && ratio < 1
                return (
                  <tr key={v.vertical} className="transition-colors hover:bg-section dark:hover:bg-zinc-800/40">
                    <td className="py-2.5 pr-3 font-semibold text-ink-900 dark:text-zinc-200">{v.vertical}</td>
                    <td className="py-2.5 pr-3 text-right tabular-nums text-body-600 dark:text-zinc-300">{v.accounts}</td>
                    <td className="py-2.5 pr-3 text-right tabular-nums text-body-600 dark:text-zinc-300">{v.customers}</td>
                    <td className="py-2.5 pr-3 text-right tabular-nums text-body-600 dark:text-zinc-300">
                      {pct(v.customers, v.accounts)}
                    </td>
                    <td className="py-2.5 pr-3 text-right tabular-nums text-body-600 dark:text-zinc-300">
                      {fmtMoney(v.arr)}
                    </td>
                    <td
                      className={`py-2.5 text-right font-bold tabular-nums ${
                        losing ? "text-rose-600 dark:text-rose-400" : "text-body-600 dark:text-zinc-200"
                      }`}
                    >
                      {ratio === null ? "—" : `${ratio.toFixed(2)}×`}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <SectionTitle hint="Single-line customers, largest first. The relationship already exists — a second line is the cheapest expansion available.">
        Cross-sell worklist
      </SectionTitle>
      <Card className="mb-6 p-5">
        <AccountTable
          empty="No single-line customers found — either every customer is multi-line, or no book with a per-line split has been loaded."
          rows={crossSell}
          columns={[
            { key: "account_name", label: "Account", render: (r) => <span className="font-semibold text-ink-900 dark:text-zinc-200">{r.account_name}</span> },
            { key: "ae", label: "AE" },
            { key: "lines_held", label: "Holds", render: (r) => <Pill tone="slate">{(r.lines_held ?? []).join(", ")}</Pill> },
            { key: "arr", label: "Current ARR", num: true, render: (r) => fmtMoney(r.arr) },
            {
              key: "gap", label: "Pitch",
              render: (r) => {
                const held = new Set(r.lines_held ?? [])
                const missing = ["CX", "EX", "MR"].filter((l) => !held.has(l))
                return <Pill tone="brand">{missing.join(" / ")}</Pill>
              },
            },
          ]}
        />
      </Card>

      <SectionTitle hint="Prospects with real lost pipeline from last year — they ran an evaluation, budget existed, and nobody has re-opened them since.">
        Win-back list
      </SectionTitle>
      <Card className="mb-6 p-5">
        <AccountTable
          empty="No lost pipeline recorded against prospects."
          rows={winBack}
          columns={[
            { key: "account_name", label: "Account", render: (r) => <span className="font-semibold text-ink-900 dark:text-zinc-200">{r.account_name}</span> },
            { key: "ae", label: "AE" },
            { key: "vertical", label: "Vertical" },
            { key: "lost_pipeline_py", label: "Lost pipeline", num: true, render: (r) => fmtMoney(r.lost_pipeline_py) },
            { key: "employees", label: "Employees", num: true, render: (r) => (Number(r.employees) || 0).toLocaleString() },
          ]}
        />
        {winBackTotal?.n > 0 && (
          <SectionNote>
            {winBackTotal.n} prospects previously evaluated and lost, {fmtMoney(winBackTotal.total)} in total.
          </SectionNote>
        )}
      </Card>

      <SectionTitle hint="Never bought anything, but someone there has engaged with us in the last 90 days.">
        Warm but untouched
      </SectionTitle>
      <Card className="mb-6 p-5">
        <AccountTable
          empty="No engaged prospects recorded."
          rows={warm}
          columns={[
            { key: "account_name", label: "Account", render: (r) => <span className="font-semibold text-ink-900 dark:text-zinc-200">{r.account_name}</span> },
            { key: "ae", label: "AE" },
            { key: "vertical", label: "Vertical" },
            { key: "employees", label: "Employees", num: true, render: (r) => (Number(r.employees) || 0).toLocaleString() },
            { key: "engaged_l90", label: "Engaged L90", num: true },
          ]}
        />
      </Card>

      <SectionTitle>By territory</SectionTitle>
      <Card className="p-5">
        <div className="space-y-3">
          {byAe.map((a) => (
            <BarRow
              key={a.ae}
              label={a.ae}
              sub={`${a.customers}/${a.accounts} customers · ${pct(a.customers, a.accounts)} penetrated`}
              value={a.arr}
              max={aeMax}
              display={fmtMoney(a.arr)}
            />
          ))}
        </div>
      </Card>
    </>
  )
}

export default Territory
