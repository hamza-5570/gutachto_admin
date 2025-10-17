import React from "react";
import { Outlet } from "react-router-dom";
import  leftImage from "../../../../../public/assets/png/veri.f247d9b89eed1f02cf33.png"
// component
export default function AuthLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">
      <div className=" place-content-center lg:rounded-r-3xl">
       <img src={leftImage}/>
      </div>
      <div className="place-content-center pt-10 lg:pt-20 pb-5 lg:pb-0">
        <img
          src={"/assets/png/logo.svg"}
          width={432}
          height={297}
          alt="logo"
          className="w-[108px] absolute left-1/2 md:left-full -translate-x-1/2 md:-translate-x-32 top-5"
        />

        <div className="md:w-[427px] mx-auto px-5 md:px-0">{ <Outlet />}</div>
      </div>
    </div>
  );
}
