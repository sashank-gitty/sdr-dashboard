#!/usr/bin/env python3
"""Regenerate api/_lib/accountRegistry.js from the AE territory spreadsheets.

The territory .xlsx files are NOT in this repo — they carry revenue,
pipeline and contact data that has no business being in git. Only the
four fields the dashboard actually needs (account name, patch, owning
AE, customer/prospect) get written into the generated registry.

Usage:
    python3 scripts/build-account-registry.py /path/to/territory-files/

Zero dependencies on purpose — this is a rare, offline, manual step run
against trusted local files, and the maintained xlsx readers on npm are
either abandoned (SheetJS 0.18.5, unfixable advisories) or overkill. An
.xlsx is a zip of XML, and stdlib zipfile + ElementTree read it fine.

Re-run this whenever the AEs re-cut their territories, then commit the
regenerated registry. SHEETS below is the only thing that needs editing
if a file is renamed or a column moves.
"""

import json
import re
import sys
import zipfile
from collections import Counter, defaultdict
from pathlib import Path
from xml.etree import ElementTree

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
      "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships"}

# Sentinel for customer_values: read customer_col as a spend figure and
# treat any amount above zero as "customer". Its own object rather than a
# string so it can never collide with a real cell value.
POSITIVE_SPEND = object()


def spend_above_zero(raw):
    """True when a spend cell holds an amount greater than zero.

    The books write these as display strings ("$159K", "$1.2M", "$0"),
    not bare numbers, so the suffix has to be honoured — float("$159K")
    raises, and treating a parse failure as zero would silently demote
    every customer in those two territories to a prospect.
    """
    if raw is None:
        return False
    t = str(raw).strip().replace("$", "").replace(",", "").replace(" ", "")
    if not t:
        return False
    negative = t.startswith("(") and t.endswith(")")  # ($1K) = -1000
    t = t.strip("()").lstrip("-")
    multiplier = {"K": 1e3, "M": 1e6, "B": 1e9}.get(t[-1:].upper())
    if multiplier:
        t = t[:-1]
    try:
        value = float(t) * (multiplier or 1)
    except ValueError:
        return False
    return not negative and value > 0


# Which sheet/columns to read out of each territory file. Columns are
# 1-indexed to match what you see in Excel.
#
#   customer_col: column holding customer-vs-prospect status, or the
#                 literal "ALL_CUSTOMERS" for sheets that are by
#                 definition a customer list.
#   customer_values: cell values in customer_col that mean "customer", or
#                 the POSITIVE_SPEND sentinel for books that carry no
#                 status column and record spend instead (see below).
#
# Tristan's territory is read from three sheets because his granular
# industry labels live on "Prospects" while "Updated List May26" has the
# wider account coverage — the merge below prefers the granular label.
#
# James's and Jared's books have no customer-status column at all; their
# main sheets record a spend figure per account instead, and an account
# they spend nothing with is a prospect. Reading that column with
# POSITIVE_SPEND is what gives those two territories a status — before
# it, every row on those two sheets was written out with no status, so
# 543 accounts (32% of the book, and effectively all of James's and
# Jared's prospects) were skipped by the named-account watchlist
# rotation, which filters on status. Their patch attribution still
# worked; they were simply never searched for by name.
SHEETS = [
    # file glob,               sheet,                  name, vertical, customer_col,     customer_values,  AE
    ("*Tristan*.xlsx",         "Prospects",               4,  5,       8,                {"Customer"},     "Tristan"),
    ("*Tristan*.xlsx",         "Updated List May26",      1,  2,       5,                {"Customer"},     "Tristan"),
    ("*Tristan*.xlsx",         "Customers",               1,  None,    4,                {"Customer"},     "Tristan"),
    ("*Terence_Fong*.xlsx",    "Full Account List",       2,  9,       7,                {"Yes"},          "Terence Fong"),
    ("*Terence_Fong*.xlsx",    "Current Customers",       1,  3,       "ALL_CUSTOMERS",  None,             "Terence Fong"),
    ("*James_Locke*.xlsx",     "Sheet1",                  1,  2,       6,                POSITIVE_SPEND,   "James Locke"),
    ("*Jared_Dries*.xlsx",     "Mastercopy",              1,  3,       7,                POSITIVE_SPEND,   "Jared Dries"),
    ("*Jared_Dries*.xlsx",     "Current Customers",       1, 10,       "ALL_CUSTOMERS",  None,             "Jared Dries"),
]

GS, TMT, FSI, HCLS, LOC, PUB = (
    "goods_services", "tmt", "fsi", "hcls", "locations", "public_sector",
)

# Exact vertical labels as they appear in the spreadsheets. Terence,
# James and Jared use the standard Qualtrics vertical taxonomy; Tristan
# uses a finer financial-services breakdown that all rolls up to FSI.
EXACT = {
    "goods & services": GS, "tmt": TMT, "fsi": FSI, "hcls": HCLS,
    "locations": LOC, "public sector": PUB,
    "banking": FSI, "insurance": FSI, "insurance brokers": FSI,
    "investments": FSI, "investments brokers": FSI, "investment platform": FSI,
    "fintech": FSI, "private equity": FSI,
    "financial or professional services": FSI,
}

# Applied to the text inside "Other (...)" labels, which is where
# Tristan's non-FSI accounts hide. Order matters: first match wins, so
# the more specific verticals are checked before the Goods & Services
# catch-all.
KEYWORDS = [
    (FSI, ["bank", "insur", "invest", "fintech", "financ", "accounting", "tax",
           "trust", "superann", "payments", "wealth", "broker", "legal",
           "consult", "advis", "commodit", "trading", "equity"]),
    (TMT, ["technology", "software", "media", "telco", "telecom", "tech",
           "data", "printing", "marketing", "design"]),
    (HCLS, ["health", "pharma", "medical", "aged care", "fitness", "biotech"]),
    (LOC, ["real estate", "property", "hospitality", "leisure", "tourism",
           "retail", "restaurant", "venue", "facilities", "rental", "housing"]),
    (PUB, ["government", "public sector", "council", "defence"]),
    (GS, ["mining", "manufactur", "fmcg", "agricultur", "energy", "transport",
          "logistics", "construction", "engineering", "wholesale", "chemical",
          "machinery", "automotive", "industrial", "shipping", "textiles",
          "fuel", "uniforms", "stationery", "hardware", "lighting", "surf",
          "food", "security", "water", "education", "employment", "hr services",
          "non-profit", "philanthropy", "services", "diversified", "holding",
          "partnership", "individual", "admin", "trade"]),
]

GENERIC = {"other", "none", "undefined", "", "nan", "null"}

# Legal-entity noise and geography that shouldn't affect matching. Kept
# identical to normalizeAccountName() in api/_lib/matchAccounts.js — if
# you change one, change the other, or signals stop matching accounts.
STOPWORDS = re.compile(
    r"\b(pty|proprietary|ltd|limited|inc|incorporated|llc|plc|co|company|"
    r"corporation|corp|group|holdings|holding|australia|australian|aust|"
    r"nz|new zealand|australasia|the|and)\b"
)


def col_letter_to_index(ref):
    letters = re.match(r"([A-Z]+)", ref).group(1)
    n = 0
    for ch in letters:
        n = n * 26 + (ord(ch) - 64)
    return n


def read_sheet(xlsx_path, sheet_name):
    """Yield {column_index: cell_text} dicts, one per row, 1-indexed."""
    with zipfile.ZipFile(xlsx_path) as z:
        wb = ElementTree.fromstring(z.read("xl/workbook.xml"))
        rels = ElementTree.fromstring(z.read("xl/_rels/workbook.xml.rels"))
        rel_target = {r.get("Id"): r.get("Target") for r in rels}

        target = None
        for sheet in wb.find("m:sheets", NS):
            if sheet.get("name") == sheet_name:
                rid = sheet.get(f"{{{NS['r']}}}id")
                target = rel_target[rid].lstrip("/")
                break
        if target is None:
            raise KeyError(f"sheet {sheet_name!r} not found in {xlsx_path.name}")
        if not target.startswith("xl/"):
            target = "xl/" + target

        shared = []
        if "xl/sharedStrings.xml" in z.namelist():
            sst = ElementTree.fromstring(z.read("xl/sharedStrings.xml"))
            for si in sst:
                shared.append("".join(t.text or "" for t in si.iter(f"{{{NS['m']}}}t")))

        sheet_xml = ElementTree.fromstring(z.read(target))
        for row in sheet_xml.iter(f"{{{NS['m']}}}row"):
            out = {}
            for c in row:
                ref = c.get("r")
                if not ref:
                    continue
                idx = col_letter_to_index(ref)
                ctype = c.get("t")
                if ctype == "inlineStr":
                    is_el = c.find("m:is", NS)
                    val = "".join(t.text or "" for t in is_el.iter(f"{{{NS['m']}}}t")) if is_el is not None else ""
                else:
                    v = c.find("m:v", NS)
                    if v is None or v.text is None:
                        continue
                    val = shared[int(v.text)] if ctype == "s" else v.text
                # Several cells carry embedded newlines (an AE noting a
                # trading name under the legal one). Collapse to single
                # spaces or the same account lands in the registry twice
                # under two different keys.
                val = re.sub(r"\s+", " ", val).strip()
                if val:
                    out[idx] = val
            if out:
                yield out


def to_patch(raw):
    """Map a spreadsheet vertical label to a canonical patch."""
    if not raw:
        return None
    t = raw.strip().lower()
    if t in GENERIC:
        return None
    if t in EXACT:
        return EXACT[t]
    base = t.split("(")[0].strip()
    if base in EXACT:
        return EXACT[base]
    inner = re.match(r"^[^(]*\((.+)\)\s*$", t)
    probe = inner.group(1) if inner else t
    for patch, kws in KEYWORDS:
        if any(kw in probe for kw in kws):
            return patch
    return None


def specificity(raw):
    """Granular labels beat coarse rollups when merging duplicate rows."""
    if not raw:
        return -1
    t = raw.strip().lower()
    if t in GENERIC:
        return 0
    if t in ("goods & services", "tmt", "fsi", "hcls", "locations", "public sector"):
        return 1
    return 2


def normalize_account_name(name):
    t = name.strip().lower()
    t = re.sub(r"[.,'\"()/]", " ", t)
    t = STOPWORDS.sub(" ", t)
    t = re.sub(r"[^a-z0-9 ]", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    return t or name.strip().lower()


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = Path(sys.argv[1])
    repo = Path(__file__).resolve().parent.parent

    accounts = defaultdict(
        lambda: {"names": Counter(), "verts": [], "aes": Counter(), "status": set()}
    )

    for glob, sheet, name_col, vert_col, cust_col, cust_vals, ae in SHEETS:
        matches = sorted(src.glob(glob))
        if not matches:
            print(f"  ! no file matching {glob}, skipping {sheet}", file=sys.stderr)
            continue
        path = matches[0]
        rows = list(read_sheet(path, sheet))
        for row in rows[1:]:  # skip header
            name = row.get(name_col)
            if not name:
                continue
            key = normalize_account_name(name)
            acc = accounts[key]
            acc["names"][name] += 1
            acc["aes"][ae] += 1
            if vert_col and row.get(vert_col):
                acc["verts"].append(row[vert_col])
            if cust_col == "ALL_CUSTOMERS":
                acc["status"].add("customer")
            elif cust_col:
                cell = row.get(cust_col)
                customer = (
                    spend_above_zero(cell)
                    if cust_vals is POSITIVE_SPEND
                    else cell in cust_vals
                )
                acc["status"].add("customer" if customer else "prospect")
        print(f"  {path.name} / {sheet}: {len(rows) - 1} rows")

    ae_primary = {
        "Tristan": FSI, "Terence Fong": TMT,
        "James Locke": GS, "Jared Dries": GS,
    }

    registry = []
    inferred = 0
    for key, acc in sorted(accounts.items()):
        verts = sorted(acc["verts"], key=specificity, reverse=True)
        patch = sub = None
        for v in verts:
            p = to_patch(v)
            if p:
                patch, sub = p, v
                break
        if sub is None and verts:
            sub = verts[0]
        aes = sorted(acc["aes"])
        confidence = "mapped"
        if patch is None:
            # The account's own vertical cell was blank or literally
            # "other". Fall back to the owning AE's primary patch and
            # flag it, so a wrong guess is visible and correctable
            # rather than silently wrong.
            patch = ae_primary.get(aes[0]) if aes else None
            confidence = "inferred"
            inferred += 1
        entry = {
            "key": key,
            "name": acc["names"].most_common(1)[0][0],
            "patch": patch,
            "aes": aes,
            "confidence": confidence,
        }
        if sub and sub.strip().lower() not in GENERIC:
            entry["subVertical"] = sub
        if acc["status"]:
            entry["status"] = "customer" if "customer" in acc["status"] else "prospect"
        registry.append(entry)

    out_path = repo / "api" / "_lib" / "accountRegistry.js"
    header = f"""// GENERATED FILE — do not edit by hand.
// Regenerate with: python3 scripts/build-account-registry.py <territory-files-dir>
//
// The AE territory book, reduced to just the four fields the dashboard
// needs: account name, patch, owning AE, and customer-vs-prospect. No
// revenue, pipeline, contacts or notes from the source spreadsheets are
// carried across.
//
// Server-side only. This is imported by the ingest pipeline to tag
// incoming signals; it is deliberately NOT imported anywhere under
// src/, so the account book never ships in the browser bundle. The
// derived tags travel to the client on each signal row instead.
//
// "confidence": "mapped" means the patch came from the account's own
// vertical column. "inferred" means that cell was blank or "other" and
// the owning AE's primary patch was used instead — {inferred} of
// {len(registry)} accounts, worth spot-checking.
//
// "key" is the output of normalizeAccountName() in ./matchAccounts.js.
// Both must agree or entity matching silently stops working.

export const ACCOUNT_REGISTRY = """
    body = json.dumps(registry, indent=1, ensure_ascii=False)
    out_path.write_text(header + body + "\n", encoding="utf-8")

    print(f"\nWrote {out_path.relative_to(repo)}")
    print(f"  accounts:  {len(registry)}")
    print(f"  inferred:  {inferred}")
    for p, n in Counter(r["patch"] for r in registry).most_common():
        print(f"    {n:5d}  {p}")
    multi = [r for r in registry if len(r["aes"]) > 1]
    if multi:
        print(f"  owned by >1 AE: {len(multi)}")
        for r in multi:
            print(f"    {r['name']}  {r['aes']}")


if __name__ == "__main__":
    main()
