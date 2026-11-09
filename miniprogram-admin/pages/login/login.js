const auth = require("../../utils/auth");

Page({
  data: {
    username: "admin",
    password: "",
    loggingIn: false,
    error: ""
  },

  onShow() {
    if (auth.isLoggedIn()) {
      wx.reLaunch({ url: "/pages/products/products" });
    }
  },

  onUsername(e) {
    this.setData({ username: e.detail.value, error: "" });
  },

  onPassword(e) {
    this.setData({ password: e.detail.value, error: "" });
  },

  onSubmit() {
    if (this.data.loggingIn) return;
    const username = (this.data.username || "").trim();
    const password = this.data.password || "";
    if (!username || !password) {
      this.setData({ error: "请输入用户名和密码" });
      return;
    }
    this.setData({ loggingIn: true, error: "" });
    auth
      .login(username, password)
      .then(function () {
        wx.showToast({ title: "登录成功", icon: "success" });
        setTimeout(function () {
          wx.reLaunch({ url: "/pages/products/products" });
        }, 350);
      })
      .catch((err) => {
        const msg =
          (err && err.statusCode === 401 && "用户名或密码错误") ||
          (err && err.message) ||
          "登录失败";
        this.setData({ error: msg });
        wx.showToast({ title: msg, icon: "none" });
      })
      .finally(() => {
        this.setData({ loggingIn: false });
      });
  }
});
