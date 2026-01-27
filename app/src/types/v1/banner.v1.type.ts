export interface BannerApiResponse {
  success: boolean
  data: BannerApiData
}

export interface BannerApiData {
  metaData: {
    version: "v1"
  }
  payload: BannerPayload
}

export interface BannerPayload {
  image: string
}
