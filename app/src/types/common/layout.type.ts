import { ScreenBackground } from "./background.type"

export interface LayoutBox {
  width?: number | string
  height?: number | string
  gap?: number
  borderRadius?: number | string

  margin?: number | string
  marginTop?: number | string
  marginBottom?: number | string
  marginStart?: number | string
  marginEnd?: number | string
  marginHorizontal?: number | string
  marginVertical?: number | string

  padding?: number | string
  paddingTop?: number | string
  paddingBottom?: number | string
  paddingStart?: number | string
  paddingEnd?: number | string
  paddingHorizontal?: number | string
  paddingVertical?: number | string

  background?: ScreenBackground

  border?: {
    width: number
    color: string
  }

  fontFamily?: string
  fontSize?: number | string
  fontWeight?: number | string
  lineHeight?: number
  letterSpacing?: number
  color?: string
  align?: "left" | "center" | "right" | "justify"
  decoration?: "none" | "underline" | "line-through"
  transform?: "none" | "uppercase" | "lowercase" | "capitalize"
  numberOfLines?: number
  ellipsizeMode?: "head" | "middle" | "tail" | "clip"
}

export interface LayoutConfig {
  container?: LayoutBox
  item?: LayoutBox
  title?: LayoutBox
  search?: LayoutBox
  category?: LayoutBox
}
