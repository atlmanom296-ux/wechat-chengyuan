const auth = require("../../utils/auth");

Page({
  data: {
    phone: "",
    loggingIn: false
  },
  onPhone(e) {
    this.setData({ phone: e.detail.value });
  },
  onWxLogin() {
    if (this.data.loggingIn) return;
    this.setData({ loggingIn: true });
    const phone = (this.data.phone || "").trim();
    auth
      .loginWithWeChat(phone || undefined)
      .then((data) => {
        wx.showToast({
          title: data.openid ? "登录成功" : "已登录",
          icon: "success"
        });
        setTimeout(() => {
          wx.reLaunch({ url: "/pages/list/list" });
        }, 400);
      })
      .catch((err) => {
        wx.showToast({
          title: (err && err.message) || "登录失败",
          icon: "none"
        });
      })
      .finally(() => {
        this.setData({ loggingIn: false });
      });
  },
  onSkip() {
    wx.reLaunch({ url: "/pages/list/list" });
  }
});
