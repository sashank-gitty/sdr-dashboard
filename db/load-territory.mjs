// Loads the AE territory spreadsheets into the territory_accounts table.
//
//   node --env-file=.env.local db/load-territory.mjs ~/path/to/territory-files/
//   node db/load-territory.mjs ~/path/to/territory-files/ --dry-run
//
// The directory should contain the four AE workbooks, matched by name:
//   *Tristan*.xlsx  *Terence*.xlsx  *Jared*.xlsx  *James*.xlsx
//
// The spreadsheets are READ FROM DISK and never copied into this repo.
// That is the whole point of this script existing: the repository is
// public, and these files carry named-customer ARR, renewal dates and
// lost deal values. Keep them somewhere local (or a private Drive), pass
// the path, and let the data live only in Postgres behind the app's auth.
//
// Re-running is safe — every row upserts on account_key.
import { readdirSync } from "node:fs"
import { join } from "node:path"
import { neon } from "@neondatabase/serverless"
import ExcelJS from "exceljs"
import { normalizeAccountName } from "../api/_lib/matchAccounts.js"

const dryRun = process.argv.includes("--dry-run")
const dir = process.argv.slice(2).find((a) => !a.startsWith("--"))

if (!dir) {
  console.error("Usage: node db/load-territory.mjs <directory-with-AE-xlsx-files> [--dry-run]")
  process.exit(1)
}
if (!dryRun && !process.env.DATABASE_URL) {
  console.error(
    "DATABASE_URL is not set. Run `vercel env pull .env.local` first, then\n" +
      "pass it through: node --env-file=.env.local db/load-territory.mjs <dir>",
  )
  process.exit(1)
}

// "$157K" | "$1,267M" | 1234.5 | "" -> number of dollars.
function money(value) {
  if (value === null || value === undefined) return 0
  if (typeof value === "number") return Number.isFinite(value) ? value : 0
  let s = String(value).trim()
  if (!s) return 0
  const negative = s.startsWith("-") || s.startsWith("($")
  s = s.replace(/[$,()]/g, "").replace(/^-/, "").trim()
  let multiplier = 1
  const suffix = s.slice(-1).toUpperCase()
  if (suffix === "K") { multiplier = 1e3; s = s.slice(0, -1) }
  else if (suffix === "M") { multiplier = 1e6; s = s.slice(0, -1) }
  else if (suffix === "B") { multiplier = 1e9; s = s.slice(0, -1) }
  const parsed = Number.parseFloat(s)
  if (!Number.isFinite(parsed)) return 0
  return (negative ? -1 : 1) * parsed * multiplier
}

function int(value) {
  const n = money(value)
  return Number.isFinite(n) ? Math.round(n) : 0
}

function text(value) {
  if (value === null || value === undefined) return ""
  return String(value).trim()
}

// Worksheet -> array of plain objects keyed by the header row, so the
// per-AE blocks below can read columns by their spreadsheet name.
// ExcelJS rows are 1-indexed and a cell may hold a formula result
// object ({ result }) or rich text ({ richText }), so unwrap both.
function cellValue(cell) {
  const v = cell?.value
  if (v === null || v === undefined) return ""
  if (typeof v === "object") {
    if (v.result !== undefined) return v.result
    if (Array.isArray(v.richText)) return v.richText.map((t) => t.text).join("")
    if (v.text !== undefined) return v.text
    if (v instanceof Date) return v
    return ""
  }
  return v
}

function sheet(workbook, name) {
  const ws = typeof name === "number" ? workbook.worksheets[name] : workbook.getWorksheet(name)
  if (!ws) return []
  const headerRow = ws.getRow(1)
  const headers = []
  headerRow.eachCell({ includeEmpty: true }, (cell, col) => {
    headers[col] = String(cellValue(cell) ?? "").trim()
  })
  const out = []
  ws.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return
    const obj = {}
    row.eachCell({ includeEmpty: true }, (cell, col) => {
      const key = headers[col]
      if (key) obj[key] = cellValue(cell)
    })
    if (Object.values(obj).some((v) => String(v ?? "").trim() !== "")) out.push(obj)
  })
  return out
}

async function openWorkbook(path) {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(path)
  return wb
}

function findFile(files, needle) {
  return files.find((f) => f.toLowerCase().includes(needle) && f.toLowerCase().endsWith(".xlsx"))
}

const files = readdirSync(dir)
const rows = []

function push(row) {
  const name = text(row.account_name)
  if (!name) return
  const key = normalizeAccountName(name)
  if (!key) return
  const lines = []
  if (row.cx_arr > 0) lines.push("CX")
  if (row.ex_arr > 0) lines.push("EX")
  if (row.mr_arr > 0) lines.push("MR")
  if (row.rs_spend > 0) lines.push("RS")
  rows.push({ ...row, account_key: key, account_name: name, lines_held: lines })
}

// ---- Terence Fong ------------------------------------------------------
const terenceFile = findFile(files, "terence")
if (terenceFile) {
  const wb = await openWorkbook(join(dir, terenceFile))
  for (const r of sheet(wb, "Full Account List")) {
    push({
      account_name: r["Deployment Account Name"], ae: "Terence Fong",
      vertical: text(r["Deployment Vertical"]), country: text(r["Deployment Billing Country"]),
      territory_priority: text(r["Territory Priority"]), icp: text(r["Deployment ICP"]),
      segment: text(r["ENT/CORP"]),
      is_customer: text(r["Customer Status"]).toLowerCase() === "yes",
      revenue_musd: money(r["ax. Annual Revenue"]), employees: int(r["Max. Employee Count"]),
      arr: money(r["Arr"]), cx_arr: money(r["Cx Arr"]), ex_arr: money(r["Ex Arr"]),
      mr_arr: money(r["Mr Arr"]), rs_spend: money(r["Rs Spend"]),
      open_pipeline: money(r["Software Open Pipeline"]),
      lost_pipeline_py: money(r["Software Lost Pipe Py"]),
      won_all_time: money(r["Software Qr Won All Time"]),
      engaged_l30: int(r["Engaged Contacts L30"]), engaged_l90: int(r["Engaged Contacts L90"]),
      source_file: terenceFile,
    })
  }
}

// ---- Tristan -----------------------------------------------------------
const tristanFile = findFile(files, "tristan")
if (tristanFile) {
  const wb = await openWorkbook(join(dir, tristanFile))
  for (const r of sheet(wb, "Full Account List")) {
    push({
      account_name: r["Account Name"], ae: "Tristan",
      vertical: "FSI", country: text(r["Billing Country"]),
      territory_priority: text(r["Territory Priority"]), icp: text(r["ICP"]), segment: "",
      is_customer: text(r["Customer"]).toLowerCase() === "yes",
      revenue_musd: money(r["Annual Revenue"]), employees: int(r["Employee Count"]),
      arr: money(r["ARR"]), cx_arr: money(r["CX ARR"]), ex_arr: money(r["EX ARR"]),
      mr_arr: money(r["MR ARR"]), rs_spend: money(r["Rs Spend"]),
      open_pipeline: money(r["Software Open Pipeline"]),
      lost_pipeline_py: money(r["Software Lost Pipe Py"]),
      won_all_time: money(r["Software Qr Won All Time"]),
      engaged_l30: int(r["Engaged Contacts L30"]), engaged_l90: int(r["Engaged Contacts L90"]),
      source_file: tristanFile,
    })
  }
}

// ---- Jared Dries -------------------------------------------------------
// No per-line split in this book: the combined "(SW or RS) - Spend"
// column lands in arr and the CX/EX/MR parts stay 0, so cross-sell views
// correctly report "unknown split" rather than "holds nothing".
const jaredFile = findFile(files, "jared")
if (jaredFile) {
  const wb = await openWorkbook(join(dir, jaredFile))
  for (const r of sheet(wb, "Mastercopy")) {
    const spend = money(r["(SW or RS) - Spend"])
    push({
      account_name: r["Deployment Account Name"], ae: "Jared Dries",
      vertical: text(r["Vertical"]), country: "",
      territory_priority: text(r["Territory Priority"]), icp: "", segment: "",
      is_customer: spend > 0,
      revenue_musd: money(r["Annual Revenue"]) / 1e6, employees: int(r["Employee Count"]),
      arr: spend, cx_arr: 0, ex_arr: 0, mr_arr: 0, rs_spend: 0,
      open_pipeline: money(r["(SW or RS) - Current Pipeline"]),
      lost_pipeline_py: money(r["(SW or RS) - Lost Pipeline PY"]),
      won_all_time: money(r["(SW or RS) - QR Won All Time"]),
      engaged_l30: 0, engaged_l90: 0,
      source_file: jaredFile,
    })
  }
}

// ---- James Locke -------------------------------------------------------
const jamesFile = findFile(files, "james")
if (jamesFile) {
  const wb = await openWorkbook(join(dir, jamesFile))
  for (const r of sheet(wb, 0)) {
    const spend = money(r["Spend"])
    push({
      account_name: r["Deployment Account Name"], ae: "James Locke",
      vertical: text(r["Deployment Account Vertical"]), country: "",
      territory_priority: text(r["Territory Priority"]), icp: "", segment: "",
      is_customer: spend > 0,
      revenue_musd: money(r["Annual Revenue"]) / 1e6, employees: int(r["Employee Count"]),
      arr: spend, cx_arr: 0, ex_arr: 0, mr_arr: 0, rs_spend: 0,
      open_pipeline: money(r["(SW or RS) - Current Pipeline"]),
      lost_pipeline_py: money(r["(SW or RS) - Lost Pipeline PY"]),
      won_all_time: money(r["(SW or RS) - QR Won All Time"]),
      engaged_l30: 0, engaged_l90: 0,
      source_file: jamesFile,
    })
  }
}

// Later duplicates lose — the first book to claim an account key keeps it,
// which keeps reloads deterministic regardless of directory order.
const seen = new Set()
const unique = rows.filter((r) => (seen.has(r.account_key) ? false : seen.add(r.account_key)))

const customers = unique.filter((r) => r.is_customer)
console.log(`Parsed ${unique.length} accounts (${rows.length - unique.length} duplicate keys dropped)`)
for (const ae of [...new Set(unique.map((r) => r.ae))].sort()) {
  const g = unique.filter((r) => r.ae === ae)
  const arr = g.reduce((s, r) => s + r.arr, 0)
  console.log(`  ${ae.padEnd(14)} ${String(g.length).padStart(4)} accounts  ${String(g.filter((r) => r.is_customer).length).padStart(3)} customers  $${Math.round(arr).toLocaleString()} ARR`)
}
console.log(`  TOTAL          ${String(unique.length).padStart(4)} accounts  ${String(customers.length).padStart(3)} customers  $${Math.round(unique.reduce((s, r) => s + r.arr, 0)).toLocaleString()} ARR`)

if (dryRun) {
  console.log("\nDry run — nothing written.")
  process.exit(0)
}

const sql = neon(process.env.DATABASE_URL)
let written = 0
for (const r of unique) {
  await sql`
    INSERT INTO territory_accounts (
      account_key, account_name, ae, vertical, country, territory_priority, icp, segment,
      is_customer, revenue_musd, employees, arr, cx_arr, ex_arr, mr_arr, rs_spend,
      open_pipeline, lost_pipeline_py, won_all_time, engaged_l30, engaged_l90,
      lines_held, source_file, loaded_at
    ) VALUES (
      ${r.account_key}, ${r.account_name}, ${r.ae}, ${r.vertical}, ${r.country},
      ${r.territory_priority}, ${r.icp}, ${r.segment}, ${r.is_customer},
      ${r.revenue_musd}, ${r.employees}, ${r.arr}, ${r.cx_arr}, ${r.ex_arr}, ${r.mr_arr},
      ${r.rs_spend}, ${r.open_pipeline}, ${r.lost_pipeline_py}, ${r.won_all_time},
      ${r.engaged_l30}, ${r.engaged_l90}, ${r.lines_held}, ${r.source_file}, NOW()
    )
    ON CONFLICT (account_key) DO UPDATE SET
      account_name = EXCLUDED.account_name, ae = EXCLUDED.ae, vertical = EXCLUDED.vertical,
      country = EXCLUDED.country, territory_priority = EXCLUDED.territory_priority,
      icp = EXCLUDED.icp, segment = EXCLUDED.segment, is_customer = EXCLUDED.is_customer,
      revenue_musd = EXCLUDED.revenue_musd, employees = EXCLUDED.employees, arr = EXCLUDED.arr,
      cx_arr = EXCLUDED.cx_arr, ex_arr = EXCLUDED.ex_arr, mr_arr = EXCLUDED.mr_arr,
      rs_spend = EXCLUDED.rs_spend, open_pipeline = EXCLUDED.open_pipeline,
      lost_pipeline_py = EXCLUDED.lost_pipeline_py, won_all_time = EXCLUDED.won_all_time,
      engaged_l30 = EXCLUDED.engaged_l30, engaged_l90 = EXCLUDED.engaged_l90,
      lines_held = EXCLUDED.lines_held, source_file = EXCLUDED.source_file, loaded_at = NOW()
  `
  written += 1
  if (written % 250 === 0) console.log(`  ...${written}`)
}
console.log(`\nWrote ${written} accounts to territory_accounts.`)
