import { useEffect, useState } from "react"
import { ActivityIndicator, ScrollView } from "react-native"
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

  //  customColor={data.designTokens.colors.mutedCoral}
  return (
    <AppLayout
      statusBarBgColor={resolveColor(
        data.screenConfig.statusBardBackground,
        data.designTokens,
      )}>
      <SectionWrapper
        layout={data.screenConfig.layout}
        tokens={data.designTokens}
        containerStyle={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 50 }}
          bounces={false}
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
      </SectionWrapper>
    </AppLayout>
  )
}
