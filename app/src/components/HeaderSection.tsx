import { View, Text, FlatList, TextInput, Image } from "react-native"
import { SectionWrapper } from "./SectionWrapper"
import { resolveColor, resolveToken, resolveTextStyle } from "@/src/utils"
import { CategoryGridConfig, DesignTokens, LayoutConfig } from "../types"

interface HeaderSectionProps {
  layout?: LayoutConfig
  tokens?: DesignTokens
  config?: CategoryGridConfig
}

export const HeaderSection = ({
  config,
  layout,
  tokens,
}: HeaderSectionProps) => {
  console.log("layout: ", layout)
  return (
    <SectionWrapper layout={layout} tokens={tokens}>
      {/* ---------- Title ---------- */}
      {config?.title && (
        <Text
          style={{
            marginBottom: resolveToken(layout?.title?.marginBottom, tokens),
            fontSize: resolveToken(layout?.title?.fontSize, tokens),
            // fontWeight: resolveTextStyle(layout?.title?.fontWeight, tokens),
            color: resolveColor(layout?.title?.color, tokens),
          }}>
          {config.title}
        </Text>
      )}

      {/* ---------- Search Bar ---------- */}
      {/* {config?.search && ( */}
      <TextInput
        placeholder={"Search"}
        style={{
          // height: layout?.search?.height,
          height: 44,
          // borderRadius: resolveToken(layout?.search?.borderRadius, tokens),
          borderRadius: 8,
          backgroundColor: "#fff",
          paddingHorizontal: 16,
          // paddingHorizontal: resolveToken(
          //   layout?.search?.paddingHorizontal,
          //   tokens,
          // ),
          // backgroundColor: resolveColor(layout?.search?.background, tokens),
          // marginBottom: resolveToken(layout?.search?.marginBottom, tokens),
        }}
      />
      {/* )} */}

      {/* ---------- Category Horizontal List ---------- */}
      {/* {config?.categories?.length > 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={config.categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                width: layout?.category?.item?.width,
                height: layout?.category?.item?.height,
                marginRight: resolveToken(layout?.category?.gap, tokens),
                padding: resolveToken(layout?.category?.item?.padding, tokens),
                borderRadius: resolveToken(
                  layout?.category?.item?.borderRadius,
                  tokens,
                ),
                backgroundColor: resolveColor(
                  layout?.category?.item?.background,
                  tokens,
                ),
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Image
                source={{ uri: item.icon }}
                style={{
                  width: 32,
                  height: 32,
                  marginBottom: 6,
                }}
                resizeMode="contain"
              />

              <Text style={{ fontSize: 12, textAlign: "center" }}>
                {item.label}
              </Text>
            </View>
          )}
        />
      )} */}
    </SectionWrapper>
  )
}
