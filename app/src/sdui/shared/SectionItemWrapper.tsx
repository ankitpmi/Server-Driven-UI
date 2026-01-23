import { StyleProp, View, ViewStyle, ImageBackground } from "react-native"

import { LinearGradient } from "expo-linear-gradient"

import { resolveColor, resolveLayoutBox } from "@/src/utils"
import { DesignTokens, LayoutConfig } from "@/src/types"

interface SectionItemWrapperProps {
  layout?: LayoutConfig
  tokens?: DesignTokens
  children: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
}

export const SectionItemWrapper = ({
  layout,
  tokens,
  children,
  containerStyle,
}: SectionItemWrapperProps) => {
  const c = layout?.item ?? {}
  const background = c.background
  // const backgroundType = c.background?.backgroundType

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
