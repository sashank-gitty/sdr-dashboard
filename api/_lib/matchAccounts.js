// Deterministic entity -> AE account matching.
//
// A signal's "entity" is free text the normalizer wrote ("National
// Australia Bank (NAB)", "OAIC / Qantas Airways", "Reserve Bank of
// Australia"). This maps it back to real rows in the AE territory book
// so a signal can be attributed to a patch, an owning AE, and a
// customer-vs-prospect status.
//
// Deliberately rule-based rather than another LLM call: it runs on
// every ingested item, the answer is a lookup rather than a judgment,
// and a wrong match is worse than no match — it would file a signal
// into the wrong rep's territory. So this errs hard towards precision.
// Thematic patch tagging for signals that name no account at all
// (macro, regulatory, vendor news) is a separate job handled by the
// normalizer, see api/_lib/normalize.js.
import { ACCOUNT_REGISTRY } from "./accountRegistry.js"

// Must stay identical to normalize_account_name() in
// scripts/build-account-registry.py — the registry's "key" field is
// built by that function, and these keys are what we look up here.
const STOPWORDS =
  /\b(pty|proprietary|ltd|limited|inc|incorporated|llc|plc|co|company|corporation|corp|group|holdings|holding|australia|australian|aust|nz|new zealand|australasia|the|and)\b/g

export function normalizeAccountName(name) {
  const original = String(name ?? "").trim().toLowerCase()
  const normalized = original
    .replace(/[.,'"()/]/g, " ")
    .replace(STOPWORDS, " ")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  // Guard against an account whose name is nothing but stopwords
  // ("The Australia Group Pty Ltd") collapsing to an empty key that
  // would then match everything.
  return normalized || original
}

// Single-token registry keys that are ordinary English words. These are
// real accounts, but matching them on a bare token would tag any signal
// mentioning the word. They still match on an exact whole-string hit.
const GENERIC_SINGLE_TOKENS = new Set([
  "administration",
  "advantage",
  "alchemy",
  "partners",
])

// Below this length a lone token is too collision-prone to match on its
// own (3M, ACI, ACO, AON). Exact whole-string equality still works.
const MIN_LOOSE_TOKEN_LENGTH = 6

const byKey = new Map()
for (const account of ACCOUNT_REGISTRY) {
  // First writer wins so the match is stable across rebuilds; the
  // registry is emitted in sorted key order.
  if (!byKey.has(account.key)) byKey.set(account.key, account)
}

// Registry keys that are safe to look for inside a longer entity
// string, grouped by token count so we only test n-grams of a length
// that could actually hit.
const looseKeysByLength = new Map()
for (const key of byKey.keys()) {
  const tokens = key.split(" ")
  if (tokens.length === 1) {
    if (key.length < MIN_LOOSE_TOKEN_LENGTH) continue
    if (GENERIC_SINGLE_TOKENS.has(key)) continue
  }
  if (!looseKeysByLength.has(tokens.length)) looseKeysByLength.set(tokens.length, new Set())
  looseKeysByLength.get(tokens.length).add(key)
}
const LOOSE_LENGTHS = [...looseKeysByLength.keys()].sort((a, b) => b - a)

// One entity string can name more than one organisation — the
// normalizer writes "OAIC / Qantas Airways" for a regulator acting on a
// company, and "Medallia / Atombit" for an acquisition. Split those
// apart, and treat a trailing "(NAB)" as its own candidate so both the
// long form and the abbreviation get a shot at matching.
function candidatesFor(entity) {
  const raw = String(entity ?? "")
  const parts = raw
    .split(/\s*[/|,]\s*|\s+&\s+|\s+vs\.?\s+/i)
    .map((p) => p.trim())
    .filter(Boolean)

  const candidates = new Set()
  for (const part of [raw, ...parts]) {
    candidates.add(part)
    for (const paren of part.matchAll(/\(([^)]+)\)/g)) candidates.add(paren[1])
    const withoutParens = part.replace(/\([^)]*\)/g, " ").trim()
    if (withoutParens) candidates.add(withoutParens)
  }
  return [...candidates].filter(Boolean)
}

/**
 * Resolve a signal entity to accounts in the AE territory book.
 * Returns [] when the entity names no tracked account, which is the
 * common case — most signals are macro, regulatory or vendor news.
 */
export function matchAccounts(entity) {
  const matched = new Map()

  for (const candidate of candidatesFor(entity)) {
    const key = normalizeAccountName(candidate)
    if (!key) continue

    const exact = byKey.get(key)
    if (exact) {
      matched.set(exact.key, exact)
      continue
    }

    // No exact hit: look for a registry key sitting inside the
    // candidate ("Woolworths customer experience" -> "woolworths").
    // Longest n-gram first so "bank of china" wins over "china".
    const tokens = key.split(" ")
    for (const length of LOOSE_LENGTHS) {
      if (length > tokens.length) continue
      const keys = looseKeysByLength.get(length)
      for (let i = 0; i + length <= tokens.length; i += 1) {
        const gram = tokens.slice(i, i + length).join(" ")
        if (keys.has(gram)) {
          const account = byKey.get(gram)
          if (account) matched.set(account.key, account)
        }
      }
      if (matched.size) break
    }
  }

  return [...matched.values()]
}

/**
 * The full territory attribution for a signal entity: which patches it
 * lands in, which AEs own it, and whether any matched account is
 * already a customer (a renewal/expansion angle) rather than a prospect
 * (a net-new angle).
 */
export function attributeEntity(entity) {
  const accounts = matchAccounts(entity)
  const patches = [...new Set(accounts.map((a) => a.patch).filter(Boolean))]
  const owningAes = [...new Set(accounts.flatMap((a) => a.aes ?? []))]
  const statuses = new Set(accounts.map((a) => a.status).filter(Boolean))

  return {
    matchedAccounts: accounts.map((a) => a.name),
    patches,
    owningAes,
    // "customer" wins over "prospect" when an entity resolves to both —
    // an existing relationship is the more actionable of the two.
    accountStatus: statuses.has("customer")
      ? "customer"
      : statuses.has("prospect")
        ? "prospect"
        : null,
  }
}
