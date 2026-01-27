import { Image, Text } from "react-native"

import { SectionItemWrapper, SectionWrapper } from "../../shared"
import { useCallback, useEffect, useState } from "react"
import { fetchBanner } from "@/src/services"
import { BannerPayload } from "@/src/types"

export function BannerV1({ config, layout, tokens }: any) {
  const [bannerData, setBannerData] = useState<BannerPayload | null>(null)

  const getBannerData = useCallback(async () => {
    if (!config.api) return

    try {
      const bannerRes = await fetchBanner()

      if (!bannerRes || !bannerRes.payload) {
        throw new Error("Invalid banner response")
      }

      setBannerData(bannerRes.payload)
      console.log("bannerRes:", bannerRes)
    } catch (error) {
      console.error("Failed to fetch banner data:", error)
    }
  }, [config.api])

  useEffect(() => {
    getBannerData()
  }, [getBannerData])

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
