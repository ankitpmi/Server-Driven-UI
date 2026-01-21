export interface DesignTokens {
  spacing: Record<string, number>
  radius: Record<string, number>
  colors: Record<string, string>
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
    }
export interface LayoutBox {
  padding?: string | number
  margin?: string | number
  background?: ScreenBackground
  radius?: string | number
  border?: {
    width: number
    color: string
  }
  marginTop?: string | number
  marginBottom?: string | number
  marginStart?: string | number
  marginEnd?: string | number
  paddingTop?: string | number
  paddingBottom?: string | number
  paddingStart?: string | number
  paddingEnd?: string | number
  height?: number | string
  width?: number | string
  gap?: number
}

export interface LayoutConfig {
  container?: LayoutBox
  item?: LayoutBox
}

export interface ScreenConfig {
  id: string
  template: string
  layout?: LayoutConfig
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

export interface HomeApiResponse {
  designTokens: DesignTokens
  screen: ScreenConfig
  sections: HomeSection[]
}
