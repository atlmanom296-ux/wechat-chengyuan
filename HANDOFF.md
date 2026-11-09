# Handoff — 澄选 ChengXuan (Sam)

**Path:** `./`  
**Date:** 2026-11-09 (Asia/Shanghai)

## What’s live

- **UI:** UI-PRO ChengXuan shell is the product UI (`storefront/`, `admin/`, `assets/`). Placeholder `static/` is unused.
- **API:** FastAPI CRUD + JWT admin; SQLite `data/store.db` with ChengXuan seed catalog.
- **Wired pages:** list/detail fetch public API; admin login + products table + form use Bearer CRUD.
- **Login:** `/admin/login.html` (shell had none) — ChengXuan tokens from `assets/styles.css`.
- **WeChat mini program (user):** `miniprogram/` UI-PRO shell + `POST /api/wx/login` / `GET /api/wx/me` (mock openid by default).
- **WeChat mini program (admin CMS):** `miniprogram-admin/` — username/password → admin JWT + product CRUD/publish against existing `/api/admin/*` (separate app; no merge with user mini program).
- **No payments / cart settlement / proxy-subscription.**

## Run

```bash
cd ./
source .venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Admin: `admin` / `change-me-please`

## Preserve (UI-PRO)

`DESIGN.md`, `COMPONENT_MAP.md`, `SAM_HANDOFF.md`, `FILE_LIST.md`, brand assets — do not overwrite casually.

## Mini program DevTools

- **用户端：** 导入 `./miniprogram/`，`touristappid`，`urlCheck:false`，API `http://127.0.0.1:8000`。详见 `miniprogram/README.md`。
- **管理端：** 导入 `./miniprogram-admin/`（独立工程），登录 `admin` / `change-me-please`（`.env` 占位）。详见 `miniprogram-admin/README.md`。不改动 API 契约。

## Left / optional

- Binary image upload (form uses URL)
- Pagination, sales sort, multi-badge, archived status enum
- Merge any remaining shell polish without breaking `/api/*` contract
