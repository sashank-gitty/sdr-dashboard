import ThemeToggle from "./ThemeToggle.jsx"

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

function Header({ search, onSearchChange, onOpenPalette, theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white">
            SC
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-900 dark:text-zinc-50">SDR Command Center</p>
            <p className="text-[11px] font-medium text-slate-400 dark:text-zinc-500">Qualtrics ANZ &middot; Signal Intelligence</p>
          </div>
        </div>

        <div className="ml-0 flex flex-1 items-center gap-2 sm:ml-6">
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search headlines, summaries, entities..."
              className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-500 dark:focus:bg-zinc-950"
            />
          </div>

          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden shrink-0 items-center gap-2 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-500 transition-all hover:border-slate-300 hover:text-slate-900 sm:inline-flex dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
          >
            Jump to
            <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              &#8984;K
            </kbd>
          </button>
        </div>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}

export default Header
