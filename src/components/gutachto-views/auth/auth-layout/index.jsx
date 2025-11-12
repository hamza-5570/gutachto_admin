import React from "react";
import { Outlet } from "react-router-dom";
import leftImage from "../../../../../public/assets/png/veri.f247d9b89eed1f02cf33.png";
// component
export default function AuthLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen overflow-hidden max-w-[1378px] w-full mx-auto">
      {/* Left Side */}
      <div className="flex items-center justify-center lg:rounded-r-3xl overflow-hidden">
        <img
          src={leftImage}
          className="sm:max-w-full sm:max-h-screen object-contain lg:w-full w-72"
          alt="Left"
        />
      </div>

      {/* Right Side */}
      <div className=" flex flex-col justify-center pt-10 lg:pt-20 pb-5 lg:pb-0 overflow-hidden">
        <img
          src={"/assets/png/logo.svg"}
          width={432}
          height={297}
          alt="logo"
          className="w-[108px] absolute left-5 md:left-full  md:-translate-x-32 top-5"
        />

        <div className="md:w-[427px] mx-auto w-full px-5 md:px-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
