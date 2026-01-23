import { HomeApiResponse } from "../types"

export async function fetchHome(
  festival: string = "default",
): Promise<HomeApiResponse> {
  const res = await fetch(
    `http://192.168.1.148:3000/api/home?festival=${festival}`,
  )

  const json = await res.json()

  return json.data as HomeApiResponse
}
