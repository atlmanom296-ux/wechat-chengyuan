/** 澄选品牌 tokens —— 与 DESIGN.md / app.wxss 对齐（给 JS 侧引用） */
const COLORS = {
  bg: "#F7F7F5",
  surface: "#FFFFFF",
  surfaceMuted: "#F0F0ED",
  border: "#E5E5E0",
  borderStrong: "#D0D0C8",
  text: "#1A1A18",
  textSecondary: "#6B6B63",
  textMuted: "#9A9A90",
  accent: "#0F766E",
  accentHover: "#0D9488",
  accentSoft: "#CCFBF1",
  accentInk: "#134E4A",
  danger: "#DC2626",
  warning: "#D97706",
  success: "#16A34A",
  price: "#C2410C"
};

const BRAND = {
  name: "澄选",
  nameEn: "ChengXuan",
  tagline: "精选日常 · 澄净所见"
};

/** px→rpx 约定：设计稿 375 宽时 1px = 2rpx */
function pxToRpx(px) {
  return px * 2;
}

module.exports = {
  COLORS,
  BRAND,
  pxToRpx
};
