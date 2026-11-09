"""Seed sample products when the database is empty (ChengXuan demo catalog)."""

from decimal import Decimal

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Product

SAMPLES = [
    {
        "name": "北欧风陶瓷马克杯 350ml",
        "sku": "CX-HM-021",
        "price": Decimal("59.00"),
        "compare_at_price": Decimal("79.00"),
        "stock": 128,
        "category": "家居",
        "image_url": "/assets/placeholders/mug.svg",
        "badge": "热卖",
        "description": "高岭土素烧，口感细腻，微波炉 / 洗碗机可用。杯口直径约 8.2 cm，容量 350 ml。",
        "is_published": True,
    },
    {
        "name": "复古黄铜台灯 · 护眼三段调光",
        "sku": "CX-HM-088",
        "price": Decimal("199.00"),
        "compare_at_price": None,
        "stock": 8,
        "category": "家居",
        "image_url": "/assets/placeholders/lamp.svg",
        "badge": "新品",
        "description": "复古黄铜灯体，三段护眼调光，适合书桌与床头。",
        "is_published": True,
    },
    {
        "name": "澄选 AirLite 降噪耳机",
        "sku": "CX-DG-015",
        "price": Decimal("299.00"),
        "compare_at_price": Decimal("349.00"),
        "stock": 56,
        "category": "数码",
        "image_url": "/assets/placeholders/earbuds.svg",
        "badge": None,
        "description": "轻量入耳，主动降噪，续航长，澄选自有品牌。",
        "is_published": True,
    },
    {
        "name": "澄润保湿面霜 50ml",
        "sku": "CX-PC-042",
        "price": Decimal("128.00"),
        "compare_at_price": None,
        "stock": 210,
        "category": "个护",
        "image_url": "/assets/placeholders/cream.svg",
        "badge": None,
        "description": "轻盈保湿面霜，适合日常护理。",
        "is_published": False,
    },
    {
        "name": "双层不锈钢保温杯 500ml",
        "sku": "CX-HM-033",
        "price": Decimal("89.00"),
        "compare_at_price": None,
        "stock": 80,
        "category": "家居",
        "image_url": "/assets/placeholders/bottle.svg",
        "badge": None,
        "description": "双层真空保温，日常通勤与办公室皆宜。",
        "is_published": True,
    },
    {
        "name": "有机棉帆布托特包",
        "sku": "CX-AP-007",
        "price": Decimal("69.00"),
        "compare_at_price": None,
        "stock": 94,
        "category": "服饰",
        "image_url": "/assets/placeholders/tote.svg",
        "badge": None,
        "description": "有机棉帆布，大容量托特，日常与市集皆可。",
        "is_published": True,
    },
    {
        "name": "森林香氛皂三件套",
        "sku": "CX-PC-019",
        "price": Decimal("45.00"),
        "compare_at_price": None,
        "stock": 0,
        "category": "个护",
        "image_url": "/assets/placeholders/soap.svg",
        "badge": None,
        "description": "森林调香氛皂三件套。",
        "is_published": False,
    },
    {
        "name": "软皮方格笔记本 A5",
        "sku": "CX-HM-056",
        "price": Decimal("38.00"),
        "compare_at_price": Decimal("48.00"),
        "stock": 60,
        "category": "家居",
        "image_url": "/assets/placeholders/notebook.svg",
        "badge": "限时",
        "description": "软皮封面，方格内页，A5 便携尺寸。",
        "is_published": True,
    },
]


def seed_if_empty(db: Session) -> None:
    count = db.scalar(select(Product.id).limit(1))
    if count is not None:
        return
    for item in SAMPLES:
        db.add(Product(**item))
    db.commit()
