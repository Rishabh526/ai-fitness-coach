const API_BASE = "http://127.0.0.1:8000";

export async function getMe() {
    const res = await fetch(`${API_BASE}/api/accounts/me/`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch user");
    }

    return res.json()
}