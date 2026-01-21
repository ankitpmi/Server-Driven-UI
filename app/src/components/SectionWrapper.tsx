import { StyleProp, View, ViewStyle, ImageBackground } from "react-native"
import { resolveToken } from "@/src/utils/designToken.util"
import { LinearGradient } from "expo-linear-gradient"
import { DesignTokens, LayoutConfig } from "../types"
import { parseSize } from "../utils"

interface SectionWrapperProps {
  layout?: LayoutConfig
  tokens?: DesignTokens
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
  // const backgroundType = c.background?.backgroundType

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
      height: parseSize(c?.height),
      overflow: "hidden", // 🔑 important for radius with gradient
    },
  ]

  // ✅ Gradient container
  if (background?.backgroundType === "gradient" && background?.colors) {
    return (
      <LinearGradient
        colors={
          background.colors.map((c: string) => resolveToken(c, tokens)) as [
            string,
            string,
            ...string[],
          ]
        }
        start={background?.start ?? [0, 0]}
        end={background?.end ?? [1, 1]}
        style={[commonStyle, containerStyle]}>
        {children}
      </LinearGradient>
    )
  }

  // ✅ Image background container
  if (background?.backgroundType === "image" && background.value) {
    return (
      <ImageBackground
        source={{ uri: background.value }}
        resizeMode="cover"
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
          background?.backgroundType === "solidColor" && {
            backgroundColor: resolveToken(background.value, tokens),
          },
        containerStyle,
      ]}>
      {children}
    </View>
  )
}
