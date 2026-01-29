import { DesignTokens, LayoutConfig } from "../common"
import { ProductType, SectionVersion } from "../component.type"

export interface ScreenConfigV1 {
  id: string
  template: string
  layout?: LayoutConfig
  statusBardBackground?: string
}

/* sections */

export interface BannerConfigV1 {
  title?: string
  image: string
  api?: string
}

export interface CategoryItemV1 {
  id: string
  label: string
  logo?: string
}

export interface CategoryGridConfigV1 {
  title?: string
  columns?: number
  items: ProductType[]
  api?: string
}

export type HomeSectionV1 =
  | {
      id: string
      type: "header"
      order: number
      layout?: LayoutConfig
      config: CategoryGridConfigV1
      active?: boolean
      version?: SectionVersion
    }
  | {
      id: string
      type: "banner"
      order: number
      layout?: LayoutConfig
      config: BannerConfigV1
      active?: boolean
      version?: SectionVersion
    }
  | {
      id: string
      type: "category_grid"
      order: number
      layout?: LayoutConfig
      config: CategoryGridConfigV1
      active?: boolean
      version?: SectionVersion
    }
  | {
      id: string
      type: "category_horizontal"
      order: number
      layout?: LayoutConfig
      config: CategoryGridConfigV1
      active?: boolean
      version?: SectionVersion
    }

export interface HomePayloadV1 {
  designTokens: DesignTokens
  screenConfig: ScreenConfigV1
  sections: HomeSectionV1[]
}
