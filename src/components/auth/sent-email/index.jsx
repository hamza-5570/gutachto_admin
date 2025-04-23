import React from "react";
import { Link } from "react-router-dom";

export default function EmailSent() {
  return (
    <>
      <p className="text-3xl text-black font-bold text-center">
        Check your Email
      </p>
      <p className="text-sm text-[#696F79] text-center pt-5">
        We have sent an email with password reset information to
        n****e@e***e.com.
      </p>
      <div className="pt-12">
        <p className="text-sm text-[#696F79] font-medium text-center pt-5">
          {`Didn’t receive the email? Check spam or promotion folder.`}
        </p>

        <button className="w-full h-12 bg-black text-white text-sm md:text-base font-semibold rounded-full mt-8 cursor-pointer">
          Resend
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
