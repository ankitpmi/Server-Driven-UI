import { Text, View } from "react-native"

import { SectionItemWrapper, SectionWrapper } from "../../shared"
import React, { useCallback, useEffect, useState } from "react"
import { fetchBanner } from "@/src/services"
import {
  BannerConfigV1,
  BannerVersion,
  DesignTokens,
  LayoutConfig,
  mapBannerToUI,
  UIBannerData,
} from "@/src/types"
import Skeleton from "react-native-reanimated-skeleton"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"

interface BannerV1Props {
  layout?: LayoutConfig
  tokens?: DesignTokens
  config: BannerConfigV1
  apiVersion?: BannerVersion
}

export const BannerV1 = React.memo(
  ({ config, layout, tokens, apiVersion }: BannerV1Props) => {
    const imageOpacity = useSharedValue(0)

    const [bannerData, setBannerData] = useState<UIBannerData | null>(null)

    const [loading, setLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)

    const getBannerData = useCallback(async () => {
      if (!config.api) return

      setLoading(true)
      try {
        const bannerRes = await fetchBanner(apiVersion || "v1")

        if (!bannerRes || !bannerRes.payload) {
          throw new Error("Invalid banner response")
        }
        // ⏳ delay UI update
        // await new Promise((resolve) => setTimeout(resolve, 1000))
        const bannerUI = mapBannerToUI(bannerRes)
        setBannerData(bannerUI)
      } catch (error) {
        console.error("Failed to fetch banner data:", error)
      } finally {
        setLoading(false)
      }
    }, [apiVersion, config.api])

    useEffect(() => {
      getBannerData()
    }, [getBannerData])

    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: imageOpacity.value,
      }
    })

    const showSkeleton = loading || imageLoading || !bannerData

    return (
      <SectionWrapper layout={layout} tokens={tokens}>
        <SectionItemWrapper layout={layout} tokens={tokens}>
          {showSkeleton && <BannerSkeleton />}

          {bannerData && (
            <Animated.Image
              source={{ uri: bannerData.banners.at(0)?.image }}
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
              style={[
                {
                  width: "100%",
                  height: "100%",
                  // borderRadius: 10,
                  position: "absolute",
                },
                animatedStyle,
              ]}
            />
          )}

          {config.title && <Text style={{ marginTop: 8 }}>{config.title}</Text>}
          {/* {loading && !bannerData ? (
            <BannerSkeleton />
          ) : (
            <>
              <Image
                source={{ uri: bannerData?.image }}
                style={{ height: "100%", borderRadius: 10 }}
                 onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              />
              {config.title && <Text>{config.title}</Text>}
            </>
          )} */}
        </SectionItemWrapper>
      </SectionWrapper>
    )
  },
)

const BannerSkeleton = () => {
  // console.log("calling !!!!")

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}>
      <Skeleton
        isLoading={true}
        layout={[
          {
            key: "banner",
            // width: width - 32,
            height: "100%",
            width: "100%",
            borderRadius: 10,
            // marginBottom: 16,
            // marginTop: 10,
          },
        ]}
      />
    </View>
  )
}
