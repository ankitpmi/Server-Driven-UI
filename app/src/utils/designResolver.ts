import { ColorValue, DimensionValue } from "react-native"
import { DesignTokens } from "../types"

type SizeValue = number | string | undefined | null

export function resolveToken(value: any, tokens?: DesignTokens) {
  if (!tokens) return undefined

  if (typeof value === "number") return value
  if (typeof value === "string") {
    return (
      tokens.spacing?.[value] ??
      tokens.radius?.[value] ??
      tokens.colors?.[value]
    )
  }
}

export function resolveSpacing(
  value: unknown,
  tokens?: DesignTokens,
): DimensionValue | undefined {
  if (!tokens) return undefined

  if (typeof value === "number") return value
  if (typeof value === "string") {
    return (
      tokens.spacing?.[value] ??
      tokens.radius?.[value] ??
      tokens.colors?.[value]
    )
  }
}

export function resolveSize(
  value: unknown,
  tokens?: DesignTokens,
): number | string | undefined {
  if (!tokens) return undefined

  if (typeof value === "number") return value

  if (typeof value === "string") {
    return tokens.radius?.[value]
  }

  return undefined
}

export function resolveColor(
  value: unknown,
  tokens?: DesignTokens,
): ColorValue | undefined {
  if (!tokens || typeof value !== "string") return undefined

  return tokens.colors?.[value] as ColorValue | undefined
}

/**
 * Converts backend size values into valid React Native DimensionValue
 */
export function resolveDimension(
  value: SizeValue,
  tokens?: DesignTokens,
): DimensionValue | undefined {
  if (value === null || value === undefined) return undefined

  if (typeof value === "number") return value

  if (typeof value !== "string") return undefined

  const trimmed = value.trim()

  // token
  const tokenValue = tokens?.spacing?.[trimmed]
  if (typeof tokenValue === "number") {
    return tokenValue
  }

  // numeric string
  if (!isNaN(Number(trimmed))) {
    return Number(trimmed)
  }

  // percentage
  if (/^\d+(\.\d+)?%$/.test(trimmed)) {
    return trimmed as `${number}%`
  }

  // auto
  if (trimmed === "auto") {
    return "auto"
  }

  return undefined
}
