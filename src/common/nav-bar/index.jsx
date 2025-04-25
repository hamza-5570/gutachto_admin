
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetUserProfileQuery } from "@/services/auth-api";
import React, { useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";


// eslint-disable-next-line no-unused-vars
export default function Navbar({ handleDrawer, open, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useNavigate();
  const pathname=useLocation().pathname
  const [routeName, setRouteName] = useState("");
  const {data:user}= useGetUserProfileQuery()

  useEffect(() => {
    if (router) {
      const pathSegments = pathname.split("/").filter(Boolean);

      if (pathSegments[0] === "dashboard") {
        if (pathSegments.length === 1) {
          setRouteName("Dashboard");
        } else {
          const formattedName = pathSegments[1]
            .split("-")
            ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          setRouteName(formattedName);
        }
      }
    }
  }, [router, pathname]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

 

  const handlelogout = async () => {
    localStorage.clear();
    setIsOpen(false);
    await router("/");
  };

  return (
    <div className="h-[70px] md:h-[82px] flex items-center justify-between shadow-md shadow-[#0000000D] pr-5 pl-5 py-5 lg:pr-8 lg:py-8 lg:pl-[100px] xl:pl-8">
      <img
        src={"/assets/svg/left-arrow.svg"}
        alt=""
        width={30}
        height={30}
        onClick={handleDrawer}
        className={`fixed z-50 top-5 w-12 cursor-pointer lg:block hidden ${
          open ? "left-[235px]" : "left-2"
        }`}
      />
      <p className="text-xl md:text-[28px] text-[#17191B] font-semibold">
        {routeName}
      </p>

      <div className="flex items-center gap-3">
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-[223px] h-12 border border-[#EEEEEE] rounded-full text-sm placeholder:text-[#A1A4A9] ps-12 pr-5"
          />
          <img
            src={"/assets/svg/search-icon.svg"}
            alt=""
            width={22}
            height={22}
            className="absolute top-3 left-4"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <button variant="outline">
              <div className="w-12 h-12 flex items-center justify-center rounded-full border border-[#EEEEEE]">
                <div className="relative">
                  <BiBell size={22} />
                  <div className="absolute -top-1 -right-1 w-[14px] h-[14px] flex items-center justify-center rounded-full bg-black text-white text-[10px]">
                    1
                  </div>
                </div>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-96">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Notifications</h4>
              
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <div
          className="relative w-[206px] hidden md:block cursor-pointer"
          onClick={toggleDropdown}
        >
          <div className="h-12 flex items-center justify-between rounded-full border border-[#EEEEEE] pl-2 pr-3">
            <div className="flex gap-2">
              <div className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#D9D9D9] text-black text-sm">
                {user?.first_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs text-black">{user?.first_name + " " + user?.last_name}</p>
                <p className="text-xs text-[#7A7E83]">
                  {user?.is_admin ? "Admin" : "User" }
                </p>
              </div>
            </div>
            <IoIosArrowDown size={14} className="cursor-pointer" />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-full bg-white border border-[#EEEEEE] rounded-lg shadow-lg z-10">
              <ul className="text-sm text-black">
                <li onClick={()=>router("/dashboard/profile")} className="p-2 hover:bg-gray-100 cursor-pointer border-b border-[#EEEEEE]">
                  Settings
                </li>
                <li
                  onClick={handlelogout}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        <img
          src={"/assets/svg/left-arrow.svg"}
          alt=""
          width={30}
          height={30}
          onClick={handleDrawer}
          className="cursor-pointer w-12 rotate-180 block lg:hidden"
        />
      </div>
    </div>
  );
}
