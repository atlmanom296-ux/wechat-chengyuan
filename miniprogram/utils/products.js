/**
 * 示例商品数据（壳层静态）。字段对齐 DESIGN.md §5。
 * cover 指向 miniprogram/assets/placeholders/*.svg
 * 注意：正式环境建议转 PNG/WebP；DevTools 对 SVG <image> 支持有限。
 */

const CATEGORIES = [
  { id: "all", label: "全部" },
  { id: "home", label: "家居" },
  { id: "care", label: "个护" },
  { id: "digital", label: "数码" },
  { id: "food", label: "食品" },
  { id: "apparel", label: "服饰" }
];

const PRODUCTS = [
  {
    id: "p_10021",
    sku: "CX-HM-021",
    name: "北欧风陶瓷马克杯 350ml",
    category: "家居",
    categoryId: "home",
    price: 59,
    compareAtPrice: 79,
    currency: "CNY",
    stock: 128,
    status: "active",
    badges: ["热卖"],
    cover: "/assets/placeholders/mug.svg",
    images: [
      "/assets/placeholders/mug.svg",
      "/assets/placeholders/mug.svg"
    ],
    specs: [
      { id: "color", label: "颜色", options: [
        { id: "white", label: "雾白" },
        { id: "sand", label: "沙色" },
        { id: "teal", label: "青釉", disabled: true }
      ]}
    ],
    highlights: ["厚胎保温", "洗碗机可用", "哑光釉面"],
    description: "简约北欧造型，适日常咖啡与茶。釉面细腻，握感舒适。"
  },
  {
    id: "p_10022",
    sku: "CX-HM-022",
    name: "黄铜摇臂台灯",
    category: "家居",
    categoryId: "home",
    price: 289,
    compareAtPrice: 349,
    currency: "CNY",
    stock: 36,
    status: "active",
    badges: ["新品"],
    cover: "/assets/placeholders/lamp.svg",
    images: ["/assets/placeholders/lamp.svg"],
    specs: [
      { id: "finish", label: "表面", options: [
        { id: "brass", label: "黄铜" },
        { id: "black", label: "哑黑" }
      ]}
    ],
    highlights: ["可调光", "金属灯臂", "E27 灯头"],
    description: "桌面阅读与氛围照明两用，结构稳固。"
  },
  {
    id: "p_10031",
    sku: "CX-CR-031",
    name: "温和洁面乳 120ml",
    category: "个护",
    categoryId: "care",
    price: 68,
    compareAtPrice: null,
    currency: "CNY",
    stock: 8,
    status: "active",
    badges: [],
    cover: "/assets/placeholders/cream.svg",
    images: ["/assets/placeholders/cream.svg"],
    specs: [],
    highlights: ["无皂基", "弱酸配方"],
    description: "日常洁面，泡沫细腻，洗后不紧绷。"
  },
  {
    id: "p_10032",
    sku: "CX-CR-032",
    name: "植物精油皂 3 块装",
    category: "个护",
    categoryId: "care",
    price: 45,
    compareAtPrice: 55,
    currency: "CNY",
    stock: 0,
    status: "active",
    badges: [],
    cover: "/assets/placeholders/soap.svg",
    images: ["/assets/placeholders/soap.svg"],
    specs: [],
    highlights: ["冷制工艺"],
    description: "暂时缺货示意：库存为 0。"
  },
  {
    id: "p_10041",
    sku: "CX-DG-041",
    name: "轻便蓝牙耳机",
    category: "数码",
    categoryId: "digital",
    price: 199,
    compareAtPrice: 249,
    currency: "CNY",
    stock: 54,
    status: "active",
    badges: ["热卖"],
    cover: "/assets/placeholders/earbuds.svg",
    images: ["/assets/placeholders/earbuds.svg"],
    specs: [
      { id: "color", label: "颜色", options: [
        { id: "white", label: "白" },
        { id: "black", label: "黑" }
      ]}
    ],
    highlights: ["低延迟", "触控操作"],
    description: "通勤与运动场景轻量选择。"
  },
  {
    id: "p_10051",
    sku: "CX-FD-051",
    name: "冷萃瓶 600ml",
    category: "食品",
    categoryId: "food",
    price: 39,
    compareAtPrice: null,
    currency: "CNY",
    stock: 200,
    status: "active",
    badges: [],
    cover: "/assets/placeholders/bottle.svg",
    images: ["/assets/placeholders/bottle.svg"],
    specs: [],
    highlights: ["耐热玻璃"],
    description: "居家冷萃与冷饮分享。"
  },
  {
    id: "p_10061",
    sku: "CX-AP-061",
    name: "帆布托特包",
    category: "服饰",
    categoryId: "apparel",
    price: 89,
    compareAtPrice: 119,
    currency: "CNY",
    stock: 72,
    status: "active",
    badges: ["限时"],
    cover: "/assets/placeholders/tote.svg",
    images: ["/assets/placeholders/tote.svg"],
    specs: [
      { id: "size", label: "尺寸", options: [
        { id: "m", label: "M" },
        { id: "l", label: "L" }
      ]}
    ],
    highlights: ["厚帆布", "内袋"],
    description: "日常通勤与周末出行。"
  },
  {
    id: "p_10023",
    sku: "CX-HM-023",
    name: "软皮封面笔记本 A5",
    category: "家居",
    categoryId: "home",
    price: 32,
    compareAtPrice: null,
    currency: "CNY",
    stock: 150,
    status: "active",
    badges: [],
    cover: "/assets/placeholders/notebook.svg",
    images: ["/assets/placeholders/notebook.svg"],
    specs: [],
    highlights: ["120g 纸", "锁线装订"],
    description: "书写流畅，适合会议与随记。"
  }
];

function formatPrice(amount) {
  if (amount == null) return "";
  const n = Number(amount);
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

function stockLabel(stock) {
  if (stock <= 0) return { text: "暂时缺货", tone: "danger" };
  if (stock <= 10) return { text: `仅剩 ${stock} 件`, tone: "warning" };
  return { text: "库存充足", tone: "success" };
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

function filterProducts({ categoryId, keyword, sort } = {}) {
  let list = PRODUCTS.slice();
  if (categoryId && categoryId !== "all") {
    list = list.filter((p) => p.categoryId === categoryId);
  }
  if (keyword) {
    const q = String(keyword).trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
  }
  if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
  else if (sort === "sales") list = list.slice().reverse(); // 壳层示意
  return list;
}


/** category label → chip id (shell CATEGORIES) */
const CATEGORY_ID_BY_LABEL = {
  "家居": "home",
  "个护": "care",
  "数码": "digital",
  "食品": "food",
  "服饰": "apparel"
};

/**
 * Map FastAPI ProductOut → shell product shape (DESIGN.md §5 / MINIPROGRAM_DESIGN).
 * cover←image_url, compareAtPrice←compare_at_price, badges←badge, status←is_published
 */
function mapApiProduct(api, absoluteUrlFn) {
  if (!api) return null;
  const coverRaw = api.image_url || "";
  const cover = typeof absoluteUrlFn === "function" ? absoluteUrlFn(coverRaw) : coverRaw;
  const badge = api.badge ? [api.badge] : [];
  return {
    id: api.id,
    sku: api.sku || "",
    name: api.name,
    category: api.category || "",
    categoryId: CATEGORY_ID_BY_LABEL[api.category] || "all",
    price: Number(api.price),
    compareAtPrice: api.compare_at_price == null ? null : Number(api.compare_at_price),
    currency: "CNY",
    stock: Number(api.stock || 0),
    status: api.is_published ? "active" : "draft",
    badges: badge,
    cover: cover || "/assets/placeholders/mug.svg",
    images: cover ? [cover] : ["/assets/placeholders/mug.svg"],
    specs: [],
    highlights: [],
    description: api.description || ""
  };
}

function sortShellProducts(list, sort) {
  const out = list.slice();
  if (sort === "price_asc") out.sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") out.sort((a, b) => b.price - a.price);
  else if (sort === "sales") out.reverse();
  return out;
}

function filterShellProducts(list, { categoryId, keyword, sort } = {}) {
  let out = list.slice();
  if (categoryId && categoryId !== "all") {
    out = out.filter((p) => p.categoryId === categoryId);
  }
  if (keyword) {
    const q = String(keyword).trim().toLowerCase();
    if (q) {
      out = out.filter(
        (p) =>
          String(p.name || "").toLowerCase().includes(q) ||
          String(p.sku || "").toLowerCase().includes(q) ||
          String(p.category || "").toLowerCase().includes(q)
      );
    }
  }
  return sortShellProducts(out, sort);
}

module.exports = {
  CATEGORIES,
  PRODUCTS,
  formatPrice,
  stockLabel,
  getProductById,
  filterProducts,
  CATEGORY_ID_BY_LABEL,
  mapApiProduct,
  filterShellProducts,
  sortShellProducts
};
