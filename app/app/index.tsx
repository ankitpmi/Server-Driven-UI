import { useEffect, useState } from "react"
import { ActivityIndicator, ScrollView } from "react-native"
import { fetchHome } from "@/src/services"
import { COMPONENTS, SectionWrapper } from "@/src/components"
import { HomeApiResponse } from "@/src/types"

export default function Home() {
  const [data, setData] = useState<HomeApiResponse | null>(null)

  useEffect(() => {
    fetchHome("default").then(setData)
  }, [])

  if (!data) {
    return <ActivityIndicator style={{ flex: 1 }} />
  }

  // console.log("RES ::: ", JSON.stringify(data.screen.layout, null, 2))

  return (
    <>
      <SectionWrapper
        layout={data.screen.layout}
        tokens={data.designTokens}
        containerStyle={{ flex: 1 }}>
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
      </SectionWrapper>
    </>
  )
}
