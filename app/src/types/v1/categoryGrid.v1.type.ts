import { CategoryGridConfigV1 } from "./home.v1.type"

export interface CategoryGridApiResponse {
  success: boolean
  data: CategoryGridApiData
}

export interface CategoryGridApiData {
  metaData: {
    version: "v1"
    api: string
  }
  payload: CategoryGridConfigV1
}
