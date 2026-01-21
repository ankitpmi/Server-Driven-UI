import { View, Text, FlatList } from "react-native"
import { resolveToken } from "@/src/utils/designToken.util"
import { SectionWrapper } from "./SectionWrapper"
import { CategoryGridConfig, DesignTokens, LayoutConfig } from "../types"
import { parseSize } from "../utils"

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
            style={{
              width: parseSize(layout?.item?.width),
              height: parseSize(layout?.item?.height),
              marginRight: resolveToken(layout?.item?.gap, tokens),
              padding: resolveToken(layout?.item?.padding, tokens),
              backgroundColor: resolveToken(layout?.item?.background, tokens),
              borderRadius: resolveToken(layout?.item?.radius, tokens),
              marginTop: resolveToken(layout?.item?.marginTop, tokens),
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Text style={{ textAlign: "center" }}>{item.label}</Text>
          </View>
        )}
      />
    </SectionWrapper>
  )
}
