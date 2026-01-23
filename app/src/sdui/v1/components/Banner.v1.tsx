import { Image, Text } from "react-native"

import { SectionItemWrapper, SectionWrapper } from "../../shared"
// import { SectionItemWrapper } from "./SectionItemWrapper"

export function BannerV1({ config, layout, tokens }: any) {
  return (
    <SectionWrapper layout={layout} tokens={tokens}>
      <SectionItemWrapper layout={layout} tokens={tokens}>
        <Image
          source={{ uri: config.image }}
          style={{ height: "100%", borderRadius: 10, backgroundColor: "red" }}
        />
        {config.title && <Text>{config.title}</Text>}
      </SectionItemWrapper>
    </SectionWrapper>
  )
}
