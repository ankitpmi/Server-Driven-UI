import { View, Dimensions, Pressable } from "react-native"

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

import { useRouter } from "expo-router"

const { width } = Dimensions.get("window")

const PAGE_WIDTH = width

interface BannerV2Props {
  layout?: LayoutConfig
  tokens?: DesignTokens
  config: BannerConfigV1
  apiVersion?: BannerVersion
}

export const BannerV2 = React.memo(
  ({ config, layout, tokens, apiVersion }: BannerV2Props) => {
    const router = useRouter()

    const imageOpacity = useSharedValue(0)

    const [bannerData, setBannerData] = useState<UIBannerData>({
      banners: [],
    })

    const [loading, setLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)

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

    const onPressBannerItem = useCallback(
      (item: Record<string, any>) => {
        const action = config?.action

        // ❌ no action
        if (!action?.route) return

        const route = action.route

        const routeParams = action.routeParams

        // ✅ no params → simple navigation
        if (!routeParams || Object.keys(routeParams).length === 0) {
          router.navigate({
            pathname: `/${route}` as any,
          })
          return
        }

        const params: Record<string, string> = {}

        for (const [paramName, itemKey] of Object.entries(routeParams)) {
          const value = item?.[itemKey]

          // ❌ missing param value → skip navigation
          if (value) {
            params[paramName] = String(value)
          }
        }

        router.navigate({
          pathname: `/${route}` as any,
          params,
        })
      },
      [router, config?.action],
    )

    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: imageOpacity.value,
      }
    })

    const isLoading = loading || imageLoading

    return (
      <SectionWrapper
        layout={layout}
        tokens={tokens}
        containerStyle={{ marginBottom: 10 }}>
        <>
          <SectionItemWrapper layout={layout} tokens={tokens}>
            {isLoading && <BannerSkeleton />}
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
                <Pressable
                  onPress={onPressBannerItem}
                  style={{
                    flex: 1,
                    marginHorizontal: 16,
                  }}>
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
                </Pressable>
              )}
              autoPlay={!isLoading}
              autoPlayInterval={2000}
              scrollAnimationDuration={1000}
            />
          </SectionItemWrapper>

          {!isLoading && (
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
          )}
        </>
      </SectionWrapper>
    )
  },
)

const BannerSkeleton = () => {
  return (
    <View
      style={{
        height: "100%",
        width: width - 32,
        alignSelf: "center",
      }}>
      <Skeleton
        isLoading={true}
        layout={[
          {
            key: "banner",

            height: "100%",
            width: "100%",
            borderRadius: 10,
          },
        ]}
      />
    </View>
  )
}
