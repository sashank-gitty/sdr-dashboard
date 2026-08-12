// Patch/AE selections are mirrored into the query string so a view can
// be handed to the rep who owns it as a link — "here's your FSI feed" —
// instead of a list of checkboxes for them to re-tick.
//
// Only the territory filters are URL-backed, not every filter in the
// sidebar. These are the ones worth sending to someone else; date range
// and signal type are personal working state and stay in localStorage
// where they were. A link therefore says "this patch, this rep" and
// lets the recipient's own preferences apply to everything else.
import { PATCHES } from "../../shared/patches.js"

const PATCH_PARAM = "patch"
const AE_PARAM = "ae"
const ACCOUNTS_PARAM = "accounts"

function parseList(raw) {
  if (!raw) return []
  return [...new Set(raw.split(",").map((v) => v.trim()).filter(Boolean))]
}

/**
 * Read the territory view out of the current URL. Returns null when the
 * URL carries no view at all, which is how the caller knows to fall
 * back to the persisted localStorage state instead of overwriting it
 * with empties on a normal visit.
 */
export function readViewFromUrl() {
  if (typeof window === "undefined") return null

  const params = new URLSearchParams(window.location.search)
  if (!params.has(PATCH_PARAM) && !params.has(AE_PARAM) && !params.has(ACCOUNTS_PARAM)) {
    return null
  }

  return {
    // Unknown patch identifiers are dropped rather than trusted — the
    // value came off a URL someone could have hand-edited, and an
    // unrecognized one would filter the feed down to nothing with no
    // obvious cause.
    patchFilter: parseList(params.get(PATCH_PARAM)).filter((p) => PATCHES.includes(p)),
    aeFilter: parseList(params.get(AE_PARAM)),
    namedAccountsOnly: params.get(ACCOUNTS_PARAM) === "1",
  }
}

/**
 * Mirror the current territory view into the address bar. Uses
 * replaceState, not pushState: ticking filter boxes shouldn't stack up
 * history entries that make Back feel broken.
 */
export function writeViewToUrl({ patchFilter, aeFilter, namedAccountsOnly }) {
  if (typeof window === "undefined") return

  const params = new URLSearchParams(window.location.search)

  if (patchFilter.length) params.set(PATCH_PARAM, patchFilter.join(","))
  else params.delete(PATCH_PARAM)

  if (aeFilter.length) params.set(AE_PARAM, aeFilter.join(","))
  else params.delete(AE_PARAM)

  if (namedAccountsOnly) params.set(ACCOUNTS_PARAM, "1")
  else params.delete(ACCOUNTS_PARAM)

  const query = params.toString()
  window.history.replaceState(
    null,
    "",
    query ? `${window.location.pathname}?${query}` : window.location.pathname,
  )
}
