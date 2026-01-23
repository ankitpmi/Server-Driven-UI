import { Text, FlatList, Image, Pressable } from "react-native"

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

  const lastIndex = (config?.items?.length ?? 0) - 1

  return (
    <SectionWrapper layout={layout} tokens={tokens}>
      {config && config?.title && (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 10,
          }}>
          {config.title}
        </Text>
      )}

      <FlatList
        data={config?.items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{}}
        renderItem={({ item, index }) => (
          <Pressable
            style={[
              commonStyle,
              {
                // backgroundColor: resolveColor(layout?.item?.background, tokens),
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 0,
                paddingHorizontal: 0,
                marginRight: lastIndex === index ? 0 : 16,
              },
            ]}>
            <Image
              source={{ uri: item.image }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
            {/* <Text style={{ textAlign: "center" }}>{item.label}</Text> */}
          </Pressable>
        )}
      />
    </SectionWrapper>
  )
}
