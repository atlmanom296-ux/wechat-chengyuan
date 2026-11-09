# 澄选 ChengXuan — 微信小程序 MVP

UI-PRO 视觉壳 + FastAPI 商品 / 微信登录接线。**无支付 / 无订单 / 无购物车结算。**

设计说明：`MINIPROGRAM_DESIGN.md`、`MINIPROGRAM_COMPONENTS.md`。

## 微信开发者工具导入

1. 启动后端（同机）：
   ```bash
   cd ./
   source .venv/bin/activate
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```
2. 打开 **微信开发者工具** → 导入项目 → 目录选本文件夹：
   `./miniprogram/`
3. AppID 使用 `touristappid`（见 `project.config.json`），或换成你的测试号。
4. 详情里关闭「校验合法域名」；本仓库已设 `setting.urlCheck: false`。
5. 模拟器可直接请求 `http://127.0.0.1:8000`。
6. **真机预览**：把 `utils/api.js` 里的 `BASE_URL` 改成电脑局域网 IP，例如 `http://192.168.1.8:8000`，并保证手机与电脑同网、防火墙放行 8000。

入口：`pages/login/login` → 「微信一键登录」或「先逛逛」→ 列表 → 详情。

## API 基址

`utils/api.js`：

```js
const BASE_URL = "http://127.0.0.1:8000"; // 真机改为 LAN IP
```

## 登录：Mock vs 真实微信

| 模式 | 条件 | 行为 |
|------|------|------|
| **Mock（默认）** | `.env` / 默认 `WX_MOCK_OPENID=1`，或 AppID/Secret 仍为占位 | `POST /api/wx/login` 接受任意 `code`，返回确定性 `mock_openid_*` + JWT |
| **真实** | `WX_MOCK_OPENID=0` 且填写真实 `WX_APPID` / `WX_SECRET`（仅放 `.env`，勿提交） | 调用微信 `jscode2session` |

占位见仓库根目录 `.env.example`。**不要把真实 Secret 写进小程序或 git。**

登录页：`wx.login` → `POST /api/wx/login`；可选手机号仅作占位字段。浏览商品 **不需要** 登录。

## 商品数据

- 优先：`GET /api/products`、`GET /api/products/{id}`（与 Web 共用）
- API 不可达时回退 `utils/products.js` 静态壳数据
- 字段映射：`cover←image_url`，`compareAtPrice←compare_at_price`，`badges←badge`，`status←is_published`

## 不做

支付、`wx.requestPayment`、订单、代理订阅、后台管理页。
