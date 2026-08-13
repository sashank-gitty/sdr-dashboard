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
//
// This describes how to score, and deliberately says nothing about
// response format — each caller wraps it differently (normalize.js
// embeds it as one field's description inside a larger JSON object;
// scoreRelevance.js asks for the score on its own). It used to end with
// "Respond with only the integer 1-5", which contradicted both callers
// and, being last in the prompt, sometimes won: scoreRelevance would
// get a bare `4`, fail to read `.outreachRelevance` off a number, and
// discard a perfectly good score. Keep format instructions at the call
// site.
export const RELEVANCE_RUBRIC = `Score how strongly this signal justifies an SDR reaching out — by call, email, or LinkedIn — referencing this specific event. This is not a general "how interesting is this" score; it is specifically about outreach timing and pretext, and applies equally across CX, EX, and market-research signals — don't let a CX-shaped trigger outscore an equally strong EX or market-research one just because it's a more familiar shape.

5 — Immediate, specific outreach trigger. A named company has a fresh, concrete reason to talk right now: a new CX/CCO/CRO or CHRO/CPO leadership hire, a disclosed customer or employee pain point, a claims/compliance failure, a public complaint spike, an engagement-survey result or attrition spike made public, a competitor's customer or candidate showing dissatisfaction. You could open an email with "Saw that..." and it would land.

  Market entry into Australia or New Zealand belongs in this tier too — a company winning a local licence (AFSL, APRA, RBNZ), registering a local entity, opening a local office, or appointing its first ANZ country manager. Score these a 5 whether or not the company appears on anyone's account list, and do not mark one down for being unfamiliar or foreign. A business standing up an ANZ operation is hiring a local team, launching to local customers, and has no incumbent vendor here yet — that is the strongest cold-outreach pretext there is, and the fact that nobody is tracking the company is what makes it valuable rather than what makes it marginal.
4 — Strong but slightly less direct trigger: regulatory or compliance pressure hitting a whole account segment (customer-facing or workplace/HR), a notable competitor product move affecting accounts you're tracking, a funding/restructure event at a named company, a brand-tracking or research-vendor contract change.
3 — Useful as supporting context in a conversation already underway, but not itself a cold-outreach pretext: a macro economic indicator, a vendor earnings report, a competitor's routine product update, an industry benchmark report release.
2 — Background competitive or market intelligence. Informs strategy and talk tracks but has no natural tie to any specific account or immediate ask.
1 — Minimal relevance: broad macro/market noise with only a loose thematic connection to the ANZ CX/EX/market-research selling motion.`
