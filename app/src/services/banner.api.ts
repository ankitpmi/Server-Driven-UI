import { BannerApiData, BannerApiResponse } from "../types"

export async function fetchBanner(version: string): Promise<BannerApiData> {
  const res = await fetch(`http://192.168.1.148:3000/api/${version}/banner`)

  const json: BannerApiResponse = await res.json()

  return json.data as BannerApiData
}
