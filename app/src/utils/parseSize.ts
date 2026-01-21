import { DimensionValue } from "react-native"

type SizeValue = number | string | undefined | null

/**
 * Converts backend size values into valid React Native DimensionValue
 */
export function parseSize(value: SizeValue): DimensionValue | undefined {
  if (value === null || value === undefined) return undefined

  // number → valid
  if (typeof value === "number") return value

  const trimmed = value.trim()

  // numeric string → number
  if (!isNaN(Number(trimmed))) {
    return Number(trimmed)
  }

  // percentage → valid
  if (/^\d+%$/.test(trimmed)) {
    return trimmed as `${number}%`
  }

  // auto → valid
  if (trimmed === "auto") {
    return "auto"
  }

  // fallback
  return undefined
}
