import { View, Text, FlatList, Image, Pressable } from "react-native"

import { SectionWrapper } from "../../shared"
import { resolveLayoutBox } from "@/src/utils"
import { CategoryGridConfigV1, DesignTokens, LayoutConfig } from "@/src/types"

interface CategoryGridV1Props {
  layout?: LayoutConfig
  tokens?: DesignTokens
  config?: CategoryGridConfigV1
}

const GAP = 12

export function CategoryGridV1({
  config,
  layout,
  tokens,
}: CategoryGridV1Props) {
  const commonStyle = resolveLayoutBox(layout?.item, tokens)

  return (
    <SectionWrapper layout={layout} tokens={tokens}>
      {config && config.title && (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 10,
          }}>
          {config?.title}
        </Text>
      )}

      <FlatList
        data={config?.items}
        numColumns={config?.columns ?? 3}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <Pressable
            style={[
              commonStyle,
              {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}>
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}>
              <Image
                resizeMode="cover"
                source={{ uri: item?.image || "" }}
                style={{ height: "100%", width: "100%", borderRadius: 8 }}
              />
            </View>
            {/* <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "700" }}>
              {item.label || item.name}
            </Text> */}
          </Pressable>
        )}
      />
    </SectionWrapper>
  )
}
