/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
  useUserLoginMutation,
} from "../../../../services/auth-api";
import Loader from "@/common/loader";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [login, { isLoading }] = useUserLoginMutation();
  const [GetUserProfile] = useLazyGetUserProfileQuery();
  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      username: formData.email,
      password: formData.password,
    })
      .unwrap()
      .then(async (res) => {
        router("/dashboard/accounts");
        localStorage.setItem("token", res?.access_token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("refresh_token", res?.refresh_token);
        if (res) {
          const profile = await GetUserProfile().unwrap();
          localStorage.setItem("user", JSON.stringify(profile));
          toast.success("Login successful");
        }
      })
      .catch((err) => {
        console.log("err", err.dat);
        toast.error(err?.data.detail);
      })
      .finally(() => {
        setFormData({
          email: "",
          password: "",
        });
      });
  };
  return (
    <>
      <p className="text-3xl text-black font-bold text-center">
        {t("login.wellcome")}
      </p>
      <div className="sm:pt-12 pt-6">
        <form onSubmit={handleSubmit}>
          <div>
            <p className="text-base text-[#696F79] font-medium">
              {t("login.email_address")}
            </p>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              placeholder={t("login.email_placeholder")}
              className="w-full h-12 md:h-[64px] rounded-full border border-[#8692A6] placeholder:text-[#8692A6] text-black mt-3 px-7 text-sm md:text-base"
            />
          </div>
          <div className="mt-5">
            <p className="text-base text-[#696F79] font-medium">
              {" "}
              {t("login.password")}*
            </p>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                name="password"
                placeholder={t("login.password_placeholder")}
                className="w-full h-12 md:h-[64px] rounded-full border border-[#8692A6] placeholder:text-[#8692A6] text-black text-sm md:text-base mt-3 px-7 pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute bottom-0 top-[10px] right-4 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Link to={"/auth/forgot-password"}>
            <button
              type="button"
              className="text-base text-black font-medium underline mt-5 cursor-pointer"
            >
              {t("login.forgot_password")}
            </button>
          </Link>

          <button
            onClick={handleSubmit}
            type="submit"
            disabled={!formData.email || !formData.password}
            className="w-full h-12 flex items-center justify-center bg-gradient-to-r from-[#000000] to-[#80C2A1]  text-white font-semibold rounded-full mt-8 cursor-pointer text-sm md:text-base disabled:cursor-default disabled:opacity-50"
          >
            {isLoading ? <Loader /> : t("login.login")}
          </button>
        </form>
      </div>
    </>
  );
}
