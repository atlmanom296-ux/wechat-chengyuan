/**
 * API helper for 澄选管理端小程序.
 *
 * BASE_URL defaults to local uvicorn. For a real phone / LAN preview, change to
 * your machine's LAN IP, e.g. http://192.168.1.8:8000
 * (DevTools: project.config.json already has setting.urlCheck = false)
 */
const BASE_URL = "http://127.0.0.1:8000";
const TOKEN_KEY = "cx_admin_token";

function getToken() {
  try {
    return wx.getStorageSync(TOKEN_KEY) || "";
  } catch (e) {
    return "";
  }
}

function absoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (pathOrUrl.startsWith("//")) return "http:" + pathOrUrl;
  if (pathOrUrl.startsWith("/")) return BASE_URL + pathOrUrl;
  return BASE_URL + "/" + pathOrUrl;
}

function request(options) {
  const method = (options.method || "GET").toUpperCase();
  const path = options.url || options.path || "/";
  const header = Object.assign(
    { "Content-Type": "application/json" },
    options.header || {}
  );
  const token = options.token !== undefined ? options.token : getToken();
  if (token) {
    header.Authorization = "Bearer " + token;
  }
  const url = path.startsWith("http") ? path : BASE_URL + path;

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data: options.data,
      header,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data === undefined ? null : res.data);
        } else {
          const detail =
            (res.data && (res.data.detail || res.data.message)) ||
            "HTTP " + res.statusCode;
          const err = new Error(
            typeof detail === "string" ? detail : JSON.stringify(detail)
          );
          err.statusCode = res.statusCode;
          reject(err);
        }
      },
      fail(err) {
        reject(new Error((err && err.errMsg) || "network error"));
      }
    });
  });
}

function login(username, password) {
  return request({
    url: "/api/auth/login",
    method: "POST",
    data: { username: username, password: password },
    token: ""
  });
}

function listAdminProducts() {
  return request({ url: "/api/admin/products" });
}

function getAdminProduct(id) {
  return listAdminProducts().then(function (list) {
    const items = Array.isArray(list) ? list : [];
    const found = items.find(function (p) {
      return String(p.id) === String(id);
    });
    if (!found) {
      const err = new Error("商品不存在");
      err.statusCode = 404;
      throw err;
    }
    return found;
  });
}

function createProduct(body) {
  return request({ url: "/api/admin/products", method: "POST", data: body });
}

function updateProduct(id, body) {
  return request({
    url: "/api/admin/products/" + id,
    method: "PUT",
    data: body
  });
}

function deleteProduct(id) {
  return request({
    url: "/api/admin/products/" + id,
    method: "DELETE"
  });
}

function publishProduct(id, isPublished) {
  return request({
    url: "/api/admin/products/" + id + "/publish",
    method: "PATCH",
    data: { is_published: !!isPublished }
  });
}

module.exports = {
  BASE_URL,
  TOKEN_KEY,
  getToken,
  absoluteUrl,
  request,
  login,
  listAdminProducts,
  getAdminProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  publishProduct
};
