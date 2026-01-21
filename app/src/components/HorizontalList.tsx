import { View, Text, FlatList } from "react-native"

import { SectionWrapper } from "./SectionWrapper"
import { CategoryGridConfig, DesignTokens, LayoutConfig } from "../types"
import {
  parseSize,
  resolveColor,
  resolveLayoutBox,
  resolveToken,
} from "../utils"

interface HorizontalListProps {
  layout?: LayoutConfig
  tokens?: DesignTokens
  config?: CategoryGridConfig
}

export function HorizontalList({
  config,
  layout,
  tokens,
}: HorizontalListProps) {
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
                backgroundColor: resolveColor(layout?.item?.background, tokens),
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
