import { StyleProp, View, ViewStyle, ImageBackground } from "react-native"
import { resolveToken } from "@/src/utils/designToken.util"
import { LinearGradient } from "expo-linear-gradient"

interface SectionWrapperProps {
  layout: any
  tokens: any
  children: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
}

export const SectionWrapper = ({
  layout,
  tokens,
  children,
  containerStyle,
}: SectionWrapperProps) => {
  const c = layout?.container ?? {}
  const background = c.background
  const backgroundType = c.background?.backgroundType

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
  if (backgroundType === "gradient") {
    return (
      <LinearGradient
        colors={background.colors.map((c: string) => resolveToken(c, tokens))}
        start={background.start ?? [0, 0]}
        end={background.end ?? [1, 1]}
        style={[commonStyle, containerStyle]}>
        {children}
      </LinearGradient>
    )
  }

  // ✅ Image background container
  if (backgroundType === "image" && background.value) {
    return (
      <ImageBackground
        source={{ uri: background.value }}
        style={[commonStyle, containerStyle]}>
        {children}
      </ImageBackground>
    )
  }

  return (
    <View
      style={[
        ...commonStyle,
        background &&
          background.value && {
            backgroundColor: resolveToken(background.value, tokens),
          },
        containerStyle,
      ]}>
      {children}
    </View>
  )
}
