import React from "react"
import { View } from "react-native"
// import { COMPONENTS } from "../../components"
import { HomeSection } from "../types"
import { COMPONENTS } from "."

interface Props {
  section: HomeSection
}

export function SectionRenderer({ section }: Props) {
  const Component = COMPONENTS[section.type]

  if (!Component) {
    console.warn("Unsupported section type:", section.type)
    return null
  }

  return (
    <View style={{ marginBottom: 16 }}>
      <Component config={section.config} />
    </View>
  )
}
