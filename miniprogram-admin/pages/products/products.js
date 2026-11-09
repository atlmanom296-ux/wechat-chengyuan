const auth = require("../../utils/auth");
const api = require("../../utils/api");

function applyFilter(list, q, statusFilter) {
  const query = (q || "").trim().toLowerCase();
  return (list || []).filter(function (p) {
    if (statusFilter === "published" && !p.is_published) return false;
    if (statusFilter === "draft" && p.is_published) return false;
    if (!query) return true;
    const hay = [p.name, p.sku, p.category, p.badge]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.indexOf(query) !== -1;
  });
}

Page({
  data: {
    loading: true,
    items: [],
    filtered: [],
    q: "",
    statusFilter: "all"
  },

  onShow() {
    if (!auth.requireAuth()) return;
    this.load();
  },

  onPullDownRefresh() {
    this.load().finally(function () {
      wx.stopPullDownRefresh();
    });
  },

  load() {
    this.setData({ loading: true });
    return api
      .listAdminProducts()
      .then((list) => {
        const items = Array.isArray(list) ? list : [];
        this.setData({
          items: items,
          filtered: applyFilter(items, this.data.q, this.data.statusFilter),
          loading: false
        });
      })
      .catch((err) => {
        this.setData({ loading: false });
        if (err && err.statusCode === 401) {
          auth.logout();
          wx.reLaunch({ url: "/pages/login/login" });
          return;
        }
        wx.showToast({
          title: (err && err.message) || "加载失败",
          icon: "none"
        });
      });
  },

  refreshFilter() {
    this.setData({
      filtered: applyFilter(this.data.items, this.data.q, this.data.statusFilter)
    });
  },

  onSearch(e) {
    this.setData({ q: e.detail.value });
    this.refreshFilter();
  },

  onFilter(e) {
    const status = e.currentTarget.dataset.status || "all";
    this.setData({ statusFilter: status });
    this.refreshFilter();
  },

  onCreate() {
    wx.navigateTo({ url: "/pages/product-form/product-form" });
  },

  onEdit(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: "/pages/product-form/product-form?id=" + id });
  },

  onTogglePublish(e) {
    const id = e.currentTarget.dataset.id;
    const published = !!e.currentTarget.dataset.published;
    const next = !published;
    const label = next ? "上架" : "下架";
    wx.showLoading({ title: label + "中", mask: true });
    api
      .publishProduct(id, next)
      .then(() => {
        wx.hideLoading();
        wx.showToast({ title: "已" + label, icon: "success" });
        this.load();
      })
      .catch((err) => {
        wx.hideLoading();
        if (err && err.statusCode === 401) {
          auth.logout();
          wx.reLaunch({ url: "/pages/login/login" });
          return;
        }
        wx.showToast({
          title: (err && err.message) || label + "失败",
          icon: "none"
        });
      });
  },

  onDelete(e) {
    const id = e.currentTarget.dataset.id;
    const name = e.currentTarget.dataset.name || "该商品";
    wx.showModal({
      title: "确认删除",
      content: "删除「" + name + "」后不可恢复。",
      confirmColor: "#DC2626",
      success: (res) => {
        if (!res.confirm) return;
        wx.showLoading({ title: "删除中", mask: true });
        api
          .deleteProduct(id)
          .then(() => {
            wx.hideLoading();
            wx.showToast({ title: "已删除", icon: "success" });
            this.load();
          })
          .catch((err) => {
            wx.hideLoading();
            if (err && err.statusCode === 401) {
              auth.logout();
              wx.reLaunch({ url: "/pages/login/login" });
              return;
            }
            wx.showToast({
              title: (err && err.message) || "删除失败",
              icon: "none"
            });
          });
      }
    });
  },

  onLogout() {
    auth.logout();
    wx.reLaunch({ url: "/pages/login/login" });
  }
});
