import { useEffect, useState } from "react"
import { HomeApiResponse } from "../types"
import { fetchHome } from "../services"

export const useHomeScreen = () => {
  const [data, setData] = useState<HomeApiResponse | null>(null)

  useEffect(() => {
    fetchHome().then(setData)
  }, [])

  return { data }
}
