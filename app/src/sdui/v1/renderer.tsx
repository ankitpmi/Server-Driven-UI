import React from "react"
import { FlatList, View } from "react-native"

import { registryV1 } from "./registry"
import { AppLayout } from "@/src/components"
import {
  BannerConfigV1,
  CategoryGridConfigV1,
  HomePayloadV1,
} from "@/src/types"
import { resolveColor } from "@/src/utils"

export function renderV1(data: HomePayloadV1) {
  // 1️⃣ filter + sort
  const sections = data.sections
    .filter((s) => s.active !== false)
    .sort((a, b) => a.order - b.order)

  // safety
  if (!sections.length) return null

  // 2️⃣ first section = header
  const headerSection = sections[0]
  const listSections = sections.slice(1)

  const HeaderComponent = registryV1[headerSection.type]

  return (
    <AppLayout
      layout={data.screenConfig.layout}
      tokens={data.designTokens}
      containerStyle={{
        backgroundColor: data.designTokens.colors.white,
      }}
      statusBarBgColor={resolveColor(
        data.screenConfig.statusBardBackground,
        data.designTokens,
      )}>
      <FlatList
        data={listSections}
        keyExtractor={(item) => item.id}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => {
          if (!HeaderComponent) return null

          return (
            // <View style={{ backgroundColor: "green" }}>
            <HeaderComponent
              key={headerSection.id}
              layout={headerSection.layout}
              config={headerSection.config as CategoryGridConfigV1}
              tokens={data.designTokens}
            />
            // </View>
          )
        }}
        renderItem={({ item }) => {
          const Component = registryV1[item.type]
          if (!Component) return null

          return (
            <Component
              key={item.id}
              layout={item.layout}
              config={item.config}
              tokens={data.designTokens}
            />
          )
        }}
      />
    </AppLayout>
  )
}
