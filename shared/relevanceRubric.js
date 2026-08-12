// Single source of truth for outreach-relevance scoring (Issue 3), shared
// between ingest-time normalization (api/_lib/normalize.js) and the
// backfill pass over historical rows (api/_lib/scoreRelevance.js), so a
// signal scored today and one scored six months from now are held to the
// same bar. Deliberately one axis, not two: "importance to the XM
// industry" (across CX, EX, and market research) and "recency" both feed
// into a single outreach-relevance judgment rather than separate
// competing scores, because the actual ask is "would an SDR act on
// this" — a fragmented score doesn't serve that any better and is
// harder to reason about.
export const RELEVANCE_RUBRIC = `Score how strongly this signal justifies an SDR reaching out — by call, email, or LinkedIn — referencing this specific event. This is not a general "how interesting is this" score; it is specifically about outreach timing and pretext, and applies equally across CX, EX, and market-research signals — don't let a CX-shaped trigger outscore an equally strong EX or market-research one just because it's a more familiar shape.

5 — Immediate, specific outreach trigger. A named account has a fresh, concrete reason to talk right now: a new CX/CCO/CRO or CHRO/CPO leadership hire, a disclosed customer or employee pain point, a claims/compliance failure, a public complaint spike, an engagement-survey result or attrition spike made public, a competitor's customer or candidate showing dissatisfaction. You could open an email with "Saw that..." and it would land.
4 — Strong but slightly less direct trigger: regulatory or compliance pressure hitting a whole account segment (customer-facing or workplace/HR), a notable competitor product move affecting accounts you're tracking, a funding/restructure event at a named account, a brand-tracking or research-vendor contract change.
3 — Useful as supporting context in a conversation already underway, but not itself a cold-outreach pretext: a macro economic indicator, a vendor earnings report, a competitor's routine product update, an industry benchmark report release.
2 — Background competitive or market intelligence. Informs strategy and talk tracks but has no natural tie to any specific account or immediate ask.
1 — Minimal relevance: broad macro/market noise with only a loose thematic connection to the ANZ CX/EX/market-research selling motion.

Respond with only the integer 1-5, no explanation.`
