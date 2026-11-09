/** ChengXuan shared API helpers */
(function (global) {
  var TOKEN_KEY = "chengxuan_admin_token";

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function money(v) {
    var n = Number(v);
    if (isNaN(n)) return String(v == null ? "" : v);
    return n % 1 === 0 ? String(n) : n.toFixed(2);
  }

  function qs(name) {
    return new URLSearchParams(location.search).get(name);
  }

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function setToken(t) {
    if (t) localStorage.setItem(TOKEN_KEY, t);
    else localStorage.removeItem(TOKEN_KEY);
  }

  async function api(path, options) {
    options = options || {};
    var headers = Object.assign({ Accept: "application/json" }, options.headers || {});
    if (options.auth) {
      var t = getToken();
      if (t) headers.Authorization = "Bearer " + t;
    }
    if (options.body != null && !(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
      if (typeof options.body !== "string") options.body = JSON.stringify(options.body);
    }
    var res = await fetch(path, Object.assign({}, options, { headers: headers }));
    if (res.status === 204) return null;
    var text = await res.text();
    var data = null;
    try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
    if (!res.ok) {
      var msg = data && data.detail
        ? (typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail))
        : res.statusText;
      var err = new Error(msg || ("HTTP " + res.status));
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  function requireAdmin() {
    if (!getToken()) {
      var next = encodeURIComponent(location.pathname + location.search);
      location.href = "/admin/login.html?next=" + next;
      return false;
    }
    return true;
  }

  function coverUrl(p) {
    return (p && p.image_url) || "/assets/placeholders/mug.svg";
  }

  function statusLabel(p) {
    return p && p.is_published ? "上架" : "草稿";
  }

  function statusBadgeClass(p) {
    return p && p.is_published ? "cx-badge cx-badge--success" : "cx-badge cx-badge--neutral";
  }

  global.CX = {
    TOKEN_KEY: TOKEN_KEY,
    escapeHtml: escapeHtml,
    money: money,
    qs: qs,
    getToken: getToken,
    setToken: setToken,
    api: api,
    requireAdmin: requireAdmin,
    coverUrl: coverUrl,
    statusLabel: statusLabel,
    statusBadgeClass: statusBadgeClass,
  };
})(window);
