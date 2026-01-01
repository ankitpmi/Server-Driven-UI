export function resolveToken(value: any, tokens: any) {
  if (typeof value === "number") return value
  if (typeof value === "string") {
    return (
      tokens.spacing?.[value] ??
      tokens.radius?.[value] ??
      tokens.colors?.[value]
    )
  }
}
