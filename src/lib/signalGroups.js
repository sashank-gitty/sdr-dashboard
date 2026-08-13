import {
  NewspaperIcon,
  PersonPlusIcon,
  ChartIcon,
  ScaleIcon,
  DocumentIcon,
  MicIcon,
  SparklesIcon,
  BriefcaseIcon,
} from "../components/icons.jsx"

// Signal-type groups, the taxonomy behind the tab strip that sits above
// every signal list (feed, search, account detail).
//
// These are deliberately NOT a 1:1 copy of the reference product's tabs
// (News & Press / Podcasts / Hiring / Documents & Reports / Earnings /
// M&A / Funding / Clinical Trials). That set is built for a US-tech
// account book fed by SEC filings and clinical-trial registries; this
// pipeline ingests ANZ news against a CX/EX territory book and has no
// clinical trials and no hiring feed at all. Copying the labels verbatim
// would have shipped three tabs permanently reading 0 — an empty tab is
// worse than an absent one, because it reads as broken ingest rather than
// as a category that doesn't apply.
//
// What is preserved is the *pattern*: a small set of stable, mutually
// exclusive groups with live counts, so the same tab strip works on every
// surface. Every canonical type in shared/signalTypes.js appears in
// exactly one group; anything unrecognized falls through to "other" so a
// new type from the normalizer is never silently invisible.
export const SIGNAL_GROUPS = [
  {
    id: "news",
    label: "News & Press",
    Icon: NewspaperIcon,
    types: ["market shift", "brand move", "product launch", "new entrant"],
  },
  {
    id: "leadership",
    label: "Leadership",
    Icon: PersonPlusIcon,
    types: ["leadership change"],
  },
  {
    id: "earnings",
    label: "Earnings",
    Icon: ChartIcon,
    types: ["earnings"],
  },
  {
    id: "funding",
    label: "Funding & M&A",
    Icon: BriefcaseIcon,
    types: ["funding", "partnership"],
  },
  {
    id: "research",
    label: "Research & Reports",
    Icon: DocumentIcon,
    types: ["analyst report", "research shift"],
  },
  {
    id: "regulatory",
    label: "Regulatory",
    Icon: ScaleIcon,
    types: ["regulation", "pain point"],
  },
  {
    id: "transformation",
    label: "Transformation",
    Icon: SparklesIcon,
    types: ["digital transformation", "restructure"],
  },
  {
    id: "community",
    label: "Community",
    Icon: MicIcon,
    // The one group keyed off origin rather than signal type: community
    // rows carry signalType "community insight", which belongs to no
    // news category.
    types: ["community insight"],
  },
]

const TYPE_TO_GROUP = new Map()
for (const group of SIGNAL_GROUPS) {
  for (const type of group.types) TYPE_TO_GROUP.set(type, group.id)
}

export function groupForSignal(signal) {
  if (signal.origin === "community") return "community"
  return TYPE_TO_GROUP.get(signal.signalType) ?? "other"
}

export function groupLabel(id) {
  return SIGNAL_GROUPS.find((g) => g.id === id)?.label ?? "Other"
}

export function iconForSignal(signal) {
  const id = groupForSignal(signal)
  return SIGNAL_GROUPS.find((g) => g.id === id)?.Icon ?? DocumentIcon
}

// Counts for the tab strip. Every group gets a key even at zero so the
// tabs don't reflow as filters change, and "other" is only included when
// something actually landed there.
export function countByGroup(signals) {
  const counts = { all: signals.length, other: 0 }
  for (const group of SIGNAL_GROUPS) counts[group.id] = 0
  for (const signal of signals) {
    const id = groupForSignal(signal)
    counts[id] = (counts[id] ?? 0) + 1
  }
  return counts
}

export function filterByGroup(signals, groupId) {
  if (!groupId || groupId === "all") return signals
  return signals.filter((s) => groupForSignal(s) === groupId)
}
