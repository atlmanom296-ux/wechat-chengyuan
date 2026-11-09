# 澄选 — Sam / SamCode Handoff

## 这是什么

`./` 是**静态 UI 壳 + 设计规范**，供 SamCode 后续实现真实前后端。  
**无后端、无登录、无支付。** 打开 HTML 即可预览视觉与结构。

## 品牌（勿改名除非用户要求）

- **名称：** 澄选 ChengXuan  
- **Tagline：** 精选日常 · 澄净所见  
- **Tokens：** 见 `DESIGN.md`（青绿强调 `#0F766E`，价格色 `#C2410C`，暖灰白底）

## Shell vs 后端接线

| 壳已完成 | SamCode 需接线 |
|----------|----------------|
| 页面结构、布局、组件视觉态 | 商品 CRUD API、列表分页/筛选/排序 |
| 示例商品数据（写死在 HTML） | 真实数据模型（见 DESIGN.md §5） |
| 详情图切换、筛选 chip、数量步进（本地 JS） | 加购/库存校验/规格 SKU 映射 |
| 后台表格与表单布局 | 鉴权、保存校验、上传图片、状态流转 |
| 购物车图标数字占位 | 购物车服务（本期可不做） |

**明确不做（本期）：** 登录页、支付、订阅、代理链接、订单流。

## 如何打开预览

在本机或 box 上直接用浏览器打开文件（`file://` 即可）：

```bash
# 推荐：本地静态服务（任意目录）
cd ./
python3 -m http.server 8765
# 然后访问：
# http://127.0.0.1:8765/storefront/list.html
# http://127.0.0.1:8765/storefront/detail.html
# http://127.0.0.1:8765/admin/products.html
# http://127.0.0.1:8765/admin/product-form.html
```

或双击 / `xdg-open` 各 HTML。样式依赖相对路径 `../assets/styles.css` 与 `assets/` 下 SVG。

## 文件清单（实现时对照）

```
dept-store/
├── DESIGN.md              # 品牌 tokens、IA、UX
├── COMPONENT_MAP.md       # 组件 props/状态/页面矩阵
├── SAM_HANDOFF.md         # 本文件
├── FILE_LIST.md
├── assets/
│   ├── styles.css         # 唯一主样式
│   ├── logo-mark.svg
│   └── placeholders/      # 商品占位插画 SVG
├── storefront/
│   ├── list.html
│   └── detail.html
└── admin/
    ├── products.html
    └── product-form.html
```

## 给 SamCode 的建议落地顺序

1. 抽 `cx-*` CSS 为设计 token / theme（或迁入 Tailwind theme 映射 DESIGN.md）
2. 建路由：前台 list/detail；后台 products + form
3. 按 `COMPONENT_MAP.md` 拆组件，先 ProductCard / Price / Badge / AdminTable / FormField
4. 用示例 JSON 对齐字段名（`sku`, `compareAtPrice`, `status`, `stock`…）
5. 再接 API；壳层 class 名可保留作视觉回归参考

## 联系边界

- **视觉 / 页面结构疑问：** 回看 DESIGN.md + 打开 HTML 对照  
- **实现排期 / 仓库位置：** 问 Sam  
- **勿改：** `/workspace/sub-webui/`（已叫停的订阅壳）


## 同目录后端脚手架（注意）

交付壳时，目录内已存在 SamCode 的 FastAPI 骨架（`app/`、`requirements.txt` 等）。**UI 壳未修改这些文件。**  
对接时请以本目录 `DESIGN.md` / `COMPONENT_MAP.md` / `storefront|admin/*.html` 为视觉与 IA 源；可将 `assets/styles.css` 挂到 FastAPI `StaticFiles`，或把 HTML 改为模板。

预览仍可纯静态打开，不必先起后端。

---

## 微信小程序壳（新增）

路径：`./miniprogram/`

**范围：** 登录页 + 商品列表 + 商品详情 UI 壳（WXML/WXSS/JS/JSON + 组件）。**无支付、无订单、无后台。**

| 文档 | 用途 |
|------|------|
| `miniprogram/MINIPROGRAM_DESIGN.md` | 页面地图、导航、rpx token、微信注意点 |
| `miniprogram/MINIPROGRAM_COMPONENTS.md` | 组件 props / events / 状态 |
| `miniprogram/app.json` | 页面注册；入口 `pages/login/login` |
| `miniprogram/utils/products.js` | 示例商品（字段对齐 DESIGN.md §5） |

**路由：** `login` → `reLaunch` → `list` → `navigateTo` → `detail`（无 tabBar）。

**品牌：** 仍用澄选 ChengXuan（`#0F766E` / `#C2410C` / `#F7F7F5`），与 Web 壳一致。

**给 SamCode：** 用微信开发者工具打开 `miniprogram/`（`appid` 占位 `touristappid`）；将静态 `utils/products.js` 换成与 FastAPI `/api/products` 的请求；登录接 `wx.login`；详情主 CTA 保持非支付（心愿单/加购）。上线前将 SVG 占位图转为 PNG/WebP。

## 管理端微信小程序（新增）

路径：`./miniprogram-admin/`（独立 `app.json`，勿与用户端 `miniprogram/` 合并）。

管理员用户名/密码登录后走已有 `POST /api/auth/login` 与 `/api/admin/products*`（商品 CRUD / 上下架）。默认占位 `admin` / `change-me-please`。详见 `miniprogram-admin/README.md`。

**勿动：** 现有 `storefront/`、`admin/` HTML 壳与 `app/` FastAPI；勿碰 `/workspace/sub-webui/`。
