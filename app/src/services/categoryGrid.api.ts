import { CategoryGridApiData, CategoryGridApiResponse } from "../types"

export async function fetchCategoryGrid(
  api: string,
): Promise<CategoryGridApiData> {
  const res = await fetch(`http://192.168.1.148:3000/api/v1/${api}`)

  const json: CategoryGridApiResponse = await res.json()

  return json.data as CategoryGridApiData
}
