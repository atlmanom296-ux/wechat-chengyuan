const auth = require("../../utils/auth");
const api = require("../../utils/api");

const CATEGORIES = ["家居", "个护", "数码", "服饰", "食品"];

function emptyForm() {
  return {
    name: "",
    sku: "",
    category: "家居",
    badge: "",
    description: "",
    price: "",
    compare_at_price: "",
    stock: "0",
    image_url: "",
    is_published: false
  };
}

function toPayload(form) {
  const price = Number(form.price);
  const stock = parseInt(form.stock, 10);
  const compareRaw = (form.compare_at_price || "").toString().trim();
  const payload = {
    name: (form.name || "").trim(),
    price: price,
    stock: isNaN(stock) ? 0 : stock,
    category: (form.category || "").trim(),
    image_url: (form.image_url || "").trim() || null,
    sku: (form.sku || "").trim() || null,
    badge: (form.badge || "").trim() || null,
    description: (form.description || "").trim() || null,
    is_published: !!form.is_published
  };
  if (compareRaw === "") {
    payload.compare_at_price = null;
  } else {
    payload.compare_at_price = Number(compareRaw);
  }
  return payload;
}

function validate(payload) {
  if (!payload.name) return "请填写商品名称";
  if (!payload.category) return "请选择分类";
  if (isNaN(payload.price) || payload.price < 0) return "售价无效";
  if (payload.stock < 0 || isNaN(payload.stock)) return "库存无效";
  if (
    payload.compare_at_price !== null &&
    (isNaN(payload.compare_at_price) || payload.compare_at_price < 0)
  ) {
    return "划线价无效";
  }
  return "";
}

Page({
  data: {
    id: null,
    isNew: true,
    loading: false,
    saving: false,
    error: "",
    categories: CATEGORIES,
    categoryIndex: 0,
    form: emptyForm(),
    previewUrl: ""
  },

  onLoad(query) {
    if (!auth.requireAuth()) return;
    const id = query && query.id ? String(query.id) : "";
    if (!id) {
      wx.setNavigationBarTitle({ title: "新建商品" });
      this.setData({
        isNew: true,
        id: null,
        form: emptyForm(),
        categoryIndex: 0,
        previewUrl: ""
      });
      return;
    }
    wx.setNavigationBarTitle({ title: "编辑商品" });
    this.setData({ isNew: false, id: id, loading: true });
    api
      .getAdminProduct(id)
      .then((p) => {
        const form = {
          name: p.name || "",
          sku: p.sku || "",
          category: p.category || "家居",
          badge: p.badge || "",
          description: p.description || "",
          price: p.price != null ? String(p.price) : "",
          compare_at_price:
            p.compare_at_price != null ? String(p.compare_at_price) : "",
          stock: p.stock != null ? String(p.stock) : "0",
          image_url: p.image_url || "",
          is_published: !!p.is_published
        };
        const cats = (this.data.categories || CATEGORIES).slice();
        let categoryIndex = cats.indexOf(form.category);
        if (categoryIndex < 0) {
          // allow custom category from seed
          cats.push(form.category);
          categoryIndex = cats.length - 1;
        }
        this.setData({
          categories: cats,
          form: form,
          categoryIndex: categoryIndex,
          previewUrl: api.absoluteUrl(form.image_url),
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
        setTimeout(function () {
          wx.navigateBack({ fail: function () {
            wx.reLaunch({ url: "/pages/products/products" });
          }});
        }, 600);
      });
  },

  onInput(e) {
    const key = e.currentTarget.dataset.key;
    const value = e.detail.value;
    const patch = {};
    patch["form." + key] = value;
    if (key === "image_url") {
      patch.previewUrl = api.absoluteUrl(value);
    }
    this.setData(patch);
  },

  onCategory(e) {
    const idx = Number(e.detail.value) || 0;
    const cat = this.data.categories[idx] || "家居";
    this.setData({
      categoryIndex: idx,
      "form.category": cat
    });
  },

  onPublished(e) {
    this.setData({ "form.is_published": !!e.detail.value });
  },

  onCancel() {
    wx.navigateBack({
      fail: function () {
        wx.reLaunch({ url: "/pages/products/products" });
      }
    });
  },

  onSave() {
    if (this.data.saving) return;
    const payload = toPayload(this.data.form);
    const errMsg = validate(payload);
    if (errMsg) {
      this.setData({ error: errMsg });
      wx.showToast({ title: errMsg, icon: "none" });
      return;
    }
    this.setData({ saving: true, error: "" });
    const req = this.data.isNew
      ? api.createProduct(payload)
      : api.updateProduct(this.data.id, payload);
    req
      .then(() => {
        wx.showToast({ title: "已保存", icon: "success" });
        setTimeout(function () {
          wx.navigateBack({
            fail: function () {
              wx.reLaunch({ url: "/pages/products/products" });
            }
          });
        }, 350);
      })
      .catch((err) => {
        if (err && err.statusCode === 401) {
          auth.logout();
          wx.reLaunch({ url: "/pages/login/login" });
          return;
        }
        const msg = (err && err.message) || "保存失败";
        this.setData({ error: msg });
        wx.showToast({ title: msg, icon: "none" });
      })
      .finally(() => {
        this.setData({ saving: false });
      });
  }
});
