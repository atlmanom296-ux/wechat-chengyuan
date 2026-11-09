# 澄选 ChengXuan — Design System

**品牌名：** 澄选（ChengXuan）  
**Tagline：** 精选日常 · 澄净所见  
**定位：** 轻量现代百货电商 —— 日用、家居、个护、数码配件一站选购。  
**视觉气质：** 留白充足、层级清晰、偏 SaaS/精品电商；白/米白底 + 单一强强调色（青绿）。

---

## 1. Brand Tokens

### 1.1 Color

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#F7F7F5` | 页面底（暖灰白） |
| `--color-surface` | `#FFFFFF` | 卡片 / 面板 / 顶栏 |
| `--color-surface-muted` | `#F0F0ED` | 次级区块、表格斑马、输入底 |
| `--color-border` | `#E5E5E0` | 默认描边 |
| `--color-border-strong` | `#D0D0C8` | 强调描边、分割线 |
| `--color-text` | `#1A1A18` | 主文案 |
| `--color-text-secondary` | `#6B6B63` | 辅助说明 |
| `--color-text-muted` | `#9A9A90` | 占位、禁用 |
| `--color-accent` | `#0F766E` | 主强调（青绿） |
| `--color-accent-hover` | `#0D9488` | 悬停 |
| `--color-accent-soft` | `#CCFBF1` | 强调浅底 / Badge soft |
| `--color-accent-ink` | `#134E4A` | 浅底上的强调文字 |
| `--color-danger` | `#DC2626` | 删除 / 错误 / 售罄 |
| `--color-danger-soft` | `#FEE2E2` | 危险浅底 |
| `--color-warning` | `#D97706` | 库存预警 |
| `--color-warning-soft` | `#FEF3C7` | 预警浅底 |
| `--color-success` | `#16A34A` | 上架 / 成功 |
| `--color-success-soft` | `#DCFCE7` | 成功浅底 |
| `--color-price` | `#C2410C` | 售价强调（暖橙红，与青绿区分） |
| `--color-overlay` | `rgba(26,26,24,0.45)` | 遮罩 |

### 1.2 Typography

| Token | Value | Notes |
|-------|-------|-------|
| `--font-sans` | `"Inter", "PingFang SC", "Noto Sans SC", "Microsoft YaHei", system-ui, sans-serif` | 中英混排 |
| `--font-mono` | `"JetBrains Mono", "SF Mono", ui-monospace, monospace` | SKU / 编码 |
| `--text-xs` | `12px / 16px` | 标签、辅助 |
| `--text-sm` | `13px / 18px` | 表格次要、元信息 |
| `--text-base` | `14px / 22px` | 正文默认 |
| `--text-md` | `15px / 24px` | 卡片标题 |
| `--text-lg` | `18px / 28px` | 区块标题 |
| `--text-xl` | `22px / 30px` | 页标题 |
| `--text-2xl` | `28px / 36px` | 详情商品名 |
| `--text-display` | `32px / 40px` | 营销大标题（可选） |
| `--font-weight-regular` | `400` | |
| `--font-weight-medium` | `500` | |
| `--font-weight-semibold` | `600` | |
| `--font-weight-bold` | `700` | 价格、关键 CTA |

**层级原则：** 页标题 semibold；商品名 medium/semibold；价格 bold + `--color-price`；元信息 secondary/muted。

### 1.3 Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Badge、小按钮、输入内控件 |
| `--radius-md` | `10px` | 按钮、输入框、筛选项 |
| `--radius-lg` | `14px` | 卡片、面板 |
| `--radius-xl` | `20px` | 大图容器、空状态 |
| `--radius-full` | `9999px` | 胶囊标签、头像 |

### 1.4 Shadow

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(26,26,24,0.04)` | 轻浮层 |
| `--shadow-md` | `0 4px 12px rgba(26,26,24,0.06), 0 1px 3px rgba(26,26,24,0.04)` | 卡片悬停 |
| `--shadow-lg` | `0 12px 32px rgba(26,26,24,0.08)` | 下拉、模态 |
| `--shadow-focus` | `0 0 0 3px rgba(15,118,110,0.25)` | 焦点环 |

### 1.5 Spacing（8px 基准）

| Token | Value |
|-------|-------|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |

**布局宽：** 前台内容区 `max-width: 1200px`；后台内容区 `max-width: 1280px`（侧栏外）。

### 1.6 Motion

- 过渡默认：`150ms ease`（hover / focus）
- 面板展开：`200ms ease-out`
- 避免花哨动画；壳层仅用 CSS transition。

---

## 2. Page Map & IA

```
澄选 ChengXuan
├── 前台 Storefront
│   ├── / 商品列表 list.html          （分类筛选 + 排序 + 网格）
│   └── /p/:id 商品详情 detail.html   （图 + 信息 + 规格示意）
└── 后台 Admin
    ├── /admin/products 商品列表 products.html
    └── /admin/products/new|edit 表单 product-form.html
```

**本期不做：** 登录、支付、购物车结算、订单、会员、订阅代理。

### 2.1 前台列表 IA

1. **顶栏：** Logo「澄选」+ 主导航（首页/分类占位）+ 搜索框 + 购物车图标（占位，不可点结算）
2. **面包屑 / 页头：** 当前分类名 + 结果数
3. **FilterBar：** 分类 chips、价格区间示意、排序（综合/销量/价格）
4. **ProductGrid：** ProductCard 网格（响应式 2–4 列）
5. **分页 / 加载更多**（静态示意）
6. **页脚：** 品牌短述 + 链接占位

### 2.2 前台详情 IA

1. 顶栏同列表
2. 面包屑：首页 / 分类 / 商品名
3. **双栏：** 左媒体区（主图 + 缩略图）；右信息区（标题、Badge、Price、库存、规格、数量、加入购物车占位）
4. **描述区块：** 卖点列表 + 长描述
5. **相关推荐：** 3–4 张 ProductCard（静态）

### 2.3 后台商品管理 IA

1. **AdminShell：** 左侧导航（商品管理高亮）+ 顶栏（站点名 + 用户占位）
2. **列表视图：** 工具条（搜索、状态筛选、新建）+ AdminTable（图、名称、SKU、分类、价格、库存、状态、操作）
3. **表单视图：** 基本信息 / 价格库存 / 媒体 / 状态；底部固定操作条（取消 / 保存）

---

## 3. Key UX Notes

### 列表
- 卡片点击整卡进详情；「加入购物车」为次级按钮，壳层仅视觉。
- 售罄：图片遮罩「售罄」+ 按钮 disabled。
- 筛选 chips 单选高亮；「全部」为默认态。
- 空结果：插画/图标 + 「换个关键词试试」。

### 详情
- 价格区：现价大号 + 划线原价（若有）+ 单位「起」仅在多规格时。
- 库存：`库存充足` / `仅剩 N 件` / `暂时缺货` 三态文案。
- 规格选项用 pill；选中态描边强调色。
- 主 CTA 一枚即可；次要操作用幽灵按钮。

### 后台
- 表格行 hover 浅底；操作列「编辑 / 下架 / 删除」文字链，删除用 danger。
- 库存 ≤ 10：Warning Badge；= 0：Danger「缺货」。
- 表单必填字段标 `*`；校验错误红框 + 字段下说明（壳层可静态演示一行）。
- 新建 vs 编辑：同一表单页，标题与默认值不同。

---

## 4. Logo Mark

- 文字标：字重 semibold，「澄」字可搭配简易几何 mark（圆角方中嵌一竖条，象征「澄」之竖心）。
- SVG 见 `assets/logo-mark.svg`；前台顶栏用 mark + 字；后台侧栏同款缩小。

---

## 5. Sample Data Shape（给 SamCode）

```json
{
  "id": "p_10021",
  "sku": "CX-HM-021",
  "name": "北欧风陶瓷马克杯 350ml",
  "category": "家居",
  "price": 59,
  "compareAtPrice": 79,
  "currency": "CNY",
  "stock": 128,
  "status": "active",
  "badges": ["热卖"],
  "cover": "assets/placeholders/mug.svg",
  "description": "…"
}
```

状态枚举：`active` | `draft` | `archived`  
分类示例：家居、个护、数码、食品、服饰

---

## 6. Accessibility & Responsive

- 可聚焦控件需可见 focus ring（`--shadow-focus`）。
- 前台：&lt;640px 单列；640–960 两列；≥960 三/四列。
- 后台：&lt;900px 侧栏可收为顶栏导航（壳层桌面优先，备注即可）。
