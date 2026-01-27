import { Dimensions, Image, Text, View } from "react-native"

import { SectionItemWrapper, SectionWrapper } from "../../shared"
import { useCallback, useEffect, useState } from "react"
import { fetchBanner } from "@/src/services"
import { BannerPayload } from "@/src/types"
import Skeleton from "react-native-reanimated-skeleton"

const { width } = Dimensions.get("window")

export function BannerV1({ config, layout, tokens }: any) {
  console.log("layout: ", layout)
  const [bannerData, setBannerData] = useState<BannerPayload | null>(null)
  const [loading, setLoading] = useState(true)

  const getBannerData = useCallback(async () => {
    if (!config.api) return

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

  // ✅ Show skeleton while loading
  if (loading) {
    return <BannerSkeleton />
  }

  // ✅ Safety check
  if (!bannerData) return null

  return (
    <SectionWrapper layout={layout} tokens={tokens}>
      <SectionItemWrapper layout={layout} tokens={tokens}>
        <Image
          source={{ uri: bannerData?.image }}
          style={{ height: "100%", borderRadius: 10 }}
        />
        {config.title && <Text>{config.title}</Text>}
      </SectionItemWrapper>
    </SectionWrapper>
  )
}

const BannerSkeleton = () => {
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
            marginTop: 20,
          },
        ]}
      />
    </View>
  )
}
