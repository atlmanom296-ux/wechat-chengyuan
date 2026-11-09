# Handoff — 澄选 ChengXuan (Sam)

**Path:** `./`  
**Date:** 2026-11-09 (Asia/Shanghai)

## What’s live

- **UI:** UI-PRO ChengXuan shell is the product UI (`storefront/`, `admin/`, `assets/`). Placeholder `static/` is unused.
- **API:** FastAPI CRUD + JWT admin; SQLite `data/store.db` with ChengXuan seed catalog.
- **Wired pages:** list/detail fetch public API; admin login + products table + form use Bearer CRUD.
- **Login:** `/admin/login.html` (shell had none) — ChengXuan tokens from `assets/styles.css`.
- **WeChat mini program:** `miniprogram/` UI-PRO shell + `POST /api/wx/login` / `GET /api/wx/me` (mock openid by default).
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

Open `./miniprogram/`，`touristappid`，`urlCheck:false`，API `http://127.0.0.1:8000`。详见 `miniprogram/README.md`。

## Left / optional

- Binary image upload (form uses URL)
- Pagination, sales sort, multi-badge, archived status enum
- Merge any remaining shell polish without breaking `/api/*` contract
