import { StyleProp, View, ViewStyle, ImageBackground } from "react-native"

import { LinearGradient } from "expo-linear-gradient"
import { DesignTokens, LayoutConfig } from "../types"
import { resolveColor, resolveLayoutBox } from "../utils"

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

  const commonStyle = resolveLayoutBox(c, tokens)

  // ✅ Gradient container
  if (background?.backgroundType === "gradient" && background?.colors) {
    return (
      <LinearGradient
        colors={
          background.colors.map((c: string) => resolveColor(c, tokens)) as [
            string,
            string,
            ...string[],
          ]
        }
        start={background?.start ?? [0, 0]}
        end={background?.end ?? [1, 1]}
        locations={background?.locations ?? undefined}
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
        commonStyle,
        // background &&
        //   background?.backgroundType === "solidColor" && {
        //     backgroundColor: resolveColor(background.value, tokens),
        //   },
        containerStyle,
      ]}>
      {children}
    </View>
  )
}
