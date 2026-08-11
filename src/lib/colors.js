// Muted, desaturated categorical palette for signal-type tags and card
// left-border accents. Deterministic by string hash so new signal types
// picked up from data.json always resolve to a stable colour without a
// manual mapping to maintain.
const SIGNAL_PALETTE = [
  "#7c9cbf", // slate blue
  "#6f9d7c", // muted green
  "#c9a56b", // soft amber
  "#b98fc9", // muted lavender
  "#6bb0a6", // muted teal
  "#c98f7f", // muted terracotta
  "#8f9fd6", // muted indigo
  "#a8b06b", // muted olive
  "#c98fae", // muted rose
  "#7fb0c9", // muted cyan
  "#b3935f", // muted tan
  "#9d8fc9", // muted violet
  "#cf6f6f", // muted red
  "#7ac0a0", // muted mint
]

function hashString(value) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function colorForSignalType(signalType) {
  const index = hashString(signalType) % SIGNAL_PALETTE.length
  return SIGNAL_PALETTE[index]
}

export const SCOPE_COLORS = {
  macro: "#7c9cbf",
  micro: "#6f9d7c",
}

export function colorForScope(scope) {
  return SCOPE_COLORS[scope] ?? "#8a8f98"
}
