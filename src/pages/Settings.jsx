import { PATCHES, PATCH_LABELS, PATCH_DESCRIPTIONS, AE_ROSTER } from "../../shared/patches.js"
import { SIGNAL_GROUPS } from "../lib/signalGroups.js"
import { PRACTICE_AREA_LABELS } from "../lib/colors.js"
import { PageHeader, Card, SectionTitle, Pill, Toggle } from "../components/ui.jsx"

function Row({ label, description, children }) {
  return (
    <div className="flex flex-wrap items-start gap-4 border-b border-slate-100 py-4 last:border-b-0 dark:border-zinc-800/70">
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-slate-900 dark:text-zinc-100">{label}</p>
        {description && <p className="mt-0.5 text-[12px] leading-relaxed text-slate-500 dark:text-zinc-400">{description}</p>}
      </div>
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  )
}

function Settings({ theme, onToggleTheme, signals }) {
  const origins = signals.reduce((acc, signal) => {
    acc[signal.origin] = (acc[signal.origin] ?? 0) + 1
    return acc
  }, {})

  return (
    <>
      <PageHeader title="Settings" />

      <div className="space-y-5">
        <Card className="p-5">
          <SectionTitle>Appearance</SectionTitle>
          <Row label="Dark mode" description="Persisted to this browser. Defaults to your system preference.">
            <Toggle checked={theme === "dark"} onChange={onToggleTheme} />
          </Row>
        </Card>

        <Card className="p-5">
          <SectionTitle>Data pipeline</SectionTitle>
          <Row
            label="Signal source"
            description="Google News RSS across a watchlist of tracked entities and themes, normalized into the schema by a Claude API call at ingest time, then scored on the outreach-relevance rubric."
          >
            <Pill tone="emerald">Live</Pill>
          </Row>
          <Row
            label="Ingest schedule"
            description="Daily cron. On Vercel's Hobby plan this is capped at once per day — a self-hosted deployment can run it hourly."
          >
            <Pill tone="slate">Daily</Pill>
          </Row>
          <Row
            label="Signals by origin"
            description="Seed rows predate the pipeline; news rows come from the cron; community rows are pushed in from local last30days runs."
          >
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(origins).map(([origin, count]) => (
                <Pill key={origin} tone={origin === "community" ? "violet" : "slate"}>
                  {origin}: {count}
                </Pill>
              ))}
            </div>
          </Row>
          <Row
            label="Contacts and technographics"
            description="Not ingested. The Contacts and Tech tabs on an account are intentionally empty rather than inferred — see those tabs for what would populate them."
          >
            <Pill tone="slate">Not connected</Pill>
          </Row>
          <Row
            label="Alert delivery"
            description="Saved alerts re-run live in the browser, but no email is sent. Delivery needs a scheduled server job with a mail transport."
          >
            <Pill tone="amber">Partial</Pill>
          </Row>
        </Card>

        <Card className="p-5">
          <SectionTitle hint="Territory verticals a signal can be attributed to. A signal can land in several, or in none.">
            Patches
          </SectionTitle>
          <div className="space-y-3">
            {PATCHES.map((patch) => (
              <div key={patch} className="flex flex-wrap items-baseline gap-2">
                <Pill tone="indigo">{PATCH_LABELS[patch]}</Pill>
                <p className="min-w-0 flex-1 text-[12px] leading-relaxed text-slate-500 dark:text-zinc-400">
                  {PATCH_DESCRIPTIONS[patch]}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle>AE roster</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {AE_ROSTER.map((ae) => (
              <span
                key={ae.name}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[13px] dark:border-zinc-700"
              >
                <span className="font-medium text-slate-900 dark:text-zinc-100">{ae.name}</span>
                <Pill tone="slate">{PATCH_LABELS[ae.primaryPatch]}</Pill>
              </span>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle hint="The tab strip taxonomy used on the feed, search and account pages.">
            Signal groups
          </SectionTitle>
          <div className="space-y-2">
            {SIGNAL_GROUPS.map((group) => (
              <div key={group.id} className="flex flex-wrap items-baseline gap-2">
                <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-900 dark:text-zinc-100">
                  <group.Icon className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-500" />
                  {group.label}
                </span>
                <span className="text-[12px] text-slate-500 dark:text-zinc-400">{group.types.join(", ")}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle>Practice areas</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PRACTICE_AREA_LABELS).map(([id, label]) => (
              <Pill key={id} tone="sky">
                {label}
              </Pill>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}

export default Settings
