import { renderV1 } from "../sdui/v1/renderer"
import { HomeApiResponse, HomePayloadV1 } from "../types"

export function renderByVersion(data: HomeApiResponse) {
  switch (data.metaData.uiVersion) {
    case "v1":
      return renderV1(data.payload as HomePayloadV1)

    case "v2":
      return null

    default:
      return null
  }
}
