import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_SOME_BASE_URL;

// --------------------
// Refresh token function
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

    // Save new tokens
    localStorage.setItem("token", data.token);
    if (data.refresh_token)
      localStorage.setItem("refresh_token", data.refresh_token);

    return data.token;
  } catch {
    return null;
  }
};

// --------------------
// Base Query
// --------------------
const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

// --------------------
// Base Query with Auto Refresh
// --------------------
export const baseQueryWithTokenCheck = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);
  console.log("result", result);

  // If unauthorized → try refresh
  if (
    result.error?.status === 401 ||
    result.error?.status === 403 ||
    result.error?.status == "FETCH_ERROR"
  ) {
    console.log("🔐 Token expired → refreshing...");

    const newToken = await refreshToken();

    if (newToken) {
      console.log("🔄 Refresh successful → retrying request");

      // Retry original request with new token
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      console.log("❌ Refresh failed → logging out");

      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");

      window.location.href = "/login";
    }
  }

  return result;
};
