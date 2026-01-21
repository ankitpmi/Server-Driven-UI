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
    paddingVertical: resolveSpacing(box.paddingVertical, tokens),
    paddingHorizontal: resolveSpacing(box.paddingHorizontal, tokens),

    margin: resolveSpacing(box.margin, tokens),
    marginTop: resolveSpacing(box.marginTop, tokens),
    marginBottom: resolveSpacing(box.marginBottom, tokens),
    marginStart: resolveSpacing(box.marginStart, tokens),
    marginEnd: resolveSpacing(box.marginEnd, tokens),
    marginVertical: resolveSpacing(box.marginVertical, tokens),
    marginHorizontal: resolveSpacing(box.marginHorizontal, tokens),

    // size
    width: resolveDimension(box.width, tokens),
    height: resolveDimension(box.height, tokens),

    // border
    borderRadius: resolveSize(box.borderRadius, tokens),
    borderWidth: box.border?.width,
    borderColor: resolveColor(box.border?.color, tokens),

    // layout
    gap: resolveSize(box.gap, tokens),

    // Background
    backgroundColor: resolveColor(box?.background?.value, tokens),

    // required for gradient & image clipping
    overflow: "hidden",
  }
}
