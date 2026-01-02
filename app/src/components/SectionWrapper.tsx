import { View, ViewStyle } from "react-native"
import { resolveToken } from "@/src/utils/designToken.util"
import { LinearGradient } from "expo-linear-gradient"

export function SectionWrapper({ layout, tokens, children }: any) {
  const c = layout?.container ?? {}
  const gradient = c.gradient

  const commonStyle: ViewStyle[] = [
    {
      padding: resolveToken(c.padding, tokens),
      margin: resolveToken(c.margin, tokens),
      borderRadius: resolveToken(c.radius, tokens),
      borderWidth: c.border?.width,
      borderColor: resolveToken(c.border?.color, tokens),
      marginTop: resolveToken(c.marginTop, tokens),
      marginBottom: resolveToken(c.marginBottom, tokens),
      marginStart: resolveToken(c.marginStart, tokens),
      marginEnd: resolveToken(c.marginEnd, tokens),
      height: c?.height,
      overflow: "hidden", // 🔑 important for radius with gradient
    },
  ]

  // ✅ Gradient container
  if (gradient?.colors?.length) {
    return (
      <LinearGradient
        colors={gradient.colors.map((c: string) => resolveToken(c, tokens))}
        start={gradient.start ?? [0, 0]}
        end={gradient.end ?? [1, 1]}
        style={commonStyle}>
        {children}
      </LinearGradient>
    )
  }

  return (
    <View
      style={[
        ...commonStyle,
        { backgroundColor: resolveToken(c.background, tokens) },
      ]}>
      {children}
    </View>
  )
}
