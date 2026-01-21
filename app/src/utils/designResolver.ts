import { ColorValue, DimensionValue, TextStyle } from "react-native"
import { DesignTokens } from "../types"

type SizeValue = number | string | undefined | null

export interface TextStyleConfig {
  fontFamily?: string
  fontSize?: number | string
  fontWeight?: number | string
  lineHeight?: number
  letterSpacing?: number
  color?: string
  align?: "left" | "center" | "right" | "justify"
  decoration?: "none" | "underline" | "line-through"
  transform?: "none" | "uppercase" | "lowercase" | "capitalize"
  numberOfLines?: number
  ellipsizeMode?: "head" | "middle" | "tail" | "clip"
}

export function resolveToken(value: any, tokens?: DesignTokens) {
  if (!tokens) return undefined

  if (typeof value === "number") return value
  if (typeof value === "string") {
    return (
      tokens.spacing?.[value] ??
      tokens.borderRadius?.[value] ??
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
      tokens.borderRadius?.[value] ??
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
    return tokens.borderRadius?.[value]
  }

  return undefined
}

// export function resolveColor(
//   value: unknown,
//   tokens?: DesignTokens,
// ): ColorValue | undefined {
//   if (!tokens || typeof value !== "string") return undefined
//   console.log("value: ", value)

//   return tokens.colors?.[value] as ColorValue | undefined
// }

function getNestedToken(
  obj: Record<string, any>,
  path: string,
): string | undefined {
  return path.split(".").reduce<any>((acc, key) => acc?.[key], obj)
}

export function resolveColor(
  value?: unknown,
  tokens?: DesignTokens,
): ColorValue | undefined {
  if (!value) return undefined

  // direct RN color
  if (typeof value !== "string") {
    return value as ColorValue
  }

  // no tokens → assume raw color
  if (!tokens?.colors) {
    return value as ColorValue
  }

  // token lookup (supports primary.500)
  const resolved = getNestedToken(tokens.colors, value)

  if (__DEV__ && !resolved) {
    console.warn(`🎨 Color token not found: "${value}"`)
  }

  return (resolved ?? value) as ColorValue
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

export function resolveTextStyle(
  config?: TextStyleConfig,
  tokens?: DesignTokens,
): TextStyle {
  if (!config) return {}

  const style: TextStyle = {}

  // -------------------------
  // Font family
  // -------------------------
  if (config.fontFamily) {
    style.fontFamily =
      tokens?.fontFamily?.[config.fontFamily] ?? config.fontFamily
  }

  // -------------------------
  // Font size
  // -------------------------
  if (config.fontSize !== undefined) {
    style.fontSize =
      typeof config.fontSize === "number"
        ? config.fontSize
        : tokens?.fontSize?.[config.fontSize]
  }

  // -------------------------
  // Font weight
  // -------------------------
  if (config.fontWeight !== undefined) {
    const resolvedWeight =
      typeof config.fontWeight === "number"
        ? config.fontWeight
        : typeof config.fontWeight === "string"
          ? (tokens?.fontWeight?.[config.fontWeight] ?? config.fontWeight)
          : undefined

    if (resolvedWeight !== undefined) {
      style.fontWeight = resolvedWeight as TextStyle["fontWeight"]
    }
  }

  // -------------------------
  // Line height
  // -------------------------
  if (config.lineHeight !== undefined) {
    style.lineHeight =
      typeof config.lineHeight === "number"
        ? config.lineHeight
        : tokens?.lineHeight?.[config.lineHeight]
  }

  // -------------------------
  // Letter spacing
  // -------------------------
  if (config.letterSpacing !== undefined) {
    style.letterSpacing =
      typeof config.letterSpacing === "number"
        ? config.letterSpacing
        : tokens?.letterSpacing?.[config.letterSpacing]
  }

  // -------------------------
  // Color
  // -------------------------
  if (config.color) {
    style.color = tokens?.colors?.[config.color] ?? config.color
  }

  // -------------------------
  // Alignment
  // -------------------------
  if (config.align) {
    style.textAlign = config.align
  }

  // -------------------------
  // Decoration
  // -------------------------
  if (config.decoration) {
    style.textDecorationLine =
      config.decoration === "none" ? undefined : config.decoration
  }

  // -------------------------
  // Transform
  // -------------------------
  if (config.transform) {
    style.textTransform = config.transform
  }

  return style
}
