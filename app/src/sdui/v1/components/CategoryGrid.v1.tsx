import { View, Text, FlatList } from "react-native"

import { SectionWrapper } from "../../shared"
import { resolveLayoutBox } from "@/src/utils"
import { CategoryGridConfigV1, DesignTokens, LayoutConfig } from "@/src/types"

interface CategoryGridV1Props {
  layout?: LayoutConfig
  tokens?: DesignTokens
  config?: CategoryGridConfigV1
}

export function CategoryGridV1({
  config,
  layout,
  tokens,
}: CategoryGridV1Props) {
  const commonStyle = resolveLayoutBox(layout?.item, tokens)

  return (
    <SectionWrapper layout={layout} tokens={tokens}>
      {config && config.title && <Text>{config?.title}</Text>}

      <FlatList
        data={config?.items}
        numColumns={config?.columns ?? 3}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View
            style={[
              commonStyle,
              {
                flex: 1,
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
