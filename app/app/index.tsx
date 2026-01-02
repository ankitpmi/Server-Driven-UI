import { useEffect, useState } from "react"
import { ActivityIndicator, ScrollView, View } from "react-native"
import { fetchHome } from "@/src/services"
import { COMPONENTS } from "@/src/components"
import { HomeApiResponse } from "@/src/types"

export default function Home() {
  const [data, setData] = useState<HomeApiResponse | null>(null)

  useEffect(() => {
    fetchHome("default").then(setData)
  }, [])

  if (!data) {
    return <ActivityIndicator style={{ flex: 1 }} />
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          data.designTokens.colors[data.screen.background?.value ?? ""],
        paddingHorizontal: 20,
      }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}>
        {data.sections.map((section) => {
          const Component = COMPONENTS[section.type]
          return (
            <Component
              key={section.id}
              config={section.config}
              layout={section.layout}
              tokens={data.designTokens}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}
