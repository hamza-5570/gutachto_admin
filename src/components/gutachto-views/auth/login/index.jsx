import { useState } from "react";
import { useLazyGetUserProfileQuery } from "../../../../services/auth-api";
import Loader from "@/common/loader";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [GetUserProfile] = useLazyGetUserProfileQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_SOME_BASE_URL}/auth/token`, {
        username: values.email,
        password: values.password,
      })
      .then(async (res) => {
        localStorage.setItem("token", res?.data?.access_token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("refresh_token", res?.data?.refresh_token);
        const profile = await GetUserProfile().unwrap();
        localStorage.setItem("user", JSON.stringify(profile));
        toast.success("Login successful");
        resetForm();
        setIsLoading(false);
        navigate("/dashboard/home/");
      })
      .catch((err) => {
        toast.error("Something went wrong");
        setIsLoading(false);
      });
  };

  return (
    <>
      <p className="text-3xl text-black font-bold text-center">
        {t("login.wellcome")}
      </p>

      <div className="sm:pt-12 pt-6">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values }) => (
            <Form>
              <div>
                <p className="text-base text-[#696F79] font-medium">
                  {t("login.email_address")}
                </p>

                <Field
                  type="email"
                  name="email"
                  placeholder={t("login.email_placeholder")}
                  className="w-full h-12 md:h-[64px] rounded-full border border-[#8692A6] placeholder:text-[#8692A6] text-black mt-3 px-7 text-sm md:text-base"
                />
              </div>

              <div className="mt-5">
                <p className="text-base text-[#696F79] font-medium">
                  {t("login.password")}*
                </p>

                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
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
                type="submit"
                disabled={!values.email || !values.password}
                className="w-full h-12 flex items-center justify-center bg-gradient-to-r from-[#000000] to-[#80C2A1] text-white font-semibold rounded-full mt-8 cursor-pointer text-sm md:text-base disabled:cursor-default disabled:opacity-50"
              >
                {isLoading ? <Loader /> : t("login.login")}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
