"""Public and admin product endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.database import get_db
from app.models import Product
from app.schemas import ProductCreate, ProductOut, ProductUpdate, PublishBody

public_router = APIRouter(prefix="/api/products", tags=["products"])
admin_router = APIRouter(prefix="/api/admin/products", tags=["admin-products"])


def _product_to_out(p: Product) -> ProductOut:
    return ProductOut.model_validate(p)


@public_router.get("", response_model=list[ProductOut])
def list_published_products(
    category: str | None = Query(None),
    q: str | None = Query(None, description="Search in name / sku"),
    db: Session = Depends(get_db),
) -> list[ProductOut]:
    stmt = select(Product).where(Product.is_published.is_(True))
    if category:
        stmt = stmt.where(Product.category == category)
    if q:
        like = f"%{q}%"
        stmt = stmt.where(Product.name.like(like) | Product.sku.like(like))
    stmt = stmt.order_by(Product.id.desc())
    rows = db.scalars(stmt).all()
    return [_product_to_out(r) for r in rows]


@public_router.get("/{product_id}", response_model=ProductOut)
def get_published_product(product_id: int, db: Session = Depends(get_db)) -> ProductOut:
    product = db.get(Product, product_id)
    if product is None or not product.is_published:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return _product_to_out(product)


@admin_router.get("", response_model=list[ProductOut])
def admin_list_products(
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
) -> list[ProductOut]:
    rows = db.scalars(select(Product).order_by(Product.id.desc())).all()
    return [_product_to_out(r) for r in rows]


@admin_router.post("", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
def admin_create_product(
    body: ProductCreate,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
) -> ProductOut:
    product = Product(**body.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return _product_to_out(product)


@admin_router.put("/{product_id}", response_model=ProductOut)
def admin_update_product(
    product_id: int,
    body: ProductUpdate,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
) -> ProductOut:
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(product, key, value)
    db.commit()
    db.refresh(product)
    return _product_to_out(product)


@admin_router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
) -> None:
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    db.delete(product)
    db.commit()


@admin_router.patch("/{product_id}/publish", response_model=ProductOut)
def admin_publish_product(
    product_id: int,
    body: PublishBody,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
) -> ProductOut:
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    product.is_published = body.is_published
    db.commit()
    db.refresh(product)
    return _product_to_out(product)
