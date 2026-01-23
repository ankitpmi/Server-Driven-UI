export interface HomePayloadV2 {
  page: {
    theme?: string
    blocks: {
      blockType: string
      data: unknown
    }[]
  }
}
