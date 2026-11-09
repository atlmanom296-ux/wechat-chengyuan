# 澄选 dept-store — File List

## UI shell（Web 静态）

| Path | Role |
|------|------|
| `./DESIGN.md` | Brand tokens, IA, UX |
| `./COMPONENT_MAP.md` | Components, props, page matrix |
| `./SAM_HANDOFF.md` | Handoff for Sam/SamCode |
| `./FILE_LIST.md` | This index |
| `./index.html` | Preview hub |
| `./assets/styles.css` | Shared stylesheet |
| `./assets/logo-mark.svg` | Brand mark |
| `./assets/placeholders/*.svg` | Product cover placeholders |
| `./storefront/list.html` | Storefront product list |
| `./storefront/detail.html` | Storefront product detail |
| `./admin/products.html` | Admin product list |
| `./admin/product-form.html` | Admin create/edit form |

## 微信小程序壳（新增）

| Path | Role |
|------|------|
| `miniprogram/MINIPROGRAM_DESIGN.md` | 小程序页面地图、rpx、导航 |
| `miniprogram/MINIPROGRAM_COMPONENTS.md` | 小程序组件规范 |
| `miniprogram/app.js` / `app.json` / `app.wxss` | 全局入口与样式 tokens |
| `miniprogram/project.config.json` | DevTools 工程（appid 占位） |
| `miniprogram/sitemap.json` | 索引规则 |
| `miniprogram/pages/login/*` | 登录壳 |
| `miniprogram/pages/list/*` | 商品列表 |
| `miniprogram/pages/detail/*` | 商品详情 |
| `miniprogram/components/brand-mark/*` | 品牌 mark |
| `miniprogram/components/price-tag/*` | 价格 |
| `miniprogram/components/filter-chips/*` | 分类 chips |
| `miniprogram/components/product-card/*` | 商品卡 |
| `miniprogram/components/qty-stepper/*` | 数量步进 |
| `miniprogram/utils/tokens.js` | 品牌色常量 |
| `miniprogram/utils/products.js` | 示例商品数据 |
| `miniprogram/assets/logo-mark.svg` | 品牌资源副本 |
| `miniprogram/assets/placeholders/*.svg` | 商品图占位（建议上线转 PNG） |

## 管理端微信小程序（新增，独立工程）

| Path | Role |
|------|------|
| `miniprogram-admin/README.md` | 导入说明、占位管理员、API 对照 |
| `miniprogram-admin/app.js` / `app.json` / `app.wxss` | 管理端入口与样式 tokens |
| `miniprogram-admin/project.config.json` | DevTools 工程（`touristappid`） |
| `miniprogram-admin/sitemap.json` | 索引规则 |
| `miniprogram-admin/pages/login/*` | 用户名密码登录 |
| `miniprogram-admin/pages/products/*` | 商品列表 / 上下架 / 删除 |
| `miniprogram-admin/pages/product-form/*` | 新建与编辑 |
| `miniprogram-admin/utils/api.js` | 已有 `/api/auth` 与 `/api/admin/products*` |
| `miniprogram-admin/utils/auth.js` | `cx_admin_token` |

## 同目录已有（SamCode / 其他代理脚手架，壳层未改）

| Path | Note |
|------|------|
| `app/` | FastAPI 后端骨架 |
| `static/` | 服务端静态目录（可与壳合并时再迁） |
| `requirements.txt`, `.env.example`, `.gitignore`, `data/` | 后端配套 |

实现时建议：Web 以前台 `storefront/*.html` + `assets/styles.css` 为视觉源；小程序以 `miniprogram/` 为源。勿覆盖 DESIGN / COMPONENT_MAP 除非改版。
