import React from "react";
import Logoimg from "../../../public/assets/png/logo.svg";
export default function Logo() {
  return (
    <>
      <img
        src={Logoimg}
        width={432}
        height={297}
        alt="logo"
        className="w-[108px]"
      />
    </>
  );
}
