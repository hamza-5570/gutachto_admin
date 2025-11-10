import { Suspense } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/auth/log-in";
import "./assets/scss/style.scss";
import AuthLayout from "./components/gutachto-views/auth/auth-layout";
import ForgetPssword from "./components/gutachto-views/auth/forgot-password";
import SentEmail from "./components/gutachto-views/auth/sent-email";
import DashboardLayout from "./layouts/dashboard-layout";
import AllCase from "./pages/dashboard/case/all-case";
import Accounts from "./pages/dashboard/account/accounts";
import "../i18n";
import Profile from "./pages/dashboard/profile";
import AccountDetail from "./pages/dashboard/account/account-detail";
import CaseDetail from "./pages/dashboard/case/case-detail";
import AddCase from "./pages/dashboard/case/add-case";
import EidtCase from "./pages/dashboard/case/edit-case";
import Registor from "./pages/dashboard/account/registor-account";
import {
  ProtectedRouteMiddleware,
  PublicRouteMiddleware,
} from "./components/auth-gaurd";
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
              <Route path="/login" element={<Login />} />
              <Route path="/auth/forgot-password" element={<ForgetPssword />} />
              <Route path="/auth/email-sent" element={<SentEmail />} />
              <Route
                path="*"
                element={
                  <h2 className="text-center text-4xl">
                    Page Not Found{" "}
                    <Link to="/" className="cursor-pointer underline text-sm">
                      back
                    </Link>
                  </h2>
                }
              />
            </Route>
          </Route>
          <Route element={<ProtectedRouteMiddleware />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard/accounts" element={<Accounts />} />
              <Route
                path="/dashboard/accounts/:id"
                element={<AccountDetail />}
              />
              <Route path="/dashboard/all-case" element={<AllCase />} />
              <Route
                path="/dashboard/all-case/register-case"
                element={<AddCase />}
              />
              <Route
                path="/dashboard/all-case/edit-case"
                element={<EidtCase />}
              />
              <Route path="/dashboard/all-case/:id" element={<CaseDetail />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route
                path="/dashboard/accounts/registor-account"
                element={<Registor />}
              />

              <Route
                path="*"
                element={
                  <h2 className="text-center text-4xl">
                    Page Not Found{" "}
                    <span className="cursor-pointer underline">Back</span>
                  </h2>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
