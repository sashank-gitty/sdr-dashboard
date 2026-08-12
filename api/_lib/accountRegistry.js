// GENERATED FILE — do not edit by hand.
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
// the owning AE's primary patch was used instead — 52 of
// 1691 accounts, worth spot-checking.
//
// "key" is the output of normalizeAccountName() in ./matchAccounts.js.
// Both must agree or entity matching silently stops working.

export const ACCOUNT_REGISTRY = [
 {
  "key": "13cabs innovations",
  "name": "13CABS INNOVATIONS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Transport)",
  "status": "prospect"
 },
 {
  "key": "1step communications",
  "name": "1STEP COMMUNICATIONS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "21st century resorts",
  "name": "21ST CENTURY RESORTS HOLDINGS PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Leisure/Real Estate)",
  "status": "prospect"
 },
 {
  "key": "3m",
  "name": "3M AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "5g networks",
  "name": "5G NETWORKS LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "a c n 003 682 693",
  "name": "A.C.N. 003 682 693 PTY LTD",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "a c n 007 901 359",
  "name": "A.C.N. 007 901 359 PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "a c n 125 531 428",
  "name": "A.C.N. 125 531 428 PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "a c n 155 993 043",
  "name": "A.C.N. 155 993 043 LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "a e haigh",
  "name": "A.E. HAIGH PROPRIETARY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "a h bremer park",
  "name": "A H BREMER PARK PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "a h gold",
  "name": "A & H GOLD PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail/Holding)",
  "status": "prospect"
 },
 {
  "key": "a j bush sons",
  "name": "A.J. BUSH & SONS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "a m alfasi property investment",
  "name": "A & M ALFASI PROPERTY INVESTMENT HOLDINGS PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "a s p aluminium",
  "name": "A S P ALUMINIUM HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "a2 milk",
  "name": "THE A2 MILK COMPANY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (FMCG)",
  "status": "prospect"
 },
 {
  "key": "a2b",
  "name": "A2B AUSTRALIA LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Transport)",
  "status": "prospect"
 },
 {
  "key": "aa insurance",
  "name": "AA Insurance",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "aapl",
  "name": "AAPL Pty Ltd",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "abacus",
  "name": "ABACUS GROUP HOLDINGS LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "abacus chateau",
  "name": "ABACUS CHATEAU PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "abacus hospitality",
  "name": "ABACUS HOSPITALITY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Hospitality/Real Estate)",
  "status": "prospect"
 },
 {
  "key": "abb power grids",
  "name": "ABB POWER GRIDS AUSTRALIA HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "abcorp",
  "name": "ABCORP AUSTRALASIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "able services",
  "name": "ABLE AUSTRALIA SERVICES",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "abt associates",
  "name": "ABT ASSOCIATES AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "ac distribution",
  "name": "AC DISTRIBUTION COMPANY PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "access workspace",
  "name": "ACCESS WORKSPACE PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "ace body corporate management",
  "name": "ACE BODY CORPORATE MANAGEMENT PTY. LTD.",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "achievers solutions",
  "name": "ACHIEVERS SOLUTIONS (AUSTRALIA) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "inferred"
 },
 {
  "key": "achmea",
  "name": "Achmea",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "customer"
 },
 {
  "key": "aci",
  "name": "ACI AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "aci world",
  "name": "ACI World",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "acit",
  "name": "ACIT LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "acn 056 512 031",
  "name": "ACN 056 512 031 PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "acn 094 263 555",
  "name": "ACN 094 263 555 PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding Company)",
  "status": "prospect"
 },
 {
  "key": "acn 103 267 161",
  "name": "ACN 103 267 161 PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "acn 104 151 635",
  "name": "ACN 104 151 635 PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "aco",
  "name": "ACO PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "act xm",
  "name": "ACT-XM PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "inferred",
  "status": "customer"
 },
 {
  "key": "actian",
  "name": "ACTIAN AUSTRALIA PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "customer"
 },
 {
  "key": "actian symplicit",
  "name": "ACTIAN AUSTRALIA PTY LIMITED (Symplicit)",
  "patch": "locations",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "customer"
 },
 {
  "key": "acumen international",
  "name": "Acumen International Pty. Ltd.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "adam leslie jarrett",
  "name": "ADAM LESLIE JARRETT",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Individual/Holdings)",
  "status": "prospect"
 },
 {
  "key": "adama",
  "name": "ADAMA AUSTRALIA HOLDINGS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "adatree",
  "name": "ADATREE PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "adcorp",
  "name": "ADCORP HOLDINGS AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "adept business systems",
  "name": "ADEPT BUSINESS SYSTEMS PTY. LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "administration",
  "name": "GROUP ADMINISTRATION AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Admin Services)",
  "status": "prospect"
 },
 {
  "key": "adroit creations",
  "name": "ADROIT CREATIONS LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "adt security",
  "name": "ADT SECURITY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Security)",
  "status": "prospect"
 },
 {
  "key": "advantage",
  "name": "Advantage Group Australia Pty Limited",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Accounting/Consulting)",
  "status": "prospect"
 },
 {
  "key": "adventure tours",
  "name": "ADVENTURE TOURS AUSTRALIA GROUP PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Tourism)",
  "status": "prospect"
 },
 {
  "key": "advertiser sunday mail foundationincorporated",
  "name": "THE ADVERTISER SUNDAY MAIL FOUNDATIONINCORPORATED",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "aegon insights",
  "name": "AEGON INSIGHTS AUSTRALIA PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Marketing/Data)",
  "status": "prospect"
 },
 {
  "key": "ag data",
  "name": "AG-DATA AUSTRALIA PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "agencies for south west accommodation",
  "name": "AGENCIES FOR SOUTH WEST ACCOMMODATION INC",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "agrana fruit",
  "name": "AGRANA FRUIT AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "ainsworth game technology",
  "name": "AINSWORTH GAME TECHNOLOGY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "air diffusion agencies",
  "name": "AIR DIFFUSION AGENCIES PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "airtrunk",
  "name": "Airtrunk",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "airwallex",
  "name": "AIRWALLEX PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "aker solutions united infrastructure",
  "name": "AKER SOLUTIONS AUSTRALIA PTY LTD & UNITED GROUP INFRASTRUCTURE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Engineering)",
  "status": "prospect"
 },
 {
  "key": "akktiv 8",
  "name": "Akktiv 8 Pty. Ltd.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "alceon gt",
  "name": "ALCEON GT PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "customer"
 },
 {
  "key": "alchemy",
  "name": "ALCHEMY GROUP LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "alfasi construction services",
  "name": "ALFASI CONSTRUCTION & SERVICES PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Construction)",
  "status": "prospect"
 },
 {
  "key": "allen overy",
  "name": "ALLEN & OVERY (AUSTRALIA) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "allens nominees",
  "name": "ALLENS NOMINEES HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "allergy anaphylaxis",
  "name": "Allergy & Anaphylaxis Australia",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "alliance data fhc",
  "name": "ALLIANCE DATA FHC INC.",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "alliance wealth protection",
  "name": "Alliance Wealth & Protection Pty Ltd",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "allnex",
  "name": "ALLNEX AUSTRALIA PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "alray investments",
  "name": "ALRAY INVESTMENTS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "alsco investments",
  "name": "ALSCO INVESTMENTS NZ",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Textiles/Holding)",
  "status": "prospect"
 },
 {
  "key": "altered state machine",
  "name": "ALTERED STATE MACHINE LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "altis consulting",
  "name": "ALTIS CONSULTING PTY LTD",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "altomonte nominees",
  "name": "ALTOMONTE (NOMINEES) PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "altus",
  "name": "ALTUS GROUP AUSTRALIA PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Consulting)",
  "status": "prospect"
 },
 {
  "key": "ama",
  "name": "AMA GROUP LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "american compliance",
  "name": "AMERICAN COMPLIANCE PTY LTD",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "ameropa",
  "name": "AMEROPA AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "ampcontrol",
  "name": "AMPCONTROL LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "amy gillett foundation",
  "name": "Amy Gillett Foundation",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "anca",
  "name": "ANCA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "andrew k investments",
  "name": "ANDREW K. INVESTMENTS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "anglicare nsw south nsw west act",
  "name": "Anglicare NSW South NSW West and ACT",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "anglicare victoria childrens foundation",
  "name": "ANGLICARE VICTORIA CHILDRENS FOUNDATION",
  "patch": "hcls",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "HCLS"
 },
 {
  "key": "animeer",
  "name": "ANIMEER PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "anmar",
  "name": "ANMAR GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "ansarada",
  "name": "ANSARADA HOLDINGS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "ansvar insurance",
  "name": "ANSVAR INSURANCE LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "insurance",
  "status": "prospect"
 },
 {
  "key": "anthea crawford",
  "name": "ANTHEA CRAWFORD (AUSTRALIA) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "aon",
  "name": "AON NEW ZEALAND GROUP",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "ap psychology consulting services",
  "name": "AP Psychology & Consulting Services",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "apco",
  "name": "APCO HOLDINGS PTY. LTD.",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail/Fuel)",
  "status": "prospect"
 },
 {
  "key": "apg",
  "name": "APG & CO PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "apparent communications",
  "name": "APPARENT COMMUNICATIONS PTY LTD",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "appen",
  "name": "APPEN LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "appliances online",
  "name": "APPLIANCES ONLINE PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "aquamonix",
  "name": "AQUAMONIX PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Technology/Water)",
  "status": "prospect"
 },
 {
  "key": "aquasure",
  "name": "AQUASURE HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "aqueo import distribution",
  "name": "AQUEO IMPORT AND DISTRIBUTION PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "ara",
  "name": "ARA GROUP LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "arakoon enterprises",
  "name": "ARAKOON ENTERPRISES PTY LTD",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "aramex fastway",
  "name": "ARAMEX FASTWAY HOLDINGS PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "arch investments",
  "name": "ARCH INVESTMENTS AUSTRALIA PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "arch wood protection",
  "name": "ARCH WOOD PROTECTION (NZ) LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing)",
  "status": "prospect"
 },
 {
  "key": "ardec international",
  "name": "ARDEC INTERNATIONAL PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "ardent insurance solutions",
  "name": "ARDENT INSURANCE SOLUTIONS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "ardent leisure",
  "name": "ARDENT LEISURE LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Leisure/Tourism)",
  "status": "prospect"
 },
 {
  "key": "argenaus",
  "name": "ARGENAUS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "armada wa",
  "name": "ARMADA HOLDINGS (WA) PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "arrb",
  "name": "ARRB GROUP LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Transport Research)",
  "status": "prospect"
 },
 {
  "key": "artcraft",
  "name": "ARTCRAFT PROPRIETARY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "artemis partners",
  "name": "ARTEMIS PARTNERS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "customer"
 },
 {
  "key": "artlivemedia",
  "name": "ARTLIVEMEDIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "asics oceania",
  "name": "ASICS OCEANIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "askable",
  "name": "ASKABLE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "askin",
  "name": "ASKIN GROUP HOLDINGS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "asm global asia pacific",
  "name": "ASM GLOBAL HOLDINGS (ASIA PACIFIC) PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "assemble",
  "name": "Assemble",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "associated kiln driers",
  "name": "ASSOCIATED KILN DRIERS PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "at t global network services",
  "name": "AT&T GLOBAL NETWORK SERVICES AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "atco gas gp",
  "name": "ATCO GAS AUSTRALIA GP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "athena financial",
  "name": "ATHENA FINANCIAL PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "atlas copco",
  "name": "ATLAS COPCO AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "atlex",
  "name": "ATLEX PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "atomic io",
  "name": "ATOMIC.IO LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "atos",
  "name": "ATOS (AUSTRALIA) PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "atotech",
  "name": "ATOTECH AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "attachmate",
  "name": "ATTACHMATE GROUP AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "atwork",
  "name": "ATWORK AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Employment Services)",
  "status": "prospect"
 },
 {
  "key": "audinate",
  "name": "AUDINATE GROUP LIMITED",
  "patch": "locations",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "customer"
 },
 {
  "key": "audio visual imagenation",
  "name": "AUDIO VISUAL IMAGENATION PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "auscan",
  "name": "AUSCAN HOLDINGS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "auscoal superannuation",
  "name": "AUSCOAL SUPERANNUATION PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "auscred",
  "name": "AUSCRED LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "ausin",
  "name": "Ausin Group (Australia) Pty Ltd",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "auspork",
  "name": "AUSPORK LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "aussie broadband",
  "name": "AUSSIE BROADBAND PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "austcorp",
  "name": "THE AUSTCORP GROUP (AUSTRALIA) PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "austcover",
  "name": "AUSTCOVER PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "australasian centre for rail innovation",
  "name": "Australasian Centre For Rail Innovation",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "australux led",
  "name": "AUSTRALUX LED PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "autism crc",
  "name": "Autism CRC Ltd.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "avaya",
  "name": "AVAYA AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "avc management",
  "name": "AVC MANAGEMENT HOLDINGS PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Hospitality)",
  "status": "prospect"
 },
 {
  "key": "aviator",
  "name": "AVIATOR HOLDINGS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "avid property",
  "name": "AVID PROPERTY GROUP HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "avivo live life",
  "name": "AVIVO: LIVE LIFE INC.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "avolution",
  "name": "AVOLUTION PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "awa",
  "name": "AWA LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "awn",
  "name": "AWN HOLDINGS LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "axenic",
  "name": "AXENIC LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "axfite",
  "name": "AXFITE PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "axicom holdco",
  "name": "AXICOM HOLDCO PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "axis specialty europe se",
  "name": "AXIS SPECIALTY EUROPE SE",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "b g webb",
  "name": "B.G. WEBB PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Transport/Holding)",
  "status": "prospect"
 },
 {
  "key": "b l c cosmetics",
  "name": "B L C COSMETICS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Wholesale)",
  "status": "prospect"
 },
 {
  "key": "bai communications",
  "name": "BAI COMMUNICATIONS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "bailador technology investments",
  "name": "BAILADOR TECHNOLOGY INVESTMENTS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "baker mcauliffe",
  "name": "BAKER & MCAULIFFE HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "baker mckenzie",
  "name": "BAKER & MCKENZIE",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "ballantyne",
  "name": "BALLANTYNE PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "ballyglisheen",
  "name": "BALLYGLISHEEN PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "balmain funds",
  "name": "BALMAIN FUNDS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "balmain nb",
  "name": "BALMAIN NB CORPORATION LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "balmoral pastoral",
  "name": "BALMORAL PASTORAL PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Agriculture)",
  "status": "prospect"
 },
 {
  "key": "balmoral pastoral investments",
  "name": "BALMORAL PASTORAL INVESTMENTS PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "baltimore aircoil",
  "name": "BALTIMORE AIRCOIL (AUSTRALIA) PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "bank of baroda",
  "name": "BANK OF BARODA",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "bank of china",
  "name": "BANK OF CHINA (NEW ZEALAND) LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "banktech",
  "name": "THE BANKTECH GROUP PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "banpu",
  "name": "BANPU AUSTRALIA CO. PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Energy)",
  "status": "prospect"
 },
 {
  "key": "bao",
  "name": "BAO AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "bapsh",
  "name": "BAPSH PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail/Holding)",
  "status": "prospect"
 },
 {
  "key": "barrenjoey markets",
  "name": "BARRENJOEY MARKETS PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "barro",
  "name": "BARRO GROUP PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "batch brewing",
  "name": "BATCH BREWING COMPANY PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "bazmark film ii",
  "name": "BAZMARK FILM II PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "bb retail capital",
  "name": "BB RETAIL CAPITAL PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "bbqsam",
  "name": "BBQSAM HOLDINGS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "bbrc property management",
  "name": "BBRC PROPERTY MANAGEMENT PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "bdcu",
  "name": "BDCU LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "bdo",
  "name": "BDO Australia Limited",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "customer"
 },
 {
  "key": "bdo kendalls",
  "name": "BDO KENDALLS HOLDINGS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Accounting)",
  "status": "prospect"
 },
 {
  "key": "bdo nominee",
  "name": "BDO NEW ZEALAND NOMINEE LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Accounting Services)",
  "status": "prospect"
 },
 {
  "key": "beagle finance",
  "name": "BEAGLE FINANCE PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "bec feed solutions",
  "name": "BEC FEED SOLUTIONS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Agriculture)",
  "status": "prospect"
 },
 {
  "key": "belgravia strategic equities",
  "name": "BELGRAVIA STRATEGIC EQUITIES PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "bell",
  "name": "BELL GROUP HOLDINGS PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "bell asset management",
  "name": "BELL ASSET MANAGEMENT (HOLDINGS) PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "bell financial",
  "name": "BELL FINANCIAL GROUP LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "bell potter securities",
  "name": "BELL POTTER SECURITIES LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "bellset nominees",
  "name": "BELLSET NOMINEES PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "benclutch",
  "name": "BENCLUTCH PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "berg engineering",
  "name": "BERG ENGINEERING HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "berkopy nominees",
  "name": "BERKOPY NOMINEES PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "berkshire hathaway specialty insurance",
  "name": "BERKSHIRE HATHAWAY SPECIALTY INSURANCE COMPANY",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "berrima coal",
  "name": "BERRIMA COAL PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Mining)",
  "status": "prospect"
 },
 {
  "key": "beston global food",
  "name": "BESTON GLOBAL FOOD COMPANY LIMITED",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "beston parks management",
  "name": "BESTON PARKS MANAGEMENT HOLDING PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "beta nominees",
  "name": "BETA NOMINEES PTY LTD",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "betashares capital",
  "name": "BETASHARES CAPITAL LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "better choice home loans",
  "name": "BETTER CHOICE HOME LOANS PTY. LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "beyond bell",
  "name": "Beyond the Bell",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "beyond blue",
  "name": "Beyond Blue Ltd.",
  "patch": "hcls",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "HCLS",
  "status": "customer"
 },
 {
  "key": "bg private clients",
  "name": "BG PRIVATE CLIENTS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Accounting)",
  "status": "prospect"
 },
 {
  "key": "bgc partners",
  "name": "BGC PARTNERS (AUSTRALIA) PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "bgl corporate solutions",
  "name": "BGL CORPORATE SOLUTIONS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Software)",
  "status": "prospect"
 },
 {
  "key": "bgw administration",
  "name": "BGW GROUP ADMINISTRATION LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "bhw trustee 2017",
  "name": "BHW TRUSTEE 2017 LIMITED",
  "patch": "fsi",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "FSI",
  "status": "prospect"
 },
 {
  "key": "big ben",
  "name": "BIG BEN HOLDINGS PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "billiton finance",
  "name": "BILLITON AUSTRALIA FINANCE PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Mining Finance)",
  "status": "prospect"
 },
 {
  "key": "bilrise",
  "name": "BILRISE PTY. LIMITED",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "bingo industries",
  "name": "BINGO INDUSTRIES LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "bitech",
  "name": "BITECH GROUP PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "bituminous products",
  "name": "BITUMINOUS PRODUCTS HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "bizwear",
  "name": "BIZWEAR PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail/Uniforms)",
  "status": "prospect"
 },
 {
  "key": "black cabs combined",
  "name": "BLACK CABS COMBINED PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Transport)",
  "status": "prospect"
 },
 {
  "key": "black white",
  "name": "BLACK & WHITE HOLDINGS LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "blackhawk network",
  "name": "BLACKHAWK NETWORK (AUSTRALIA) PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "blackk finance",
  "name": "Blackk Finance",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "blackline",
  "name": "BlackLine",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "blessed",
  "name": "BLESSED CORPORATION PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "blondie capo",
  "name": "BLONDIE CAPO PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "bloom learning tech",
  "name": "Bloom Learning Tech",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "bloomfield collieries",
  "name": "BLOOMFIELD COLLIERIES PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Mining)",
  "status": "prospect"
 },
 {
  "key": "blowfish studios",
  "name": "BLOWFISH STUDIOS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "blue rock",
  "name": "BLUE ROCK PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Accounting/Consulting)",
  "status": "prospect"
 },
 {
  "key": "blue swimmer",
  "name": "BLUE SWIMMER GROUP PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "bmt eastern",
  "name": "BMT Eastern Australia Pty Ltd",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Construction/Quantity Survey)",
  "status": "prospect"
 },
 {
  "key": "bnk banking",
  "name": "BNK BANKING CORPORATION LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "body corporate brokers",
  "name": "BODY CORPORATE BROKERS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "body corporate services",
  "name": "BODY CORPORATE SERVICES PTY. LTD.",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "bond living",
  "name": "Bond Living",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "bonsey jaden",
  "name": "Bonsey Jaden Pty Ltd",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "boom logistics",
  "name": "BOOM LOGISTICS LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "boston consulting",
  "name": "THE BOSTON CONSULTING GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "bowling centres catering services",
  "name": "BOWLING CENTRES AUSTRALIA CATERING SERVICES PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Hospitality)",
  "status": "prospect"
 },
 {
  "key": "boyce chartered accountants",
  "name": "BOYCE CHARTERED ACCOUNTANTS",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Accounting)",
  "status": "prospect"
 },
 {
  "key": "boyded industries",
  "name": "BOYDED INDUSTRIES PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Automotive/Retail)",
  "status": "prospect"
 },
 {
  "key": "bp ip",
  "name": "BP IP HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "bradnam s windows doors",
  "name": "BRADNAM'S WINDOWS AND DOORS PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "bravo holdco",
  "name": "BRAVO HOLDCO PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "brcp",
  "name": "BRCP AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "brenntag",
  "name": "BRENNTAG PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Chemicals)",
  "status": "prospect"
 },
 {
  "key": "breville",
  "name": "BREVILLE GROUP LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "bri d t",
  "name": "BRI (D.T.) PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "bridges capital ventures",
  "name": "BRIDGES CAPITAL VENTURES PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "bridgestone mining solutions",
  "name": "BRIDGESTONE MINING SOLUTIONS AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "bright",
  "name": "THE BRIGHT GROUP PTY. LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "bright food asia pacific",
  "name": "Bright Food Asia Pacific",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "brighte capital",
  "name": "BRIGHTE CAPITAL PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "brighton managed super",
  "name": "BRIGHTON MANAGED SUPER PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "brisbane export",
  "name": "BRISBANE EXPORT HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Logistics)",
  "status": "prospect"
 },
 {
  "key": "brookfield capital management",
  "name": "BROOKFIELD CAPITAL MANAGEMENT LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "brother international",
  "name": "BROTHER INTERNATIONAL (AUST) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "brysten",
  "name": "BRYSTEN HOLDINGS PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "bt institutional global share fund",
  "name": "BT INSTITUTIONAL GLOBAL SHARE FUND",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "bucher municipal",
  "name": "Bucher Municipal",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "budget rent a car",
  "name": "BUDGET RENT A CAR AUSTRALIA PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "bunzl",
  "name": "BUNZL AUSTRALASIA LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "bus",
  "name": "NEW ZEALAND BUS LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Transport)",
  "status": "prospect"
 },
 {
  "key": "business fitness",
  "name": "BUSINESS FITNESS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "by rules",
  "name": "BY THE RULES PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "bytecraft",
  "name": "BYTECRAFT PROPRIETARY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "c 3",
  "name": "C 3 LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Logistics)",
  "status": "prospect"
 },
 {
  "key": "c a cameron",
  "name": "C A CAMERON PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "c e aitken",
  "name": "C.E. AITKEN PROPRIETARY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Agriculture/Holding)",
  "status": "prospect"
 },
 {
  "key": "cadre design",
  "name": "CADRE DESIGN PTY. LIMITED",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Design)",
  "status": "prospect"
 },
 {
  "key": "caelli cranes",
  "name": "CAELLI CRANES PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Construction)",
  "status": "prospect"
 },
 {
  "key": "cairns far north environment centre",
  "name": "CAIRNS AND FAR NORTH ENVIRONMENT CENTRE INC",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "cairns hardware",
  "name": "CAIRNS HARDWARE COMPANY PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail)",
  "status": "prospect"
 },
 {
  "key": "calabria family wines",
  "name": "CALABRIA FAMILY WINES PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "calliden",
  "name": "CALLIDEN GROUP PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "camalex",
  "name": "CAMALEX PTY LTD",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "camcorp services",
  "name": "CAMCORP SERVICES LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "cammit",
  "name": "CAMMIT PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Construction/Holding)",
  "status": "prospect"
 },
 {
  "key": "camorra data",
  "name": "CAMORRA DATA LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "campaign monitor 1",
  "name": "CAMPAIGN MONITOR AUSTRALIA 1 PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "campari",
  "name": "CAMPARI AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "campbell wallis moule",
  "name": "CAMPBELL WALLIS MOULE & CO. PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Accounting)",
  "status": "prospect"
 },
 {
  "key": "campsie bus",
  "name": "CAMPSIE BUS CO PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "campus living flemington road",
  "name": "CAMPUS LIVING FLEMINGTON ROAD PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "canaccord financial",
  "name": "CANACCORD FINANCIAL GROUP (AUSTRALIA) PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "cancer research foundation",
  "name": "AUSTRALIAN CANCER RESEARCH FOUNDATION",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "cap xx",
  "name": "CAP-XX LIMITED",
  "patch": "fsi",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "FSI"
 },
 {
  "key": "capgemini business services",
  "name": "CAPGEMINI BUSINESS SERVICES AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "capitalr",
  "name": "CAPITALR PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "capral",
  "name": "CAPRAL LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "caprice",
  "name": "CAPRICE AUSTRALIA PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "capricorn society",
  "name": "CAPRICORN SOCIETY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "carbon revolution",
  "name": "CARBON REVOLUTION LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "cashflow manager",
  "name": "CASHFLOW MANAGER PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "casthree",
  "name": "CASTHREE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "castlegate james",
  "name": "CASTLEGATE JAMES AUSTRALASIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "cba new digital businesses",
  "name": "CBA NEW DIGITAL BUSINESSES PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "cdc",
  "name": "CDC GROUP HOLDINGS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "cdc data centres",
  "name": "CDC Data Centres",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "censeo consulting",
  "name": "Censeo Consulting",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Consulting)",
  "status": "prospect"
 },
 {
  "key": "centennial airly",
  "name": "CENTENNIAL AIRLY PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Mining)",
  "status": "prospect"
 },
 {
  "key": "centrepoint alliance",
  "name": "CENTREPOINT ALLIANCE LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "centro mcs 18 spv",
  "name": "CENTRO MCS 18 SPV PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "centro services",
  "name": "CENTRO SERVICES GROUP PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "cereal partners",
  "name": "CEREAL PARTNERS AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "certaldo investments",
  "name": "CERTALDO INVESTMENTS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "certify",
  "name": "CERTIFY PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "prospect"
 },
 {
  "key": "cgi information systems management consultants",
  "name": "CGI INFORMATION SYSTEMS AND MANAGEMENT CONSULTANTS (AUSTRALIA) PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "challenger",
  "name": "CHALLENGER LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "challenger life",
  "name": "CHALLENGER LIFE COMPANY HOLDINGS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "challenger property asset management",
  "name": "CHALLENGER PROPERTY ASSET MANAGEMENT PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "chamber of commerce industry of western",
  "name": "CHAMBER OF COMMERCE & INDUSTRY OF WESTERN AUSTRALIA INC",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "chandra enterprises",
  "name": "CHANDRA ENTERPRISES PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "chanel",
  "name": "CHANEL (AUSTRALIA) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "charbon coal",
  "name": "CHARBON COAL PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Mining)",
  "status": "prospect"
 },
 {
  "key": "charlesworth nuts",
  "name": "CHARLESWORTH NUTS PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "charter hall",
  "name": "CHARTER HALL LIMITED",
  "patch": "fsi",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "FSI",
  "status": "customer"
 },
 {
  "key": "chartered accountants",
  "name": "CHARTERED ACCOUNTANTS AUSTRALIA AND NEW ZEALAND",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "chemco",
  "name": "CHEMCO PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "chep",
  "name": "CHEP AUSTRALIA LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "chevron glass investments",
  "name": "CHEVRON GLASS INVESTMENTS PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "chg meridian",
  "name": "CHG-MERIDIAN AUSTRALIA PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "children by choice association",
  "name": "CHILDREN BY CHOICE ASSOCIATION INCORPORATED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "china construction bank",
  "name": "CHINA CONSTRUCTION BANK CORPORATION",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "china unionpay",
  "name": "CHINA UNIONPAY CO. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "choice",
  "name": "Choice Australia",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "chorus",
  "name": "CHORUS LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "chu underwriting agencies",
  "name": "CHU UNDERWRITING AGENCIES PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "insurance",
  "status": "customer"
 },
 {
  "key": "church dwight",
  "name": "CHURCH & DWIGHT (AUSTRALIA) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "cinematographers society",
  "name": "THE AUSTRALIAN CINEMATOGRAPHERS SOCIETY",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "cip",
  "name": "CIP HOLDINGS LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "circa research",
  "name": "Circa Research",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "citibank n a",
  "name": "CITIBANK N.A.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "civica",
  "name": "CIVICA PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "civil equipment",
  "name": "CIVIL EQUIPMENT HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "cj nutracon",
  "name": "CJ NUTRACON PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "claim central consolidated",
  "name": "CLAIM CENTRAL CONSOLIDATED PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "clarence colliery",
  "name": "CLARENCE COLLIERY PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Mining)",
  "status": "prospect"
 },
 {
  "key": "clareville beach",
  "name": "CLAREVILLE BEACH PTY LTD",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "class",
  "name": "CLASS LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "classic solutions",
  "name": "CLASSIC SOLUTIONS PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "claytons qld",
  "name": "CLAYTONS QLD PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "clear dynamics",
  "name": "Clear Dynamics",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "clear horizon",
  "name": "Clear Horizon",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "click loans",
  "name": "CLICK LOANS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "clinic to cloud",
  "name": "CLINIC TO CLOUD HOLDINGS PTY LTD",
  "patch": "hcls",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "HCLS",
  "status": "prospect"
 },
 {
  "key": "clinician",
  "name": "THE CLINICIAN LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "club plus superannuation",
  "name": "CLUB PLUS SUPERANNUATION",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "club resort",
  "name": "CLUB RESORT HOLDINGS PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Leisure)",
  "status": "prospect"
 },
 {
  "key": "clv finance",
  "name": "CLV FINANCE PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech (or Investments)",
  "status": "prospect"
 },
 {
  "key": "cnw",
  "name": "CNW PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "coalex",
  "name": "COALEX PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Mining)",
  "status": "prospect"
 },
 {
  "key": "cogniss",
  "name": "COGNISS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "coinbase",
  "name": "COINBASE AUSTRALIA PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "colgate palmolive",
  "name": "COLGATE-PALMOLIVE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "collier miller",
  "name": "COLLIER & MILLER PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail/Engineering)",
  "status": "prospect"
 },
 {
  "key": "colliers international",
  "name": "Colliers International Holdings (Australia) Ltd.",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "colliers international nsw",
  "name": "COLLIERS INTERNATIONAL (NSW) PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "combined communications network",
  "name": "COMBINED COMMUNICATIONS NETWORK PTY LTD",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Media/Logistics)",
  "status": "prospect"
 },
 {
  "key": "combined real estate",
  "name": "COMBINED REAL ESTATE PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "commbox",
  "name": "COMMBOX PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "common wealth",
  "name": "COMMON WEALTH PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding/Finance)",
  "status": "prospect"
 },
 {
  "key": "commonwealth securities",
  "name": "COMMONWEALTH SECURITIES LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "commscope",
  "name": "COMMSCOPE AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "community media",
  "name": "Australian Community Media",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "complete engineering",
  "name": "COMPLETE ENGINEERING GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Engineering)",
  "status": "prospect"
 },
 {
  "key": "compusoft",
  "name": "COMPUSOFT AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "conergy",
  "name": "CONERGY PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "connell bros",
  "name": "CONNELL BROS. COMPANY AUSTRALASIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "conquest equipment technologies",
  "name": "CONQUEST EQUIPMENT TECHNOLOGIES PTY LTD",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "consolidated press finance",
  "name": "CONSOLIDATED PRESS (FINANCE) PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "constellation software",
  "name": "CONSTELLATION SOFTWARE AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "consultants network international",
  "name": "CONSULTANTS NETWORK INTERNATIONAL PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "conti trade",
  "name": "CONTI TRADE AUSTRALIA PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "contour education vic",
  "name": "CONTOUR EDUCATION VIC. PTY LTD",
  "patch": "public_sector",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Public Sector"
 },
 {
  "key": "convoy international",
  "name": "CONVOY INTERNATIONAL PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "cooper electrical",
  "name": "Cooper Electrical",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Engineering/Trade)",
  "status": "prospect"
 },
 {
  "key": "cooper energy",
  "name": "Cooper Energy",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "cooperatieve rabobank u a",
  "name": "COOPERATIEVE RABOBANK U.A.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "corelogic",
  "name": "CORELOGIC AUSTRALIA HOLDINGS PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "corio bay innovators",
  "name": "Corio Bay Innovators Inc",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "corporate travel management",
  "name": "CORPORATE TRAVEL MANAGEMENT GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "corporate wellbeing hub",
  "name": "Corporate Wellbeing Hub",
  "patch": "hcls",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "HCLS",
  "status": "customer"
 },
 {
  "key": "corrs",
  "name": "CORRS HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "costing logistics systems",
  "name": "COSTING & LOGISTICS SYSTEMS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "coverforce holdco",
  "name": "COVERFORCE HOLDCO PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "creak ford",
  "name": "CREAK AND FORD PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "create media",
  "name": "CREATE MEDIA PTY. LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "credit png",
  "name": "CREDIT CORPORATION PNG LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "credit union",
  "name": "CREDIT UNION AUSTRALIA LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "banking",
  "status": "prospect"
 },
 {
  "key": "credit union sa",
  "name": "Credit Union SA",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "crimsafe",
  "name": "CRIMSAFE HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing/Security)",
  "status": "prospect"
 },
 {
  "key": "criteria",
  "name": "Criteria Corp. Australia",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "crowe horwath",
  "name": "CROWE HORWATH AUSTRALASIA PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Accounting)",
  "status": "prospect"
 },
 {
  "key": "crown equipment",
  "name": "CROWN EQUIPMENT PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "crystallize consulting",
  "name": "Crystallize Consulting Pty. Ltd.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "ct",
  "name": "CT Group Australia",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "ct freight",
  "name": "CT FREIGHT PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "cua management",
  "name": "CUA MANAGEMENT PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "culture amp",
  "name": "CULTURE AMP PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "curiosity",
  "name": "THE CURIOSITY COMPANY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "inferred"
 },
 {
  "key": "cuscal",
  "name": "CUSCAL LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "customer"
 },
 {
  "key": "cushman wakefield",
  "name": "CUSHMAN & WAKEFIELD (AUSTRALIA) PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "cushman wakefield facilities services",
  "name": "CUSHMAN & WAKEFIELD FACILITIES SERVICES (AUST) PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Facilities Mgmt)",
  "status": "prospect"
 },
 {
  "key": "custom press",
  "name": "CUSTOM PRESS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Printing)",
  "status": "prospect"
 },
 {
  "key": "cyberhub",
  "name": "CYBERHUB LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "cytec asia pacific",
  "name": "CYTEC ASIA/PACIFIC HOLDINGS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "d orsogna",
  "name": "D'ORSOGNA GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "dabble sports",
  "name": "DABBLE SPORTS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "daisee",
  "name": "DAISEE PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "damstar",
  "name": "DAMSTAR PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "danaher",
  "name": "DANAHER AUSTRALIA HOLDING PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "dandy premix concrete",
  "name": "DANDY PREMIX CONCRETE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "data agility",
  "name": "DATA AGILITY PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "daviam",
  "name": "DAVIAM HOLDINGS PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "david cowley real estate",
  "name": "DAVID COWLEY REAL ESTATE PTY. LTD.",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "davies bakery",
  "name": "DAVIES BAKERY PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "dck",
  "name": "DCK AUSTRALIA HOLDINGS PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "de lage landen",
  "name": "DE LAGE LANDEN PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "decipher",
  "name": "Decipher",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "deel",
  "name": "Deel",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "deepend",
  "name": "DEEPEND PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "defence bank",
  "name": "DEFENCE BANK LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "defence health",
  "name": "DEFENCE HEALTH LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "insurance",
  "status": "customer"
 },
 {
  "key": "defence maintenance management",
  "name": "DEFENCE MAINTENANCE MANAGEMENT PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Services)",
  "status": "prospect"
 },
 {
  "key": "deliveroo",
  "name": "DELIVEROO AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "delta",
  "name": "DELTA GROUP HOLDINGS PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "deluxe",
  "name": "DELUXE AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "deoleo",
  "name": "DEOLEO AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "deputy",
  "name": "DEPUTY PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "deruba",
  "name": "DERUBA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "develop",
  "name": "DEVELOP AUSTRALIA CORPORATION PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "inferred"
 },
 {
  "key": "dexus funds management",
  "name": "DEXUS FUNDS MANAGEMENT LIMITED",
  "patch": "fsi",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "FSI",
  "status": "customer"
 },
 {
  "key": "dfa",
  "name": "DFA AUSTRALIA LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "dfp recruitment",
  "name": "DFP RECRUITMENT HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "diabetes",
  "name": "Diabetes Australia",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "diakrob investments",
  "name": "DIAKROB INVESTMENTS PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "diamond dell",
  "name": "DIAMOND DELL PTY. LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "dickson dickson healthcare",
  "name": "DICKSON & DICKSON HEALTHCARE LIMITED",
  "patch": "hcls",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Healthcare)",
  "status": "prospect"
 },
 {
  "key": "diginet control systems",
  "name": "DIGINET CONTROL SYSTEMS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Technology)",
  "status": "prospect"
 },
 {
  "key": "digital glue",
  "name": "DIGITAL GLUE PTY LTD",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Technology)",
  "status": "prospect"
 },
 {
  "key": "direct salary packaging",
  "name": "DIRECT SALARY PACKAGING PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "directioneering",
  "name": "Directioneering",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "inferred"
 },
 {
  "key": "disability services",
  "name": "Disability Services Australia",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "diva international",
  "name": "DIVA INTERNATIONAL PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail)",
  "status": "prospect"
 },
 {
  "key": "dixon advisory",
  "name": "DIXON ADVISORY GROUP PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "dj me mason",
  "name": "DJ & ME MASON PTY LTD",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "dolby",
  "name": "DOLBY AUSTRALIA HOLDING PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "dolphin acquisition",
  "name": "DOLPHIN ACQUISITION LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "domo asia pacific",
  "name": "Domo, Inc. (Asia Pacific)",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "dossy",
  "name": "Dossy",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "dotti",
  "name": "DOTTI PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail)",
  "status": "prospect"
 },
 {
  "key": "dowstress",
  "name": "DOWSTRESS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Construction)",
  "status": "prospect"
 },
 {
  "key": "dr progress",
  "name": "Dr Progress Group",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "dreamscape networks",
  "name": "Dreamscape Networks",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "dropbox",
  "name": "DROPBOX AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "dst bluedoor",
  "name": "DST BLUEDOOR PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "dti",
  "name": "DTI GROUP LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "dtz",
  "name": "DTZ AUSTRALIA PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "dtz aus holdco",
  "name": "DTZ AUS HOLDCO PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "dtz hr services",
  "name": "DTZ HR SERVICES PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (HR Services)",
  "status": "prospect"
 },
 {
  "key": "dual",
  "name": "DUAL AUSTRALIA PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "dubber",
  "name": "DUBBER CORPORATION LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "ducala",
  "name": "DUCALA PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "duratec",
  "name": "Duratec Australia",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Engineering)",
  "status": "prospect"
 },
 {
  "key": "dux manufacturing",
  "name": "DUX MANUFACTURING LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "dyduk investments",
  "name": "DYDUK INVESTMENTS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "dyson appliances",
  "name": "DYSON APPLIANCES (AUST.) PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "e a",
  "name": "E&A LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Engineering/Holding)",
  "status": "prospect"
 },
 {
  "key": "e diary",
  "name": "E-DIARY PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "e p financial",
  "name": "E&P FINANCIAL GROUP LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "earnd",
  "name": "EARND",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "east cottage industries",
  "name": "EAST COTTAGE INDUSTRIES PTY LTD",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "east yarra friendly society",
  "name": "EAST YARRA FRIENDLY SOCIETY PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "eastpoint",
  "name": "EASTPOINT PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "eaton industries",
  "name": "EATON INDUSTRIES PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing)",
  "status": "prospect"
 },
 {
  "key": "ebix vic",
  "name": "EBIX AUSTRALIA (VIC) PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "ecco shoes pacific",
  "name": "ECCO SHOES PACIFIC PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "ecl",
  "name": "ECL GROUP AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Energy Services)",
  "status": "prospect"
 },
 {
  "key": "ecotourism",
  "name": "ECOTOURISM AUSTRALIA LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "edapp",
  "name": "EDAPP PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "edgewise insurance brokers",
  "name": "EDGEWISE INSURANCE BROKERS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "editure",
  "name": "EDITURE PTY LTD",
  "patch": "public_sector",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Public Sector",
  "status": "prospect"
 },
 {
  "key": "educa",
  "name": "EDUCA LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "edwards rural investments",
  "name": "EDWARDS RURAL INVESTMENTS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "eii gas investments",
  "name": "EII GAS INVESTMENTS AUSTRALIA (HOLDINGS) PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Energy)",
  "status": "prospect"
 },
 {
  "key": "eiw",
  "name": "EIW HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "electranet",
  "name": "ELECTRANET PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "electric power development",
  "name": "ELECTRIC POWER DEVELOPMENT CO., LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Energy)",
  "status": "prospect"
 },
 {
  "key": "electro optic systems",
  "name": "ELECTRO OPTIC SYSTEMS HOLDINGS LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "electronic arts",
  "name": "ELECTRONIC ARTS PROPRIETARY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "elkington bishop molineaux insurance brokers",
  "name": "ELKINGTON BISHOP MOLINEAUX INSURANCE BROKERS PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "elma",
  "name": "ELMA AUST. PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "elphinstone",
  "name": "ELPHINSTONE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing)",
  "status": "prospect"
 },
 {
  "key": "elphinstone nominees",
  "name": "ELPHINSTONE NOMINEES PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "emerg solutions",
  "name": "EMERG SOLUTIONS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "emergency services health",
  "name": "EMERGENCY SERVICES HEALTH PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "emersion software systems",
  "name": "EMERSION SOFTWARE SYSTEMS PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "employers mutual",
  "name": "EMPLOYERS MUTUAL LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "employment hero",
  "name": "Employment Hero",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "employment services finance",
  "name": "EMPLOYMENT SERVICES FINANCE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "emr capital",
  "name": "EMR CAPITAL HOLDINGS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "enable services",
  "name": "ENABLE SERVICES LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "enboarder",
  "name": "Enboarder",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "enborne",
  "name": "ENBORNE PROPRIETARY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "energy infrastructure investments",
  "name": "ENERGY INFRASTRUCTURE INVESTMENTS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Energy)",
  "status": "prospect"
 },
 {
  "key": "energy water ombudsman victoria",
  "name": "ENERGY AND WATER OMBUDSMAN (VICTORIA) LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "enero",
  "name": "ENERO GROUP LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "envato",
  "name": "ENVATO PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "envirolabs",
  "name": "ENVIROLABS PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "envirosuite",
  "name": "ENVIROSUITE LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "envu anz",
  "name": "Envu ANZ",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "enware",
  "name": "ENWARE AUSTRALIA PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "epac",
  "name": "EPAC GROUP PTY LTD",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Software/Admin)",
  "status": "prospect"
 },
 {
  "key": "epson",
  "name": "EPSON AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "equiem",
  "name": "EQUIEM HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "equigroup",
  "name": "EQUIGROUP HOLDINGS PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "equipment leasing finance",
  "name": "EQUIPMENT, LEASING & FINANCE HOLDINGS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "equitise",
  "name": "EQUITISE PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "eric insurance",
  "name": "ERIC INSURANCE LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "eroad",
  "name": "EROAD LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "ertech",
  "name": "ERTECH PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Engineering)",
  "status": "prospect"
 },
 {
  "key": "ertech queensland",
  "name": "ERTECH (QUEENSLAND) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Engineering)",
  "status": "prospect"
 },
 {
  "key": "esdee",
  "name": "ESDEE HOLDINGS PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "espresso displays",
  "name": "ESPRESSO DISPLAYS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "esr asset management",
  "name": "ESR ASSET MANAGEMENT (HOLDINGS) LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "essa",
  "name": "ESSA AUSTRALIA LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "estar",
  "name": "estar",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "eureka",
  "name": "EUREKA GROUP HOLDINGS LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "evans partners",
  "name": "EVANS AND PARTNERS PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "everest colonial",
  "name": "EVEREST COLONIAL PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "evolution",
  "name": "EVOLUTION GROUP HOLDINGS LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "evolution trustees",
  "name": "EVOLUTION TRUSTEES LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "eway payments",
  "name": "EWAY PAYMENTS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "excel financial planning",
  "name": "EXCEL FINANCIAL PLANNING PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "excelsior capital",
  "name": "EXCELSIOR CAPITAL LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "exetel",
  "name": "EXETEL PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "extel technologies",
  "name": "EXTEL TECHNOLOGIES PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "ezi management",
  "name": "EZI MANAGEMENT PTY LTD",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Software/Admin)",
  "status": "prospect"
 },
 {
  "key": "f r ireland",
  "name": "F.R. IRELAND PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Automotive)",
  "status": "prospect"
 },
 {
  "key": "f s falkiner sons",
  "name": "F.S. FALKINER & SONS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Agriculture)",
  "status": "prospect"
 },
 {
  "key": "fabquip industries",
  "name": "FABQUIP INDUSTRIES PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "fabtech",
  "name": "FABTECH AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Engineering)",
  "status": "prospect"
 },
 {
  "key": "factset pacific",
  "name": "FactSet Pacific Inc.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Data/Fintech)",
  "status": "prospect"
 },
 {
  "key": "fair isaac",
  "name": "FAIR ISAAC (AUSTRALIA) PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "federation property services",
  "name": "FEDERATION PROPERTY SERVICES PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "fermentum",
  "name": "FERMENTUM PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "fg advisory",
  "name": "FG Advisory",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "fidante partners",
  "name": "FIDANTE PARTNERS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "fidelity life assurance",
  "name": "FIDELITY LIFE ASSURANCE COMPANY LIMITED",
  "patch": "fsi",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "FSI",
  "status": "customer"
 },
 {
  "key": "field solutions",
  "name": "FIELD SOLUTIONS HOLDINGS LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "fifo capital",
  "name": "FIFO CAPITAL AUSTRALIA PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "fifth dimension research consulting",
  "name": "Fifth Dimension Research and Consulting Pty. Ltd.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Consulting)",
  "status": "prospect"
 },
 {
  "key": "fifth domain",
  "name": "FIFTH DOMAIN PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "fiig securities",
  "name": "FIIG SECURITIES LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "fin control systems",
  "name": "FIN CONTROL SYSTEMS PTY. LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail/Surf)",
  "status": "prospect"
 },
 {
  "key": "financial advice association of",
  "name": "FINANCIAL ADVICE ASSOCIATION OF AUSTRALIA LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "financial times",
  "name": "AUSTRALIAN FINANCIAL TIMES PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Media)",
  "status": "prospect"
 },
 {
  "key": "findex",
  "name": "Findex (Aust) Pty Ltd",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "findex lending services",
  "name": "FINDEX LENDING SERVICES PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "finisar",
  "name": "FINISAR AUSTRALIA PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "finity consulting",
  "name": "FINITY CONSULTING PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "finsure finance insurance",
  "name": "FINSURE FINANCE & INSURANCE PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "firmus",
  "name": "Firmus",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "flaschengeist",
  "name": "FLASCHENGEIST (AUSTRALIA) PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "florey institute of neuroscience mental health",
  "name": "THE FLOREY INSTITUTE OF NEUROSCIENCE AND MENTAL HEALTH",
  "patch": "hcls",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "HCLS"
 },
 {
  "key": "fluorine chemicals",
  "name": "AUSTRALIAN FLUORINE CHEMICALS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Chemicals)",
  "status": "prospect"
 },
 {
  "key": "flying bark productions",
  "name": "FLYING BARK PRODUCTIONS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "fmp",
  "name": "FMP GROUP (AUSTRALIA) PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "fmr investments",
  "name": "FMR INVESTMENTS PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "fobile mobile",
  "name": "Fobile Mobile",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "food agriculture",
  "name": "AUSTRALIAN FOOD & AGRICULTURE COMPANY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Agriculture)",
  "status": "prospect"
 },
 {
  "key": "food grocery council",
  "name": "Australian Food and Grocery Council",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "food waste champions 12 3 charitable trust",
  "name": "New Zealand Food Waste Champions 12.3 Charitable Trust",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "inferred"
 },
 {
  "key": "foodbank victoria",
  "name": "Foodbank Victoria Ltd.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "forex management",
  "name": "FOREX MANAGEMENT PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "form1",
  "name": "Form1 Group",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "formaction concrete civils",
  "name": "FORMACTION CONCRETE CIVILS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Construction)",
  "status": "prospect"
 },
 {
  "key": "forrester research",
  "name": "FORRESTER RESEARCH AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "forum finance",
  "name": "FORUM GROUP FINANCE PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "foundation for disability",
  "name": "AUSTRALIAN FOUNDATION FOR DISABILITY",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "foundation investment",
  "name": "AUSTRALIAN FOUNDATION INVESTMENT COMPANY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "foundu",
  "name": "FOUNDU HOLDINGS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "four mile",
  "name": "FOUR MILE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Mining/Agriculture)",
  "status": "prospect"
 },
 {
  "key": "four star cleaning services",
  "name": "Four Star Cleaning Services",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "fox",
  "name": "Fox & Co.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "foxconn",
  "name": "FOXCONN AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "fp consulting",
  "name": "FP Consulting",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "fqm",
  "name": "FQM AUSTRALIA HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Mining)",
  "status": "prospect"
 },
 {
  "key": "fraudwatch international",
  "name": "FRAUDWATCH INTERNATIONAL PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "freedom insurance investments",
  "name": "FREEDOM INSURANCE INVESTMENTS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "freshmax",
  "name": "Freshmax",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "ftr i",
  "name": "FTR HOLDINGS I PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "fujitsu",
  "name": "FUJITSU AUSTRALIA LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "fusion retail brands",
  "name": "FUSION RETAIL BRANDS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "futurity investment",
  "name": "FUTURITY INVESTMENT GROUP LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "g a gathercole",
  "name": "G. A. GATHERCOLE PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "g k o connor export abattoir",
  "name": "G. & K. O'CONNOR EXPORT ABATTOIR PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "g r hopkinson management",
  "name": "G R HOPKINSON (MANAGEMENT) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "gallagher benefit services",
  "name": "Gallagher Benefit Services",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "customer"
 },
 {
  "key": "gamuda",
  "name": "GAMUDA AUSTRALIA",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "inferred"
 },
 {
  "key": "garden city planters",
  "name": "GARDEN CITY PLANTERS PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "garnet enterprises",
  "name": "GARNET ENTERPRISES PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "gartner",
  "name": "GARTNER AUSTRALASIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "gas motors",
  "name": "GAS MOTORS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Automotive)",
  "status": "prospect"
 },
 {
  "key": "gasmak",
  "name": "GASMAK PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Fuel/Retail)",
  "status": "prospect"
 },
 {
  "key": "gbst",
  "name": "GBST (AUSTRALIA) PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "gct investments",
  "name": "GCT INVESTMENTS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Accounting)",
  "status": "prospect"
 },
 {
  "key": "gem finance",
  "name": "Gem Finance",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "general reinsurance",
  "name": "GENERAL REINSURANCE AUSTRALIA LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "genesis advisory",
  "name": "GENESIS ADVISORY PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "genesis health fitness",
  "name": "GENESIS HEALTH & FITNESS PTY LTD",
  "patch": "hcls",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Health/Fitness)",
  "status": "prospect"
 },
 {
  "key": "genesys sydney",
  "name": "Genesys Sydney, Australia",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "genquip",
  "name": "GENQUIP PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "gentrack",
  "name": "GENTRACK GROUP LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "geoff casey",
  "name": "GEOFF CASEY PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "gfc thuringowa",
  "name": "GFC THURINGOWA PTY LTD",
  "patch": "hcls",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Health/Fitness)",
  "status": "prospect"
 },
 {
  "key": "gfk",
  "name": "GFK AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "gigacomm",
  "name": "GIGACOMM PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "givaudan",
  "name": "GIVAUDAN AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "glass supplies",
  "name": "GLASS SUPPLIES PROPRIETARY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "glassworks",
  "name": "GLASSWORKS (AUST) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing)",
  "status": "prospect"
 },
 {
  "key": "glen dimplex",
  "name": "GLEN DIMPLEX AUSTRALIA HOLDINGS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "glentel amt",
  "name": "GLENTEL AMT PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "global carbon capture storage institute",
  "name": "GLOBAL CARBON CAPTURE AND STORAGE INSTITUTE LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "global contractor management solutions",
  "name": "GLOBAL CONTRACTOR MANAGEMENT SOLUTIONS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "global health",
  "name": "GLOBAL HEALTH LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "global payments 1",
  "name": "GLOBAL PAYMENTS AUSTRALIA 1 PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "global speech networks",
  "name": "GLOBAL SPEECH NETWORKS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "global study partners",
  "name": "GLOBAL STUDY PARTNERS HOLDINGS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "gmhba",
  "name": "GMHBA LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "customer"
 },
 {
  "key": "gold fields",
  "name": "GOLD FIELDS AUSTRALASIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "golden cockerel",
  "name": "GOLDEN COCKEREL PTY LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "goldman sachs",
  "name": "GOLDMAN SACHS NEW ZEALAND HOLDINGS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "goldman sachs anz",
  "name": "GOLDMAN SACHS HOLDINGS ANZ PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "goldman sachs capital markets",
  "name": "GOLDMAN SACHS AUSTRALIA CAPITAL MARKETS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "investments brokers",
  "status": "prospect"
 },
 {
  "key": "good shepherd",
  "name": "THE GOOD SHEPHERD LIMITED",
  "patch": "hcls",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "HCLS",
  "status": "prospect"
 },
 {
  "key": "good spirits hospitality",
  "name": "GOOD SPIRITS HOSPITALITY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Hospitality)",
  "status": "prospect"
 },
 {
  "key": "goodlife wintergarden",
  "name": "GOODLIFE WINTERGARDEN PTY LTD",
  "patch": "hcls",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Health/Fitness)",
  "status": "prospect"
 },
 {
  "key": "gowing bros",
  "name": "GOWING BROS LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "gpi sports fitness",
  "name": "GPI SPORTS & FITNESS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "grabba technologies",
  "name": "GRABBA TECHNOLOGIES PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "grain export",
  "name": "AUSTRALASIA GRAIN EXPORT PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "grange resources",
  "name": "GRANGE RESOURCES LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "grant broadcasters",
  "name": "GRANT BROADCASTERS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "graphic supplies",
  "name": "AUSTRALIAN GRAPHIC SUPPLIES PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Wholesale)",
  "status": "prospect"
 },
 {
  "key": "great eagle hotels auckland",
  "name": "GREAT EAGLE HOTELS (AUCKLAND) LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Hospitality)",
  "status": "prospect"
 },
 {
  "key": "great southern rail travel",
  "name": "GREAT SOUTHERN RAIL TRAVEL PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Transport)",
  "status": "prospect"
 },
 {
  "key": "green leaves",
  "name": "GREEN LEAVES GROUP LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "grocon investments",
  "name": "GROCON INVESTMENTS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Construction/Holding)",
  "status": "prospect"
 },
 {
  "key": "groov",
  "name": "GROOV LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "grosvenor",
  "name": "GROSVENOR GROUP LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "grosvenor investments",
  "name": "GROSVENOR AUSTRALIA INVESTMENTS PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "groupe seb",
  "name": "GROUPE SEB AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "gsa insurance brokers",
  "name": "GSA INSURANCE BROKERS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "guild",
  "name": "GUILD GROUP HOLDINGS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "guild accountants",
  "name": "GUILD ACCOUNTANTS PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Accounting)",
  "status": "prospect"
 },
 {
  "key": "guild insurance",
  "name": "GUILD INSURANCE LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "guild superannuation services",
  "name": "GUILD SUPERANNUATION SERVICES LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "guildlink",
  "name": "GUILDLINK PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Health/Tech)",
  "status": "prospect"
 },
 {
  "key": "h i lighting 1984",
  "name": "H.I. LIGHTING (1984) PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "h r block",
  "name": "H & R BLOCK LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Tax/Accounting)",
  "status": "prospect"
 },
 {
  "key": "habitat health",
  "name": "Habitat Health",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "haighs manufacturing",
  "name": "HAIGHS MANUFACTURING PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "halfbrick",
  "name": "HALFBRICK HOLDINGS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "hamb systems",
  "name": "HAMB SYSTEMS LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "hamlon",
  "name": "HAMLON PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "hammco",
  "name": "HAMMCO PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "prospect"
 },
 {
  "key": "hampr",
  "name": "HAMPR PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "hampton capital",
  "name": "Hampton Capital",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Accounting/Trust)",
  "status": "customer"
 },
 {
  "key": "hanes",
  "name": "Hanes Australasia Ltd.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "hanover welfare services",
  "name": "HANOVER WELFARE SERVICES",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Non-profit)",
  "status": "prospect"
 },
 {
  "key": "hanrick curran investments",
  "name": "HANRICK CURRAN INVESTMENTS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "hapag lloyd",
  "name": "HAPAG-LLOYD (AUSTRALIA) PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "hardboards",
  "name": "AUSTRALIAN HARDBOARDS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing)",
  "status": "prospect"
 },
 {
  "key": "hardie grant nominees",
  "name": "HARDIE-GRANT NOMINEES PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "harsco",
  "name": "HARSCO (AUSTRALIA) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "harvey industries",
  "name": "HARVEY INDUSTRIES GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing)",
  "status": "prospect"
 },
 {
  "key": "hawaiian investments",
  "name": "HAWAIIAN INVESTMENTS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "FSI",
  "status": "customer"
 },
 {
  "key": "hbs superannuation nominees",
  "name": "HBS SUPERANNUATION NOMINEES PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "health metrics",
  "name": "HEALTH METRICS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "health workforce queensland",
  "name": "HEALTH WORKFORCE QUEENSLAND LTD",
  "patch": "hcls",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "HCLS"
 },
 {
  "key": "healthcare associates",
  "name": "Australian Healthcare Associates",
  "patch": "hcls",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "HCLS",
  "status": "customer"
 },
 {
  "key": "healthconsult",
  "name": "HEALTHCONSULT PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "heartland",
  "name": "HEARTLAND GROUP HOLDINGS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "heavenly",
  "name": "HEAVENLY HOLDINGS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "heidelberg graphic equipment",
  "name": "HEIDELBERG GRAPHIC EQUIPMENT LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "henderson global investors",
  "name": "HENDERSON GLOBAL INVESTORS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "heritage glass products",
  "name": "HERITAGE GLASS PRODUCTS (AUST) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing)",
  "status": "prospect"
 },
 {
  "key": "hgl",
  "name": "HGL LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "hgl ten",
  "name": "HGL COMPANY TEN PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "hi tech express",
  "name": "HI-TECH EXPRESS GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "high profile enterprises",
  "name": "HIGH PROFILE ENTERPRISES LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "highbrook",
  "name": "HIGHBROOK HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "highland pine products",
  "name": "HIGHLAND PINE PRODUCTS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "hills motorway",
  "name": "THE HILLS MOTORWAY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "hireup",
  "name": "Hireup Pty Ltd",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "homestart finance",
  "name": "HOMESTART FINANCE",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "hong kong electric international finance",
  "name": "HONG KONG ELECTRIC INTERNATIONAL FINANCE (AUSTRALIA) PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Energy Finance)",
  "status": "prospect"
 },
 {
  "key": "hot springs",
  "name": "HOT SPRINGS PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "hse",
  "name": "HSE GROUP LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "hudson corporate",
  "name": "HUDSON CORPORATE PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Consulting)",
  "status": "prospect"
 },
 {
  "key": "hudson frame truss",
  "name": "HUDSON FRAME & TRUSS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing)",
  "status": "prospect"
 },
 {
  "key": "hume masterpanel",
  "name": "HUME MASTERPANEL PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "hunter douglas",
  "name": "HUNTER DOUGLAS HOLDINGS LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "husqvarna",
  "name": "HUSQVARNA AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "hwl ebsworth lawyers",
  "name": "HWL EBSWORTH LAWYERS",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Legal)",
  "status": "prospect"
 },
 {
  "key": "hydro aluminium",
  "name": "HYDRO ALUMINIUM AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "hydro chem",
  "name": "HYDRO-CHEM PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "i d g communications",
  "name": "I D G COMMUNICATIONS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "iberdrola",
  "name": "Iberdrola Australia",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "inferred"
 },
 {
  "key": "icandy interactive",
  "name": "ICANDY INTERACTIVE LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "icap futures",
  "name": "ICAP FUTURES (AUSTRALIA) PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "ice engineering construction",
  "name": "ICE ENGINEERING & CONSTRUCTION HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Engineering)",
  "status": "prospect"
 },
 {
  "key": "ici industries",
  "name": "ICI INDUSTRIES PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "icoa",
  "name": "ICOA AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "idealcars",
  "name": "IDEALCARS (AUSTRALIA) PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Automotive)",
  "status": "prospect"
 },
 {
  "key": "identitii",
  "name": "IDENTITII LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "iff",
  "name": "IFF AUSTRALIA HOLDINGS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "iinet",
  "name": "IINET LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "imc pacific",
  "name": "IMC PACIFIC PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "imcd investments",
  "name": "IMCD AUSTRALASIA INVESTMENTS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "immij",
  "name": "IMMIJ PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "imperial film distributors",
  "name": "IMPERIAL FILM DISTRIBUTORS PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "imperial tobacco",
  "name": "IMPERIAL TOBACCO AUSTRALIA LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "imperium home solutions",
  "name": "IMPERIUM HOME SOLUTIONS GROUP PTY. LTD.",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail/Building)",
  "status": "prospect"
 },
 {
  "key": "incoll",
  "name": "INCOLL GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Construction)",
  "status": "prospect"
 },
 {
  "key": "indeed",
  "name": "INDEED AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "independence",
  "name": "INDEPENDENCE AUSTRALIA GROUP LIMITED",
  "patch": "hcls",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "HCLS"
 },
 {
  "key": "independence nl",
  "name": "Independence Group NL",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "indigital",
  "name": "INDIGITAL PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "industrial commercial bank of china",
  "name": "Industrial and Commercial Bank of China (New Zealand) Ltd",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "industry capability network nsw",
  "name": "INDUSTRY CAPABILITY NETWORK (NSW) LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "informatix",
  "name": "INFORMATIX PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "infosys technologies",
  "name": "INFOSYS TECHNOLOGIES LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "infratil",
  "name": "INFRATIL LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "ingenia communities",
  "name": "Ingenia Communities",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "ingogo",
  "name": "Ingogo Australia Pty Ltd",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "innovation fleet",
  "name": "INNOVATION GROUP (FLEET) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Automotive Services)",
  "status": "prospect"
 },
 {
  "key": "innovations inventions",
  "name": "AUSTRALIAN INNOVATIONS & INVENTIONS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Technology)",
  "status": "prospect"
 },
 {
  "key": "inside policy",
  "name": "Inside Policy",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "insight exchange",
  "name": "Insight Exchange",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "insights exchange",
  "name": "Insights Exchange",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "instinct reason",
  "name": "INSTINCT AND REASON PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "insurance house",
  "name": "INSURANCE HOUSE HOLDINGS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "intelligent pathways",
  "name": "INTELLIGENT PATHWAYS HOLDINGS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "intellischool",
  "name": "INTELLISCHOOL HOLDINGS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "interactive",
  "name": "INTERACTIVE PTY. LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "interface",
  "name": "INTERFACE AUST PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "interiorco",
  "name": "INTERIORCO PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "interlinc solutions",
  "name": "INTERLINC SOLUTIONS (NEW ZEALAND) LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "interpublic",
  "name": "INTERPUBLIC AUSTRALIA HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "interstate enterprises",
  "name": "INTERSTATE ENTERPRISES PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "intertek",
  "name": "INTERTEK AUSTRALIA HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "intrepica",
  "name": "INTREPICA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "invast financial services",
  "name": "INVAST FINANCIAL SERVICES PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "investec",
  "name": "INVESTEC HOLDINGS AUSTRALIA PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "investmentor",
  "name": "Investmentor",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "investsmart",
  "name": "INVESTSMART GROUP LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "invivo medical",
  "name": "INVIVO MEDICAL PTY LTD",
  "patch": "hcls",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Healthcare)",
  "status": "prospect"
 },
 {
  "key": "ipar rehabilitation",
  "name": "IPAR REHABILITATION PTY LTD",
  "patch": "hcls",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Healthcare)",
  "status": "prospect"
 },
 {
  "key": "ipd",
  "name": "IPD GROUP LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "iph",
  "name": "IPH LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "ipscape",
  "name": "IPSCAPE PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "ironbark investment partners",
  "name": "IRONBARK INVESTMENT PARTNERS PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "islington investment",
  "name": "ISLINGTON INVESTMENT GROUP PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "ispt nominees",
  "name": "ISPT NOMINEES PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "ispt operations",
  "name": "ISPT Operations PTY Ltd",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "isuzu",
  "name": "ISUZU AUSTRALIA LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "itron",
  "name": "ITRON AUSTRALASIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "itv studios",
  "name": "ITV STUDIOS AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "ivanhoe coal",
  "name": "IVANHOE COAL PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Mining)",
  "status": "prospect"
 },
 {
  "key": "ivoisys",
  "name": "IVOISYS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "ivolve",
  "name": "IVOLVE HOLDINGS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "ix infrastructure",
  "name": "IX INFRASTRUCTURE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "j c dahlsen",
  "name": "J.C. DAHLSEN PROPRIETARY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Hardware/Retail)",
  "status": "prospect"
 },
 {
  "key": "j f hillebrand",
  "name": "J.F. HILLEBRAND AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "j h kilroy",
  "name": "J.H. KILROY HOLDINGS PTY LTD",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "j j abela m a alexander w basford k m batcheldor g s choong s m coulton p v dwyer i k fergusson p e foley r e foster n j gangemi j s gavljak r k gillan d p goman others",
  "name": "J.J ABELA & M.A ALEXANDER & W BASFORD & K.M BATCHELDOR & G.S CHOONG & S.M COULTON & P.V DWYER & I.K FERGUSSON & P.E FOLEY & R.E FOSTER & N.J GANGEMI & J.S GAVLJAK & R.K GILLAN & D.P GOMAN & others",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Partnership/Holding)",
  "status": "prospect"
 },
 {
  "key": "jaberope",
  "name": "JABEROPE PROPRIETARY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "jacobi carbons",
  "name": "JACOBI CARBONS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "jacqueline eve fashions",
  "name": "JACQUELINE-EVE FASHIONS PROPRIETARY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail)",
  "status": "prospect"
 },
 {
  "key": "jaecer",
  "name": "JAECER HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "james pascoe",
  "name": "JAMES PASCOE LIMITED",
  "patch": "locations",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "jampion",
  "name": "JAMPION PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "janison education",
  "name": "JANISON EDUCATION GROUP LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "janola dale",
  "name": "JANOLA DALE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "jardan",
  "name": "JARDAN AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "jay jays trademark",
  "name": "JAY JAYS TRADEMARK PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail)",
  "status": "prospect"
 },
 {
  "key": "jbs g",
  "name": "JBS&G Australia Pty Ltd",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "jcurve solutions",
  "name": "JCURVE SOLUTIONS LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "jemcom",
  "name": "JEMCOM PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "jet aviation",
  "name": "JET AVIATION AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "jfe mineral",
  "name": "JFE MINERAL (AUSTRALIA) PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "jfk engineering",
  "name": "JFK ENGINEERING PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Engineering)",
  "status": "prospect"
 },
 {
  "key": "jim grant associates",
  "name": "Jim Grant and Associates",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "john dahlsen investments",
  "name": "JOHN DAHLSEN (INVESTMENTS) PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "john holland",
  "name": "JOHN HOLLAND PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "johnson controls",
  "name": "JOHNSON CONTROLS AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing)",
  "status": "prospect"
 },
 {
  "key": "johnstaff projects",
  "name": "JOHNSTAFF PROJECTS PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Consulting)",
  "status": "prospect"
 },
 {
  "key": "jons growth fund",
  "name": "JONS GROWTH FUND PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "jowett motor",
  "name": "JOWETT MOTOR GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Automotive)",
  "status": "prospect"
 },
 {
  "key": "junction support services",
  "name": "JUNCTION SUPPORT SERVICES LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "inferred"
 },
 {
  "key": "just shop",
  "name": "JUST-SHOP PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail)",
  "status": "prospect"
 },
 {
  "key": "justfund",
  "name": "JUSTFUND PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "justice services",
  "name": "Justice Services Pty. Ltd.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "kab seating",
  "name": "KAB SEATING PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "kantfield",
  "name": "KANTFIELD PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "kapiche",
  "name": "Kapiche Pty Ltd.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "kapitol",
  "name": "Kapitol Group",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Construction)",
  "status": "prospect"
 },
 {
  "key": "kaseya",
  "name": "KASEYA AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "kb",
  "name": "KB AUSTRALIA HOLDING PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "keech",
  "name": "KEECH AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "keepcup",
  "name": "KEEPCUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "kellogg",
  "name": "KELLOGG AUSTRALIA HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "kellvista",
  "name": "KELLVISTA PTY. LIMITED",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "kellyco",
  "name": "KELLYCO PTY. LTD.",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "kennards hire",
  "name": "KENNARDS HIRE PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Rental Services)",
  "status": "prospect"
 },
 {
  "key": "kerfab",
  "name": "Kerfab",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "kfoong services",
  "name": "KFOONG SERVICES PTY LTD",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "kiandra it",
  "name": "KIANDRA IT PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "kimberly clark",
  "name": "Kimberly-Clark Australia Pty. Ltd.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "kimbyr investments",
  "name": "KIMBYR INVESTMENTS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "kinetic it",
  "name": "KINETIC IT PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "kingspan insulated panels",
  "name": "KINGSPAN INSULATED PANELS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "kingspan water energy",
  "name": "KINGSPAN WATER & ENERGY PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "kingston estate wines",
  "name": "KINGSTON ESTATE WINES PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "kk ftt",
  "name": "KK FTT PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "kkkk",
  "name": "KKKK PTY LTD",
  "patch": "locations",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "prospect"
 },
 {
  "key": "klarna",
  "name": "KLARNA AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "kmn",
  "name": "KMN PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "koala",
  "name": "Koala",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "kobelco construction machinery",
  "name": "KOBELCO CONSTRUCTION MACHINERY AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "konami",
  "name": "KONAMI AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "konecranes demag",
  "name": "KONECRANES AND DEMAG PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "koornang investments",
  "name": "KOORNANG INVESTMENTS PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "koppers",
  "name": "KOPPERS AUSTRALIA HOLDING COMPANY PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "kordia",
  "name": "KORDIA GROUP LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "kotzur",
  "name": "KOTZUR GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "krb",
  "name": "KRB HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "krispy kreme",
  "name": "KRISPY KREME HOLDINGS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "kura",
  "name": "KURA LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "kvam",
  "name": "KVAM AUSTRALIA PTY. LTD.",
  "patch": "locations",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "prospect"
 },
 {
  "key": "l occitane",
  "name": "L'OCCITANE AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "l w reid",
  "name": "L W REID PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "lacima",
  "name": "LACIMA GROUP PTY. LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "lactalis",
  "name": "Lactalis Australia",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "lades",
  "name": "LADES PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "laken capital",
  "name": "LAKEN CAPITAL PTY LTD",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "lam systems",
  "name": "LAM SYSTEMS LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "lancom technology",
  "name": "LanCOM Technology (NZ)",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "lander rogers",
  "name": "LANDER AND ROGERS",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "langs building supplies",
  "name": "LANGS BUILDING SUPPLIES PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "larsen toubro infotech",
  "name": "LARSEN & TOUBRO INFOTECH LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "lasky violet box",
  "name": "LASKY VIOLET BOX PTY LTD",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "latitude finance",
  "name": "LATITUDE FINANCE AUSTRALIA",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "latrobe health services",
  "name": "Latrobe Health Services Ltd.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "customer"
 },
 {
  "key": "layer 8 security",
  "name": "Layer 8 Security",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "lazy crab investments",
  "name": "LAZY CRAB INVESTMENTS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "learning macleay",
  "name": "Learning the Macleay",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "learningworks",
  "name": "LearningWorks",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "lease express",
  "name": "LEASE EXPRESS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "leaseplan",
  "name": "LEASEPLAN AUSTRALIA LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "ledified lighting",
  "name": "LEDIFIED LIGHTING CORPORATION PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "legion of ex servicemen women",
  "name": "AUSTRALIAN LEGION OF EX-SERVICEMEN AND WOMEN",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "legrand",
  "name": "LEGRAND GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "lenovo",
  "name": "LENOVO (AUSTRALIA & NEW ZEALAND) PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "lexer",
  "name": "LEXER PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "liberty financial",
  "name": "LIBERTY FINANCIAL GROUP LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "investments brokers",
  "status": "prospect"
 },
 {
  "key": "liebherr",
  "name": "LIEBHERR-AUSTRALIA PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "life central services",
  "name": "Life! Central Services Inc.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "lifetime",
  "name": "LIFETIME GROUP LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "liftronic",
  "name": "LIFTRONIC PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "lifx",
  "name": "LIFX Australia",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "lindt sprungli",
  "name": "LINDT & SPRUNGLI (AUSTRALIA) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "liquid hr",
  "name": "Liquid HR",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Consulting/HR)",
  "status": "prospect"
 },
 {
  "key": "liquid interactive",
  "name": "Liquid Interactive",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "liquidnet",
  "name": "LIQUIDNET AUSTRALIA PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "little real estate",
  "name": "Little Real Estate Pty. Ltd.",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "loan gallery finance",
  "name": "LOAN GALLERY FINANCE",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "loan market",
  "name": "LOAN MARKET PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "localagentfinder",
  "name": "LOCALAGENTFINDER LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "lockton companies",
  "name": "LOCKTON COMPANIES AUSTRALIA PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "investments brokers",
  "status": "prospect"
 },
 {
  "key": "locky s investments",
  "name": "LOCKY'S INVESTMENTS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "longriver farms",
  "name": "LONGRIVER FARMS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "love to dream",
  "name": "Love To Dream",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "lucid consulting",
  "name": "Lucid Consulting Australia",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Engineering)",
  "status": "prospect"
 },
 {
  "key": "luminary digital",
  "name": "LUMINARY DIGITAL PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "lumination",
  "name": "Lumination",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "lutrust andrew klippel",
  "name": "LUTRUST PTY. LIMITED AND ANDREW KLIPPEL HOLDINGS PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "lysander consulting",
  "name": "LYSANDER CONSULTING GROUP PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "m c m wa",
  "name": "M.C.M (WA) PTY LTD",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "m strata",
  "name": "M STRATA GROUP PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "ma asset management",
  "name": "MA ASSET MANAGEMENT LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "ma financial",
  "name": "MA FINANCIAL GROUP LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mable technologies",
  "name": "Mable Technologies Pty. Ltd.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "mach7 technologies",
  "name": "MACH7 TECHNOLOGIES LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "mackay sugar projects",
  "name": "MACKAY SUGAR PROJECTS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "macmahon",
  "name": "MACMAHON HOLDINGS LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "macmillan distribution services",
  "name": "MACMILLAN DISTRIBUTION SERVICES PROPRIETARY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "mad capital",
  "name": "MAD CAPITAL PTY. LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "mad mex",
  "name": "Mad Mex",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "madad",
  "name": "MADAD PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "mader",
  "name": "MADER GROUP LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "magellan financial",
  "name": "Magellan Financial Group",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "magnet investments",
  "name": "MAGNET INVESTMENTS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "magontec",
  "name": "MAGONTEC LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mail boxes etc",
  "name": "MAIL BOXES ETC. (AUSTRALIA) PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mainfreight distribution",
  "name": "MAINFREIGHT DISTRIBUTION PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "malteurop",
  "name": "MALTEUROP AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "malvern share investments",
  "name": "MALVERN SHARE INVESTMENTS PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "manitou",
  "name": "MANITOU AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "manly fast ferry",
  "name": "MANLY FAST FERRY PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Transport)",
  "status": "prospect"
 },
 {
  "key": "mantel",
  "name": "MANTEL GROUP PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "mapien",
  "name": "MAPIEN PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "maptek",
  "name": "MAPTEK PTY. LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "marathon tyres",
  "name": "MARATHON TYRES HOLDINGS PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail)",
  "status": "prospect"
 },
 {
  "key": "marcopolo",
  "name": "MARCOPOLO AUSTRALIA HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "marketing scientist",
  "name": "Marketing Scientist",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "marketsoft",
  "name": "Marketsoft",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "markinson",
  "name": "MARKINSON PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "marmon construction services",
  "name": "MARMON CONSTRUCTION SERVICES (AUSTRALIA) HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "marron",
  "name": "MARRON GROUP HOLDINGS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "martin brower",
  "name": "MARTIN-BROWER AUSTRALIA PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "master butchers operative",
  "name": "MASTER BUTCHERS CO-OPERATIVE LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mastercard prepaid management services",
  "name": "MASTERCARD PREPAID MANAGEMENT SERVICES AUSTRALIA PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "mastt",
  "name": "MASTT GROUP PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "matchmaster communications",
  "name": "MATCHMASTER COMMUNICATIONS PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "mather platt",
  "name": "MATHER & PLATT PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Engineering)",
  "status": "prospect"
 },
 {
  "key": "matrak industries",
  "name": "Matrak Industries Pty Ltd",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "max hire",
  "name": "MAX HIRE PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Rental Services)",
  "status": "prospect"
 },
 {
  "key": "max software",
  "name": "MAX SOFTWARE PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "maximum energy",
  "name": "MAXIMUM ENERGY PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "maxitrans industries",
  "name": "MAXITRANS INDUSTRIES LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mccain foods",
  "name": "MCCAIN FOODS (AUST) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mcconnell family investments",
  "name": "MCCONNELL FAMILY INVESTMENTS PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "mechanical construction insurance",
  "name": "MECHANICAL AND CONSTRUCTION INSURANCE PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "medical defence association of south",
  "name": "MEDICAL DEFENCE ASSOCIATION OF SOUTH AUSTRALIA LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "medical indemnity protection society",
  "name": "MEDICAL INDEMNITY PROTECTION SOCIETY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "medical insurance",
  "name": "MEDICAL INSURANCE AUSTRALIA PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "medico legal",
  "name": "AUSTRALIAN MEDICO-LEGAL GROUP PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Healthcare/Legal)",
  "status": "prospect"
 },
 {
  "key": "medirecords",
  "name": "MEDIRECORDS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "medlog oceania",
  "name": "MEDLOG OCEANIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mee s bus lines",
  "name": "MEE'S BUS LINES PROPRIETARY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "mega capital",
  "name": "MEGA CAPITAL PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "megt",
  "name": "MEGT (AUSTRALIA) LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mehold",
  "name": "MEHOLD PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "melbourne airport corporate",
  "name": "Melbourne Airport Corporate",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "melodics trustee",
  "name": "MELODICS TRUSTEE LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "memories",
  "name": "MEMORIES GROUP PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "mentorconnect",
  "name": "MENTORCONNECT PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mentorloop",
  "name": "MENTORLOOP PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "message4u",
  "name": "MESSAGE4U PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "metis midco",
  "name": "METIS MIDCO PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "metisphere",
  "name": "Metisphere",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "metlifecare",
  "name": "METLIFECARE LIMITED",
  "patch": "hcls",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Healthcare/Aged Care)",
  "status": "prospect"
 },
 {
  "key": "metro taxi s wa",
  "name": "METRO TAXI'S (WA) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mettler toledo",
  "name": "METTLER-TOLEDO LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mgh holdco",
  "name": "MGH HOLDCO PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "mgm wireless",
  "name": "MGM Wireless",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "mic advisors",
  "name": "Mic Advisors",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "inferred"
 },
 {
  "key": "michael hill healthcare consulting",
  "name": "Michael Hill Healthcare Consulting",
  "patch": "hcls",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "HCLS"
 },
 {
  "key": "micromine",
  "name": "MICROMINE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "midcoast county council",
  "name": "MIDCOAST COUNTY COUNCIL",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "midcoast timber centres",
  "name": "MIDCOAST TIMBER CENTRES PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail/Building)",
  "status": "prospect"
 },
 {
  "key": "midfield finance",
  "name": "MIDFIELD FINANCE PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "miele",
  "name": "MIELE AUSTRALIA PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mike thompson investments",
  "name": "MIKE THOMPSON INVESTMENTS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "military bank",
  "name": "Australian Military Bank Ltd.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "millennium services",
  "name": "MILLENNIUM SERVICES GROUP LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mind fields consulting",
  "name": "MIND FIELDS CONSULTING PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "mindshape team",
  "name": "MindShape Team",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mine super services",
  "name": "MINE SUPER SERVICES PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "minnovare",
  "name": "MINNOVARE HOLDING CO PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "mips insurance",
  "name": "MIPS INSURANCE PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "mitel south pacific",
  "name": "MITEL SOUTH PACIFIC PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "mitsubishi heavy industries air conditioners",
  "name": "MITSUBISHI HEAVY INDUSTRIES AIR-CONDITIONERS AUSTRALIA, PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "mitsui",
  "name": "MITSUI & CO. (AUSTRALIA) LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Trading/Diversified)",
  "status": "prospect"
 },
 {
  "key": "mitsui coal",
  "name": "MITSUI COAL HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Mining/Energy)",
  "status": "prospect"
 },
 {
  "key": "mitsui e p",
  "name": "MITSUI E&P AUSTRALIA PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "mkjb global",
  "name": "MKJB Global",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "mmc ulc",
  "name": "MMC HOLDINGS (NEW ZEALAND) ULC",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "mml trustees 2017",
  "name": "MML TRUSTEES 2017 LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "modern star topco",
  "name": "MODERN STAR HOLDINGS TOPCO PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "modibodi",
  "name": "MODIBODI PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "moi international",
  "name": "MOI INTERNATIONAL (AUSTRALIA) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "moneyme",
  "name": "MONEYME LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "moneyme financial",
  "name": "MONEYME FINANCIAL GROUP PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "monster energy au",
  "name": "MONSTER ENERGY AU PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "moodle",
  "name": "MOODLE PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "moonlighting",
  "name": "MOONLIGHTING PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Lighting/Retail)",
  "status": "prospect"
 },
 {
  "key": "moores cost consultants",
  "name": "MOORES COST CONSULTANTS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Consulting)",
  "status": "prospect"
 },
 {
  "key": "more growth",
  "name": "More Growth Pty Ltd",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "morgan mckinley",
  "name": "MORGAN MCKINLEY PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "morrow sodali",
  "name": "MORROW SODALI PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mortgage professionals",
  "name": "THE MORTGAGE PROFESSIONALS PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "mosaic",
  "name": "MOSAIC GROUP LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "mosaic brands",
  "name": "MOSAIC BRANDS LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mosaic insights",
  "name": "Mosaic Insights",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "motoka rentals",
  "name": "MOTOKA RENTALS LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Automotive/Rental)",
  "status": "prospect"
 },
 {
  "key": "motor traders association of new south wales",
  "name": "Motor Traders' Association of New South Wales",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "motorola solutions",
  "name": "MOTOROLA SOLUTIONS AUSTRALIA PTY. LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "mountainview trading",
  "name": "MOUNTAINVIEW TRADING PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding/Trading)",
  "status": "prospect"
 },
 {
  "key": "mozo",
  "name": "Mozo Pty. Ltd.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "mpd dairy products",
  "name": "MPD DAIRY PRODUCTS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (FMCG)",
  "status": "prospect"
 },
 {
  "key": "mpl",
  "name": "MPL Australia",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "mrc global",
  "name": "MRC GLOBAL AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "ms queensland",
  "name": "MS QUEENSLAND LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "msl solutions",
  "name": "MSL SOLUTIONS LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "msm milling",
  "name": "MSM MILLING PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "muir",
  "name": "MUIR GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "mumba",
  "name": "MUMBA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "munro footwear",
  "name": "MUNRO FOOTWEAR GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "murray bridge bacon",
  "name": "MURRAY BRIDGE BACON PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "murray leisure",
  "name": "MURRAY LEISURE GROUP PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Leisure)",
  "status": "prospect"
 },
 {
  "key": "murray publishers",
  "name": "MURRAY PUBLISHERS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Media)",
  "status": "prospect"
 },
 {
  "key": "music stores",
  "name": "MUSIC STORES PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail)",
  "status": "prospect"
 },
 {
  "key": "mutual bank",
  "name": "AUSTRALIAN MUTUAL BANK LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "mv anstey real estate",
  "name": "MV ANSTEY REAL ESTATE PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "my budget",
  "name": "My Budget",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "my robo advice",
  "name": "My Robo Advice Pty Ltd",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "my things",
  "name": "My Things",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "mylifemyfinance",
  "name": "MYLIFEMYFINANCE LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "myport",
  "name": "MYPORT PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "myprosperity",
  "name": "MYPROSPERITY PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "n ieraci sons",
  "name": "N. IERACI & SONS PROPRIETARY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "namarong investments",
  "name": "NAMARONG INVESTMENTS PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "nanshan",
  "name": "NANSHAN GROUP AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Diversified)",
  "status": "prospect"
 },
 {
  "key": "nasdaq",
  "name": "NASDAQ AUSTRALIA HOLDINGS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "national allergy council",
  "name": "National Allergy Council",
  "patch": "hcls",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "HCLS",
  "status": "customer"
 },
 {
  "key": "national credit insurance brokers",
  "name": "NATIONAL CREDIT INSURANCE (BROKERS) PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "national roads motorists association",
  "name": "NATIONAL ROADS AND MOTORISTS' ASSOCIATION LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Services)",
  "status": "prospect"
 },
 {
  "key": "navantia s a",
  "name": "NAVANTIA S.A.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "nearmap",
  "name": "NEARMAP LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "nec",
  "name": "NEC CORPORATION",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "neild",
  "name": "NEILD & CO. PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "nelson global products",
  "name": "NELSON GLOBAL PRODUCTS AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "neoproducts",
  "name": "Neoproducts Pty Ltd",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "netafim",
  "name": "NETAFIM AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "netfx design",
  "name": "NETFX DESIGN PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "netsuite",
  "name": "NETSUITE AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "netwealth",
  "name": "NETWEALTH GROUP LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "neumann steel",
  "name": "NEUMANN STEEL PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "new century chinese language school",
  "name": "New Century Chinese Language School Inc.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "new forests",
  "name": "NEW FORESTS PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "newgate communications",
  "name": "NEWGATE COMMUNICATIONS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "newman animal nutrition",
  "name": "NEWMAN ANIMAL NUTRITION PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Agriculture)",
  "status": "prospect"
 },
 {
  "key": "newmark industries",
  "name": "NEWMARK INDUSTRIES PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "newsat",
  "name": "NEWSAT LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "nextdc",
  "name": "NEXTDC LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "nextgen networks",
  "name": "NEXTGEN NETWORKS PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "nobleoak life",
  "name": "NOBLEOAK LIFE LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "noggin",
  "name": "NOGGIN PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "nomura asset management",
  "name": "NOMURA ASSET MANAGEMENT AUSTRALIA PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "nomura research institute",
  "name": "NOMURA RESEARCH INSTITUTE AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "noonan property management",
  "name": "Noonan Property Management",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "noorton",
  "name": "NOORTON PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "northern star hampton gold mining areas",
  "name": "NORTHERN STAR (HAMPTON GOLD MINING AREAS) LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Mining)",
  "status": "prospect"
 },
 {
  "key": "northline",
  "name": "NORTHLINE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "northwestern roads",
  "name": "NORTHWESTERN ROADS GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "nortruss n t",
  "name": "NORTRUSS (N.T.) PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Wholesale/Retail)",
  "status": "prospect"
 },
 {
  "key": "norwich research",
  "name": "NORWICH RESEARCH (AUST) PTY LTD",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "noshu foods",
  "name": "NOSHU FOODS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "nosworthy",
  "name": "NOSWORTHY GROUP PTY LTD",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "noumi nutritionals",
  "name": "NOUMI NUTRITIONALS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "nous international",
  "name": "Nous Group International PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "novatti",
  "name": "NOVATTI GROUP LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "novigi",
  "name": "Novigi",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "nrma consolidated",
  "name": "NRMA CONSOLIDATED LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Services)",
  "status": "prospect"
 },
 {
  "key": "nrma holiday parks",
  "name": "NRMA HOLIDAY PARKS PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Hospitality/Leisure)",
  "status": "prospect"
 },
 {
  "key": "nrma motoring",
  "name": "NRMA MOTORING LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Services)",
  "status": "prospect"
 },
 {
  "key": "nrma treasury",
  "name": "NRMA TREASURY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Services/Finance)",
  "status": "prospect"
 },
 {
  "key": "ntt communications",
  "name": "NTT COMMUNICATIONS CORPORATION",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "nuchev",
  "name": "NUCHEV LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "nuix",
  "name": "Nuix Pty. Ltd.",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "number 114 749 110",
  "name": "AUSTRALIAN COMPANY NUMBER 114 749 110 PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding Company)",
  "status": "prospect"
 },
 {
  "key": "nurses midwives health",
  "name": "NURSES & MIDWIVES HEALTH PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "nutrition biosciences",
  "name": "NUTRITION & BIOSCIENCES AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "nyk",
  "name": "NYK AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "nzme educational media",
  "name": "NZME EDUCATIONAL MEDIA LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "o brien glass industries",
  "name": "O'BRIEN GLASS INDUSTRIES LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "objective",
  "name": "OBJECTIVE CORPORATION LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "ocean informatics",
  "name": "OCEAN INFORMATICS PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "oceanagold",
  "name": "OCEANAGOLD CORPORATION",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "oceania capital partners",
  "name": "OCEANIA CAPITAL PARTNERS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "ocs",
  "name": "OCS GROUP NZ LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Facilities Mgmt)",
  "status": "prospect"
 },
 {
  "key": "ocs building maintenance",
  "name": "OCS BUILDING MAINTENANCE PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Facilities Mgmt)",
  "status": "prospect"
 },
 {
  "key": "ocs services",
  "name": "OCS SERVICES PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Facilities Mgmt)",
  "status": "prospect"
 },
 {
  "key": "octopus deploy",
  "name": "OCTOPUS DEPLOY PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "office pcs",
  "name": "OFFICE PCS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "old favourites blues",
  "name": "OLD FAVOURITES BLUES PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "omc",
  "name": "OMC HOLDINGS PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "omnitronics",
  "name": "OMNITRONICS PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "ondeck",
  "name": "Ondeck Australia Pty. Ltd.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "oneqode",
  "name": "Oneqode",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "onetrak",
  "name": "ONETRAK PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "oobe",
  "name": "OOBE PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "open",
  "name": "OPEN CORP GROUP PTY LTD",
  "patch": "fsi",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "FSI",
  "status": "customer"
 },
 {
  "key": "open door pub",
  "name": "OPEN DOOR PUB CO. PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Hospitality)",
  "status": "prospect"
 },
 {
  "key": "operative bank",
  "name": "THE CO-OPERATIVE BANK LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "opes custodia trustee services",
  "name": "OPES CUSTODIA TRUSTEE SERVICES LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "opes partners",
  "name": "OPES PARTNERS NEW ZEALAND LIMITED",
  "patch": "fsi",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "FSI",
  "status": "prospect"
 },
 {
  "key": "optima investment",
  "name": "OPTIMA INVESTMENT GROUP LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "optiver",
  "name": "OPTIVER AUSTRALIA HOLDINGS PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "oracle",
  "name": "ORACLE CORPORATION AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "oracle consolidation",
  "name": "ORACLE CONSOLIDATION AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Technology)",
  "status": "prospect"
 },
 {
  "key": "ord minnett investments",
  "name": "ORD MINNETT INVESTMENTS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "orde financial",
  "name": "ORDE FINANCIAL PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "ordermate",
  "name": "ORDERMATE PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "oriental merchant",
  "name": "ORIENTAL MERCHANT PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "orion health",
  "name": "ORION HEALTH GROUP LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "oritain global",
  "name": "ORITAIN GLOBAL LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "orora",
  "name": "ORORA LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "orro",
  "name": "ORRO PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "osmoflo",
  "name": "OSMOFLO PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "our deal",
  "name": "OUR DEAL PTY LTD",
  "patch": "locations",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "prospect"
 },
 {
  "key": "outcare",
  "name": "Outcare",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "ovato retail distribution",
  "name": "OVATO RETAIL DISTRIBUTION PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Logistics)",
  "status": "prospect"
 },
 {
  "key": "overdose digital",
  "name": "OVERDOSE DIGITAL AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Technology)",
  "status": "prospect"
 },
 {
  "key": "ovidrive applabs",
  "name": "OVIDRIVE APPLABS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "owens",
  "name": "OWENS GROUP AUSTRALIA PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "oxc",
  "name": "OXC (NZ) LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Diversified)",
  "status": "prospect"
 },
 {
  "key": "ozgen",
  "name": "OZGEN HOLDINGS AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "paccar",
  "name": "PACCAR AUSTRALIA PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "pacific coast leisure",
  "name": "PACIFIC COAST LEISURE PTY. LTD.",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Hospitality/Leisure)",
  "status": "prospect"
 },
 {
  "key": "pacific funding",
  "name": "PACIFIC FUNDING PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "pacific infrastructure partners",
  "name": "PACIFIC INFRASTRUCTURE PARTNERS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "pacific life re",
  "name": "PACIFIC LIFE RE (AUSTRALIA) PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "palladium",
  "name": "PALLADIUM HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "paltronics",
  "name": "PALTRONICS AUSTRALASIA PTY. LIMITED",
  "patch": "locations",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "prospect"
 },
 {
  "key": "pandrol",
  "name": "PANDROL AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "pangaea world",
  "name": "PANGAEA WORLD PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "panker nominees nsw",
  "name": "PANKER NOMINEES (NSW) PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "papercut software international",
  "name": "PAPERCUT SOFTWARE INTERNATIONAL PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "parallel data",
  "name": "PARALLEL DATA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "pars ram s foods",
  "name": "PARS RAM'S FOODS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "partners",
  "name": "PARTNERS GROUP HOLDINGS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "partners life",
  "name": "PARTNERS LIFE LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "customer"
 },
 {
  "key": "paul ramsay foundation",
  "name": "PAUL RAMSAY FOUNDATION LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "payapps",
  "name": "Payapps",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "paypal",
  "name": "PAYPAL AUSTRALIA PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "fintech",
  "status": "prospect"
 },
 {
  "key": "peard",
  "name": "PEARD GROUP PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "pearl hotels c 2013",
  "name": "PEARL HOTELS C 2013 PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Hospitality)",
  "status": "prospect"
 },
 {
  "key": "pedal",
  "name": "PEDAL GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "peet",
  "name": "PEET LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "pegasus health",
  "name": "PEGASUS HEALTH GROUP PTY LTD",
  "patch": "hcls",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Healthcare)",
  "status": "prospect"
 },
 {
  "key": "pelican holdco",
  "name": "PELICAN HOLDCO PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "pendal",
  "name": "PENDAL GROUP LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "pendal institutional",
  "name": "PENDAL INSTITUTIONAL LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "penske transportation international",
  "name": "PENSKE TRANSPORTATION GROUP INTERNATIONAL PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "pentroth",
  "name": "PENTROTH PTY. LTD.",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "people s choice credit union",
  "name": "People's Choice Credit Union",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "pepperstone",
  "name": "Pepperstone Group Ltd.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "customer"
 },
 {
  "key": "performance analytics",
  "name": "Performance Analytics",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Software/Consulting)",
  "status": "prospect"
 },
 {
  "key": "perpetual trust",
  "name": "Perpetual Trust Limited",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "perron investments",
  "name": "PERRON INVESTMENTS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "peter alexander sleepwear",
  "name": "PETER ALEXANDER SLEEPWEAR PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail)",
  "status": "prospect"
 },
 {
  "key": "peter berry consultancy",
  "name": "PETER BERRY CONSULTANCY PTY LTD",
  "patch": "fsi",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "FSI",
  "status": "customer"
 },
 {
  "key": "peter johnston",
  "name": "PETER JOHNSTON PTY. LTD",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "peter pan s backpacker adventure travel",
  "name": "PETER PAN'S BACKPACKER ADVENTURE TRAVEL PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Tourism)",
  "status": "prospect"
 },
 {
  "key": "petersville peters foods",
  "name": "PETERSVILLE LTD & PETERS FOODS AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "pfg topco1",
  "name": "PFG TOPCO1 PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "pgl travel",
  "name": "PGL Travel Group PTY Ltd",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "philp brodie grain",
  "name": "PHILP BRODIE GRAIN PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "piacentini son",
  "name": "PIACENTINI & SON PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "picnic customer intelligence",
  "name": "Picnic Customer Intelligence",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "pilbara minerals",
  "name": "PILBARA MINERALS LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Mining)",
  "status": "prospect"
 },
 {
  "key": "pinches",
  "name": "PINCHES HOLDINGS PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "pioneer credit",
  "name": "PIONEER CREDIT LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "pipemakers",
  "name": "PIPEMAKERS AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "pitcher partners",
  "name": "PITCHER PARTNERS HOLDINGS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "customer"
 },
 {
  "key": "pivotel",
  "name": "PIVOTEL GROUP PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "pixeltech design",
  "name": "PIXELTECH DESIGN PTY LTD",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "pks",
  "name": "PKS HOLDINGS LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "plastic profiles",
  "name": "AUSTRALIAN PLASTIC PROFILES PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "platinum asset management",
  "name": "PLATINUM ASSET MANAGEMENT LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "platinum investment management",
  "name": "PLATINUM INVESTMENT MANAGEMENT LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "playsport com",
  "name": "PlaySport.com",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "plenary",
  "name": "PLENARY GROUP PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "plexure",
  "name": "PLEXURE GROUP LIMITED",
  "patch": "locations",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "prospect"
 },
 {
  "key": "plum grove",
  "name": "PLUM GROVE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "pm bartlett",
  "name": "PM BARTLETT PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "pokitpal",
  "name": "POKITPAL PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "prospect"
 },
 {
  "key": "pola orbis jurlique",
  "name": "POLA ORBIS JURLIQUE HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "police association",
  "name": "The Police Association.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "police bank",
  "name": "POLICE BANK LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "customer"
 },
 {
  "key": "police credit union",
  "name": "POLICE CREDIT UNION LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "police financial services",
  "name": "POLICE FINANCIAL SERVICES LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "police health",
  "name": "POLICE HEALTH LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "police nurses p n bank",
  "name": "Police & Nurses Limited (P&N Bank)",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "customer"
 },
 {
  "key": "port of tauranga",
  "name": "PORT OF TAURANGA LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Logistics)",
  "status": "prospect"
 },
 {
  "key": "port waratah coal services pwcs kooragang main administration building",
  "name": "Port Waratah Coal Services (PWCS) Kooragang Main Administration Building",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "portalink",
  "name": "PORTALINK PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "portfolio management",
  "name": "PORTFOLIO MANAGEMENT GROUP PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "portmans",
  "name": "PORTMANS PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail)",
  "status": "prospect"
 },
 {
  "key": "potentiate",
  "name": "POTENTIATE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "power solutions",
  "name": "POWER SOLUTIONS HOLDINGS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "powerfront",
  "name": "POWERFRONT PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "praescius",
  "name": "PRAESCIUS PTY. LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "praetorian private equity",
  "name": "PRAETORIAN PRIVATE EQUITY PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "prdnationwide victoria",
  "name": "PRDNATIONWIDE VICTORIA PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "precision administration services",
  "name": "PRECISION ADMINISTRATION SERVICES PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech (Supertech/Payments)",
  "status": "prospect"
 },
 {
  "key": "premier investments",
  "name": "PREMIER INVESTMENTS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "prezzee",
  "name": "Prezzee Pty Ltd",
  "patch": "fsi",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "FSI",
  "status": "prospect"
 },
 {
  "key": "priava",
  "name": "PRIAVA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "prima furniture",
  "name": "PRIMA FURNITURE (AUST) PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing)",
  "status": "prospect"
 },
 {
  "key": "prime media",
  "name": "PRIME MEDIA GROUP LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "printforce",
  "name": "PRINTFORCE AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "prius healthcare solutions",
  "name": "PRIUS HEALTHCARE SOLUTIONS PTY LTD",
  "patch": "hcls",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Healthcare)",
  "status": "prospect"
 },
 {
  "key": "private media",
  "name": "PRIVATE MEDIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "professional investment services",
  "name": "PROFESSIONAL INVESTMENT SERVICES PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "prometheus information",
  "name": "PROMETHEUS INFORMATION PTY. LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "pronto software",
  "name": "PRONTO SOFTWARE LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "property exchange",
  "name": "Property Exchange Australia Ltd.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "property for industry",
  "name": "PROPERTY FOR INDUSTRY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "prophecy international",
  "name": "PROPHECY INTERNATIONAL HOLDINGS LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "propic",
  "name": "PROPIC Pty Ltd",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "prosegur",
  "name": "PROSEGUR AUSTRALIA HOLDINGS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "prospa",
  "name": "PROSPA GROUP LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "prospa advance",
  "name": "Prospa Advance Pty. Ltd.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "fintech",
  "status": "prospect"
 },
 {
  "key": "prosper education",
  "name": "PROSPER EDUCATION PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "proton cars",
  "name": "PROTON CARS AUSTRALIA PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "provet",
  "name": "PROVET NZ PTY LTD",
  "patch": "hcls",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Wholesale/Healthcare)",
  "status": "prospect"
 },
 {
  "key": "prudential investment of",
  "name": "PRUDENTIAL INVESTMENT COMPANY OF AUSTRALIA PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "prvidr",
  "name": "PRVIDR PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "prysmian",
  "name": "PRYSMIAN AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "pth no 1",
  "name": "PTH NO 1 PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "purelylucid",
  "name": "Purelylucid",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "inferred"
 },
 {
  "key": "pureprofile",
  "name": "PUREPROFILE AUSTRALIA PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "pushpay",
  "name": "PUSHPAY HOLDINGS LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "pvh brands",
  "name": "PVH BRANDS AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "pwg king sons",
  "name": "PWG KING & SONS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Transport/Holding)",
  "status": "prospect"
 },
 {
  "key": "pz cussons",
  "name": "PZ CUSSONS (HOLDINGS) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "q ctrl",
  "name": "Q Ctrl",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "q f s",
  "name": "Q.F.S. HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "qlm label makers",
  "name": "QLM LABEL MAKERS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "quadrant private equity fund no 2 lp",
  "name": "QUADRANT PRIVATE EQUITY FUND NO 2 LP",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "quaker houghton",
  "name": "QUAKER HOUGHTON AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "quality garments",
  "name": "QUALITY GARMENTS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing)",
  "status": "prospect"
 },
 {
  "key": "quantium",
  "name": "THE QUANTIUM GROUP HOLDINGS PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "quayside",
  "name": "QUAYSIDE HOLDINGS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "queensland alumina",
  "name": "Queensland Alumina",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "queensland bulk terminals",
  "name": "QUEENSLAND BULK TERMINALS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Logistics)",
  "status": "prospect"
 },
 {
  "key": "queensland rugby football league",
  "name": "QUEENSLAND RUGBY FOOTBALL LEAGUE LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "quest software",
  "name": "QUEST SOFTWARE PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "quinton anthony consulting",
  "name": "Quinton Anthony Consulting Pty. Ltd.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "quotable value",
  "name": "QUOTABLE VALUE LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "r e batger",
  "name": "R.E. BATGER PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "rabo",
  "name": "RABO AUSTRALIA LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "rabobank",
  "name": "RABOBANK NEW ZEALAND LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "customer"
 },
 {
  "key": "racq insurance",
  "name": "RACQ INSURANCE LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "racv road service",
  "name": "RACV ROAD SERVICE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Services)",
  "status": "prospect"
 },
 {
  "key": "racwa",
  "name": "RACWA Holdings Pty Ltd",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "customer"
 },
 {
  "key": "radlink",
  "name": "RADLINK HOLDINGS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "raiz invest",
  "name": "Raiz Invest Ltd.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "ramboll",
  "name": "RAMBOLL AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "ramelius resources",
  "name": "RAMELIUS RESOURCES LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "rapl",
  "name": "RAPL GROUP HOLDING PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "raritan",
  "name": "RARITAN AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "ratch",
  "name": "RATCH - AUSTRALIA CORPORATION PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "rauland",
  "name": "RAULAND AUSTRALIA PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "ravensthorpe nickel operations",
  "name": "RAVENSTHORPE NICKEL OPERATIONS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Mining)",
  "status": "prospect"
 },
 {
  "key": "ray white real estate",
  "name": "RAY WHITE (REAL ESTATE) PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "rdo",
  "name": "RDO AUSTRALIA HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "rea",
  "name": "Rea Group Ltd.",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "reach foundation",
  "name": "THE REACH FOUNDATION",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "readytech",
  "name": "READYTECH HOLDINGS LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "realwise",
  "name": "REALWISE HOLDINGS PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "recochem",
  "name": "RECOCHEM INC.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "recoveries",
  "name": "Recoveries Corp. Group Ltd.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "redback technologies",
  "name": "REDBACK TECHNOLOGIES HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "redbubble",
  "name": "REDBUBBLE LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "reejig",
  "name": "REEJIG PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "regal lighting solutions",
  "name": "REGAL LIGHTING SOLUTIONS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing)",
  "status": "prospect"
 },
 {
  "key": "rei superannuation fund",
  "name": "REI SUPERANNUATION FUND PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "reinforced concrete pipes",
  "name": "REINFORCED CONCRETE PIPES AUSTRALIA (HOLDINGS) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing)",
  "status": "prospect"
 },
 {
  "key": "renandco",
  "name": "RENANDCO HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "rentokil",
  "name": "RENTOKIL PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "resi",
  "name": "RESI PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "resolution life",
  "name": "Resolution Life",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "response",
  "name": "RESPONSE GROUP AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "rest sea gas spv1",
  "name": "REST SEA GAS SPV1 PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Energy)",
  "status": "prospect"
 },
 {
  "key": "retravision w a",
  "name": "RETRAVISION (W.A.) LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "returned services league of",
  "name": "THE RETURNED & SERVICES LEAGUE OF AUSTRALIA LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "revlake",
  "name": "REVLAKE PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "revroof",
  "name": "REVROOF PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "rfd investments",
  "name": "RFD INVESTMENTS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "rhino rack",
  "name": "Rhino-Rack",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "rhomberg",
  "name": "RHOMBERG AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "rigby cooke lawyers",
  "name": "RIGBY COOKE LAWYERS",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "rindin enterprises",
  "name": "RINDIN ENTERPRISES PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "risk capital advisors",
  "name": "RISK CAPITAL ADVISORS AUSTRALIA PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "rix s creek",
  "name": "RIX'S CREEK PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Mining)",
  "status": "prospect"
 },
 {
  "key": "rme",
  "name": "RME HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "roam creative",
  "name": "ROAM CREATIVE LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "robern menz mfg",
  "name": "ROBERN MENZ (MFG) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "robert oatley vineyards",
  "name": "ROBERT OATLEY VINEYARDS PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (FMCG)",
  "status": "prospect"
 },
 {
  "key": "robertsons lifting rigging",
  "name": "ROBERTSONS LIFTING & RIGGING PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing)",
  "status": "prospect"
 },
 {
  "key": "rockend",
  "name": "ROCKEND PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "rolex",
  "name": "ROLEX AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "rolling stock victoria",
  "name": "ROLLING STOCK HOLDINGS (VICTORIA) PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "ron finemore transport",
  "name": "RON FINEMORE TRANSPORT PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "ross human directions",
  "name": "ROSS HUMAN DIRECTIONS LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "rotorua district council",
  "name": "ROTORUA DISTRICT COUNCIL HOLDINGS LIMITED",
  "patch": "public_sector",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Government Holding)",
  "status": "prospect"
 },
 {
  "key": "roy morgan research",
  "name": "ROY MORGAN RESEARCH LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "royal automobile club of tasmania",
  "name": "THE ROYAL AUTOMOBILE CLUB OF TASMANIA LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "customer"
 },
 {
  "key": "royal automobile club of victoria racv",
  "name": "ROYAL AUTOMOBILE CLUB OF VICTORIA (RACV) LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "customer"
 },
 {
  "key": "royal freemasons",
  "name": "ROYAL FREEMASONS LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "royal freemasons benevolent institution of nsw",
  "name": "ROYAL FREEMASONS BENEVOLENT INSTITUTION OF NSW",
  "patch": "hcls",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Healthcare/Aged Care)",
  "status": "prospect"
 },
 {
  "key": "rps consultants",
  "name": "RPS CONSULTANTS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "rsm acn 009 321 377 as trustee for atf birdanco practice trust abn 65 319 382 479 trading as rsm",
  "name": "RSM Australia Pty Ltd ACN 009 321 377 as trustee for (atf) Birdanco Practice Trust ABN 65 319 382 479 trading as RSM",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Trading)",
  "status": "customer"
 },
 {
  "key": "rubicon red consulting services",
  "name": "RUBICON RED CONSULTING SERVICES PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "rugby league commission",
  "name": "AUSTRALIAN RUGBY LEAGUE COMMISSION LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "run property mpm",
  "name": "RUN PROPERTY (MPM) PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "russell investment",
  "name": "RUSSELL INVESTMENT GROUP PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Hospitality/Leisure)",
  "status": "prospect"
 },
 {
  "key": "rw",
  "name": "RW NZ LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate/Ray White)",
  "status": "prospect"
 },
 {
  "key": "s dyer",
  "name": "S. DYER & CO. PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Accounting)",
  "status": "prospect"
 },
 {
  "key": "s m adams others",
  "name": "S.M ADAMS & Others",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "s process equipment",
  "name": "S-PROCESS EQUIPMENT AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Engineering)",
  "status": "prospect"
 },
 {
  "key": "sa rural health network",
  "name": "SA RURAL HEALTH NETWORK LIMITED",
  "patch": "hcls",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "HCLS",
  "status": "customer"
 },
 {
  "key": "saab technologies",
  "name": "SAAB TECHNOLOGIES AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "saferme",
  "name": "SAFERME LIMITED",
  "patch": "fsi",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "FSI",
  "status": "prospect"
 },
 {
  "key": "safetyworks",
  "name": "SAFETYWORKS GROUP PTY LTD",
  "patch": "hcls",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "HCLS",
  "status": "customer"
 },
 {
  "key": "safran helicopter engines",
  "name": "SAFRAN HELICOPTER ENGINES AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "saizeriya",
  "name": "SAIZERIYA AUSTRALIA PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "sale 2",
  "name": "SALE PROPRIETARY CO 2 LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "salter family",
  "name": "SALTER FAMILY HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "sandstone technology",
  "name": "SANDSTONE TECHNOLOGY PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "sanity com",
  "name": "SANITY.COM LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail)",
  "status": "prospect"
 },
 {
  "key": "sanity distribution",
  "name": "SANITY DISTRIBUTION PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail/Logistics)",
  "status": "prospect"
 },
 {
  "key": "sap",
  "name": "SAP AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "sapphireone",
  "name": "SAPPHIREONE PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "sara family",
  "name": "SARA FAMILY PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "sarina russo job access",
  "name": "SARINA RUSSO JOB ACCESS (AUSTRALIA) PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "savills",
  "name": "SAVILLS (AUST) HOLDINGS PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "savings loans credit union s a",
  "name": "SAVINGS AND LOANS CREDIT UNION (S.A.) LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "scanlan theodore",
  "name": "SCANLAN AND THEODORE PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "scenic tours",
  "name": "SCENIC TOURS PTY LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "customer"
 },
 {
  "key": "schenck process",
  "name": "SCHENCK PROCESS AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Engineering)",
  "status": "prospect"
 },
 {
  "key": "schiavello bros properties",
  "name": "SCHIAVELLO BROS. PROPERTIES PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "schnitz franchising",
  "name": "SCHNITZ FRANCHISING PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Hospitality)",
  "status": "prospect"
 },
 {
  "key": "schoolbox",
  "name": "SCHOOLBOX PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "scope",
  "name": "SCOPE (AUST) LTD",
  "patch": "hcls",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "HCLS",
  "status": "customer"
 },
 {
  "key": "scottish pacific business finance",
  "name": "Scottish Pacific Business Finance Pty. Ltd.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Finance)",
  "status": "prospect"
 },
 {
  "key": "scribo",
  "name": "SCRIBO HOLDINGS PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Stationery/Retail)",
  "status": "prospect"
 },
 {
  "key": "sea transport",
  "name": "SEA TRANSPORT CORPORATION LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "sealed air",
  "name": "Sealed Air Australia (Holdings) Pty. Ltd.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "sealy of n s w",
  "name": "SEALY OF AUSTRALIA (N.S.W.) PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing)",
  "status": "prospect"
 },
 {
  "key": "searoad",
  "name": "SEAROAD HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "seeing machines",
  "name": "SEEING MACHINES LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "senex energy",
  "name": "SENEX ENERGY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "sensormatic",
  "name": "SENSORMATIC NEW ZEALAND LIMITED",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Technology)",
  "status": "prospect"
 },
 {
  "key": "sentral",
  "name": "SENTRAL PTY LTD",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Technology/Media)",
  "status": "prospect"
 },
 {
  "key": "sentrian",
  "name": "SENTRIAN PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "serraview",
  "name": "SERRAVIEW PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "seruced no 22",
  "name": "SERUCED NO. 22 PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "service av",
  "name": "SERVICE AV PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "sfg",
  "name": "SFG AUSTRALIA LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "shadforth business advisory services",
  "name": "SHADFORTH BUSINESS ADVISORY SERVICES PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments (Financial Advice)",
  "status": "prospect"
 },
 {
  "key": "shaolin",
  "name": "SHAOLIN PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "sharesies",
  "name": "SHARESIES LIMITED",
  "patch": "fsi",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "FSI",
  "status": "prospect"
 },
 {
  "key": "sharing stories foundation",
  "name": "Sharing Stories Foundation",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "shelley management",
  "name": "SHELLEY MANAGEMENT HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "shenhua clean energy",
  "name": "SHENHUA CLEAN ENERGY HOLDINGS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "shi",
  "name": "SHI HOLDINGS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "shine justice",
  "name": "SHINE JUSTICE LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "shiying agricultural production",
  "name": "SHIYING AGRICULTURAL PRODUCTION PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "silicon crafts",
  "name": "SILICON CRAFTS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "silicon metal of",
  "name": "SILICON METAL COMPANY OF AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "silicon systems trademark",
  "name": "SILICON SYSTEMS TRADEMARK LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "simplyai",
  "name": "SIMPLYAI PTY LTD",
  "patch": "public_sector",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Public Sector",
  "status": "prospect"
 },
 {
  "key": "simulation software",
  "name": "SIMULATION SOFTWARE HOLDING COMPANY PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "sinefa",
  "name": "SINEFA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "sinorbis",
  "name": "SINORBIS AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "sis",
  "name": "SIS GROUP PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "skedulo",
  "name": "SKEDULO PTY LTD",
  "patch": "locations",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "prospect"
 },
 {
  "key": "skf",
  "name": "SKF AUSTRALIA PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "skills trades training",
  "name": "Skills Trades Training",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "skillsoft asia pacific",
  "name": "SKILLSOFT ASIA PACIFIC PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "skycredit",
  "name": "SKYCREDIT PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "skyfii",
  "name": "SKYFII LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "skymesh",
  "name": "SKYMESH PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "slate advisory",
  "name": "Slate Advisory",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "sleepy s",
  "name": "SLEEPY'S PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "smaply",
  "name": "Smaply Australia Pty Ltd",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "smartgroup",
  "name": "SMARTGROUP CORPORATION LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "smartpay",
  "name": "SMARTPAY HOLDINGS LIMITED",
  "patch": "fsi",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "FSI",
  "status": "customer"
 },
 {
  "key": "smartsmis",
  "name": "Smartsmis",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "smiggle",
  "name": "SMIGGLE PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail)",
  "status": "prospect"
 },
 {
  "key": "smith family",
  "name": "THE SMITH FAMILY",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "smsglobal investments",
  "name": "SMSGLOBAL INVESTMENTS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "snacking investments holdco",
  "name": "SNACKING INVESTMENTS HOLDCO PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "snapper services",
  "name": "SNAPPER SERVICES LIMITED",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Technology/Transport)",
  "status": "prospect"
 },
 {
  "key": "snf",
  "name": "SNF (AUSTRALIA) PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "snow brand",
  "name": "SNOW BRAND AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "social ventures",
  "name": "Social Ventures Australia Ltd.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "societe generale",
  "name": "SOCIETE GENERALE",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "societe internationale de telecommunication aeronautiques",
  "name": "SOCIETE INTERNATIONALE DE TELECOMMUNICATION AERONAUTIQUES",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "soft commodity trading",
  "name": "SOFT COMMODITY TRADING PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Commodity Trading)",
  "status": "prospect"
 },
 {
  "key": "softwareone",
  "name": "SOFTWAREONE AUSTRALIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "solander",
  "name": "SOLANDER HOLDINGS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "solar mist",
  "name": "SOLAR MIST PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "solutions international",
  "name": "SOLUTIONS INTERNATIONAL PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "sonder",
  "name": "Sonder Australia",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "south east leisure",
  "name": "South East Leisure",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "southern cross distribution systems",
  "name": "SOUTHERN CROSS DISTRIBUTION SYSTEMS PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "southern cross equities",
  "name": "SOUTHERN CROSS EQUITIES PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "sovereign house",
  "name": "SOVEREIGN HOUSE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "spel",
  "name": "SPEL LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Engineering)",
  "status": "prospect"
 },
 {
  "key": "spiire",
  "name": "SPIIRE AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "spire",
  "name": "Spire Australia",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "spirit technology solutions",
  "name": "SPIRIT TECHNOLOGY SOLUTIONS LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "split it",
  "name": "SPLIT IT PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "sports entertainment",
  "name": "SPORTS ENTERTAINMENT GROUP LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "spotify",
  "name": "SPOTIFY AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "sri",
  "name": "SRI CORPORATION PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Hospitality)",
  "status": "prospect"
 },
 {
  "key": "srxglobal",
  "name": "SRXGLOBAL PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "st agnes parish port macquarie",
  "name": "St Agnes Parish Port Macquarie",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "st george community housing",
  "name": "ST GEORGE COMMUNITY HOUSING LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "st luke s medical hospital benefits association",
  "name": "ST. LUKE'S MEDICAL AND HOSPITAL BENEFITS ASSOCIATION",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "stake",
  "name": "Stake",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "stakeshop",
  "name": "STAKESHOP PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "stan quinlivan sons",
  "name": "STAN QUINLIVAN & SONS PTY LTD",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "star wholesale distribution",
  "name": "STAR WHOLESALE DISTRIBUTION PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Wholesale)",
  "status": "prospect"
 },
 {
  "key": "stargroup",
  "name": "STARGROUP LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "state street",
  "name": "STATE STREET AUSTRALIA LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "state street bank trust",
  "name": "STATE STREET BANK AND TRUST COMPANY",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "state street global advisors",
  "name": "STATE STREET GLOBAL ADVISORS, AUSTRALIA, LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "statecover mutual",
  "name": "STATECOVER MUTUAL LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "customer"
 },
 {
  "key": "steadfast",
  "name": "STEADFAST GROUP LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "steel blue",
  "name": "Steel Blue",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "stella underwriting",
  "name": "STELLA UNDERWRITING PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "stokes mischewski",
  "name": "Stokes Mischewski Pty. Ltd.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "stollznow research",
  "name": "STOLLZNOW RESEARCH PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "storman software",
  "name": "Storman Software Pty. Ltd.",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Software)",
  "status": "prospect"
 },
 {
  "key": "strandbags",
  "name": "STRANDBAGS HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "strategic payments services",
  "name": "STRATEGIC PAYMENTS SERVICES PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "stripe",
  "name": "Stripe",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "stuff",
  "name": "Stuff Ltd",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "customer"
 },
 {
  "key": "summerland financial services",
  "name": "SUMMERLAND FINANCIAL SERVICES LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "sundrive solar",
  "name": "SUNDRIVE SOLAR PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "sunset power international",
  "name": "SUNSET POWER INTERNATIONAL PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "sunshades eyewear",
  "name": "SUNSHADES EYEWEAR PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "sunup",
  "name": "SUNUP GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "inferred"
 },
 {
  "key": "superior pak",
  "name": "SUPERIOR PAK PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "surf hardware international",
  "name": "SURF HARDWARE INTERNATIONAL PTY. LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail/Wholesale)",
  "status": "prospect"
 },
 {
  "key": "susquehanna pacific",
  "name": "SUSQUEHANNA PACIFIC PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "swan hill bus lines",
  "name": "SWAN HILL BUS LINES PROPRIETARY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "swicker s kingaroy bacon factory",
  "name": "SWICKER'S KINGAROY BACON FACTORY PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "swift design solutions",
  "name": "SWIFT DESIGN SOLUTIONS LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "swipejobs",
  "name": "SWIPEJOBS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "switch tv",
  "name": "SWITCH TV PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "sydleigh",
  "name": "SYDLEIGH PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "sydney airport",
  "name": "SYDNEY AIRPORT LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "t j services",
  "name": "T.J. SERVICES PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Services)",
  "status": "prospect"
 },
 {
  "key": "tactic property",
  "name": "Tactic Property",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "tactix professional services",
  "name": "TACTIX PROFESSIONAL SERVICES PTY LTD",
  "patch": "hcls",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "HCLS",
  "status": "customer"
 },
 {
  "key": "tahl finance",
  "name": "TAHL FINANCE PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "tak2",
  "name": "TAK2 PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "talent international",
  "name": "TALENT INTERNATIONAL HOLDINGS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "talyst consulting",
  "name": "Talyst Consulting Pty Ltd",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "tambla",
  "name": "TAMBLA LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "tang chen investments",
  "name": "TANG CHEN INVESTMENTS PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "tangerine telecom",
  "name": "TANGERINE TELECOM PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "tasfoods",
  "name": "TASFOODS LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "tasman solutions",
  "name": "TASMAN SOLUTIONS LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "tate lyle anz",
  "name": "TATE & LYLE ANZ PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "tattarang",
  "name": "TATTARANG PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "taximedia",
  "name": "TAXIMEDIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Media/Transport)",
  "status": "prospect"
 },
 {
  "key": "taxis",
  "name": "TAXIS AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Transport)",
  "status": "prospect"
 },
 {
  "key": "taylor thomson whitting",
  "name": "TAYLOR THOMSON WHITTING HOLDING PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "tcl electronics",
  "name": "TCL ELECTRONICS AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "te whakakitenga o waikato",
  "name": "TE WHAKAKITENGA O WAIKATO INCORPORATED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "teachers federation health",
  "name": "TEACHERS FEDERATION HEALTH LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "customer"
 },
 {
  "key": "techforce personnel",
  "name": "Techforce Personnel",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "technogym",
  "name": "TECHNOGYM AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "teekay fso finance",
  "name": "TEEKAY FSO FINANCE PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Shipping Finance)",
  "status": "prospect"
 },
 {
  "key": "telco services",
  "name": "TELCO SERVICES GROUP LIMITED",
  "patch": "tmt",
  "aes": [
   "James Locke",
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "teleste",
  "name": "TELESTE CORPORATION",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "temenos solutions",
  "name": "TEMENOS SOLUTIONS AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "templafy",
  "name": "TEMPLAFY AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "tenants union of victoria",
  "name": "TENANTS UNION OF VICTORIA LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "tenby grange",
  "name": "TENBY GRANGE PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "TMT"
 },
 {
  "key": "teradata",
  "name": "TERADATA AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "terreus december nominees",
  "name": "TERREUS DECEMBER NOMINEES PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "terry shields investments",
  "name": "TERRY SHIELDS INVESTMENTS PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "tesserent",
  "name": "TESSERENT LIMITED",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "think grow",
  "name": "Think & Grow",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "thomco no 2053",
  "name": "THOMCO (NO 2053) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "thorn",
  "name": "THORN GROUP LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "thoroughvision",
  "name": "THOROUGHVISION PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "thoughtworks",
  "name": "THOUGHTWORKS AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "thryv",
  "name": "THRYV AUSTRALIA HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "tianqi lithium kwinana",
  "name": "TIANQI LITHIUM KWINANA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "tibco bpm",
  "name": "TIBCO BPM AUSTRALIA PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "tictoc online",
  "name": "TICTOC ONLINE PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "tiktok",
  "name": "TIKTOK AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "tma of companies",
  "name": "TMA GROUP OF COMPANIES LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "toi foundation",
  "name": "TOI FOUNDATION",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Philanthropy)",
  "status": "prospect"
 },
 {
  "key": "tokio marine nichido fire insurance",
  "name": "TOKIO MARINE & NICHIDO FIRE INSURANCE CO., LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "tokyo gas pluto",
  "name": "TOKYO GAS PLUTO PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "tomy",
  "name": "TOMY AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "tonic media network",
  "name": "Tonic Media Network",
  "patch": "locations",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "customer"
 },
 {
  "key": "toop real estate",
  "name": "TOOP REAL ESTATE GROUP PTY. LTD.",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services)",
  "status": "prospect"
 },
 {
  "key": "topquality",
  "name": "TOPQUALITY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "torch",
  "name": "Torch Australia",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "tortuga ventures",
  "name": "Tortuga Ventures",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "toshiba international",
  "name": "TOSHIBA INTERNATIONAL CORPORATION PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "tot",
  "name": "TOT Group",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "totara learning solutions",
  "name": "TOTARA LEARNING SOLUTIONS LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "tourist park management",
  "name": "AUSTRALIAN TOURIST PARK MANAGEMENT PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "tower",
  "name": "TOWER LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "tower books",
  "name": "TOWER BOOKS PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail)",
  "status": "prospect"
 },
 {
  "key": "towers watson",
  "name": "TOWERS WATSON AUSTRALIA PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "towers watson superannuation",
  "name": "TOWERS WATSON SUPERANNUATION PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "toyo tyre rubber",
  "name": "TOYO TYRE & RUBBER AUSTRALIA LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "toyoda gosei",
  "name": "TOYODA GOSEI AUSTRALIA PTY LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "tp icap management services",
  "name": "TP ICAP MANAGEMENT SERVICES (AUSTRALIA) PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "tr",
  "name": "TR AUSTRALIA HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "tracksuit",
  "name": "TRACKSUIT PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "traffic logistics",
  "name": "TRAFFIC LOGISTICS PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "traffic technologies",
  "name": "TRAFFIC TECHNOLOGIES LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "training management",
  "name": "AUSTRALIAN TRAINING MANAGEMENT PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Education)",
  "status": "prospect"
 },
 {
  "key": "trainthecrowd",
  "name": "TrainTheCrowd",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "transalta energy",
  "name": "TRANSALTA ENERGY (AUSTRALIA) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "transamerica direct marketing asia pacific",
  "name": "TRANSAMERICA DIRECT MARKETING ASIA PACIFIC PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Marketing/Insurance)",
  "status": "prospect"
 },
 {
  "key": "transgrid electricity transmission ministerial",
  "name": "(TRANSGRID) ELECTRICITY TRANSMISSION MINISTERIAL HOLDING CORPORATION",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "transport general",
  "name": "TRANSPORT AND GENERAL PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding/Insurance)",
  "status": "prospect"
 },
 {
  "key": "transportation auckland",
  "name": "TRANSPORTATION AUCKLAND CORPORATION LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Transport)",
  "status": "prospect"
 },
 {
  "key": "travelbay",
  "name": "Travelbay Pty. Ltd.",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Tourism)",
  "status": "prospect"
 },
 {
  "key": "tremco asia pacific",
  "name": "TREMCO ASIA PACIFIC PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "tresmine",
  "name": "TRESMINE PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "trident insurance",
  "name": "TRIDENT INSURANCE GROUP PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "trility",
  "name": "TRILITY GROUP PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "tripadvisor",
  "name": "Tripadvisor Australia Pty. Ltd.",
  "patch": "locations",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "prospect"
 },
 {
  "key": "tripwire",
  "name": "TRIPWIRE INC.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "tritium",
  "name": "TRITIUM HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "troocoo",
  "name": "TROOCOO HOLDINGS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "truck centre wa",
  "name": "TRUCK CENTRE (WA) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "true alliance",
  "name": "True Alliance",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "trustee for bdo wa directors employees trust",
  "name": "The Trustee for BDO (WA) DIRECTORS & EMPLOYEES' TRUST",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Accounting/Trust)",
  "status": "prospect"
 },
 {
  "key": "trustee for belgravia leisure unit trust",
  "name": "The Trustee for BELGRAVIA LEISURE UNIT TRUST",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Leisure)",
  "status": "customer"
 },
 {
  "key": "trustee for dexus diversified trust",
  "name": "The Trustee for Dexus Diversified Trust",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Admin/Insurance)",
  "status": "prospect"
 },
 {
  "key": "trustee for recruitment solutions trust",
  "name": "The Trustee for Recruitment Solutions Group Australia Trust",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "tuatahi first fibre",
  "name": "TUATAHI FIRST FIBRE LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "tucker holdco",
  "name": "TUCKER HOLDCO PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "tullett prebon",
  "name": "TULLETT PREBON (AUSTRALIA) PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "tussock networks",
  "name": "TUSSOCK NETWORKS LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "tutt bryant",
  "name": "TUTT BRYANT GROUP LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "two degrees",
  "name": "TWO DEGREES GROUP LIMITED",
  "patch": "fsi",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "FSI",
  "status": "prospect"
 },
 {
  "key": "tyche nominees",
  "name": "TYCHE NOMINEES PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "tyco projects",
  "name": "TYCO PROJECTS (AUSTRALIA) PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Construction)",
  "status": "prospect"
 },
 {
  "key": "tyremax",
  "name": "Tyremax Pty Ltd",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "uca wayside chapel",
  "name": "Uca - Wayside Chapel",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "uci",
  "name": "UCI AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "ugam solutions",
  "name": "UGAM Solutions Australia PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "uhg trading",
  "name": "UHG TRADING PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "underwriting agencies of",
  "name": "UNDERWRITING AGENCIES OF AUSTRALIA PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "unilodge",
  "name": "UNILODGE HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "unimed",
  "name": "UniMed",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "unimoni",
  "name": "UNIMONI PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "unison housing",
  "name": "UNISON HOUSING LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Non-profit/Housing)",
  "status": "prospect"
 },
 {
  "key": "unison property",
  "name": "Unison Property Corporation Pty Ltd",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "united energy distribution",
  "name": "UNITED ENERGY DISTRIBUTION PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "united equipment",
  "name": "UNITED EQUIPMENT GROUP PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Machinery)",
  "status": "prospect"
 },
 {
  "key": "uniti",
  "name": "UNITI GROUP LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "uniting victoria tasmania",
  "name": "UNITING (VICTORIA AND TASMANIA) LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "unity bank",
  "name": "UNITY BANK LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "unity credit union",
  "name": "Unity Credit Union",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Accounting)",
  "status": "customer"
 },
 {
  "key": "universal panel paint",
  "name": "UNIVERSAL PANEL AND PAINT PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "universal pictures",
  "name": "UNIVERSAL PICTURES (AUSTRALASIA) PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "upplft",
  "name": "Upplft",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "usabilityhub",
  "name": "UsabilityHub",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "utting research",
  "name": "Utting Research Pty. Ltd.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "v2 food",
  "name": "V2 FOOD PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "vadacom",
  "name": "VADACOM LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "val morgan",
  "name": "Val Morgan",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "valiant finance",
  "name": "VALIANT FINANCE PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "vanguard investments",
  "name": "Vanguard Investments Australia Ltd.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "vanreid industries",
  "name": "VANREID INDUSTRIES PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Manufacturing)",
  "status": "prospect"
 },
 {
  "key": "vawdrey nsw",
  "name": "VAWDREY AUSTRALIA (NSW) PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "venezuela solidarity network",
  "name": "Australia-Venezuela Solidarity Network",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "ventraip",
  "name": "VENTRAIP AUSTRALIA PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "venue",
  "name": "AUSTRALIAN VENUE CO. HOLDINGS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "verian",
  "name": "Verian Group",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "vermont aus holdco",
  "name": "VERMONT AUS HOLDCO PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "verrency",
  "name": "Verrency",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "versent",
  "name": "VERSENT PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "vertex cad pdm systems",
  "name": "Vertex CAD/PDM Systems",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "vertical telecoms",
  "name": "VERTICAL TELECOMS PTY LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "vertice",
  "name": "VERTICE HOLDINGS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "vestas wind technology",
  "name": "VESTAS - AUSTRALIAN WIND TECHNOLOGY PTY. LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "viburnum funds",
  "name": "VIBURNUM FUNDS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "vicinity",
  "name": "VICINITY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "vicinity centres",
  "name": "Vicinity Centres Limited",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "victorian employers chamber of commerce industry",
  "name": "VICTORIAN EMPLOYERS CHAMBER OF COMMERCE AND INDUSTRY",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "viking global",
  "name": "VIKING GLOBAL NEW ZEALAND LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail)",
  "status": "prospect"
 },
 {
  "key": "vinta",
  "name": "Vinta Group",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate)",
  "status": "prospect"
 },
 {
  "key": "vista visuals",
  "name": "VISTA VISUALS AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "vitaco health",
  "name": "VITACO HEALTH AUSTRALIA PTY LIMITED",
  "patch": "hcls",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (FMCG/Health)",
  "status": "customer"
 },
 {
  "key": "vitasoy products",
  "name": "VITASOY AUSTRALIA PRODUCTS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "vix mobility",
  "name": "VIX MOBILITY PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "vje equities",
  "name": "VJE EQUITIES PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "voestalpine vae railway systems",
  "name": "VOESTALPINE VAE RAILWAY SYSTEMS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "voice project",
  "name": "VOICE PROJECT PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "volunteering queensland",
  "name": "VOLUNTEERING QUEENSLAND INC",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "vonex wholesale",
  "name": "VONEX WHOLESALE PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "vow financial",
  "name": "VOW FINANCIAL HOLDINGS PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "vroom",
  "name": "VROOM GROUP HOLDINGS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "vudoo",
  "name": "VUDOO HOLDINGS PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "w barry",
  "name": "W. BARRY HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "w s plastics",
  "name": "W & S PLASTICS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "wa to nin",
  "name": "WA TO NIN PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "wagner",
  "name": "WAGNER GROUP HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Construction)",
  "status": "prospect"
 },
 {
  "key": "walker",
  "name": "WALKER CORPORATION PTY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "walter eliza hall institute of medical research",
  "name": "THE WALTER AND ELIZA HALL INSTITUTE OF MEDICAL RESEARCH",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "warburn estate",
  "name": "WARBURN ESTATE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "wartsila",
  "name": "WARTSILA AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "warwick credit union",
  "name": "WARWICK CREDIT UNION LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Banking",
  "status": "prospect"
 },
 {
  "key": "water carbon",
  "name": "THE WATER & CARBON GROUP PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "waterlogic",
  "name": "WATERLOGIC AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "wbp",
  "name": "WBP GROUP PTY LTD",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Real Estate Services/Valuations)",
  "status": "prospect"
 },
 {
  "key": "wealth insights",
  "name": "Wealth Insights",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "web com aus holdco",
  "name": "WEB.COM AUS HOLDCO PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "webmere",
  "name": "WEBMERE PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Holding)",
  "status": "prospect"
 },
 {
  "key": "websilk",
  "name": "WEBSILK PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "wellington international airport",
  "name": "WELLINGTON INTERNATIONAL AIRPORT LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Transport)",
  "status": "prospect"
 },
 {
  "key": "wellington securities",
  "name": "WELLINGTON SECURITIES PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "wengfu",
  "name": "WENGFU AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "werkin",
  "name": "Werkin",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "wesbeam",
  "name": "WESBEAM HOLDINGS LIMITED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "white lite",
  "name": "WHITE LITE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Lighting/Wholesale)",
  "status": "prospect"
 },
 {
  "key": "whitehelm capital",
  "name": "WHITEHELM CAPITAL PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "whk central west",
  "name": "WHK CENTRAL WEST PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Accounting/Findex Group)",
  "status": "prospect"
 },
 {
  "key": "whosgood com au",
  "name": "WHOSGOOD.COM.AU PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "wiise software",
  "name": "WIISE SOFTWARE PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "wild bamboo",
  "name": "WILD BAMBOO LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "wild wolf",
  "name": "WILD & WOLF PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "william adams",
  "name": "WILLIAM ADAMS PTY. LTD.",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Machinery)",
  "status": "prospect"
 },
 {
  "key": "willis services",
  "name": "WILLIS AUSTRALIA GROUP SERVICES PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "willis towers watson",
  "name": "WILLIS TOWERS WATSON AUSTRALIA HOLDINGS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "wilmar trading",
  "name": "WILMAR TRADING (AUSTRALIA) PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Commodities)",
  "status": "prospect"
 },
 {
  "key": "wilson florox 1",
  "name": "WILSON FLOROX 1 PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "wilson parking 1992",
  "name": "WILSON PARKING AUSTRALIA 1992 PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "wilsons corporate finance",
  "name": "WILSONS CORPORATE FINANCE LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "windlab",
  "name": "WINDLAB PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Energy)",
  "status": "prospect"
 },
 {
  "key": "wingate",
  "name": "WINGATE GROUP HOLDINGS PTY. LTD.",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "winning appliances",
  "name": "WINNING APPLIANCES PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "winro",
  "name": "WINRO PTY LTD",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations"
 },
 {
  "key": "winson",
  "name": "Winson Group Pty Ltd",
  "patch": "fsi",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "FSI"
 },
 {
  "key": "with collective",
  "name": "WITH Collective",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "women of colour",
  "name": "Women of Colour Australia",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "customer"
 },
 {
  "key": "workfocus",
  "name": "WORKFOCUS AUSTRALIA PTY LTD",
  "patch": "hcls",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Healthcare/Employment)",
  "status": "prospect"
 },
 {
  "key": "workpac smart",
  "name": "(Workpac) SMART HOLDINGS CORPORATION PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "worksense workwear safety",
  "name": "WORKSENSE WORKWEAR AND SAFETY PTY LIMITED",
  "patch": "locations",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Retail)",
  "status": "prospect"
 },
 {
  "key": "workskil",
  "name": "WORKSKIL AUSTRALIA INCORPORATED",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "wormald",
  "name": "WORMALD AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "wr carpenter agriculture",
  "name": "WR CARPENTER AGRICULTURE PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "writesource medical",
  "name": "WriteSource Medical Pty Ltd",
  "patch": "hcls",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "HCLS"
 },
 {
  "key": "ws services",
  "name": "WS SERVICES LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "wsp",
  "name": "WSP AUSTRALIA HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "wt emea acquisition",
  "name": "WT EMEA ACQUISITION LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "x venture capital",
  "name": "X VENTURE CAPITAL PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "xref",
  "name": "XREF LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "xrf scientific",
  "name": "XRF SCIENTIFIC LIMITED",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "xyst",
  "name": "XYST AUSTRALIA PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "yahoo",
  "name": "Yahoo Australia Pty Ltd",
  "patch": "locations",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "customer"
 },
 {
  "key": "yandoo",
  "name": "YANDOO HOLDINGS PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "prospect"
 },
 {
  "key": "yarra funds management",
  "name": "YARRA FUNDS MANAGEMENT LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "ybr services",
  "name": "YBR SERVICES PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "year 13",
  "name": "Year 13",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "yellow brick road",
  "name": "YELLOW BRICK ROAD HOLDINGS LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "yellow brick road accounting wealth management",
  "name": "YELLOW BRICK ROAD ACCOUNTING & WEALTH MANAGEMENT PTY. LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Investments",
  "status": "prospect"
 },
 {
  "key": "yellow cabs victoria",
  "name": "YELLOW CABS VICTORIA PTY LIMITED",
  "patch": "goods_services",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Other (Transport)",
  "status": "prospect"
 },
 {
  "key": "yougov research",
  "name": "YOUGOV RESEARCH PTY LTD",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "young mens christian association of hobart",
  "name": "YOUNG MENS CHRISTIAN ASSOCIATION OF HOBART INC",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "customer"
 },
 {
  "key": "youth insearch foundation",
  "name": "Youth Insearch Foundation (Aust) Inc",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "yulan international",
  "name": "YULAN INTERNATIONAL PTY. LTD.",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "yusen logistics",
  "name": "YUSEN LOGISTICS (AUSTRALIA) PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "zap",
  "name": "ZAP HOLDINGS LIMITED",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 },
 {
  "key": "zedd cabins",
  "name": "ZEDD Cabins",
  "patch": "goods_services",
  "aes": [
   "James Locke"
  ],
  "confidence": "inferred"
 },
 {
  "key": "zhiran",
  "name": "AUSTRALIA ZHIRAN CO. PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services"
 },
 {
  "key": "zib",
  "name": "ZIB GROUP HOLDINGS COMPANY LIMITED",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Insurance",
  "status": "prospect"
 },
 {
  "key": "zimmermann wear",
  "name": "Zimmermann Wear Pty Ltd",
  "patch": "locations",
  "aes": [
   "Jared Dries"
  ],
  "confidence": "mapped",
  "subVertical": "Locations",
  "status": "customer"
 },
 {
  "key": "zip business",
  "name": "ZIP BUSINESS AUSTRALIA PTY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "mapped",
  "subVertical": "Fintech",
  "status": "prospect"
 },
 {
  "key": "zipmoney",
  "name": "ZIPMONEY LTD",
  "patch": "fsi",
  "aes": [
   "Tristan"
  ],
  "confidence": "inferred",
  "status": "customer"
 },
 {
  "key": "zircodata information",
  "name": "ZIRCODATA INFORMATION HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "zirilio",
  "name": "ZIRILIO HOLDINGS PTY LTD",
  "patch": "goods_services",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "Goods & Services",
  "status": "prospect"
 },
 {
  "key": "zookal",
  "name": "ZOOKAL PTY LTD",
  "patch": "tmt",
  "aes": [
   "Terence Fong"
  ],
  "confidence": "mapped",
  "subVertical": "TMT",
  "status": "prospect"
 }
]
