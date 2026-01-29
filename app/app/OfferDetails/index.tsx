import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { useLocalSearchParams } from "expo-router"

const OfferDetails = React.memo(() => {
  const params = useLocalSearchParams()
  console.log("params: ", params)
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Offer Details Screen:</Text>
    </View>
  )
})

export default OfferDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
})
