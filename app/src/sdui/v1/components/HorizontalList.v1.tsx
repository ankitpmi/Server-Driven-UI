import { Text, FlatList, Pressable } from "react-native"

import { SectionWrapper } from "../../shared"
import { CategoryGridConfigV1, DesignTokens, LayoutConfig } from "@/src/types"
import { resolveLayoutBox } from "@/src/utils"
import { useCallback, useEffect, useState } from "react"
import { fetchHorizontalList } from "@/src/services"

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"

interface HorizontalListV1Props {
  layout?: LayoutConfig
  tokens?: DesignTokens
  config?: CategoryGridConfigV1
}

export function HorizontalListV1({
  config,
  layout,
  tokens,
}: HorizontalListV1Props) {
  const imageOpacity = useSharedValue(0)

  const commonStyle = resolveLayoutBox(layout?.item, tokens)

  const [horizontalListData, setHorizontalListData] =
    useState<CategoryGridConfigV1 | null>(null)

  const [loading, setLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(true)

  const getHorizontalListData = useCallback(async () => {
    if (!config?.api) return

    setLoading(true)
    try {
      const bannerRes = await fetchHorizontalList(config?.api || "")

      if (!bannerRes || !bannerRes.payload) {
        throw new Error("Invalid banner response")
      }
      // ⏳ delay UI update
      // await new Promise((resolve) => setTimeout(resolve, 1000))

      setHorizontalListData(bannerRes.payload)
    } catch (error) {
      console.error("Failed to fetch banner data:", error)
    } finally {
      setLoading(false)
    }
  }, [config?.api])

  useEffect(() => {
    getHorizontalListData()
  }, [getHorizontalListData])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
    }
  })

  const showSkeleton = loading || imageLoading || !horizontalListData

  const lastIndex = (config?.items?.length ?? 0) - 1

  return (
    <SectionWrapper layout={layout} tokens={tokens}>
      {config && config?.title && (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 10,
          }}>
          {config.title}
        </Text>
      )}

      <FlatList
        data={horizontalListData?.items || []}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{}}
        renderItem={({ item, index }) => (
          <Pressable
            style={[
              commonStyle,
              {
                // backgroundColor: resolveColor(layout?.item?.background, tokens),
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 0,
                paddingHorizontal: 0,
                marginRight: lastIndex === index ? 0 : 16,
              },
            ]}>
            <Animated.Image
              source={{ uri: item.image }}
              resizeMode="cover"
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
              style={[{ width: "100%", height: "100%" }, animatedStyle]}
            />
            {/* <Text style={{ textAlign: "center" }}>{item.label}</Text> */}
          </Pressable>
        )}
      />
    </SectionWrapper>
  )
}
