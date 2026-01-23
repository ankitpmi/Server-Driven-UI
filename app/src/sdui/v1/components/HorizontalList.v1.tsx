import { View, Text, FlatList } from "react-native"

import { SectionWrapper } from "../../shared"
import { CategoryGridConfigV1, DesignTokens, LayoutConfig } from "@/src/types"
import { resolveLayoutBox } from "@/src/utils"

interface HorizontalListV1Props {
  layout?: LayoutConfig
  tokens?: DesignTokens
  config?: CategoryGridConfigV1
}

export function HorizontalListV1({
  config,
  layout,
  tokens,
}: HorizontalListV1Props) {
  const commonStyle = resolveLayoutBox(layout?.item, tokens)

  return (
    <SectionWrapper layout={layout} tokens={tokens}>
      {config && config?.title && <Text>{config.title}</Text>}

      <FlatList
        data={config?.items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{}}
        renderItem={({ item }) => (
          <View
            style={[
              commonStyle,
              {
                // backgroundColor: resolveColor(layout?.item?.background, tokens),
                alignItems: "center",
                justifyContent: "center",
              },
            ]}>
            <Text style={{ textAlign: "center" }}>{item.label}</Text>
          </View>
        )}
      />
    </SectionWrapper>
  )
}
