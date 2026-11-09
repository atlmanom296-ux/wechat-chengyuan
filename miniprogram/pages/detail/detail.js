const api = require("../../utils/api");
const {
  getProductById,
  mapApiProduct,
  stockLabel,
  PRODUCTS
} = require("../../utils/products");

Page({
  data: {
    product: null,
    gallery: [],
    qty: 1,
    qtyMax: 1,
    stockText: "",
    stockTone: "success",
    selectedSpecs: {},
    related: [],
    loading: true,
    error: ""
  },

  onLoad(query) {
    this.productId = query && query.id;
    if (!this.productId) {
      this.setData({ loading: false, error: "缺少商品 id" });
      return;
    }
    this.load();
  },

  load() {
    this.setData({ loading: true, error: "" });
    const id = this.productId;
    return api
      .getProduct(id)
      .then((row) => {
        const product = mapApiProduct(row, api.absoluteUrl);
        this.applyProduct(product);
        return api.getProducts({ category: row.category }).then((list) => {
          const related = (list || [])
            .map((p) => mapApiProduct(p, api.absoluteUrl))
            .filter((p) => p && String(p.id) !== String(product.id))
            .slice(0, 6);
          this.setData({ related });
        });
      })
      .catch(() => {
        const staticProduct = getProductById(id);
        if (!staticProduct) {
          this.setData({
            loading: false,
            product: null,
            error: "加载失败或商品不存在"
          });
          return;
        }
        this.applyProduct(staticProduct);
        const related = PRODUCTS.filter(
          (p) => p.categoryId === staticProduct.categoryId && p.id !== staticProduct.id
        ).slice(0, 6);
        this.setData({ related });
      });
  },

  applyProduct(product) {
    const stock = stockLabel(product.stock);
    const gallery =
      product.images && product.images.length
        ? product.images
        : [product.cover].filter(Boolean);
    const selectedSpecs = {};
    (product.specs || []).forEach((spec) => {
      const first = (spec.options || []).find((o) => !o.disabled);
      if (first) selectedSpecs[spec.id] = first.id;
    });
    this.setData({
      product,
      gallery,
      qty: 1,
      qtyMax: Math.max(1, product.stock || 1),
      stockText: stock.text,
      stockTone: stock.tone,
      selectedSpecs,
      loading: false,
      error: ""
    });
    wx.setNavigationBarTitle({ title: product.name || "商品详情" });
  },

  onSelectSpec(e) {
    const { spec, opt, disabled } = e.currentTarget.dataset;
    if (disabled) return;
    this.setData({
      selectedSpecs: Object.assign({}, this.data.selectedSpecs, { [spec]: opt })
    });
  },

  onQty(e) {
    this.setData({ qty: e.detail.value });
  },

  onFav() {
    wx.showToast({ title: "收藏占位", icon: "none" });
  },

  onWishlist() {
    wx.showToast({ title: "已加入心愿单（示意）", icon: "none" });
  },

  onOpenRelated(e) {
    const id = e.detail.id;
    wx.redirectTo({ url: `/pages/detail/detail?id=${id}` });
  }
});
