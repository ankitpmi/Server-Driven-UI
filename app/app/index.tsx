import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, View } from "react-native"
import { fetchHome } from "@/src/services"
import { AppLayout, COMPONENTS } from "@/src/components"
import { HomeApiResponse, HomeSection } from "@/src/types"
import { resolveColor } from "@/src/utils"

export default function Home() {
  const [data, setData] = useState<HomeApiResponse | null>(null)

  useEffect(() => {
    fetchHome("default").then(setData)
  }, [])

  if (!data) {
    return <ActivityIndicator style={{ flex: 1 }} />
  }

  const renderSection = ({
    item,
    index,
  }: {
    item: HomeSection
    index: number
  }) => {
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
      containerStyle={{ backgroundColor: data.designTokens.colors.white }}
      statusBarBgColor={resolveColor(
        data.screenConfig.statusBardBackground,
        data.designTokens,
      )}>
      <FlatList
        data={data.sections.slice(1)}
        renderItem={renderSection}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => {
          const item = data.sections[0]
          const Component = COMPONENTS[item.type]

          return (
            <Component
              key={item.id}
              config={item.config}
              layout={item.layout}
              tokens={data.designTokens}
            />
          )
        }}
        contentContainerStyle={{ paddingBottom: 50 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id || index.toString()}
      />
    </AppLayout>
  )
}
