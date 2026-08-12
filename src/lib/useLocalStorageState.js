import { useEffect, useState } from "react"

/**
 * State persisted to localStorage.
 *
 * `override` takes precedence over both the stored value and
 * `initialValue` on first render, for state that can also arrive from
 * outside the browser — the patch/AE filters carried on a shared view
 * link. Without it the stored value would win and a link sent to
 * someone who has used the dashboard before would silently do nothing.
 * Pass undefined (the default) for ordinary persisted state.
 */
export function useLocalStorageState(key, initialValue, override = undefined) {
  const [value, setValue] = useState(() => {
    if (override !== undefined) return override
    if (typeof window === "undefined") return initialValue
    try {
      const stored = window.localStorage.getItem(key)
      return stored === null ? initialValue : JSON.parse(stored)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage can be unavailable (private mode, quota) — fail silently.
    }
  }, [key, value])

  return [value, setValue]
}
