import { BannerV1 } from "./v1/components/Banner.v1"
import { CategoryGridV1 } from "./v1/components/CategoryGrid.v1"
import { HeaderV1 } from "./v1/components/Header.v1"
import { HorizontalListV1 } from "./v1/components/HorizontalList.v1"
import { BannerV2 } from "./v2/components/Banner.v2"

// export const registry = {
//   header: HeaderV1,
//   banner: BannerV1,
//   category_grid: CategoryGridV1,
//   category_horizontal: HorizontalListV1,
// }

export const registry = {
  header: {
    v1: HeaderV1,
    // V2: HeaderV2
  },
  banner: {
    v1: BannerV1,
    v2: BannerV2,
  },
  category_grid: {
    v1: CategoryGridV1,
  },
  category_horizontal: {
    v1: HorizontalListV1,
  },
}
