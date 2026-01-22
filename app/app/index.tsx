import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, ScrollView } from "react-native"
import { fetchHome } from "@/src/services"
import { AppLayout, COMPONENTS, SectionWrapper } from "@/src/components"
import { HomeApiResponse } from "@/src/types"
import { resolveColor } from "@/src/utils"

export default function Home() {
  const [data, setData] = useState<HomeApiResponse | null>(null)

  useEffect(() => {
    fetchHome("default").then(setData)
  }, [])

  if (!data) {
    return <ActivityIndicator style={{ flex: 1 }} />
  }

  const renderSection = ({ item }: { item: any }) => {
    const Component = COMPONENTS[item.type]
    return (
      <Component
        key={item.id}
        config={item.config}
        layout={item.layout}
        tokens={data.designTokens}
      />
    )
  }

  return (
    <AppLayout
      layout={data.screenConfig.layout}
      tokens={data.designTokens}
      statusBarBgColor={resolveColor(
        data.screenConfig.statusBardBackground,
        data.designTokens,
      )}>
      <FlatList
        data={data.sections}
        contentContainerStyle={{ paddingBottom: 50 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderSection}
        keyExtractor={(item, index) => item.id || index.toString()}
      />
    </AppLayout>
  )
}
