import { useEffect, useRef, useState } from "react"
import { linkProps } from "../lib/router.js"
import ThemeToggle from "./ThemeToggle.jsx"
import SyncStatus from "./SyncStatus.jsx"
import {
  SparklesIcon,
  FeedIcon,
  BriefcaseIcon,
  AlertIcon,
  SlidersIcon,
  SearchIcon,
  HelpIcon,
  BellIcon,
  MenuIcon,
  XIcon,
} from "./icons.jsx"

const NAV_ITEMS = [
  { page: "magic", href: "/magic", label: "Magic", Icon: SparklesIcon },
  { page: "feed", href: "/feed", label: "Global Feed", Icon: FeedIcon },
  { page: "accounts", href: "/accounts", label: "Accounts", Icon: BriefcaseIcon },
  { page: "alerts", href: "/alerts", label: "Alerts", Icon: AlertIcon },
  { page: "settings", href: "/settings", label: "Settings", Icon: SlidersIcon },
]

function Wordmark() {
  return (
    <a
      {...linkProps("/feed")}
      className="flex flex-shrink-0 items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
    >
      <span className="text-[17px] font-semibold tracking-tight text-slate-900 dark:text-zinc-50">
        command<span className="text-indigo-600 dark:text-indigo-400">center</span>
      </span>
      {/* The toggle-pill glyph: two overlapping discs in a rounded track,
          echoing the "always-on agents" idea the nav sits above. */}
      <span className="hidden h-5 w-9 items-center rounded-full bg-slate-900 px-0.5 sm:inline-flex dark:bg-zinc-100">
        <span className="h-4 w-4 rounded-full bg-indigo-500" />
        <span className="-ml-1.5 h-4 w-4 rounded-full bg-sky-400" />
      </span>
    </a>
  )
}

function NavLink({ item, active }) {
  const { Icon, label, href } = item
  return (
    <a
      {...linkProps(href)}
      aria-current={active ? "page" : undefined}
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
        active
          ? "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </a>
  )
}

function TopNav({
  page,
  onOpenPalette,
  theme,
  onToggleTheme,
  syncStatus,
  unreadCount = 0,
  user = { name: "SDR Team", org: "Qualtrics ANZ" },
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileRef = useRef(null)

  // Close the mobile sheet on route change, so tapping a destination
  // doesn't leave the overlay covering the page you just navigated to.
  useEffect(() => {
    setMobileOpen(false)
  }, [page])

  useEffect(() => {
    if (!mobileOpen) return
    function onKey(e) {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/85">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          {mobileOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>

        <Wordmark />

        <nav aria-label="Primary" className="ml-4 hidden items-center gap-0.5 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.page} item={item} active={page === item.page} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          {/* Search is a button, not an input: the real search surface is
              the /search page and the ⌘K palette, and a second always-live
              input in the chrome would compete with both. */}
          <button
            type="button"
            onClick={onOpenPalette}
            className="inline-flex items-center gap-2 rounded-lg border border-transparent px-2.5 py-1.5 text-[13px] font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100"
          >
            <SearchIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded border border-slate-300 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-500 lg:inline dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              &#8984;K
            </kbd>
          </button>

          <SyncStatus status={syncStatus} />

          <a
            {...linkProps("/settings")}
            aria-label="Help and settings"
            className="hidden h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 sm:inline-flex dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <HelpIcon className="h-[18px] w-[18px]" />
          </a>

          <a
            {...linkProps("/alerts")}
            aria-label={`Alerts${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
            className="relative inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <BellIcon className="h-[18px] w-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-zinc-950">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </a>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <div className="ml-1 flex items-center gap-2">
            <div className="hidden text-right leading-tight lg:block">
              <p className="text-[13px] font-semibold text-slate-900 dark:text-zinc-50">{user.name}</p>
              <p className="text-[11px] text-slate-400 dark:text-zinc-500">{user.org}</p>
            </div>
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-400 text-[13px] font-bold text-white">
              {user.name
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")}
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div ref={mobileRef} className="border-t border-slate-200 bg-white px-3 py-2 md:hidden dark:border-zinc-800 dark:bg-zinc-950">
          <nav aria-label="Primary mobile" className="flex flex-col gap-0.5">
            {NAV_ITEMS.map((item) => {
              const { Icon, label, href, page: itemPage } = item
              const active = page === itemPage
              return (
                <a
                  key={itemPage}
                  {...linkProps(href)}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400"
                      : "text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {label}
                </a>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

export default TopNav
