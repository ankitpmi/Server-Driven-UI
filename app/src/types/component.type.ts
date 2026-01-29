export interface ProductType {
  id: string
  category?: string
  name?: string
  description?: string
  price?: number
  discount?: number
  image?: string
  label?: string
}

export type SectionVersion = "v1" | "v2" | string
