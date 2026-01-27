import { useEffect, useState } from "react"
import { HomeApiResponse } from "../types"
import { fetchHome } from "../services"

export const useHomeScreen = () => {
  const [data, setData] = useState<HomeApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetchHome()
      .then(setData)
      .finally(() => setIsLoading(false))
  }, [])

  return { data, isLoading }
}
