App({
  globalData: {
    admin: null
  },
  onLaunch() {
    try {
      const token = wx.getStorageSync("cx_admin_token") || "";
      if (token) {
        this.globalData.admin = { access_token: token };
      }
    } catch (e) {}
  }
});
