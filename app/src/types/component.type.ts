export interface DesignTokens {
  spacing: Record<string, number>
  radius: Record<string, number>
  colors: Record<string, string>
}

export type ScreenBackground =
  | {
      backgroundType: "color"
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
