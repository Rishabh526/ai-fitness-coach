import { apiFetch } from "./api";

export async function checkProfileExists() {
  const res = await apiFetch("/api/profile/mep/");

  if (res.status === 404) return false;
  if (!res.ok) throw new Error("Profile check failed");

  return true;
}


export async function createProfile(data) {
  const res = await apiFetch("/api/profile/create/", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json(); 
    throw new Error(errorData.detail || "Profile creation failed");
  }

  return res.json();
}

export async function getMyProfile() {
  const res = await apiFetch("/api/profile/me/detail/")

  if(!res.ok) {
    throw new Error("Failed to fetch profile")
  }

  return res.json();
}


export async function updateProfile(data){
  const res = await apiFetch("/api/profile/me/update/", {
    method: "PATCH",
    body: JSON.stringify(data),
  })

  if(!res.ok){
    const err = await res.json()
    throw new Error(err.detail || "Profile update failed")
  }

  return res.json()
}

