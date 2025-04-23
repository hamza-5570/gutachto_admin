import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/auth/log-in";
import "./assets/scss/style.scss";
import AuthLayout from "./components/auth/auth-layout";
import ForgetPssword from "./components/auth/forgot-password";
import Signup from "./components/auth/signup";
import SentEmail from "./components/auth/sent-email";
import DashboardLayout from "./layouts/dashboard-layout";
import Dashboard from "./pages/dashboard/index"
import AllCase from "./pages/dashboard/all-case";
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
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/auth/forgot-password" element={<ForgetPssword />} />
            <Route path="/auth/sign-up" element={<Signup />} />
            <Route path="/auth/email-sent" element={<SentEmail />} />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/dashboard/all-case" element={<AllCase/>} />

          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
