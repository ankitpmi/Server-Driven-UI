import { View, Text, FlatList } from "react-native"

import { SectionWrapper } from "./SectionWrapper"
import { CategoryGridConfig, DesignTokens, LayoutConfig } from "../types"
import {
  parseSize,
  resolveColor,
  resolveLayoutBox,
  resolveToken,
} from "../utils"

interface CategoryGridProps {
  layout?: LayoutConfig
  tokens?: DesignTokens
  config?: CategoryGridConfig
}

export function CategoryGrid({ config, layout, tokens }: CategoryGridProps) {
  console.log("layout CategoryGrid ::::: ", layout)

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
