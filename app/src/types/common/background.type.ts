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
