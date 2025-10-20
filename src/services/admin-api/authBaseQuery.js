import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import jwt_decode from "jwt-decode";

// Check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = jwt_decode(token);
    return !exp || Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

// Refresh token function
const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) return null;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token }),
      }
    );

    if (!response.ok) {
      console.error("Refresh token failed with status:", response.status);
      return null;
    }

    const data = await response.json();

    if (!data.token) {
      console.error("Refresh response missing token:", data);
      return null;
    }

    localStorage.setItem("token", data.token);
    if (data.refresh_token)
      localStorage.setItem("refresh_token", data.refresh_token);

    return data.token;
  } catch (error) {
    console.error("Refresh token request failed:", error);
    return null;
  }
};

// Reusable baseQuery wrapper
export const baseQueryWithTokenCheck = () => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  return async (args, api, extraOptions) => {
    try {
      let token = localStorage.getItem("token");

      // Refresh token if missing or expired
      if (!token || isTokenExpired(token)) {
        token = await refreshToken();
      }

      // If still no token, fail request
      if (!token) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        return { error: { status: 401, data: "Unauthorized" } };
      }

      // Add Authorization header
      const result = await rawBaseQuery(
        {
          ...args,
          headers: {
            ...(args.headers || {}),
            Authorization: `Bearer ${token}`,
          },
        },
        api,
        extraOptions
      );

      // Optional: handle server 500 error gracefully
      if (result.error && result.error.status === 500) {
        console.error("Server error:", result.error.data);
      }

      return result;
    } catch (err) {
      console.error("BaseQuery failed:", err);
      return { error: { status: 500, data: "Internal Error" } };
    }
  };
};
