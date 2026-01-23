/* ================================
   API METADATA
================================ */

export interface ApiMetaData {
  screen: string
  uiVersion: "v1" | "v2" | string
}

/* ================================
   DESIGN TOKENS
================================ */

export interface DesignTokens {
  spacing: Record<string, number>
  borderRadius: Record<string, number>
  colors: Record<string, string>
  fontSize?: Record<string, number>
  lineHeight?: Record<string, number>
  letterSpacing?: Record<string, number>
  fontFamily?: Record<string, string>
  fontWeight?: Record<string, string | number>
}

/* ================================
   BACKGROUND TYPES
================================ */

export type ScreenBackground =
  | {
      backgroundType: "solidColor"
      value: string
    }
  | {
      backgroundType: "image"
      value: string
    }
  | {
      backgroundType: "gradient"
      colors: string[]
      start?: [number, number]
      end?: [number, number]
      locations?: [number, number, ...number[]] | null
      value?: string
    }

/* ================================
   LAYOUT SYSTEM
================================ */

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

/* ================================
   SCREEN CONFIG
================================ */

export interface ScreenConfig {
  id: string
  template: string
  layout?: LayoutConfig
  statusBardBackground?: string
}

/* ================================
   SECTION CONFIGS (V1)
================================ */

export interface BannerConfig {
  title?: string
  image: string
}

export interface CategoryItem {
  id: string
  label: string
  logo?: string
}

export interface CategoryGridConfig {
  title?: string
  columns?: number
  items: CategoryItem[]
}

export type HomeSectionV1 =
  | {
      id: string
      type: "banner"
      order: number
      layout?: LayoutConfig
      config: BannerConfig
    }
  | {
      id: string
      type: "category_grid"
      order: number
      layout?: LayoutConfig
      config: CategoryGridConfig
    }
  | {
      id: string
      type: "category_horizontal"
      order: number
      layout?: LayoutConfig
      config: CategoryGridConfig
    }
  | {
      id: string
      type: "header"
      order: number
      layout?: LayoutConfig
      config: unknown
    }

/* ================================
   HOME PAYLOAD V1
================================ */

export interface HomeApiResponseV1 {
  designTokens: DesignTokens
  screenConfig: ScreenConfig
  sections: HomeSectionV1[]
}

/* ================================
   HOME PAYLOAD V2 (future)
================================ */

export interface HomeApiResponseV2 {
  page: {
    theme?: string
    blocks: {
      blockType: string
      data: unknown
    }[]
  }
}

/* ================================
   ROOT API RESPONSE
================================ */

export interface HomeApiResponse {
  metaData: ApiMetaData
  payload: HomeApiResponseV1 | HomeApiResponseV2
}
