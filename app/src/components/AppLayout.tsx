import React from "react"
import {
  ColorValue,
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native"

import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

interface AppLayoutProps extends React.PropsWithChildren {
  useSafeArea?: boolean

  customColor?: string
  statusBarBgColor?: ColorValue

  onLayout?: (height?: number) => void

  addBottomPadding?: boolean // To handle bottom padding for android where tab bar is not visible
}

const mainContainerStyle: StyleProp<ViewStyle> = {
  paddingBottom: 80,
}

export const AppLayout = React.memo(
  ({
    children,
    useSafeArea = true,
    customColor,
    onLayout,
    addBottomPadding = false,
    statusBarBgColor = "#FFFFFF",
  }: AppLayoutProps) => {
    const { bottom, top } = useSafeAreaInsets()

    const Container = useSafeArea ? SafeAreaView : View

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
        <Container
          style={[
            styles.safeAreaView,
            customColor && { backgroundColor: customColor },
          ]}
          mode="padding"
          onLayout={({ nativeEvent }) => {
            const { height } = nativeEvent.layout
            if (height > 0) {
              if (onLayout) {
                setTimeout(() => {
                  onLayout?.(height)
                }, 500)
              }
            }
          }}
          edges={{ bottom: "off", top: "additive" }}>
          <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
          <View
            style={[
              styles.mainContainer,
              { paddingBottom: bottom ?? 24 },
              addBottomPadding &&
                Platform.OS === "android" &&
                mainContainerStyle,
            ]}>
            {children}
          </View>
        </Container>
      </>
    )
  },
)

export const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    // paddingBottom: bottom ?? Spacing.spacing24VH,
  },
})
