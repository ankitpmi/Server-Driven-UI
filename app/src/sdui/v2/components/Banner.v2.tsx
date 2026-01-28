import { Text, View, Dimensions } from "react-native"

import { SectionItemWrapper, SectionWrapper } from "../../shared"
import React, { useCallback, useEffect, useState } from "react"
import { fetchBanner } from "@/src/services"
import {
  BannerConfigV1,
  BannerPayload,
  DesignTokens,
  LayoutConfig,
} from "@/src/types"
import Skeleton from "react-native-reanimated-skeleton"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Extrapolation,
  interpolate,
} from "react-native-reanimated"

import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel"

const defaultDataWith6Colors = [
  "#B0604D",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
]

const StaticBannerData = [
  {
    id: "1",
    image:
      "https://png.pngtree.com/thumb_back/fh260/background/20220211/pngtree-combo-offer-wide-banner-image_986067.jpg",
  },
  {
    id: "4",
    image:
      "https://img.freepik.com/free-vector/realism-hand-drawn-horizontal-banner_23-2150203461.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: "2",
    image:
      "https://www.shutterstock.com/image-vector/super-sale-promotional-banner-promo-600nw-2570295095.jpg",
  },
  {
    id: "5",
    image:
      "https://i.pinimg.com/originals/f0/f9/e4/f0f9e45724771f16745ad3f6f640d3ce.jpg",
  },
  {
    id: "3",
    image:
      "https://static.vecteezy.com/system/resources/previews/011/644/609/non_2x/big-diwali-festival-sale-discount-banner-design-with-diya-illustration-vector.jpg",
  },

  {
    id: "6",
    image:
      "https://img.freepik.com/free-vector/fashion-trends-sale-banner-template_23-2150769839.jpg?semt=ais_hybrid&w=740&q=80",
  },
]

const { width } = Dimensions.get("window")

const PAGE_WIDTH = width - 32

interface BannerV2Props {
  layout?: LayoutConfig
  tokens?: DesignTokens
  config: BannerConfigV1
  apiVersion?: string
}

export const BannerV2 = React.memo(() => {
  const imageOpacity = useSharedValue(0)

  const [bannerData, setBannerData] = useState<BannerPayload | null>(null)

  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)

  // const getBannerData = useCallback(async () => {
  //   if (!config.api) return

  //   setLoading(true)
  //   try {
  //     const bannerRes = await fetchBanner()

  //     if (!bannerRes || !bannerRes.payload) {
  //       throw new Error("Invalid banner response")
  //     }
  //     // ⏳ delay UI update
  //     // await new Promise((resolve) => setTimeout(resolve, 1000))

  //     setBannerData(bannerRes.payload)
  //   } catch (error) {
  //     console.error("Failed to fetch banner data:", error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }, [config.api])

  // useEffect(() => {
  //   getBannerData()
  // }, [getBannerData])

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

  const showSkeleton = loading || imageLoading || !bannerData

  return (
    // <SectionWrapper layout={layout} tokens={tokens}>
    //   <SectionItemWrapper layout={layout} tokens={tokens}>
    //     {showSkeleton && <BannerSkeleton />}
    <View style={{}}>
      {/* {bannerData && ( */}
      {/* // <Animated.Image
        //   source={{ uri: bannerData.image }}
        //   resizeMode="cover"
        //   onLoadStart={() => {
        //     imageOpacity.value = 0
        //     setImageLoading(true)
        //   }}
        //   onLoadEnd={() => {
        //     imageOpacity.value = withTiming(1, {
        //       duration: 250,
        //     })
        //     setImageLoading(false)
        //   }}
        //   onError={() => setImageLoading(false)}
        //   style={[
        //     {
        //       width: "100%",
        //       height: "100%",
        //       borderRadius: 10,
        //       position: "absolute",
        //     },
        //     animatedStyle,
        //   ]}
        // /> */}
      <>
        <View style={{ marginBottom: 10, alignItems: "center" }}>
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
            data={StaticBannerData}
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
                {/* <Text style={{ textAlign: "center", fontSize: 30 }}>
                  {index}
                </Text> */}
              </View>
            )}
            autoPlay
            autoPlayInterval={2000}
            scrollAnimationDuration={1000}
          />
        </View>
        <Pagination.Basic
          progress={progress}
          data={defaultDataWith6Colors}
          // dotStyle={{ backgroundColor: "#262626" }}
          // activeDotStyle={{ backgroundColor: "#f1f1f1" }}
          // containerStyle={{ gap: 5, marginBottom: 10 }}
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
    </View>
    // {config.title && <Text style={{ marginTop: 8 }}>{config.title}</Text>}

    //   </SectionItemWrapper>
    // </SectionWrapper>
  )
})

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
