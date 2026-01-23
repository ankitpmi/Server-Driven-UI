import { HomeApiResponse } from "../types"
import { renderByVersion } from "./renderByVersion"

export function ScreenRenderer({ data }: { data: HomeApiResponse }) {
  return renderByVersion(data)
}
