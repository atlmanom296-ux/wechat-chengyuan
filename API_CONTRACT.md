# API Contract — 澄选 ChengXuan

JSON + Bearer admin auth. OpenAPI: `/docs`.

## Product JSON

| Field | Type | Notes |
|-------|------|-------|
| `id` | int | |
| `name` | string | |
| `price` | number | CNY |
| `compare_at_price` | number \| null | shell compareAtPrice |
| `stock` | int | |
| `category` | string | 家居/个护/数码/服饰/食品… |
| `image_url` | string \| null | shell cover |
| `sku` | string \| null | |
| `badge` | string \| null | single marketing badge |
| `description` | string \| null | |
| `is_published` | bool | true = active / 上架 |
| `created_at` / `updated_at` | ISO datetime | |

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | no | `{ok:true}` |
| POST | `/api/auth/login` | no | `{username,password}` → `{access_token,token_type}` |
| POST | `/api/auth/logout` | no | client discards token |
| GET | `/api/products` | no | published only; `?category=&q=` |
| GET | `/api/products/{id}` | no | published detail; 404 if unpublished |
| GET | `/api/admin/products` | Bearer | all products |
| POST | `/api/admin/products` | Bearer | create |
| PUT | `/api/admin/products/{id}` | Bearer | update |
| DELETE | `/api/admin/products/{id}` | Bearer | 204 |
| PATCH | `/api/admin/products/{id}/publish` | Bearer | `{is_published:bool}` |
| POST | `/api/wx/login` | no | `{code, phone?}` → `{access_token,token_type,openid,phone?}` mini-program JWT (`role=wx_user`) |
| GET | `/api/wx/me` | Bearer (wx) | `{openid, phone}` |

## UI routes (served by same uvicorn)

| Path | File |
|------|------|
| `/` | `storefront/list.html` |
| `/storefront/list.html` | list |
| `/storefront/detail.html?id=` | detail |
| `/admin/login.html` | login |
| `/admin/products.html` | admin table |
| `/admin/product-form.html?id=` | form (omit id = create) |
| `/assets/*` | UI-PRO assets |
| `/hub` | `index.html` preview hub |

## WeChat mini program

- JWT `role=wx_user`, `sub=openid:{openid}` — distinct from admin CMS tokens.
- Mock: `WX_MOCK_OPENID=1` (default) — no real AppID required.
- Shell: `miniprogram/` (UI-PRO). See `miniprogram/README.md`.

## WeChat admin mini program

- Separate project: `miniprogram-admin/` (own `app.json`; do not merge with `miniprogram/`).
- Uses **existing** admin endpoints above (`POST /api/auth/login`, `/api/admin/products*`). No new API.
- Storage key `cx_admin_token` (admin JWT). Distinct from user mini program `cx_access_token` / `role=wx_user`.
- See `miniprogram-admin/README.md`.
