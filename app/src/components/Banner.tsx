import { Image, Text } from "react-native"
import { SectionWrapper } from "./SectionWrapper"

export function Banner({ config, layout, tokens }: any) {
  console.log("layout banner ::::: ", layout)
  return (
    <SectionWrapper layout={layout} tokens={tokens}>
      <Image
        source={{ uri: config.image }}
        style={{ height: "100%", borderRadius: 10, backgroundColor: "red" }}
      />
      {config.title && <Text>{config.title}</Text>}
    </SectionWrapper>
  )
}
