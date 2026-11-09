const api = require("../../utils/api");
const {
  CATEGORIES,
  filterProducts,
  mapApiProduct,
  filterShellProducts
} = require("../../utils/products");

Page({
  data: {
    categories: CATEGORIES,
    activeCategory: "all",
    keyword: "",
    sort: "default",
    sortOptions: [
      { id: "default", label: "综合" },
      { id: "sales", label: "销量" },
      { id: "price_asc", label: "价格↑" },
      { id: "price_desc", label: "价格↓" }
    ],
    products: [],
    fromApi: false
  },
  onLoad() {
    this.refresh();
  },
  onPullDownRefresh() {
    this.refresh().finally(() => wx.stopPullDownRefresh());
  },
  refresh() {
    const { activeCategory, keyword, sort } = this.data;
    return api
      .getProducts({ q: keyword || undefined })
      .then((list) => {
        const mapped = (list || [])
          .map((row) => mapApiProduct(row, api.absoluteUrl))
          .filter(Boolean);
        const products = filterShellProducts(mapped, {
          categoryId: activeCategory,
          keyword: "",
          sort
        });
        this.setData({ products, fromApi: true });
      })
      .catch(() => {
        // Fallback to UI-PRO static catalog when API unreachable
        const products = filterProducts({
          categoryId: activeCategory,
          keyword,
          sort
        });
        this.setData({ products, fromApi: false });
      });
  },
  onCategory(e) {
    this.setData({ activeCategory: e.detail.id }, () => this.refresh());
  },
  onKeyword(e) {
    this.setData({ keyword: e.detail.value });
  },
  onSearch() {
    this.refresh();
  },
  onClear() {
    this.setData({ keyword: "" }, () => this.refresh());
  },
  onSort(e) {
    this.setData({ sort: e.currentTarget.dataset.id }, () => this.refresh());
  },
  onOpenProduct(e) {
    const id = e.detail.id;
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` });
  }
});
