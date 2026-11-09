/**
 * API helper for 澄选 mini program.
 *
 * baseURL defaults to local uvicorn. For a real phone / LAN preview, change to
 * your machine's LAN IP, e.g. http://192.168.1.8:8000
 * (DevTools: project.config.json already has setting.urlCheck = false)
 */
const BASE_URL = "http://127.0.0.1:8000";

function getToken() {
  try {
    return wx.getStorageSync("cx_access_token") || "";
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
          resolve(res.data);
        } else {
          const detail =
            (res.data && (res.data.detail || res.data.message)) ||
            "HTTP " + res.statusCode;
          reject(new Error(typeof detail === "string" ? detail : JSON.stringify(detail)));
        }
      },
      fail(err) {
        reject(new Error((err && err.errMsg) || "network error"));
      }
    });
  });
}

function getProducts(params) {
  const q = [];
  if (params && params.category) q.push("category=" + encodeURIComponent(params.category));
  if (params && params.q) q.push("q=" + encodeURIComponent(params.q));
  const qs = q.length ? "?" + q.join("&") : "";
  return request({ url: "/api/products" + qs });
}

function getProduct(id) {
  return request({ url: "/api/products/" + id });
}

function wxLogin(code, phone) {
  const data = { code: code };
  if (phone) data.phone = phone;
  return request({ url: "/api/wx/login", method: "POST", data: data, token: "" });
}

function wxMe() {
  return request({ url: "/api/wx/me" });
}

module.exports = {
  BASE_URL,
  absoluteUrl,
  request,
  getProducts,
  getProduct,
  wxLogin,
  wxMe
};
