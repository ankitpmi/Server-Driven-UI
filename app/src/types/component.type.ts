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
      value?: string
    }
/**
 * LayoutBox
 *
 * Common style configuration object used in Server-Driven UI.
 * Supports layout, spacing, background, border and text styling.
 *
 * All values can be token-based (string) or raw numbers.
 */
export interface LayoutBox {
  // Layout
  width?: number | string
  height?: number | string
  gap?: number
  borderRadius?: number | string

  // Spacing
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

  // Background
  /**
   * Background configuration:
   * - solid color
   * - gradient
   * - image
   */
  background?: ScreenBackground
  // Border
  border?: {
    width: number
    color: string
  }

  // Text Styling

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

export interface ScreenConfig {
  id: string
  template: string
  layout?: LayoutConfig
  statusBardBackground?: string
}

/* Section configs */

export interface BannerConfig {
  title?: string
  image: string
}

export interface CategoryItem {
  id: string
  label: string
}

export interface CategoryGridConfig {
  title?: string
  columns?: number
  items: CategoryItem[]
}

export type HomeSection =
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

export interface HomeApiResponse {
  designTokens: DesignTokens
  screenConfig: ScreenConfig
  sections: HomeSection[]
}
