import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../../../services/auth-api";
import Loader from "@/common/loader";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [ForgotPassword, { isLoading }] = useForgetPasswordMutation();

  const handleSubmit = () => {
    ForgotPassword({
      email: email,
    })
      .unwrap()
      .then(() => {
        navigate("/auth/email-sent");
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };
  return (
    <>
      <p className="text-3xl text-black font-bold text-center">
        Forgot Password
      </p>
      <p className="text-sm text-[#696F79] text-center pt-5">
        Enter the email you used to create your account so we can send you
        instructions on how to reset your password.
      </p>
      <div className="pt-12">
        <div>
          <p className="text-base text-[#696F79] font-medium">
            Enter Email address*
          </p>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 md:h-[64px] rounded-full border border-[#8692A6] placeholder:text-[#8692A6] text-black mt-3 px-7"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!email}
          className="w-full h-12 flex items-center justify-center  bg-gradient-to-r from-[#000000] to-[#80C2A1] text-white text-sm md:text-base font-semibold rounded-full mt-8 cursor-pointer disabled:cursor-default disabled:opacity-50"
        >
          {isLoading ? <Loader /> : "Send"}
        </button>

        <Link to={"/"}>
          <p className="text-base font-medium text-black underline text-center pt-10">
            Back to login
          </p>
        </Link>
      </div>
    </>
  );
}
