"""FastAPI entrypoint: API + UI-PRO ChengXuan shell."""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

from app.config import BASE_DIR, DATA_DIR
from app.database import Base, SessionLocal, engine
from app.routers import auth as auth_router
from app.routers import products as products_router
from app.routers import wx as wx_router
from app.schemas import HealthResponse
from app.seed import seed_if_empty

ASSETS_DIR = BASE_DIR / "assets"
STOREFRONT_DIR = BASE_DIR / "storefront"
ADMIN_DIR = BASE_DIR / "admin"


@asynccontextmanager
async def lifespan(_: FastAPI):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_if_empty(db)
    finally:
        db.close()
    yield


app = FastAPI(
    title="澄选 ChengXuan API",
    description="Department store MVP — UI-PRO shell + product CRUD + WeChat mini-program auth (no payments).",
    version="0.3.0",
    lifespan=lifespan,
)

app.include_router(auth_router.router)
app.include_router(products_router.public_router)
app.include_router(products_router.admin_router)
app.include_router(wx_router.router)


@app.get("/health", response_model=HealthResponse, tags=["health"])
def health() -> HealthResponse:
    return HealthResponse(ok=True)


@app.get("/")
def root() -> FileResponse:
    """Storefront product list (primary entry)."""
    return FileResponse(STOREFRONT_DIR / "list.html")


@app.get("/hub")
def preview_hub() -> FileResponse:
    """Optional UI shell preview hub."""
    return FileResponse(BASE_DIR / "index.html")


@app.get("/storefront/list.html")
def storefront_list() -> FileResponse:
    return FileResponse(STOREFRONT_DIR / "list.html")


@app.get("/storefront/detail.html")
def storefront_detail() -> FileResponse:
    return FileResponse(STOREFRONT_DIR / "detail.html")


@app.get("/admin")
@app.get("/admin/")
def admin_root() -> RedirectResponse:
    return RedirectResponse(url="/admin/products.html", status_code=307)


@app.get("/admin/login.html")
def admin_login() -> FileResponse:
    return FileResponse(ADMIN_DIR / "login.html")


@app.get("/admin/products.html")
def admin_products() -> FileResponse:
    return FileResponse(ADMIN_DIR / "products.html")


@app.get("/admin/product-form.html")
def admin_product_form() -> FileResponse:
    return FileResponse(ADMIN_DIR / "product-form.html")


app.mount("/assets", StaticFiles(directory=str(ASSETS_DIR)), name="assets")
