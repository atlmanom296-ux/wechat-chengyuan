# 澄选 ChengXuan — 百货商品站 MVP

UI-PRO visual shell + FastAPI product CRUD. **No payments / checkout / cart settlement.**

Brand: **澄选 ChengXuan** · accent `#0F766E` · price `#C2410C` · cart icon is placeholder only.

## Stack

- **UI:** UI-PRO shell (`storefront/`, `admin/`, `assets/`) — see `DESIGN.md`
- **API:** FastAPI + SQLAlchemy 2 + SQLite
- **Auth:** Fixed admin from env → JWT Bearer

## Run (front + back together)

```bash
cd ./
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # optional
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

| URL | Page |
|-----|------|
| http://127.0.0.1:8000/ | Storefront list |
| http://127.0.0.1:8000/storefront/list.html | Storefront list |
| http://127.0.0.1:8000/storefront/detail.html?id=1 | Product detail |
| http://127.0.0.1:8000/admin/login.html | Admin login |
| http://127.0.0.1:8000/admin/products.html | Admin table |
| http://127.0.0.1:8000/admin/product-form.html | Create / edit |
| http://127.0.0.1:8000/hub | Shell preview hub |
| http://127.0.0.1:8000/docs | OpenAPI |
| http://127.0.0.1:8000/health | Health |

Default admin: `admin` / `change-me-please` (`.env.example`).

SQLite: `./data/store.db` (seeded with ChengXuan demo catalog when empty).

## Field mapping (shell ↔ API)

| DESIGN / shell | API field |
|----------------|-----------|
| cover | `image_url` |
| compareAtPrice | `compare_at_price` |
| badges[0] | `badge` |
| status `active` | `is_published: true` |
| status `draft` / archived | `is_published: false` |
| sku, name, category, price, stock, description | same names (snake_case in JSON) |

## Docs

- `API_CONTRACT.md` — endpoints
- `DESIGN.md` / `COMPONENT_MAP.md` / `SAM_HANDOFF.md` — UI-PRO (preserve)
- `HANDOFF.md` — Sam summary

## WeChat mini program

Directory: `miniprogram/`. Import in 微信开发者工具; see `miniprogram/README.md`.
Backend: `POST /api/wx/login`, `GET /api/wx/me` (mock openid via `WX_MOCK_OPENID=1`).

## Out of scope

Payments, checkout, real cart, orders, image upload binary, proxy/subscription billing.
