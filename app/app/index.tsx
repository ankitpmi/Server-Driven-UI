import { useHomeScreen } from "@/src/hooks"
import { ScreenRenderer } from "@/src/engine"

export default function Home() {
  const { data } = useHomeScreen()

  if (!data) return null

  // return (
  //   <SafeAreaView style={{ flex: 1 }}>
  //     <BannerV2 />
  //   </SafeAreaView>
  // )

  return <ScreenRenderer data={data} />

  // const [data, setData] = useState<HomeApiResponse | null>(null)
  // console.log("data: ", JSON.stringify(data?.payload?.designTokens, null, 2))

  // useEffect(() => {
  //   fetchHome("default").then(setData)
  // }, [])

  // if (!data) {
  //   return <ActivityIndicator style={{ flex: 1 }} />
  // }

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

  // return (
  // <AppLayout
  //   layout={data.screenConfig.layout}
  //   tokens={data.designTokens}
  //   containerStyle={{ backgroundColor: data.designTokens.colors.white }}
  //   statusBarBgColor={resolveColor(
  //     data.screenConfig.statusBardBackground,
  //     data.designTokens,
  //   )}>
  //   <FlatList
  //     data={data.sections.slice(1)}
  //     renderItem={renderSection}
  //     stickyHeaderIndices={[0]}
  //     ListHeaderComponent={() => {
  //       const item = data.sections[0]
  //       const Component = COMPONENTS[item.type]

  //       return (
  //         <Component
  //           key={item.id}
  //           config={item.config}
  //           layout={item.layout}
  //           tokens={data.designTokens}
  //         />
  //       )
  //     }}
  //     contentContainerStyle={{ paddingBottom: 50 }}
  //     bounces={false}
  //     showsVerticalScrollIndicator={false}
  //     keyExtractor={(item, index) => item.id || index.toString()}
  //   />
  // </AppLayout>
  // )
}
