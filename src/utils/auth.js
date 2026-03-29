const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/auth`
  : "http://localhost:5000/api/auth";

export async function signupUser({ name, email, password }) {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, message: data.message };
    localStorage.setItem("ff_token", data.token);
    localStorage.setItem("ff_user", JSON.stringify(data.user));
    return { ok: true, user: data.user };
  } catch (err) {
    return { ok: false, message: "Signup failed. Try again." };
  }
}

export async function loginUser({ email, password }) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, message: data.message };
    localStorage.setItem("ff_token", data.token);
    localStorage.setItem("ff_user", JSON.stringify(data.user));
    return { ok: true, user: data.user };
  } catch (err) {
    return { ok: false, message: "Login failed. Try again." };
  }
}

export function logoutUser() {
  localStorage.removeItem("ff_token");
  localStorage.removeItem("ff_user");
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("ff_user") || "null");
}

export function isLoggedIn() {
  return !!localStorage.getItem("ff_token");
}