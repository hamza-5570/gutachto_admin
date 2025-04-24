import { Navigate, Outlet } from "react-router-dom";
import ProgressBar from "./progress-bar";

export const PublicRouteMiddleware = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (token && isLoggedIn) {
    return <Navigate to={"/dashboard/accounts"} replace />;
  }
  return <Outlet />;
};

export const ProtectedRouteMiddleware = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <ProgressBar>
      <Outlet />
    </ProgressBar>
  );
};
