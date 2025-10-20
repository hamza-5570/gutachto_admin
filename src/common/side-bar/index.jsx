import React, { useState } from "react";
import { PiQuestionBold } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/components/logo";
import { MdAccountCircle, MdSettings } from "react-icons/md";

const menuItems = [
  {
    title: "All Accounts",
    icon: <MdAccountCircle size={22} />,
    link: "/dashboard/accounts",
  },
  {
    title: "All Cases",
    icon: <PiQuestionBold size={22} />,
    link: "/dashboard/all-case",
  },
  {
    title: "My Profile",
    icon: <MdSettings size={22} />,
    link: "/dashboard/profile",
  },
];

export default function SideBar({ open, setOpen }) {
  const router = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const active = useLocation().pathname;

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNavigate = (link) => {
    router(link);
    if (window.innerWidth < 450) {
      setOpen(false);
    }
  };

  return (
    <div
      className={`fixed xl:relative left-0 top-0 h-screen flex flex-col justify-between lg:shadow-[0.5px_0_15px_#00000026] transition-all bg-white duration-300 ease-in-out z-10 overflow-y-auto border-r border-[#DBE0E5] lg:border-r-0 ${
        open
          ? "w-[260px] p-5 xl:p-7 -translate-x-0 lg:translate-x-0"
          : "lg:w-[60px] px-2.5 py-7 -translate-x-full lg:translate-x-0"
      }`}
    >
      {/* <img
        src={"/assets/svg/left-arrow.svg"}
        alt=""
        width={30}
        height={30}
        onClick={handleDrawer}
        className={`absolute top-5 w-12 cursor-pointer lg:block hidden ${
          open ? "-right-0" : "left-1/2 -translate-x-1/2"
        }`}
      /> */}

      <div>
        <Link to={"/dashboard"} className="flex items-center justify-center">
          <div className={`justify-center ${open ? "lg:flex" : "lg:hidden"}`}>
            <Logo />
          </div>
        </Link>

        <div className="relative block lg:hidden mt-5">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full h-12 border border-[#EEEEEE] rounded-full text-sm placeholder:text-[#A1A4A9] ps-12 pr-5"
          />
          <img
            src={"/assets/svg/search-icon.svg"}
            alt=""
            width={22}
            height={22}
            className="absolute top-3 left-4"
          />
        </div>

        <div className="mt-5 lg:mt-16">
          <ul>
            {menuItems?.map((item) => (
              <div
                onClick={() => handleNavigate(item.link)}
                className={`flex items-center gap-3 rounded-full cursor-pointer mt-2
                ${
                  active.startsWith(item.link)
                    ? "bg-black text-white" // ACTIVE
                    : "bg-white text-black" // INACTIVE
                }
                ${
                  open
                    ? "px-5 py-4 lg:justify-baseline"
                    : "p-2 lg:justify-center"
                }`}
              >
                {item.icon}
                <p className={`text-sm ${open ? "lg:block" : "lg:hidden"}`}>
                  {item.title}
                </p>
              </div>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <div className="relative w-full block md:hidden mt-5">
          <div className="h-12 flex items-center justify-between rounded-full border border-[#EEEEEE] pl-2 pr-3">
            <div className="flex gap-2">
              <img
                src={"/assets/png/avatar.png"}
                alt="User Avatar"
                width={200}
                height={200}
                className="w-[38px] h-[38px]"
              />
              <div>
                <p className="text-sm text-black">Zlan bin Zuhaili</p>
                <p className="text-xs text-[#7A7E83]">Admin</p>
              </div>
            </div>
            <IoIosArrowDown
              size={14}
              className="cursor-pointer"
              onClick={toggleDropdown}
            />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-full bg-white border border-[#EEEEEE] rounded-lg shadow-lg z-10">
              <ul className="text-sm text-black">
                <li className="p-2 hover:bg-gray-100 cursor-pointer border-b border-[#EEEEEE]">
                  Profile
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer border-b border-[#EEEEEE]">
                  Settings
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
