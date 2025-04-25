import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/auth/log-in";
import "./assets/scss/style.scss";
import AuthLayout from "./components/auth/auth-layout";
import ForgetPssword from "./components/auth/forgot-password";
import Signup from "./components/auth/signup";
import SentEmail from "./components/auth/sent-email";
import DashboardLayout from "./layouts/dashboard-layout";
import AllCase from "./pages/dashboard/all-case";
import Accounts from "./pages/dashboard/accounts";
import {
  ProtectedRouteMiddleware,
  PublicRouteMiddleware,
} from "./components/auth-gaurd";
import Profile from "./pages/dashboard/profile";
export default function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flone-preloader-wrapper">
            <div className="flone-preloader">
              <span></span>
              <span></span>
            </div>
          </div>
        }
      >
        <Routes>
          <Route element={<PublicRouteMiddleware />}>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Login />} />
              <Route path="/auth/forgot-password" element={<ForgetPssword />} />
              <Route path="/auth/sign-up" element={<Signup />} />
              <Route path="/auth/email-sent" element={<SentEmail />} />
            </Route>
          </Route>
          <Route element={<ProtectedRouteMiddleware />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard/accounts" element={<Accounts />} />
              <Route path="/dashboard/all-case" element={<AllCase />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              {/* <Route path="*" element={<h2>404</h2>} /> */}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
