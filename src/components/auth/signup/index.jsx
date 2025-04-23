import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserSignUpMutation } from "../../../services/auth-api";
import { toast } from "react-toastify";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [signUp, { isLoading }] = useUserSignUpMutation();

  const handleSubmit = () => {
    signUp({
      name: formData.name,
      password: formData.password,
      email: formData.email,
    })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        localStorage.setItem("token", res?.token);
        localStorage.setItem("user", JSON.stringify(res?.data));
        router.push("/auth/log-in");
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  return (
    <>
      <p className="text-3xl text-black font-bold text-center">Welcome</p>
      <div className="pt-12">
        <div>
          <p className="text-base text-[#696F79] font-medium">Email address*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full h-12 md:h-[64px] rounded-full border border-[#8692A6] placeholder:text-[#8692A6] text-black mt-3 px-7 text-sm md:text-base"
          />
        </div>

        <div className="mt-5">
          <p className="text-base text-[#696F79] font-medium">Password*</p>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-12 md:h-[64px] rounded-full border border-[#8692A6] placeholder:text-[#8692A6] text-black mt-3 px-7 text-sm md:text-base pr-14"
            />
            <button
              onClick={handleShowPassword}
              className="absolute top-8 right-5 text-sm cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>


        <button
          onClick={handleSubmit}
          className="w-full h-12 flex items-center justify-center bg-gradient-to-r from-[#000000] to-[#80C2A1] text-white text-sm md:text-base font-semibold rounded-full mt-8 cursor-pointer disabled:opacity-50 disabled:cursor-default"
          disabled={!formData.name || !formData.email || !formData.password}
        >
          {isLoading ? <Loader /> : "Create Account"}
        </button>

        <Link to={"/"}>
          <p className="text-base font-semibold text-[#696F79] text-center pt-7">
            Already have an account?{" "}
            <span className="text-black font-bold cursor-pointer">Signin</span>
          </p>
        </Link>
      </div>
    </>
  );
}
