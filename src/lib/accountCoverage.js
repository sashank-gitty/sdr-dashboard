// How a signal relates to the AE territory book — the third territory
// axis, alongside patch and AE.
//
// The two interesting modes are opposites, and both are real workflows:
//
//   "named"      Only signals naming an account someone already owns.
//                Cuts macro and vendor noise down to "a company in our
//                book is in the news today". This is patch defence.
//
//   "unassigned" The inverse: a specific named company in the news that
//                matched nothing in the territory book. This is
//                whitespace — a company nobody is covering, found via a
//                market signal rather than an account list.
//
//                Three conditions, and the last two are what keep it
//                useful rather than a dumping ground:
//                  - matched no account in the book
//                  - micro scope, because a macro story about "the
//                    Australian retail sector" names no company to call
//                  - carries at least one patch, which is what filters
//                    out competitors and vendors. A NICE product launch
//                    is also a named company nobody owns, but it isn't
//                    a prospect. The ingest normalizer deliberately
//                    assigns no patch to vendor and competitor news
//                    (see api/_lib/normalize.js), so requiring a patch
//                    keeps this to companies that actually buy.
//
// Whitespace is deliberately not treated as leftovers. When a territory
// is thin, the unassigned column is where the next account comes from:
// a business winning an ANZ licence or opening a local office has a
// live project, no incumbent vendor here, and no rep on it yet.
export const ACCOUNT_COVERAGE_MODES = ["all", "named", "unassigned"]

export const ACCOUNT_COVERAGE_LABELS = {
  all: "All signals",
  named: "Named accounts only",
  unassigned: "Unassigned only",
}

// Short forms for the three-way selector, where the full labels don't fit.
export const ACCOUNT_COVERAGE_SHORT_LABELS = {
  all: "All",
  named: "Named",
  unassigned: "Unassigned",
}

export const ACCOUNT_COVERAGE_HINTS = {
  all: "No account filter.",
  named: "Only signals naming an account in someone's territory book.",
  unassigned:
    "Named companies that match no account in the book — whitespace nobody is covering yet.",
}

export function matchesAccountCoverage(item, mode) {
  const matched = (item.matchedAccounts ?? []).length > 0
  if (mode === "named") return matched
  if (mode === "unassigned") {
    return !matched && item.scope === "micro" && (item.patches ?? []).length > 0
  }
  return true
}
