import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";

const BASE_URL = import.meta.env.VITE_SOME_BASE_URL;

// --------------------
// Check if token expired
// --------------------
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    return !exp || Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

// --------------------
// Refresh token
// --------------------
const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) return null;

  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!data.token) return null;

    localStorage.setItem("token", data.token);
    if (data.refresh_token)
      localStorage.setItem("refresh_token", data.refresh_token);

    return data.token;
  } catch (error) {
    console.error("Refresh token failed:", error);
    return null;
  }
};

// --------------------
// Base query with token handling
// --------------------
const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers) => {
    let token = localStorage.getItem("token");

    // Refresh token if missing or expired
    if (!token || isTokenExpired(token)) {
      token = await refreshToken();
    }

    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

// --------------------
// Wrapper: redirect if unauthorized
// --------------------
export const baseQueryWithTokenCheck = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && [401, 403].includes(result.error.status)) {
    // Clear stored tokens
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");

    // Redirect to login
    window.location.href = "/login";
  }

  return result;
};
