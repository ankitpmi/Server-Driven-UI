import { HorizontalListApiData, HorizontalListApiResponse } from "../types"

export async function fetchHorizontalList(
  api: string,
): Promise<HorizontalListApiData> {
  const res = await fetch(`http://192.168.1.148:3000/api/v1/${api}`)

  const json: HorizontalListApiResponse = await res.json()

  return json.data as HorizontalListApiData
}
