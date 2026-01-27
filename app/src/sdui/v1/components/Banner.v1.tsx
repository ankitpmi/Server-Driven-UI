import { Dimensions, Image, Text, View } from "react-native"

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

const { width } = Dimensions.get("window")

interface BannerV1Props {
  layout?: LayoutConfig
  tokens?: DesignTokens
  config: BannerConfigV1
}

export const BannerV1 = React.memo(
  ({ config, layout, tokens }: BannerV1Props) => {
    // console.log("layout: ", layout)
    const [bannerData, setBannerData] = useState<BannerPayload | null>(null)
    const [loading, setLoading] = useState(true)

    const getBannerData = useCallback(async () => {
      if (!config.api) return

      // setLoading(true)
      try {
        const bannerRes = await fetchBanner()

        if (!bannerRes || !bannerRes.payload) {
          throw new Error("Invalid banner response")
        }

        setBannerData(bannerRes.payload)
      } catch (error) {
        console.error("Failed to fetch banner data:", error)
      } finally {
        setLoading(false)
      }
    }, [config.api])

    useEffect(() => {
      getBannerData()
    }, [getBannerData])

    return (
      <SectionWrapper layout={layout} tokens={tokens}>
        {loading ? (
          <BannerSkeleton />
        ) : (
          <SectionItemWrapper layout={layout} tokens={tokens}>
            <Image
              source={{ uri: bannerData?.image }}
              style={{ height: "100%", borderRadius: 10 }}
            />
            {config.title && <Text>{config.title}</Text>}
          </SectionItemWrapper>
        )}
      </SectionWrapper>
    )
  },
)

const BannerSkeleton = () => {
  console.log("calling !!!!")

  return (
    <View
      style={{
        paddingHorizontal: 16,
        marginTop: 12,
      }}>
      <Skeleton
        isLoading={true}
        layout={[
          {
            key: "banner",
            width: width - 32,
            height: 180,
            borderRadius: 16,
            marginBottom: 16,
            marginTop: 10,
          },
        ]}
      />
    </View>
  )
}
