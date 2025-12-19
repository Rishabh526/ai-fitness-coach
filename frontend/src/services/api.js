const API_BASE = "http://127.0.0.1:8000";

export async function apiFetch(url, options={}){
    const access = localStorage.getItem("access")

    const headers = {
        "Content-Type": "application/json",
        ...(access && {Authorization: `Bearer ${access}`}),
        ...options.headers,
    };

    let response = await fetch(`${API_BASE}${url}`, {
        ...options,
        headers,
    });

    if(response.status == 401) {
        const refreshed = await refreshToken();

        if(refreshed) {
            const newAccess = localStorage.getItem("access");

            return fetch(`${API_BASE}${url}`, {
                ...options,
                headers: {
                    ...headers,
                    Authorization: `Bearer ${newAccess}`,
                },
            });
        } else {
            logoutUser();
            throw new Error("Session Expired")
        }
    }

    return response;
}

async function refreshToken(){
    const refresh = localStorage.getItem("refresh")

    if(!refresh) return false;

    const response = await fetch(
        `${API_BASE}/api/token/refresh/`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({refresh}),
        }
    );

    if(!response.ok) return false;

    const data = await response.json();

    localStorage.setItem("access", data.access)
    return true;
}

function logoutUser(){
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    window.location.href = "/login"
}