export interface BannerV2ApiResponse {
  success: boolean
  data: BannerV2ApiData
}

export interface BannerV2ApiData {
  metaData: {
    version: "v2"
    api: "banner"
  }
  payload: {
    bannerData: BannerItem[]
  }
}

export interface BannerItem {
  id: string
  image: string
}
