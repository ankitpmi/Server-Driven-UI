import { View } from "react-native"
import { resolveToken } from "@/src/utils/designToken.util"

export function SectionWrapper({ layout, tokens, children }: any) {
  const c = layout?.container ?? {}

  return (
    <View
      style={{
        padding: resolveToken(c.padding, tokens),
        margin: resolveToken(c.margin, tokens),
        backgroundColor: resolveToken(c.background, tokens),
        borderRadius: resolveToken(c.radius, tokens),
        borderWidth: c.border?.width,
        borderColor: resolveToken(c.border?.color, tokens),
      }}>
      {children}
    </View>
  )
}
