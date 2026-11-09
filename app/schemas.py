"""Pydantic request/response schemas."""

from datetime import datetime
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field, field_serializer


class ProductBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    price: Decimal = Field(..., ge=0)
    stock: int = Field(..., ge=0)
    category: str = Field(..., min_length=1, max_length=100)
    image_url: Optional[str] = None
    sku: Optional[str] = Field(None, max_length=64)
    compare_at_price: Optional[Decimal] = Field(None, ge=0)
    badge: Optional[str] = Field(None, max_length=64)
    description: Optional[str] = None
    is_published: bool = False


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    price: Optional[Decimal] = Field(None, ge=0)
    stock: Optional[int] = Field(None, ge=0)
    category: Optional[str] = Field(None, min_length=1, max_length=100)
    image_url: Optional[str] = None
    sku: Optional[str] = Field(None, max_length=64)
    compare_at_price: Optional[Decimal] = Field(None, ge=0)
    badge: Optional[str] = Field(None, max_length=64)
    description: Optional[str] = None
    is_published: Optional[bool] = None


class PublishBody(BaseModel):
    is_published: bool


class ProductOut(ProductBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime

    @field_serializer("price", "compare_at_price")
    def serialize_money(self, value: Decimal | None) -> float | None:
        if value is None:
            return None
        return float(value)

    @property
    def status(self) -> str:
        return "active" if self.is_published else "draft"


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class WxLoginRequest(BaseModel):
    code: str = Field(..., min_length=1, description="wx.login code from mini program")
    phone: Optional[str] = Field(None, max_length=32, description="Optional phone placeholder")


class WxTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    openid: str
    phone: Optional[str] = None


class WxMeResponse(BaseModel):
    openid: str
    phone: Optional[str] = None


class HealthResponse(BaseModel):
    ok: bool = True
