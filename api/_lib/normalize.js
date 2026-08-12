import Anthropic from "@anthropic-ai/sdk"
import { SIGNAL_TYPES, SCOPES } from "../../shared/signalTypes.js"
import { PRACTICE_AREAS } from "../../shared/practiceAreas.js"
import { RELEVANCE_RUBRIC } from "../../shared/relevanceRubric.js"

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You extract structured competitive/market intelligence signals for an SDR (Sales Development Rep) selling Qualtrics experience-management software into ANZ (Australia/New Zealand) accounts, across all three of Qualtrics' practice areas: Customer Experience, Employee Experience, and Strategy & Research (market research). This spans every industry, not just financial services — telco, retail, government, agribusiness, healthcare, education, and more all buy into one or more of these areas.

Given a raw news headline + snippet, output ONLY a single JSON object (no prose, no markdown fences) with these fields:
- "entity": the single company, organization, or market this is about. Use the real proper name (e.g. "Commonwealth Bank of Australia", not "CBA" or "the bank").
- "scope": "${SCOPES[0]}" for broad market/economic/regulatory context, "${SCOPES[1]}" for something specific to one named company or organization.
- "signalType": prefer one of exactly these labels when it genuinely fits: ${SIGNAL_TYPES.map((t) => `"${t}"`).join(", ")}. Only invent a new short label if none of these fit at all.
- "practiceArea": exactly one of ${PRACTICE_AREAS.map((p) => `"${p}"`).join(", ")} — whichever this signal is most relevant to selling into. "cx" = customer feedback, journey analytics, contact center, digital CX. "ex" = employee engagement, pulse/lifecycle listening, workplace culture, HR technology, workplace regulation (e.g. Fair Work, pay equity reporting). "market_research" = synthetic data/panels, speed-to-insight, brand tracking, UX/UI or concept testing, video feedback, consumer/market research vendors. If a signal plausibly touches more than one, pick the single strongest fit rather than guessing — don't default to "cx" just because it's the most common category.
- "summary": 2-3 sentences, written for an SDR deciding whether this is worth an outreach touch — state what happened, then why it matters for someone selling into this account or market in that practice area. Match a professional analyst tone. Do not fabricate details not present in the source text.
- "outreachRelevance": integer 1-5. ${RELEVANCE_RUBRIC}

If the input is too thin, off-topic (not related to the ANZ economy, or to CX/EX/market-research vendors, buyers, or regulation anywhere in it), or you cannot confidently identify a single entity, respond with exactly: {"skip": true}`

export async function normalizeItem({ title, snippet, matchedQuery }) {
  const userContent = `Headline: ${title}\nSnippet: ${snippet || "(none)"}\nMatched watchlist query: ${matchedQuery}`

  const response = await anthropic.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userContent }],
  })

  const text = response.content.find((block) => block.type === "text")?.text ?? ""

  let parsed
  try {
    parsed = JSON.parse(text.trim())
  } catch {
    console.warn("normalizeItem: model did not return valid JSON, skipping:", text.slice(0, 200))
    return null
  }

  if (parsed.skip) return null

  const relevance = Number(parsed.outreachRelevance)
  if (
    !parsed.entity ||
    !SCOPES.includes(parsed.scope) ||
    !parsed.signalType ||
    !PRACTICE_AREAS.includes(parsed.practiceArea) ||
    !parsed.summary ||
    !Number.isInteger(relevance) ||
    relevance < 1 ||
    relevance > 5
  ) {
    console.warn("normalizeItem: incomplete fields, skipping:", parsed)
    return null
  }

  return { ...parsed, outreachRelevance: relevance }
}
