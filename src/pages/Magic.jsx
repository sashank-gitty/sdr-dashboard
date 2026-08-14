import { useMemo } from "react"
import { linkProps, navigate } from "../lib/router.js"
import { deriveAccounts } from "../lib/accountModel.js"
import { iconForSignal } from "../lib/signalGroups.js"
import { pillClassForSignalType } from "../lib/colors.js"
import { HIGH_RELEVANCE_THRESHOLD } from "../lib/relevance.js"
import { PATCH_LABELS } from "../../shared/patches.js"
import { PageHeader, Card, Button, Pill, ScoreBadge, AccountAvatar, SectionTitle, EmptyState } from "../components/ui.jsx"
import { SparklesIcon, ChartIcon, LightbulbIcon, PersonPlusIcon, ChevronRightIcon } from "../components/icons.jsx"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function formatDate(dateString) {
  if (!dateString) return "—"
  const [year, month, day] = dateString.split("-").map(Number)
  return `${String(day).padStart(2, "0")} ${MONTHS[month - 1]} ${year}`
}

function relativeHours(timestamp) {
  if (!timestamp) return null
  const hours = Math.floor((Date.now() - new Date(timestamp).getTime()) / 3_600_000)
  if (hours < 1) return "under an hour ago"
  if (hours === 1) return "1 hour ago"
  if (hours < 48) return `${hours} hours ago`
  return `${Math.floor(hours / 24)} days ago`
}

// The three-agent framing the reference product leads with, mapped onto
// what this pipeline actually runs. Two of the three are real and
// running; the third is not built, and says so rather than showing a
// fake "active" light.
function AgentCard({ icon: Icon, name, role, status, detail, tone }) {
  const tones = {
    live: { pill: "emerald", label: "Running" },
    partial: { pill: "amber", label: "Partial" },
    planned: { pill: "slate", label: "Not built" },
  }
  const config = tones[tone]

  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center gap-2.5">
        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${
            tone === "planned" ? "bg-slate-100 text-slate-400 dark:bg-zinc-800 dark:text-zinc-500" : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-semibold text-slate-900 dark:text-zinc-50">{name}</h3>
          <p className="text-[12px] text-slate-500 dark:text-zinc-400">{role}</p>
        </div>
        <Pill tone={config.pill}>{config.label}</Pill>
      </div>
      <p className="text-[12px] leading-relaxed text-slate-500 dark:text-zinc-400">{detail}</p>
      {status && <p className="mt-2 text-[12px] font-medium text-slate-700 dark:text-zinc-300">{status}</p>}
    </Card>
  )
}

function Magic({ signals, syncStatus, onOpenSignal, loading }) {
  const accounts = useMemo(() => deriveAccounts(signals), [signals])

  const priorities = useMemo(() => accounts.filter((a) => a.highRelevanceCount > 0).slice(0, 8), [accounts])

  const thisWeek = useMemo(() => {
    const cutoff = new Date()
    cutoff.setHours(0, 0, 0, 0)
    cutoff.setDate(cutoff.getDate() - 7)
    return signals.filter((s) => new Date(`${s.date}T00:00:00`) >= cutoff)
  }, [signals])

  const highThisWeek = thisWeek.filter((s) => (s.outreachRelevance ?? 0) >= HIGH_RELEVANCE_THRESHOLD)
  const unreviewed = signals.filter((s) => !s.reviewed).length

  const lastRun = syncStatus?.finishedAt ?? syncStatus?.startedAt ?? syncStatus?.createdAt ?? null
  const runAgo = relativeHours(lastRun)

  return (
    <>
      <PageHeader title="Magic" />

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Signals this week", value: thisWeek.length },
          { label: "Worth acting on", value: highThisWeek.length, accent: true },
          { label: "Accounts in play", value: accounts.length },
          { label: "Unreviewed", value: unreviewed },
        ].map((tile) => (
          <Card key={tile.label} className="p-4">
            <p className="text-[12px] text-slate-500 dark:text-zinc-400">{tile.label}</p>
            <p
              className={`mt-1 text-2xl font-semibold tabular-nums ${
                tile.accent ? "text-indigo-600 dark:text-indigo-400" : "text-slate-900 dark:text-zinc-50"
              }`}
            >
              {tile.value}
            </p>
          </Card>
        ))}
      </div>

      <SectionTitle hint="The pipeline behind this dashboard, described as the agents it actually runs.">
        Agents
      </SectionTitle>
      <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <AgentCard
          icon={SparklesIcon}
          name="Signal Agent"
          role="Detects buying signals"
          tone="live"
          detail="Queries ~107 sources per run — 72 standing thematic queries plus a rotating slice of named territory accounts — dedupes against existing rows, and inserts what's new. Runs daily on cron."
          status={runAgo ? `Last run ${runAgo}` : "Waiting for first run"}
        />
        <AgentCard
          icon={ChartIcon}
          name="Research Agent"
          role="Scores and attributes"
          tone="live"
          detail="Normalizes each new item into the schema via Claude, scores it 1–5 on the outreach-relevance rubric, and attributes it to AE patches and named accounts from the territory book."
          status={`${signals.length} signals scored and attributed`}
        />
        <AgentCard
          icon={PersonPlusIcon}
          name="Outreach Agent"
          role="Drafts personalized outreach"
          tone="planned"
          detail="The reference product drafts emails and LinkedIn messages from signal context. Nothing in this deployment does that — the account brief and discovery questions are as far as it goes. Wiring it up means an endpoint that takes a signal plus a persona and returns a draft."
        />
      </div>

      <SectionTitle hint="Accounts with at least one high-relevance signal, ranked by account score.">
        Start Here
      </SectionTitle>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100 dark:bg-zinc-800/60" />
          ))}
        </div>
      ) : priorities.length === 0 ? (
        <Card>
          <EmptyState
            title="Nothing clears the bar right now"
            description="No account currently has a high-relevance signal. The full feed is still worth a scan."
            action={
              <Button variant="primary" onClick={() => navigate("/feed")}>
                Open Global Feed
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {priorities.map((account) => {
            const lead = account.signals.find(
              (s) => (s.outreachRelevance ?? 0) >= HIGH_RELEVANCE_THRESHOLD,
            )
            const Icon = lead ? iconForSignal(lead) : LightbulbIcon
            return (
              <Card key={account.key} className="p-4 transition-colors hover:border-indigo-500/40">
                <div className="flex flex-wrap items-start gap-3">
                  <AccountAvatar name={account.name} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        {...linkProps(`/accounts/${encodeURIComponent(account.key)}`)}
                        className="text-[14px] font-semibold text-slate-900 hover:text-indigo-600 dark:text-zinc-50 dark:hover:text-indigo-400"
                      >
                        {account.name}
                      </a>
                      {account.status && (
                        <Pill tone={account.status === "customer" ? "emerald" : "amber"}>
                          {account.status === "customer" ? "Customer" : "Prospect"}
                        </Pill>
                      )}
                      {account.patches.slice(0, 2).map((patch) => (
                        <Pill key={patch} tone="slate">
                          {PATCH_LABELS[patch] ?? patch}
                        </Pill>
                      ))}
                      {account.aes.length > 0 && (
                        <span className="text-[12px] text-slate-400 dark:text-zinc-500">{account.aes.join(", ")}</span>
                      )}
                    </div>

                    {lead && (
                      <button
                        type="button"
                        onClick={() => onOpenSignal(lead.id)}
                        className="mt-2 flex w-full items-start gap-2 text-left"
                      >
                        <span
                          className={`mt-0.5 inline-flex flex-shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium ${pillClassForSignalType(lead.signalType)}`}
                        >
                          <Icon className="h-3 w-3" />
                          {lead.signalType}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13px] font-medium text-slate-800 dark:text-zinc-200">
                            {lead.headline}
                          </span>
                          <span className="mt-0.5 block line-clamp-2 text-[12px] text-slate-500 dark:text-zinc-400">
                            {lead.summary}
                          </span>
                        </span>
                        <span className="flex-shrink-0 text-[12px] tabular-nums text-slate-400 dark:text-zinc-500">
                          {formatDate(lead.date)}
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-shrink-0 items-center gap-2">
                    <ScoreBadge score={account.score} />
                    <a
                      {...linkProps(`/accounts/${encodeURIComponent(account.key)}`)}
                      aria-label={`Open ${account.name}`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Magic
