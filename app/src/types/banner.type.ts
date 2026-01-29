import { BannerV1ApiData } from "./v1/banner.v1.type"
import { BannerV2ApiData } from "./v2/banner.v2.type"

export type BannerVersion = "v1" | "v2"

export interface BannerVersionMap {
  v1: BannerV1ApiData
  v2: BannerV2ApiData
}
