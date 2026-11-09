# 澄选 — Component Map

可复用组件清单：props / 状态 / 使用页面。SamCode 实现时应按此拆分；本壳用语义 HTML + BEM 式 class 模拟。

---

## 全局 / Layout

### AppHeader（前台顶栏）
- **Props：** `cartCount?: number`, `searchPlaceholder?: string`, `activeNav?: 'home' | 'category'`
- **States：** default；search focused
- **Used by：** `storefront/list.html`, `storefront/detail.html`
- **Slots：** logo, nav, search, cart icon

### AdminShell
- **Props：** `activeNav: 'products' | 'orders' | 'settings'`（后两者占位禁用）
- **States：** default
- **Used by：** `admin/products.html`, `admin/product-form.html`
- **Parts：** Sidebar, Topbar, Main

### PageHeader
- **Props：** `title: string`, `subtitle?: string`, `breadcrumbs?: {label, href?}[]`
- **Used by：** 全部页

### Footer（前台）
- **Props：** 无（静态链接占位）
- **Used by：** list, detail

---

## 商品展示

### ProductCard
- **Props：**
  - `id`, `name`, `cover`, `price`, `compareAtPrice?`
  - `badge?: string`（热卖 / 新品 / 限时）
  - `stock: number`
  - `href: string`
- **States：** default, hover (抬升阴影), soldOut (`stock === 0`)
- **Used by：** list 网格；detail 相关推荐
- **Notes：** 整卡可点；内部次级「加购」按钮 `stopPropagation` 语义留注释

### Price
- **Props：** `amount: number`, `compareAt?: number`, `currency?: 'CNY'`, `size?: 'sm' | 'md' | 'lg'`
- **States：** default；hasCompare（显示划线价）
- **Used by：** ProductCard, detail 信息区, AdminTable 价格列
- **Format：** `¥` + 两位小数或整数（壳层用整数示意）

### Badge
- **Props：** `label: string`, `tone?: 'accent' | 'success' | 'warning' | 'danger' | 'neutral'`
- **States：** default
- **Used by：** ProductCard, detail, AdminTable 状态/库存

### ProductGallery
- **Props：** `images: string[]`, `alt: string`
- **States：** selectedIndex
- **Used by：** detail
- **Shell：** 点击缩略图切换主图（少量 vanilla JS）

### SpecPicker
- **Props：** `label: string`, `options: {id, label, disabled?}[]`, `value?: string`
- **States：** default, selected, disabled option
- **Used by：** detail

### QtyStepper
- **Props：** `value: number`, `min?: 1`, `max?: number`
- **States：** default；atMin / atMax（按钮 disabled）
- **Used by：** detail
- **Shell：** +/- 可交互 demo

---

## 筛选与列表工具

### FilterBar
- **Props：**
  - `categories: {id, label}[]`
  - `activeCategory?: string`
  - `sort: 'default' | 'sales' | 'price_asc' | 'price_desc'`
  - `resultCount?: number`
- **States：** chip active
- **Used by：** list
- **Shell：** chip 点击切换 active class（vanilla JS）

### SearchInput
- **Props：** `placeholder`, `value?`, `size?: 'sm' | 'md'`
- **Used by：** AppHeader, Admin 工具条

### Pagination
- **Props：** `page`, `totalPages`
- **States：** active page；disabled prev/next
- **Used by：** list, admin products
- **Shell：** 静态页码，无真实翻页

---

## 后台

### AdminTable
- **Props：** `columns`, `rows`, `emptyText?`
- **States：** default；row hover；empty
- **Columns（商品）：** 勾选?, 封面, 名称+SKU, 分类, 价格, 库存, 状态, 操作
- **Used by：** `admin/products.html`

### StatusBadge（可复用 Badge）
- **Map：** `active→success 上架` / `draft→neutral 草稿` / `archived→neutral 已下架`

### Toolbar
- **Props：** search, filters, primaryAction (`新建商品`)
- **Used by：** admin products

### FormField
- **Props：** `label`, `required?`, `hint?`, `error?`, `htmlFor`
- **States：** default, error, disabled
- **Used by：** product-form
- **Controls：** TextInput, Textarea, Select, NumberInput, Toggle/Switch（上架）

### FormSection
- **Props：** `title`, `description?`
- **Used by：** product-form（基本信息 / 价格库存 / 媒体 / 状态）

### FormActions（底部条）
- **Props：** `onCancel`, `onSubmit`, `submitLabel`, `busy?`
- **Used by：** product-form
- **Shell：** sticky 底栏视觉，按钮无提交

### EmptyState
- **Props：** `title`, `description?`, `actionLabel?`
- **Used by：** list（无结果）、AdminTable empty

### Button
- **Props：** `variant: 'primary' | 'secondary' | 'ghost' | 'danger'`, `size: 'sm' | 'md' | 'lg'`, `disabled?`
- **Used by：** 全局

---

## Class 命名约定（壳层）

前缀 `cx-`（ChengXuan）：

- `cx-btn`, `cx-btn--primary`, `cx-btn--ghost`
- `cx-badge`, `cx-badge--warning`
- `cx-card`, `cx-price`, `cx-filter-bar`
- `cx-admin-shell`, `cx-table`, `cx-field`

页面容器：`cx-page`, `cx-container`

---

## 页面 ↔ 组件矩阵

| Component        | list | detail | products | product-form |
|------------------|:----:|:------:|:--------:|:------------:|
| AppHeader        |  ✓   |   ✓    |          |              |
| Footer           |  ✓   |   ✓    |          |              |
| AdminShell       |      |        |    ✓     |      ✓       |
| ProductCard      |  ✓   |   ✓    |          |              |
| Price            |  ✓   |   ✓    |    ✓     |              |
| Badge            |  ✓   |   ✓    |    ✓     |              |
| FilterBar        |  ✓   |        |          |              |
| ProductGallery   |      |   ✓    |          |              |
| SpecPicker       |      |   ✓    |          |              |
| QtyStepper       |      |   ✓    |          |              |
| AdminTable       |      |        |    ✓     |              |
| Toolbar          |      |        |    ✓     |              |
| FormField/Section|      |        |          |      ✓       |
| FormActions      |      |        |          |      ✓       |
| Pagination       |  ✓   |        |    ✓     |              |
| Button           |  ✓   |   ✓    |    ✓     |      ✓       |
