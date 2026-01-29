import { BannerVersion, BannerVersionMap } from "../types"

export async function fetchBanner<V extends BannerVersion>(
  version: V,
): Promise<BannerVersionMap[V]> {
  const res = await fetch(`http://192.168.1.148:3000/api/${version}/banner`)

  const json = await res.json()

  return json.data
}
