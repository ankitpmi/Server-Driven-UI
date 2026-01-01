import { Image, Text } from "react-native"
import { SectionWrapper } from "./SectionWrapper"

export function Banner({ config, layout, tokens }: any) {
  return (
    <SectionWrapper layout={layout} tokens={tokens}>
      <Image
        source={{ uri: config.image }}
        style={{ height: 160, borderRadius: 10 }}
      />
      {config.title && <Text>{config.title}</Text>}
    </SectionWrapper>
  )
}
