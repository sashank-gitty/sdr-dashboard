import { useMemo, useState } from "react"
import { linkProps, navigate } from "../lib/router.js"
import { PATCH_LABELS } from "../../shared/patches.js"
import { PRACTICE_AREA_LABELS, pillClassForSignalType } from "../lib/colors.js"
import { HIGH_RELEVANCE_THRESHOLD } from "../lib/relevance.js"
import { SIGNAL_GROUPS, countByGroup, filterByGroup, iconForSignal } from "../lib/signalGroups.js"
import {
  bucketByRecency,
  keyInsights,
  peopleUpdates,
  topNews,
  valuePyramid,
  discoveryQuestionsFor,
  groupDistribution,
} from "../lib/accountBrief.js"
import { accountImpact, outreachAngles } from "../lib/signalInsights.js"
import { Citations } from "../components/Citation.jsx"
import {
  Card,
  Button,
  Pill,
  ScoreBadge,
  PriorityPill,
  AccountAvatar,
  SubNav,
  TabStrip,
  SectionTitle,
  EmptyState,
  NotIngested,
} from "../components/ui.jsx"
import {
  RefreshIcon,
  ChevronLeftIcon,
  LightbulbIcon,
  UsersIcon,
  NewspaperIcon,
  ExternalLinkIcon,
  MapPinIcon,
  BuildingIcon,
  PinIcon,
} from "../components/icons.jsx"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function formatDate(dateString) {
  if (!dateString) return "—"
  const [year, month, day] = dateString.split("-").map(Number)
  return `${String(day).padStart(2, "0")} ${MONTHS[month - 1]} ${year}`
}

const TABS = [
  { id: "facts", label: "Fast Facts" },
  { id: "summary", label: "Summary" },
  { id: "signals", label: "Signals" },
  { id: "value", label: "Value" },
  { id: "custom", label: "Custom" },
  { id: "research", label: "Research" },
  { id: "contacts", label: "Contacts" },
  { id: "tech", label: "Tech" },
]

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2 py-1.5">
      {Icon && <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400 dark:text-zinc-500" />}
      <span className="text-[13px] text-slate-500 dark:text-zinc-400">{label}</span>
      <span className="ml-auto text-right text-[13px] font-medium text-slate-900 dark:text-zinc-100">{value}</span>
    </div>
  )
}

function AccountDetail({ account, onOpenSignal, loading, isClaimed, claimedAt, onToggleClaim }) {
  const [tab, setTab] = useState("summary")
  const [group, setGroup] = useState("all")

  // Citation numbering is assigned once, over the account's signals in
  // display order, so a given signal carries the same number in every
  // panel on the page.
  const indexById = useMemo(() => {
    const map = new Map()
    account?.signals.forEach((signal, i) => map.set(signal.id, i + 1))
    return map
  }, [account])

  const indexOf = (signal) => indexById.get(signal.id) ?? 0

  const insights = useMemo(() => (account ? keyInsights(account.signals) : []), [account])
  const people = useMemo(() => (account ? peopleUpdates(account.signals) : []), [account])
  const news = useMemo(() => (account ? topNews(account.signals) : []), [account])
  const pyramid = useMemo(() => (account ? valuePyramid(account.signals) : []), [account])
  const buckets = useMemo(() => (account ? bucketByRecency(account.signals) : []), [account])
  const distribution = useMemo(() => (account ? groupDistribution(account.signals) : []), [account])
  const questions = useMemo(() => (account ? discoveryQuestionsFor(account.signals) : []), [account])
  const groupCounts = useMemo(() => (account ? countByGroup(account.signals) : {}), [account])

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="h-16 animate-pulse rounded-xl bg-slate-100 dark:bg-zinc-800/60" />
        <div className="h-64 animate-pulse rounded-xl bg-slate-100 dark:bg-zinc-800/60" />
      </div>
    )
  }

  if (!account) {
    return (
      <Card>
        <EmptyState
          title="Account not found"
          description="This account has no signals in the current dataset — it may have been renamed, or its signals may predate the ingest window."
          action={
            <Button variant="primary" onClick={() => navigate("/accounts")}>
              Back to Accounts
            </Button>
          }
        />
      </Card>
    )
  }

  const practiceAreas = [...new Set(account.signals.map((s) => s.practiceArea).filter(Boolean))]

  return (
    <>
      <a
        {...linkProps("/accounts")}
        className="mb-3 inline-flex items-center gap-1 text-[13px] font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Accounts
      </a>

      {/* Account bar: identity on the left, sub-navigation in the middle,
          the one write action on the right — the same three-part split
          the reference product uses, so the tabs never move when you
          switch accounts. */}
      <div className="sticky top-14 z-20 -mx-4 mb-5 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <div className="flex min-w-0 items-center gap-3">
            <AccountAvatar name={account.name} size="lg" />
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold tracking-tight text-slate-900 dark:text-zinc-50">
                {account.name}
              </h1>
              <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                {account.status ? (
                  <Pill tone={account.status === "customer" ? "emerald" : "amber"}>
                    {account.status === "customer" ? "Customer" : "Prospect"}
                  </Pill>
                ) : (
                  <Pill tone="slate">Unassigned</Pill>
                )}
                <PriorityPill priority={account.priority} />
                {isClaimed?.(account.key) && <Pill tone="indigo">Mine</Pill>}
              </div>
            </div>
          </div>

          <div className="order-last w-full lg:order-none lg:w-auto lg:flex-1">
            <SubNav tabs={TABS} active={tab} onChange={setTab} />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ScoreBadge score={account.score} size="lg" />
            {onToggleClaim && (
              <Button
                variant={isClaimed?.(account.key) ? "primary" : "outline"}
                onClick={() => onToggleClaim(account.key, account.name, !isClaimed?.(account.key))}
              >
                <PinIcon filled={isClaimed?.(account.key)} className="h-4 w-4" />
                {isClaimed?.(account.key) ? "In My Accounts" : "Add to My Accounts"}
              </Button>
            )}
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshIcon className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {tab === "facts" && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <Card className="p-5">
              <SectionTitle hint="Signals bucketed by how recently they landed, so a warming account reads differently from a cooling one.">
                Signal Timeline
              </SectionTitle>
              <div className="space-y-4">
                {buckets.map((bucket) => (
                  <div key={bucket.id}>
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                      {bucket.label}
                    </p>
                    <ul className="space-y-1">
                      {bucket.signals.map((signal) => {
                        const Icon = iconForSignal(signal)
                        return (
                          <li key={signal.id}>
                            <button
                              type="button"
                              onClick={() => onOpenSignal(signal.id)}
                              className={`flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left text-[12px] transition-colors ${pillClassForSignalType(signal.signalType)} hover:brightness-95`}
                            >
                              <Icon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                              <span className="min-w-0 flex-1 truncate">{signal.headline}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <SectionTitle>Signal Mix</SectionTitle>
              <div className="space-y-2">
                {distribution.map((entry) => (
                  <div key={entry.id} className="flex items-center gap-3">
                    <span className="w-40 flex-shrink-0 truncate text-[12px] text-slate-600 dark:text-zinc-300">
                      {entry.label}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{ width: `${Math.max(4, entry.share * 100)}%` }}
                      />
                    </div>
                    <span className="w-8 flex-shrink-0 text-right text-[12px] tabular-nums text-slate-500 dark:text-zinc-400">
                      {entry.count}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="h-fit p-5">
            <SectionTitle>Account Information</SectionTitle>
            <div className="divide-y divide-slate-100 dark:divide-zinc-800">
              <InfoRow icon={BuildingIcon} label="Coverage" value={account.managed ? "Territory book" : "Unassigned"} />
              <InfoRow
                icon={UsersIcon}
                label="Owner"
                value={account.aes.length ? account.aes.join(", ") : "—"}
              />
              <InfoRow
                icon={MapPinIcon}
                label="Patch"
                value={account.patches.length ? account.patches.map((p) => PATCH_LABELS[p] ?? p).join(", ") : "—"}
              />
              <InfoRow label="Practice areas" value={practiceAreas.map((a) => PRACTICE_AREA_LABELS[a] ?? a).join(", ") || "—"} />
              <InfoRow label="Signals" value={account.signalCount} />
              <InfoRow label="High relevance" value={account.highRelevanceCount} />
              <InfoRow label="Unreviewed" value={account.unreviewedCount} />
              <InfoRow label="First seen" value={formatDate(account.firstSeen)} />
              <InfoRow label="Last signal" value={formatDate(account.lastSignalDate)} />
              {isClaimed?.(account.key) && (
                <InfoRow icon={PinIcon} label="Claimed on" value={formatDate(claimedAt?.(account.key)?.slice(0, 10))} />
              )}
            </div>
          </Card>
        </div>
      )}

      {tab === "summary" && (
        <>
          <SectionTitle hint="Every line below is grouped from this account's own signals. Click any citation badge to open the source signal.">
            What You Need to Know
          </SectionTitle>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Card className="p-5">
              <h3 className="mb-3 text-[15px] font-semibold text-slate-900 dark:text-zinc-50">Key Insights</h3>
              {insights.length === 0 ? (
                <p className="text-[13px] text-slate-500 dark:text-zinc-400">No signals yet for this account.</p>
              ) : (
                <ul className="space-y-4">
                  {insights.map((insight) => {
                    const angle = outreachAngles(insight.signals[0])[0]
                    return (
                      <li key={insight.id} className="flex gap-2.5">
                        <LightbulbIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                        <div className="min-w-0">
                          <p className="text-[13px] leading-relaxed text-slate-700 dark:text-zinc-300">
                            <span className="font-semibold text-slate-900 dark:text-zinc-100">{insight.label}:</span>{" "}
                            {insight.count} {insight.count === 1 ? "signal" : "signals"}
                            {insight.highCount > 0 && (
                              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                                {" "}
                                ({insight.highCount} high-relevance)
                              </span>
                            )}
                            , most recent {formatDate(insight.newest)}. Lead: &ldquo;{insight.lead}&rdquo;
                            <Citations signals={insight.signals} indexOf={indexOf} onOpen={onOpenSignal} />
                          </p>
                          <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500 dark:text-zinc-400">
                            {accountImpact(insight.signals[0])}
                          </p>
                          {angle && (
                            <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500 dark:text-zinc-400">
                              <span className="font-medium text-slate-700 dark:text-zinc-300">Angle — {angle.label}:</span>{" "}
                              {angle.angle}
                            </p>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </Card>

            <div className="space-y-5">
              <Card className="p-5">
                <h3 className="mb-3 text-[15px] font-semibold text-slate-900 dark:text-zinc-50">People Updates</h3>
                {people.length === 0 ? (
                  <p className="text-[13px] text-slate-500 dark:text-zinc-400">
                    No leadership changes detected for this account.
                  </p>
                ) : (
                  <ul className="space-y-2.5">
                    {people.map((signal) => (
                      <li key={signal.id} className="flex gap-2.5">
                        <UsersIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-500" />
                        <p className="text-[13px] leading-relaxed text-slate-700 dark:text-zinc-300">
                          {signal.headline}
                          <Citations signals={[signal]} indexOf={indexOf} onOpen={onOpenSignal} />
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>

              <Card className="p-5">
                <h3 className="mb-3 text-[15px] font-semibold text-slate-900 dark:text-zinc-50">Top News</h3>
                <ul className="space-y-2.5">
                  {news.map((signal) => (
                    <li key={signal.id} className="flex gap-2.5">
                      <NewspaperIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-500" />
                      <p className="text-[13px] leading-relaxed text-slate-700 dark:text-zinc-300">
                        {signal.headline}
                        {(signal.outreachRelevance ?? 0) >= HIGH_RELEVANCE_THRESHOLD && (
                          <span className="ml-1.5 align-middle">
                            <Pill tone="indigo">High</Pill>
                          </span>
                        )}
                        <Citations signals={[signal]} indexOf={indexOf} onOpen={onOpenSignal} />
                      </p>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          <div className="mt-5">
            <NotIngested
              title="Executive Perspective — not available from this pipeline"
              note="The reference layout puts attributed executive quotes here, pulled from earnings-call transcripts. This pipeline ingests Google News RSS, which carries headlines and summaries but no transcripts, so there is nothing real to quote. Writing quotes from headlines would put words in named executives' mouths — so the panel stays empty until a transcript source is wired in."
              sources={["Earnings call transcripts", "Investor relations feeds", "SEC / ASX filings"]}
            />
          </div>
        </>
      )}

      {tab === "signals" && (
        <Card className="overflow-hidden">
          <div className="px-4 pt-2">
            <TabStrip
              tabs={[
                { id: "all", label: "All", count: groupCounts.all },
                ...SIGNAL_GROUPS.map((g) => ({ id: g.id, label: g.label, count: groupCounts[g.id] ?? 0 })),
              ]}
              active={group}
              onChange={setGroup}
            />
          </div>
          <ul className="divide-y divide-slate-100 dark:divide-zinc-800/70">
            {filterByGroup(account.signals, group).map((signal) => {
              const Icon = iconForSignal(signal)
              return (
                <li key={signal.id}>
                  <button
                    type="button"
                    onClick={() => onOpenSignal(signal.id)}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800/40"
                  >
                    <span
                      className={`mt-0.5 inline-flex flex-shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium ${pillClassForSignalType(signal.signalType)}`}
                    >
                      <Icon className="h-3 w-3" />
                      {signal.signalType}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium text-slate-900 dark:text-zinc-100">
                        {signal.headline}
                      </span>
                      <span className="mt-0.5 block line-clamp-2 text-[12px] text-slate-500 dark:text-zinc-400">
                        {signal.summary}
                      </span>
                    </span>
                    <span className="flex-shrink-0 text-[12px] tabular-nums text-slate-400 dark:text-zinc-500">
                      {formatDate(signal.date)}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </Card>
      )}

      {tab === "value" && (
        <Card className="p-5">
          <SectionTitle hint="Signals mapped onto a value framework. Tiers with no matching signals are omitted rather than shown empty.">
            Value Pyramid
          </SectionTitle>
          {pyramid.length === 0 ? (
            <p className="text-[13px] text-slate-500 dark:text-zinc-400">
              Not enough signal variety yet to build a value view for this account.
            </p>
          ) : (
            <div className="space-y-6">
              {pyramid.map((tier) => (
                <section key={tier.id} className="border-l-2 border-indigo-500 pl-4">
                  <h3 className="text-[15px] font-semibold text-indigo-600 dark:text-indigo-400">{tier.label}</h3>
                  <p className="mt-0.5 text-[12px] text-slate-500 dark:text-zinc-400">{tier.blurb}</p>
                  <ul className="mt-2.5 space-y-2">
                    {tier.items.map((item) => (
                      <li key={item.groupId} className="text-[13px] leading-relaxed text-slate-700 dark:text-zinc-300">
                        <span className="font-medium text-slate-900 dark:text-zinc-100">{item.label}</span> —{" "}
                        {item.signals.length} {item.signals.length === 1 ? "signal" : "signals"}, led by &ldquo;
                        {item.signals[0].headline}&rdquo;
                        <Citations signals={item.signals} indexOf={indexOf} onOpen={onOpenSignal} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </Card>
      )}

      {tab === "custom" && (
        <Card className="overflow-hidden">
          <div className="p-5 pb-3">
            <SectionTitle hint="Generic, persona-keyed discovery prompts for the practice areas this account's signals touch. Identical across accounts by design — the account-specific part is which areas appear.">
              Discovery Questions
            </SectionTitle>
          </div>
          {questions.length === 0 ? (
            <EmptyState
              title="No practice area detected"
              description="Discovery questions key off the practice area on this account's signals (CX, EX, Market Research)."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-[13px]">
                <thead className="border-y border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 text-left font-medium">Persona</th>
                    <th scope="col" className="px-4 py-2.5 text-left font-medium">Discovery question</th>
                    <th scope="col" className="px-4 py-2.5 text-left font-medium">What this uncovers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/70">
                  {questions.map((q, i) => (
                    <tr key={i} className="align-top">
                      <td className="px-4 py-3">
                        <span className="font-medium text-slate-900 dark:text-zinc-100">{q.persona}</span>
                        <span className="mt-1 block">
                          <Pill tone="sky">{PRACTICE_AREA_LABELS[q.practiceArea] ?? q.practiceArea}</Pill>
                        </span>
                      </td>
                      <td className="px-4 py-3 italic text-slate-700 dark:text-zinc-300">&ldquo;{q.question}&rdquo;</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-zinc-400">{q.uncovers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {tab === "research" && (
        <div className="space-y-5">
          <Card className="p-5">
            <SectionTitle hint="How this account's score was calculated. Shown rather than hidden so a low score can be argued with.">
              Score Breakdown
            </SectionTitle>
            <div className="mb-4 flex items-center gap-3">
              <ScoreBadge score={account.score} size="lg" />
              <div>
                <p className="text-[13px] font-medium text-slate-900 dark:text-zinc-100">
                  {account.score} / 100 &middot; {account.priority.label}
                </p>
                <p className="text-[12px] text-slate-500 dark:text-zinc-400">
                  Weighted: relevance 55%, recency 30%, volume 15%
                </p>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "Best outreach trigger (relevance)", value: account.scoreBreakdown.relevance, weight: "55%" },
                { label: "How warm right now (recency)", value: account.scoreBreakdown.recency, weight: "30%" },
                { label: "Sustained activity (volume)", value: account.scoreBreakdown.volume, weight: "15%" },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <span className="w-56 flex-shrink-0 text-[12px] text-slate-600 dark:text-zinc-300">{row.label}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{ width: `${Math.max(2, row.value * 100)}%` }}
                    />
                  </div>
                  <span className="w-16 flex-shrink-0 text-right text-[12px] tabular-nums text-slate-500 dark:text-zinc-400">
                    {Math.round(row.value * 100)}% &times; {row.weight}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <SectionTitle>All Sources</SectionTitle>
            <ul className="space-y-1.5">
              {account.signals.map((signal) => (
                <li key={signal.id} className="flex items-baseline gap-2 text-[13px]">
                  <span className="w-6 flex-shrink-0 text-right text-[11px] font-semibold tabular-nums text-slate-400 dark:text-zinc-500">
                    {indexOf(signal)}
                  </span>
                  <a
                    href={signal.sourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex min-w-0 items-baseline gap-1 text-slate-700 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400"
                  >
                    <span className="truncate">{signal.headline}</span>
                    <ExternalLinkIcon className="h-3 w-3 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                  <span className="ml-auto flex-shrink-0 text-[11px] tabular-nums text-slate-400 dark:text-zinc-500">
                    {formatDate(signal.date)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      {tab === "contacts" && (
        <NotIngested
          title="Contacts — not available from this pipeline"
          note="The reference product resolves buying-group contacts and tracks job moves. This pipeline has no people data at all: it ingests company-level news, and the territory book was deliberately reduced to four fields with all contact data stripped out. Populating this would mean wiring a contact source into ingest — the ZoomInfo and Lusha connectors already available to this workspace are the obvious candidates."
          sources={["ZoomInfo contact search", "Lusha buying-group search", "LinkedIn Sales Navigator"]}
        />
      )}

      {tab === "tech" && (
        <NotIngested
          title="Account Technologies — not available from this pipeline"
          note="The reference product infers an account's tech stack from job postings that name tools. This pipeline ingests no job postings, so there is no evidence base to build a stack from. Inferring one from news headlines would be guesswork presented as fact about a real company's infrastructure."
          sources={["Job posting feeds", "BuiltWith / HG Insights", "ZoomInfo technographics"]}
        />
      )}
    </>
  )
}

export default AccountDetail
