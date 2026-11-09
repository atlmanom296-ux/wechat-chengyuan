/** Shared API helpers for storefront + admin */
async function api(path, options = {}) {
  const headers = Object.assign({ Accept: "application/json" }, options.headers || {});
  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    options.body = typeof options.body === "string" ? options.body : JSON.stringify(options.body);
  }
  const res = await fetch(path, { ...options, headers });
  if (res.status === 204) return null;
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const msg = (data && data.detail) ? (typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail)) : res.statusText;
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return data;
}

function money(v) {
  const n = Number(v);
  return isNaN(n) ? String(v) : `¥${n.toFixed(2)}`;
}

function qs(name) {
  return new URLSearchParams(location.search).get(name);
}
