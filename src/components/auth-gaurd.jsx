import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // npm i jwt-decode
import ProgressBar from "./progress-bar";
import { Loader } from "lucide-react";

// Function to check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token); // decode JWT
    if (!exp) return true;
    return Date.now() >= exp * 1000; // exp is in seconds
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return true;
  }
};

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
    localStorage.setItem("token", data.token); // update token
    if (data.refresh_token) {
      localStorage.setItem("refresh_token", data.refresh_token); // update refresh token if provided
    }
    return data.token;
  } catch (error) {
    console.error("Refresh token failed:", error);
    return null;
  }
};

export const ProtectedRouteMiddleware = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      let token = localStorage.getItem("token");

      // Check if token exists and is not expired
      if (!token || isTokenExpired(token)) {
        token = await refreshToken(); // try refreshing
      }

      setAuthorized(!!token);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center ">
        <Loader className="animate-pulse" />
      </div>
    ); // show loader while checking
  if (!authorized) return <Navigate to={"/"} replace />;

  return (
    <ProgressBar>
      <Outlet />
    </ProgressBar>
  );
};
export const PublicRouteMiddleware = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (token && isLoggedIn) {
    return <Navigate to={"/dashboard/accounts"} replace />;
  }
  return <Outlet />;
};
