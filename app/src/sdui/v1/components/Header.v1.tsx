import { View, Text, FlatList, TextInput } from "react-native"

import { resolveColor, resolveToken } from "@/src/utils"

import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Octicons,
  SimpleLineIcons,
} from "@expo/vector-icons"
import { SectionWrapper } from "../../shared"
import { CategoryGridConfigV1, DesignTokens, LayoutConfig } from "@/src/types"

type IconFamily =
  | "MaterialCommunityIcons"
  | "Ionicons"
  | "FontAwesome5"
  | "AntDesign"
  | "Entypo"
  | "Feather"
  | "FontAwesome"
  | "Octicons"
  | "SimpleLineIcons"

interface CategoryIconType {
  family: IconFamily
  name: string
}

interface CategoryItem {
  id: string
  label: string
  icon: CategoryIconType
}

interface CategoryIconProps {
  icon: CategoryIconType
  size?: number
  color?: string
}

const IconMap: Record<IconFamily, any> = {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Octicons,
  SimpleLineIcons,
}

interface HeaderV1Props {
  layout?: LayoutConfig
  tokens?: DesignTokens
  config?: CategoryGridConfigV1
}

const categories: CategoryItem[] = [
  {
    id: "fashion",
    label: "Fashion",
    icon: {
      family: "MaterialCommunityIcons",
      name: "tshirt-crew",
    },
  },
  {
    id: "electronics",
    label: "Electronics",
    icon: {
      family: "MaterialCommunityIcons",
      name: "laptop",
    },
  },
  {
    id: "appliances",
    label: "Appliances",
    icon: {
      family: "MaterialCommunityIcons",
      name: "washing-machine",
    },
  },
  {
    id: "home_kitchen",
    label: "Home &\nKitchen",
    icon: {
      family: "MaterialCommunityIcons",
      name: "silverware-fork-knife",
    },
  },
  {
    id: "beauty",
    label: "Beauty",
    icon: {
      family: "MaterialCommunityIcons",
      name: "face-woman-shimmer",
    },
  },
  {
    id: "grocery",
    label: "Grocery",
    icon: {
      family: "MaterialCommunityIcons",
      name: "cart",
    },
  },
  {
    id: "mobiles",
    label: "Mobiles",
    icon: {
      family: "MaterialCommunityIcons",
      name: "cellphone",
    },
  },
  {
    id: "computers",
    label: "Computers",
    icon: {
      family: "MaterialCommunityIcons",
      name: "desktop-classic",
    },
  },
  {
    id: "furniture",
    label: "Furniture",
    icon: {
      family: "MaterialCommunityIcons",
      name: "sofa",
    },
  },
  {
    id: "sports",
    label: "Sports",
    icon: {
      family: "MaterialCommunityIcons",
      name: "basketball",
    },
  },
]

export const HeaderV1 = ({ config, layout, tokens }: HeaderV1Props) => {
  return (
    <SectionWrapper layout={layout} tokens={tokens}>
      {/* ---------- Title ---------- */}
      {config?.title && (
        <Text
          style={{
            marginBottom: resolveToken(layout?.title?.marginBottom, tokens),
            fontSize: resolveToken(layout?.title?.fontSize, tokens),
            // fontWeight: resolveTextStyle(layout?.title?.fontWeight, tokens),
            color: resolveColor(layout?.title?.color, tokens),
          }}>
          {config.title}
        </Text>
      )}

      {/* ---------- Search Bar ---------- */}
      {/* {config?.search && ( */}
      <TextInput
        placeholder={"Search"}
        style={{
          // height: layout?.search?.height,
          height: 44,
          // borderRadius: resolveToken(layout?.search?.borderRadius, tokens),
          borderRadius: 8,
          backgroundColor: "#fff",
          paddingHorizontal: 16,
          // paddingHorizontal: resolveToken(
          //   layout?.search?.paddingHorizontal,
          //   tokens,
          // ),
          // backgroundColor: resolveColor(layout?.search?.background, tokens),
          // marginBottom: resolveToken(layout?.search?.marginBottom, tokens),
        }}
      />
      {/* )} */}

      {/* ---------- Category Horizontal List ---------- */}

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        style={{ marginTop: 16 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F5F5F5",
              marginHorizontal: 4,
              padding: 2,
              width: 80,
              paddingTop: 10,
              borderWidth: 1,
              borderColor: "#ff5050",
              borderRadius: 8,
            }}>
            <CategoryIcon icon={item.icon} />

            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                height: 32,
                marginTop: 6,
                fontWeight: "600",
                color: "#ff5050",
              }}
              // numberOfLines={2}
            >
              {item.label}
            </Text>
          </View>
        )}
      />
    </SectionWrapper>
  )
}

function CategoryIcon({
  icon,
  size = 28,
  color = "#ff5050",
}: CategoryIconProps) {
  const IconComponent = IconMap[icon.family]

  if (!IconComponent) return null

  return <IconComponent name={icon.name} size={size} color={color} />
}
