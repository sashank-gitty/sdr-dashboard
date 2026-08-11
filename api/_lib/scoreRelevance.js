import Anthropic from "@anthropic-ai/sdk"
import { RELEVANCE_RUBRIC } from "../../shared/relevanceRubric.js"

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You score outreach relevance for an SDR selling Qualtrics experience-management software into ANZ accounts. You'll be given an already-curated signal (entity, category, and summary are correct and fixed — do not second-guess them). Respond with ONLY a JSON object: {"outreachRelevance": <integer 1-5>}.

${RELEVANCE_RUBRIC}`

// Scores an already-normalized signal against the shared rubric — used by
// the one-time backfill over historical rows that predate ingest-time
// scoring. Deliberately narrower than normalize.js: entity/scope/signalType
// are already correct here and shouldn't be re-derived, just scored.
export async function scoreRelevance({ headline, summary, entity, scope, signalType }) {
  const userContent = `Entity: ${entity}\nScope: ${scope}\nSignal type: ${signalType}\nHeadline: ${headline}\nSummary: ${summary}`

  const response = await anthropic.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 50,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userContent }],
  })

  const text = response.content.find((block) => block.type === "text")?.text ?? ""

  let parsed
  try {
    parsed = JSON.parse(text.trim())
  } catch {
    console.warn("scoreRelevance: model did not return valid JSON:", text.slice(0, 200))
    return null
  }

  const relevance = Number(parsed.outreachRelevance)
  if (!Number.isInteger(relevance) || relevance < 1 || relevance > 5) {
    console.warn("scoreRelevance: invalid score:", parsed)
    return null
  }

  return relevance
}
