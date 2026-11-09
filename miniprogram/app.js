const auth = require("./utils/auth");
const { BASE_URL } = require("./utils/api");

App({
  globalData: {
    brand: {
      name: "澄选",
      nameEn: "ChengXuan",
      tagline: "精选日常 · 澄净所见"
    },
    baseURL: BASE_URL,
    user: null
  },
  onLaunch() {
    const cached = auth.getSession();
    if (cached && cached.access_token) {
      this.globalData.user = {
        openid: cached.openid || null,
        phone: cached.phone || null,
        access_token: cached.access_token
      };
    }
  }
});
