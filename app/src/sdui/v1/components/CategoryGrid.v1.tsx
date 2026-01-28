import { View, Text, FlatList, Image, Pressable } from "react-native"

import { SectionWrapper } from "../../shared"
import { resolveLayoutBox } from "@/src/utils"
import { CategoryGridConfigV1, DesignTokens, LayoutConfig } from "@/src/types"
import { useCallback, useEffect, useState } from "react"
import { fetchCategoryGrid } from "@/src/services"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"

interface CategoryGridV1Props {
  layout?: LayoutConfig
  tokens?: DesignTokens
  config?: CategoryGridConfigV1
}

const GAP = 12

export function CategoryGridV1({
  config,
  layout,
  tokens,
}: CategoryGridV1Props) {
  const commonStyle = resolveLayoutBox(layout?.item, tokens)

  const imageOpacity = useSharedValue(0)

  const [categoryGridData, setCategoryGridData] =
    useState<CategoryGridConfigV1 | null>(null)

  const [loading, setLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(true)

  const getCategoryGridData = useCallback(async () => {
    if (!config?.api) return

    setLoading(true)
    try {
      const bannerRes = await fetchCategoryGrid(config?.api || "")

      if (!bannerRes || !bannerRes.payload) {
        throw new Error("Invalid banner response")
      }
      // ⏳ delay UI update
      // await new Promise((resolve) => setTimeout(resolve, 1000))

      setCategoryGridData(bannerRes.payload)
    } catch (error) {
      console.error("Failed to fetch banner data:", error)
    } finally {
      setLoading(false)
    }
  }, [config?.api])

  useEffect(() => {
    getCategoryGridData()
  }, [getCategoryGridData])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
    }
  })

  const showSkeleton = loading || imageLoading || !categoryGridData

  return (
    <SectionWrapper layout={layout} tokens={tokens}>
      {categoryGridData && categoryGridData.title && (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 10,
          }}>
          {categoryGridData?.title}
        </Text>
      )}

      <FlatList
        data={categoryGridData?.items || []}
        numColumns={config?.columns ?? 3}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <Pressable
            style={[
              commonStyle,
              {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}>
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}>
              <Animated.Image
                resizeMode="cover"
                source={{ uri: item?.image || "" }}
                onLoadStart={() => {
                  imageOpacity.value = 0
                  setImageLoading(true)
                }}
                onLoadEnd={() => {
                  imageOpacity.value = withTiming(1, {
                    duration: 250,
                  })
                  setImageLoading(false)
                }}
                onError={() => setImageLoading(false)}
                style={[
                  { height: "100%", width: "100%", borderRadius: 8 },
                  animatedStyle,
                ]}
              />
            </View>
            {/* <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "700" }}>
              {item.label || item.name}
            </Text> */}
          </Pressable>
        )}
      />
    </SectionWrapper>
  )
}
