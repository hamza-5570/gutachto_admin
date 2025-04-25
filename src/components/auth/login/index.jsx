/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserProfileQuery, useLazyGetUserProfileQuery, useUserLoginMutation } from "../../../services/auth-api";
import Loader from "@/common/loader";
import { useToast } from "@/hooks/use-toast";


export default function Login() {
  const router = useNavigate();
  const { toast } = useToast()
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
  const [GetUserProfile,]=useLazyGetUserProfileQuery()

  const handleSubmit = (e) => {
    e.preventDefault()
    login({
      username: formData.email,
      password: formData.password,
    })
      .unwrap()
      .then(async(res) => {
        router("/dashboard/accounts");
        localStorage.setItem("token", res?.access_token);
        localStorage.setItem("isLoggedIn", true);
        if(res){
          const profile=await GetUserProfile().unwrap()
          localStorage.setItem("user", JSON.stringify(profile));
        }
})
      .catch((err) => {
        toast({
          message: err?.details,
          placement: "top-center",
          variant: "destructive",
        });
      }).finally(() => {
        setFormData({
          email: "",
          password: "",
        })
      });
  };
  return (
    <>
      <p className="text-3xl text-black font-bold text-center">Welcome</p>
      <div className="pt-12">
        <form onSubmit={handleSubmit}>
        <div>
          <p className="text-base text-[#696F79] font-medium">Email address*</p>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            placeholder="Enter email address"
            className="w-full h-12 md:h-[64px] rounded-full border border-[#8692A6] placeholder:text-[#8692A6] text-black mt-3 px-7 text-sm md:text-base"
          />
        </div>

        <div className="mt-5">
          <p className="text-base text-[#696F79] font-medium">Password*</p>
          <input
            type="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            placeholder="Enter password"
            className="w-full h-12 md:h-[64px] rounded-full border border-[#8692A6] placeholder:text-[#8692A6] text-black text-sm md:text-base mt-3 px-7"
          />
        </div>

        <Link to={"/auth/forgot-password"}>
          <button className="text-base text-black font-medium underline mt-5 cursor-pointer">
            Forgot Password?
          </button>
        </Link>

        <button
          onClick={handleSubmit}
          disabled={!formData.email || !formData.password}
          className="w-full h-12 flex items-center justify-center bg-gradient-to-r from-[#000000] to-[#80C2A1]  text-white font-semibold rounded-full mt-8 cursor-pointer text-sm md:text-base disabled:cursor-default disabled:opacity-50"
        >
          {isLoading ? <Loader /> : "Log in"}
        </button>
        </form>
        {/* <Link to={"/auth/sign-up"}>
          <p className="text-base font-semibold text-[#696F79] text-center pt-7">
            Don’t you have an account?{" "}
            <span className="text-black font-bold cursor-pointer">Signup</span>
          </p>
        </Link> */}
      </div>
    </>
  );
}
