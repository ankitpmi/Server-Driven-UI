import { UIBannerData } from "../banner.type"
import { BannerV1ApiData } from "../v1/banner.v1.type"
import { BannerV2ApiData } from "../v2/banner.v2.type"

export function mapBannerToUI(
  data: BannerV1ApiData | BannerV2ApiData,
): UIBannerData {
  if (data.metaData.version === "v1") {
    return {
      banners: [
        {
          id: "1",
          image: (data as BannerV1ApiData).payload.image,
        },
      ],
    }
  }

  return {
    banners: (data as BannerV2ApiData).payload.bannerData,
  }
}
