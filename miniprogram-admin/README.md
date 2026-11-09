# 澄选 ChengXuan — 管理端微信小程序

独立于用户端 `../miniprogram/` 的 **后台 CMS** 小程序：管理员登录 + 商品 CRUD / 上下架。  
与 Web 后台共用 FastAPI：`POST /api/auth/login`、`/api/admin/products*`。

**无支付 / 无订单 / 无代理订阅。** 勿与用户端合并为同一个 `app.json`。

## 微信开发者工具导入

1. 启动后端（与 Web / 用户端小程序相同）：
   ```bash
   cd ./
   source .venv/bin/activate
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```
2. 打开 **微信开发者工具** → 导入项目 → 目录选 **本文件夹**：
   ```
   ./miniprogram-admin/
   ```
3. AppID 使用 `touristappid`（见 `project.config.json`），或换成你的测试号。
4. 详情里关闭「校验合法域名」；本仓库已设 `setting.urlCheck: false`。
5. 模拟器可直接请求 `http://127.0.0.1:8000`。
6. **真机预览**：把 `utils/api.js` 里的 `BASE_URL` 改成电脑局域网 IP，例如 `http://192.168.1.8:8000`，并保证手机与电脑同网、防火墙放行 8000。

入口：`pages/login/login` → 商品列表 → 新建/编辑表单。

## 默认管理员（占位）

与 Web 后台相同，来自根目录 `.env` / `.env.example`：

| 字段 | 默认占位 |
|------|----------|
| 用户名 | `admin` |
| 密码 | `change-me-please` |

**不要把真实密钥写进小程序或提交到 git。** JWT 存在本地 storage 键 `cx_admin_token`（与用户端 `cx_access_token` 分开）。

## API 基址

`utils/api.js`：

```js
const BASE_URL = "http://127.0.0.1:8000"; // 真机改为 LAN IP
```

| 能力 | 方法 | 路径 |
|------|------|------|
| 登录 | POST | `/api/auth/login` |
| 商品列表 | GET | `/api/admin/products` |
| 新建 | POST | `/api/admin/products` |
| 更新 | PUT | `/api/admin/products/{id}` |
| 删除 | DELETE | `/api/admin/products/{id}` |
| 上下架 | PATCH | `/api/admin/products/{id}/publish` |

编辑页通过列表结果按 `id` 回填（后端暂无单独的 admin GET-by-id）。

## 页面

| 路径 | 说明 |
|------|------|
| `pages/login/login` | 用户名+密码 → JWT → 列表 |
| `pages/products/products` | 搜索 / 全部·上架·下架、上架下架、删除、编辑、新建 |
| `pages/product-form/product-form` | 无 `id`=新建；`?id=`=编辑；字段对齐 ProductCreate/Update |

无 token 访问列表/表单会 `reLaunch` 到登录页。

## 视觉

Token 与用户端一致：accent `#0F766E`、price `#C2410C`、bg `#F7F7F5`（见 `app.wxss`）。

## 不做

支付、订单、用户端浏览页、代理订阅、二进制图片上传。
