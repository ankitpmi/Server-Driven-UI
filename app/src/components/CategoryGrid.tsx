import { View, Text, FlatList } from "react-native"
import { resolveToken } from "@/src/utils/designToken.util"
import { SectionWrapper } from "./SectionWrapper"

export function CategoryGrid({ config, layout, tokens }: any) {
  return (
    <SectionWrapper layout={layout} tokens={tokens}>
      {config.title && <Text>{config.title}</Text>}

      <FlatList
        data={config.items}
        numColumns={config.columns ?? 3}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              margin: 6,
              padding: resolveToken(layout?.item?.padding, tokens),
              backgroundColor: resolveToken(layout?.item?.background, tokens),
              borderRadius: resolveToken(layout?.item?.radius, tokens),
              alignItems: "center",
              justifyContent: "center",
              height: 80,
            }}>
            <Text>{item.label}</Text>
          </View>
        )}
      />
    </SectionWrapper>
  )
}
