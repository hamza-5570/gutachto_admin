import Loader from "@/components/common/loader";
import { useResetPasswordMutation } from "@/lib/services/auth-api";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [reset_password, { isLoading }] = useResetPasswordMutation();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    reset_password({ data: { password: password }, token })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        router.push("/auth/log-in");
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };
  return (
    <>
      <p className="text-3xl text-black font-bold text-center">
        Reset Password
      </p>
      <p className="text-sm text-[#696F79] text-center pt-5">
        Enter new password
      </p>
      <div className="pt-12">
        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-13 md:h-[64px] rounded-full border border-[#8692A6] placeholder:text-[#8692A6] text-black mt-3 px-7 text-sm md:text-base pr-14"
            />
            <button
              onClick={handleShowPassword}
              className="absolute top-8.5 right-5 text-sm cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!password}
          className="w-full h-12 flex items-center justify-center bg-black text-white text-sm md:text-base font-semibold rounded-full mt-8 cursor-pointer disabled:cursor-default disabled:opacity-50"
        >
          {isLoading ? <Loader /> : "Send"}
        </button>

        <Link href={"/auth/log-in"}>
          <p className="text-base font-medium text-black underline text-center pt-10">
            Back to login
          </p>
        </Link>
      </div>
    </>
  );
}
