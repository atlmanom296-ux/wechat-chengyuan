# 澄选小程序 — 组件规范

前缀约定与 Web 一致：视觉 class 多用 `cx-*`；组件目录用 kebab-case。

---

## brand-mark

| | |
|--|--|
| **路径** | `components/brand-mark/` |
| **Props** | `name` (默认「澄选」), `tagline`, `size`: `sm\|md\|lg`, `showText`, `showTagline` |
| **Slots** | 无（几何 mark 用 view 绘制，不依赖 SVG 引擎） |
| **States** | default |
| **Used by** | login |

---

## price-tag

| | |
|--|--|
| **路径** | `components/price-tag/` |
| **Props** | `amount: number`, `compareAt?: number`, `size: sm\|md\|lg`, `suffix?: string`（多规格「起」） |
| **States** | default；有 `compareAt` 时显示划线价 |
| **Used by** | product-card, detail |
| **Notes** | 颜色固定 `#C2410C`；格式整数或两位小数 |

---

## filter-chips

| | |
|--|--|
| **路径** | `components/filter-chips/` |
| **Props** | `items: {id, label}[]`, `activeId: string` |
| **Events** | `change` → `{ id }` |
| **States** | chip `is-active` |
| **Used by** | list |

---

## product-card

| | |
|--|--|
| **路径** | `components/product-card/` |
| **Props** | `productId, name, cover, price, compareAtPrice?, badge?, stock, category, sku` |
| **Events** | `open` → `{ id }` |
| **States** | default；`stock === 0` → `is-soldout` 遮罩「售罄」 |
| **Used by** | list 网格；detail 相关推荐 |
| **Depends** | price-tag |

---

## qty-stepper

| | |
|--|--|
| **路径** | `components/qty-stepper/` |
| **Props** | `value, min=1, max` |
| **Events** | `change` → `{ value }` |
| **States** | atMin / atMax → 按钮 `is-disabled` |
| **Used by** | detail |

---

## 页面级非组件块（壳内实现）

| 块 | 页 | 说明 |
|----|----|------|
| Search bar | list | input + 清除 |
| Sort links | list | 综合 / 销量 / 价格 |
| Gallery swiper | detail | indicator 强调色 |
| Spec pills | detail | 选中描边 accent；disabled 划线 |
| Bottom action bar | detail | secondary + primary；**非支付** |
| EmptyState | list / detail miss | `.cx-empty` |

---

## 全局样式工具（app.wxss）

- `.cx-page` / `.cx-safe-bottom`
- `.cx-btn` + `--primary` / `--secondary` / `--ghost` / `--block` / `--lg`
- `.cx-badge` + tone modifiers
- `.cx-empty*`

实现框架化（Skyline / glass-easel / TDesign 等）时，保留 props/事件契约即可换皮。
