export interface BannerV1ApiResponse {
  success: boolean
  data: BannerV1ApiData
}

export interface BannerV1ApiData {
  metaData: {
    version: "v1"
    api: "banner"
  }
  payload: {
    image: string
  }
}
