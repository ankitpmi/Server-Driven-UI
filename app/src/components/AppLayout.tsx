import React from "react"
import {
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  ColorValue,
} from "react-native"

import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

import { SectionWrapper } from "./SectionWrapper"
import { DesignTokens, LayoutConfig } from "../types"

interface AppLayoutProps extends React.PropsWithChildren {
  useSafeArea?: boolean

  layout?: LayoutConfig
  tokens?: DesignTokens

  statusBarBgColor?: ColorValue
  barStyle?: "light-content" | "dark-content"

  addBottomPadding?: boolean
  containerStyle?: StyleProp<ViewStyle>

  onLayout?: (height?: number) => void
}

const ANDROID_BOTTOM_PADDING = 80

export const AppLayout = React.memo(
  ({
    children,
    useSafeArea = false,

    layout,
    tokens,

    statusBarBgColor = "transparent",
    barStyle = "dark-content",

    addBottomPadding = false,
    containerStyle,

    onLayout,
  }: AppLayoutProps) => {
    const { top, bottom } = useSafeAreaInsets()

    /**
     * -------------------------
     * SafeArea wrapper
     * -------------------------
     */
    if (useSafeArea) {
      return (
        <>
          {/* iOS status bar background */}
          {Platform.OS === "ios" && (
            <View
              style={{
                height: top,
                backgroundColor: statusBarBgColor,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
              }}
            />
          )}

          <SafeAreaView
            style={styles.safeArea}
            edges={{ top: "additive", bottom: "off" }}
            onLayout={({ nativeEvent }) => {
              const height = nativeEvent.layout.height
              height > 0 && onLayout?.(height)
            }}>
            <StatusBar backgroundColor={statusBarBgColor} barStyle={barStyle} />

            <View
              style={[
                styles.content,
                { paddingTop: top },
                { paddingBottom: bottom || 24 },
                addBottomPadding &&
                  Platform.OS === "android" && {
                    paddingBottom: ANDROID_BOTTOM_PADDING,
                  },
                containerStyle,
              ]}>
              {children}
            </View>
          </SafeAreaView>
        </>
      )
    }

    /**
     * -------------------------
     * SectionWrapper (non-safe-area)
     * -------------------------
     */
    return (
      <>
        {Platform.OS === "ios" && (
          <View
            style={{
              height: top,
              backgroundColor: statusBarBgColor,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
            }}
          />
        )}
        <StatusBar backgroundColor={statusBarBgColor} barStyle={barStyle} />

        <SectionWrapper
          layout={layout}
          tokens={tokens}
          containerStyle={[
            { paddingTop: top },
            { paddingBottom: bottom || 24 },
            ,
            containerStyle,
          ]}>
          {children}
        </SectionWrapper>
      </>
    )
  },
)

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
})
