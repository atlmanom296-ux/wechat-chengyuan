const api = require("./api");

const TOKEN_KEY = "cx_access_token";
const OPENID_KEY = "cx_openid";
const PHONE_KEY = "cx_phone";

function getSession() {
  try {
    return {
      access_token: wx.getStorageSync(TOKEN_KEY) || "",
      openid: wx.getStorageSync(OPENID_KEY) || "",
      phone: wx.getStorageSync(PHONE_KEY) || ""
    };
  } catch (e) {
    return { access_token: "", openid: "", phone: "" };
  }
}

function saveSession(payload) {
  wx.setStorageSync(TOKEN_KEY, payload.access_token || "");
  wx.setStorageSync(OPENID_KEY, payload.openid || "");
  wx.setStorageSync(PHONE_KEY, payload.phone || "");
  const app = getApp();
  if (app) {
    app.globalData.user = {
      openid: payload.openid || null,
      phone: payload.phone || null,
      access_token: payload.access_token || null
    };
  }
}

function clearSession() {
  try {
    wx.removeStorageSync(TOKEN_KEY);
    wx.removeStorageSync(OPENID_KEY);
    wx.removeStorageSync(PHONE_KEY);
  } catch (e) {}
  const app = getApp();
  if (app) app.globalData.user = null;
}

function isLoggedIn() {
  return !!getSession().access_token;
}

/**
 * Call wx.login then POST /api/wx/login.
 * Works with backend WX_MOCK_OPENID=1 (any code → deterministic openid).
 */
function loginWithWeChat(phone) {
  return new Promise((resolve, reject) => {
    wx.login({
      success(loginRes) {
        if (!loginRes.code) {
          reject(new Error("wx.login missing code"));
          return;
        }
        api
          .wxLogin(loginRes.code, phone)
          .then((data) => {
            saveSession(data);
            resolve(data);
          })
          .catch(reject);
      },
      fail(err) {
        reject(new Error((err && err.errMsg) || "wx.login failed"));
      }
    });
  });
}

module.exports = {
  getSession,
  saveSession,
  clearSession,
  isLoggedIn,
  loginWithWeChat
};
