import { render } from "../sdui/renderer"
import { HomeApiResponse, HomePayloadV1 } from "../types"

export function renderByVersion(data: HomeApiResponse) {
  switch (data.metaData.uiVersion) {
    case "v1":
      return render(data.payload as HomePayloadV1)

    case "v2":
      return null

    default:
      return null
  }
}
