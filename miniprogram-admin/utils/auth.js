const api = require("./api");

const TOKEN_KEY = "cx_admin_token";

function getToken() {
  try {
    return wx.getStorageSync(TOKEN_KEY) || "";
  } catch (e) {
    return "";
  }
}

function isLoggedIn() {
  return !!getToken();
}

function saveToken(token) {
  wx.setStorageSync(TOKEN_KEY, token || "");
  const app = getApp();
  if (app) {
    app.globalData.admin = { access_token: token || null };
  }
}

function clearToken() {
  try {
    wx.removeStorageSync(TOKEN_KEY);
  } catch (e) {}
  const app = getApp();
  if (app) app.globalData.admin = null;
}

/**
 * Admin CMS login → POST /api/auth/login → store JWT.
 */
function login(username, password) {
  return api.login(username, password).then(function (data) {
    saveToken(data.access_token);
    return data;
  });
}

function logout() {
  clearToken();
}

/**
 * Guard helper: if no token, reLaunch login and return false.
 */
function requireAuth() {
  if (isLoggedIn()) return true;
  wx.reLaunch({ url: "/pages/login/login" });
  return false;
}

module.exports = {
  TOKEN_KEY,
  getToken,
  isLoggedIn,
  saveToken,
  clearToken,
  login,
  logout,
  requireAuth
};
