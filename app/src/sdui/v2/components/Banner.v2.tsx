import { View, Dimensions } from "react-native"

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

import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel"

const { width } = Dimensions.get("window")

const PAGE_WIDTH = width - 32

interface BannerV2Props {
  layout?: LayoutConfig
  tokens?: DesignTokens
  config: BannerConfigV1
  apiVersion?: BannerVersion
}

export const BannerV2 = React.memo(
  ({ config, layout, tokens, apiVersion }: BannerV2Props) => {
    const imageOpacity = useSharedValue(0)

    const [bannerData, setBannerData] = useState<UIBannerData>({
      banners: [],
    })

    const [loading, setLoading] = useState(false)

    const getBannerData = useCallback(async () => {
      if (!config.api) return

      setLoading(true)
      try {
        const bannerRes = await fetchBanner(apiVersion || "v2")

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

    const progress = useSharedValue<number>(0)
    const baseOptions = {
      vertical: false,
    } as const

    const ref = React.useRef<ICarouselInstance>(null)

    const onPressPagination = (index: number) => {
      ref.current?.scrollTo({
        /**
         * Calculate the difference between the current index and the target index
         * to ensure that the carousel scrolls to the nearest index
         */
        count: index - progress.value,
        animated: true,
      })
    }

    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: imageOpacity.value,
      }
    })

    return (
      <SectionWrapper
        layout={layout}
        tokens={tokens}
        containerStyle={{ marginBottom: 10 }}>
        <>
          <SectionItemWrapper layout={layout} tokens={tokens}>
            <Carousel
              ref={ref}
              {...baseOptions}
              loop
              width={PAGE_WIDTH}
              onProgressChange={(offsetProgress, absoluteProgress) => {
                progress.value = absoluteProgress
              }}
              containerStyle={{ width: PAGE_WIDTH }}
              style={{ height: 180 }}
              data={bannerData?.banners}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flex: 1,
                  }}>
                  <Animated.Image
                    source={{ uri: item.image }}
                    resizeMode="cover"
                    onLoadStart={() => {
                      imageOpacity.value = 0
                    }}
                    onLoadEnd={() => {
                      imageOpacity.value = withTiming(1, {
                        duration: 250,
                      })
                    }}
                    style={[
                      {
                        width: "100%",
                        height: "100%",
                        borderRadius: 10,
                        position: "absolute",
                      },
                      animatedStyle,
                    ]}
                  />
                </View>
              )}
              autoPlay
              autoPlayInterval={2000}
              scrollAnimationDuration={1000}
            />
          </SectionItemWrapper>
          <Pagination.Basic
            progress={progress}
            data={bannerData?.banners}
            onPress={onPressPagination}
            horizontal
            dotStyle={{
              width: 25,
              height: 4,
              backgroundColor: "#ccc",
            }}
            activeDotStyle={{
              overflow: "hidden",
              backgroundColor: "#4d4d4d",
            }}
            containerStyle={{
              gap: 10,
              marginBottom: 10,
            }}
          />
        </>
        {/* // )} */}
        {/* </View> */}
        {/* {config.title && <Text style={{ marginTop: 8 }}>{config.title}</Text>} */}
      </SectionWrapper>
    )
  },
)
