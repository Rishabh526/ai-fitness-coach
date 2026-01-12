const API_BASE = "http://127.0.0.1:8000";

async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh");

  const res = await fetch(`${API_BASE}/api/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) throw new Error("Refresh failed");

  const data = await res.json();
  localStorage.setItem("access", data.access);
  return data.access;
}

async function authorizedFetch(url, options = {}) {
  let access = localStorage.getItem("access");

  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${access}`,
    },
  });

  // 🔁 Retry once on token expiry
  if (res.status === 401) {
    access = await refreshAccessToken();

    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${access}`,
      },
    });
  }

  if (!res.ok) {
    const err = await res.json();
    throw err;
  }

  return res.json();
}

export function getAIPlan() {
  return authorizedFetch(`${API_BASE}/api/ai/plan/`);
}

export function regenerateAIPlan() {
  return authorizedFetch(`${API_BASE}/api/ai/plan/`, {
    method: "POST",
  });
}
