import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, View, Text } from "react-native"
import { fetchHome } from "@/src/services"
import { AppLayout, COMPONENTS } from "@/src/components"
import { HomeApiResponse, HomeSectionV1 } from "@/src/types"
import { resolveColor } from "@/src/utils"

export default function Home() {
  const [data, setData] = useState<HomeApiResponse | null>(null)
  // console.log("data: ", JSON.stringify(data?.payload?.designTokens, null, 2))

  useEffect(() => {
    fetchHome("default").then(setData)
  }, [])

  if (!data) {
    return <ActivityIndicator style={{ flex: 1 }} />
  }

  // const renderSection = ({
  //   item,
  //   index,
  // }: {
  //   item: HomeSectionV1
  //   index: number
  // }) => {
  //   const Component = COMPONENTS[item.type]
  //   return (
  //     <Component
  //       key={item.id}
  //       config={item.config}
  //       layout={item.layout}
  //       tokens={data.payload.designTokens}
  //     />
  //   )
  // }

  return (
    <View>
      <Text>Test</Text>
    </View>
  )

  // return (
  //   <AppLayout
  //     layout={data.screenConfig.layout}
  //     tokens={data.designTokens}
  //     containerStyle={{ backgroundColor: data.designTokens.colors.white }}
  //     statusBarBgColor={resolveColor(
  //       data.screenConfig.statusBardBackground,
  //       data.designTokens,
  //     )}>
  //     <FlatList
  //       data={data.sections.slice(1)}
  //       renderItem={renderSection}
  //       stickyHeaderIndices={[0]}
  //       ListHeaderComponent={() => {
  //         const item = data.sections[0]
  //         const Component = COMPONENTS[item.type]

  //         return (
  //           <Component
  //             key={item.id}
  //             config={item.config}
  //             layout={item.layout}
  //             tokens={data.designTokens}
  //           />
  //         )
  //       }}
  //       contentContainerStyle={{ paddingBottom: 50 }}
  //       bounces={false}
  //       showsVerticalScrollIndicator={false}
  //       keyExtractor={(item, index) => item.id || index.toString()}
  //     />
  //   </AppLayout>
  // )
}
