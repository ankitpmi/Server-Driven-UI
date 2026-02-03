import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import { fetchBanner } from "@/src/services"
import { mapBannerToUI, UIBannerItem } from "@/src/types"

const OfferDetails = React.memo(() => {
  const params = useLocalSearchParams()
  const [bannerItem, setBannerItem] = useState<UIBannerItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBannerItem = async () => {
      if (!params?.id) {
        setError("No banner ID provided")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        
        // Fetch banner data (defaulting to v2 as it has multiple items with IDs)
        const bannerRes = await fetchBanner("v2")
        
        if (!bannerRes || !bannerRes.payload) {
          throw new Error("Invalid banner response")
        }

        const bannerUI = mapBannerToUI(bannerRes)
        
        // Find the banner item with matching ID
        const item = bannerUI.banners.find(
          (banner) => banner.id === String(params.id)
        )

        if (!item) {
          throw new Error(`Banner item with ID ${params.id} not found`)
        }

        setBannerItem(item)
      } catch (err) {
        console.error("Failed to fetch banner item:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch banner")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBannerItem()
  }, [params?.id])

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading banner details...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    )
  }

  if (!bannerItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Banner item not found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Offer Details Screen</Text>
      <Text style={styles.bannerId}>Banner ID: {bannerItem.id}</Text>
      <Image
        source={{ uri: bannerItem.image }}
        style={styles.bannerImage}
        resizeMode="contain"
      />
    </View>
  )
})

export default OfferDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
  bannerId: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
  },
  bannerImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 10,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#ff0000",
    textAlign: "center",
  },
})
