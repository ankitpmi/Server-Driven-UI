import { Banner } from "./Banner"
import { CategoryGrid } from "./CategoryGrid"
import { SectionRenderer } from "./SectionRenderer"
import { HorizontalList } from "./HorizontalList"
import { HeaderSection } from "./HeaderSection"

export * from "./SectionWrapper"
export * from "./SectionItemWrapper"
export * from "./AppLayout"
export * from "./HorizontalList"

export const COMPONENTS: any = {
  banner: Banner,
  category_grid: CategoryGrid,
  section_renderer: SectionRenderer,
  category_horizontal: HorizontalList,
  header: HeaderSection,
}
