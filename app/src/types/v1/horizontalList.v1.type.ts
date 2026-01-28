import { CategoryGridConfigV1 } from "./home.v1.type"

export interface HorizontalListApiResponse {
  success: boolean
  data: HorizontalListApiData
}

export interface HorizontalListApiData {
  metaData: {
    version: "v1"
    api: string
  }
  payload: CategoryGridConfigV1
}
