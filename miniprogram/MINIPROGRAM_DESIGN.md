# 澄选微信小程序 — 设计与页面结构

**路径：** `./miniprogram/`  
**品牌：** 澄选 ChengXuan · 精选日常 · 澄净所见  
**范围：** 登录壳 + 商品列表 + 商品详情。**不做支付 / 订单 / 后台 / 购物车结算。**

对齐 Web 壳：`../DESIGN.md`、`../COMPONENT_MAP.md`。

---

## 1. 页面地图与导航

```
pages/login/login   ← app 入口（app.json pages[0]）
        │  微信登录占位 / 「先逛逛」
        ▼  wx.reLaunch
pages/list/list     ← 商品列表（搜索 + 分类 chips + 排序 + 双列网格）
        │  点击 ProductCard
        ▼  wx.navigateTo
pages/detail/detail ← 详情（图集 / 规格 / 数量 / 非支付主 CTA）
```

**无 tabBar。** 登录 → 列表用 `reLaunch`；列表 → 详情用 `navigateTo`；相关推荐用 `redirectTo` 换详情。

| 路由 | 导航栏 | 说明 |
|------|--------|------|
| `pages/login/login` | `navigationStyle: custom` | 全屏品牌区 + 登录卡 |
| `pages/list/list` | 默认「澄选 · 精选日常」 | 白顶栏 |
| `pages/detail/detail` | 默认，标题=商品名 | 底栏固定 CTA |

---

## 2. Token → rpx 映射

约定：**设计稿 375pt 宽，`1px ≈ 2rpx`**。CSS 变量写在 `app.wxss` 的 `page {}`。

| Web token | Web px | 小程序 | 值 |
|-----------|--------|--------|-----|
| `--color-bg` | — | `--color-bg` | `#F7F7F5` |
| `--color-surface` | — | `--color-surface` | `#FFFFFF` |
| `--color-accent` | — | `--color-accent` | `#0F766E` |
| `--color-price` | — | `--color-price` | `#C2410C` |
| `--color-text` | — | `--color-text` | `#1A1A18` |
| `--color-text-secondary` | — | `--color-text-secondary` | `#6B6B63` |
| `--radius-sm` | 6 | `--radius-sm` | `12rpx` |
| `--radius-md` | 10 | `--radius-md` | `20rpx` |
| `--radius-lg` | 14 | `--radius-lg` | `28rpx` |
| `--radius-xl` | 20 | `--radius-xl` | `40rpx` |
| `--space-2` | 8 | `--space-2` | `16rpx` |
| `--space-4` | 16 | `--space-4` | `32rpx` |
| `--text-base` | 14 | page 默认 | `28rpx` |
| `--text-md` | 15 | 卡片标题 | `28–30rpx` |
| `--text-xl` / 2xl | 22–28 | 详情名 | `40rpx` |

JS 侧常量：`utils/tokens.js`。

---

## 3. 各页结构

### 3.1 Login
1. 顶部品牌 mark（组件 `brand-mark` size=lg）+ tagline  
2. 卡片：手机号 input（示意）  
3. 主按钮「微信一键登录（占位）」→ toast → `reLaunch` list  
4. 幽灵按钮「先逛逛商品」  
5. 脚注：本期不做真实鉴权  

### 3.2 List
1. 搜索条  
2. `filter-chips`（全部分类）  
3. 工具条：结果数 + 排序（综合/销量/价格↑↓）  
4. 双列 `product-card` 网格  
5. 空状态文案  

### 3.3 Detail
1. `swiper` 图集  
2. 信息面板：Badge、标题、SKU、Price、库存三态  
3. Spec pills（可选）  
4. Qty stepper  
5. 卖点 + 描述  
6. 相关推荐横滑  
7. **底栏：** 收藏占位 + **「加入心愿单（非支付）」**（缺货禁用）  

---

## 4. 微信端注意

- **Safe area：** 底栏 / 页脚用 `env(safe-area-inset-bottom)`（见 `.cx-safe-bottom`）。  
- **自定义导航：** 仅 login；list/detail 用系统导航栏（背景 `#FFFFFF`，标题黑字，见 `app.json` window）。  
- **SVG 占位图：** 壳层用 `assets/placeholders/*.svg`。真机 / 部分基础库对 `<image src="*.svg">` 支持不稳定 → **SamCode 上线前请转 PNG/WebP**，路径保持相对 `assets/`。  
- **appid：** `project.config.json` 为 `touristappid` 占位，换真实 AppID 即可导入 DevTools。  
- **组件懒加载：** `lazyCodeLoading: requiredComponents`。  
- **禁止：** 支付、订单、订阅消息模板（本期）、后台管理页。

---

## 5. 给 SamCode 的接线点

| 壳行为 | 建议接线 |
|--------|----------|
| `onWxLogin` toast + reLaunch | `wx.login` → 后端 code2session → 存 token |
| `utils/products.js` 静态数组 | `GET /api/products`、`GET /api/products/:id`（可与 Web FastAPI 共用） |
| 心愿单 CTA | 收藏 / 加购 API（**非** `wx.requestPayment`） |
| 规格选择 | SKU 映射与库存校验 |

字段形状与 Web `DESIGN.md` §5 一致：`id, sku, name, category, price, compareAtPrice, currency, stock, status, badges, cover, description`。
