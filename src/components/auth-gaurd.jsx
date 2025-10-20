import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import ProgressBar from "./progress-bar";

// Function to refresh token
const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) return null;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token }),
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    localStorage.setItem("token", data.token); // save new token
    if (data.refresh_token) {
      localStorage.setItem("refresh_token", data.refresh_token); // update refresh token if provided
    }
    return data.token;
  } catch (error) {
    console.error("Refresh token failed:", error);
    return null;
  }
};

export const PublicRouteMiddleware = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (token && isLoggedIn) {
    return <Navigate to={"/dashboard/accounts"} replace />;
  }
  return <Outlet />;
};

export const ProtectedRouteMiddleware = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      let token = localStorage.getItem("token");

      if (!token) {
        // Try refresh
        token = await refreshToken();
      }

      if (token) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>; // Optional: show spinner while checking
  if (!authorized) return <Navigate to={"/"} replace />;

  return (
    <ProgressBar>
      <Outlet />
    </ProgressBar>
  );
};
