import { ViewStyle } from "react-native"
import { DesignTokens, LayoutBox } from "../types"
import {
  resolveColor,
  resolveDimension,
  resolveSize,
  resolveSpacing,
} from "./designResolver"

export function resolveLayoutBox(
  box?: LayoutBox,
  // tokens?: Record<string, any>
  tokens?: DesignTokens,
): ViewStyle {
  if (!box) return {}

  return {
    // spacing
    padding: resolveSpacing(box.padding, tokens),
    paddingTop: resolveSpacing(box.paddingTop, tokens),
    paddingBottom: resolveSpacing(box.paddingBottom, tokens),
    paddingStart: resolveSpacing(box.paddingStart, tokens),
    paddingEnd: resolveSpacing(box.paddingEnd, tokens),

    margin: resolveSpacing(box.margin, tokens),
    marginTop: resolveSpacing(box.marginTop, tokens),
    marginBottom: resolveSpacing(box.marginBottom, tokens),
    marginStart: resolveSpacing(box.marginStart, tokens),
    marginEnd: resolveSpacing(box.marginEnd, tokens),

    // size
    width: resolveDimension(box.width, tokens),
    height: resolveDimension(box.height, tokens),

    // border
    borderRadius: resolveSize(box.radius, tokens),
    borderWidth: box.border?.width,
    borderColor: resolveColor(box.border?.color, tokens),

    // layout
    gap: resolveSize(box.gap, tokens),

    // Background
    backgroundColor: resolveColor(box?.background, tokens),

    // required for gradient & image clipping
    overflow: "hidden",
  }
}
