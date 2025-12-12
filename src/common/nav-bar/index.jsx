import { useGetUserProfileQuery } from "@/services/auth-api";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// eslint-disable-next-line no-unused-vars
export default function Navbar({ handleDrawer, open, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useNavigate();
  const pathname = useLocation().pathname;
  const [routeName, setRouteName] = useState("");
  const { data: user } = useGetUserProfileQuery();
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const handleChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    if (router) {
      const pathSegments = pathname.split("/").filter(Boolean);

      if (pathSegments[0] === "dashboard") {
        if (pathSegments.length === 1) {
          setRouteName("Dashboard");
        } else {
          const formattedName = pathSegments[1]
            .split("-")
            ?.map((word) => word.charAt(0).toLocaleLowerCase() + word.slice(1))
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
    <div className="h-[70px] md:h-[82px] relative shadow-md shadow-[#0000000D] flex items-center justify-between pr-5 pl-5 py-5 lg:pr-8 lg:py-8 lg:pl-[100px] xl:pl-8">
      {/* Left Edge: Absolute Back Arrow */}
      <img
        src={"/assets/svg/left-arrow.svg"}
        alt=""
        width={30}
        height={30}
        onClick={handleDrawer}
        className={`${
          open ? "rotate-0" : "rotate-180"
        } absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer w-12`}
      />

      {/* Left Side: Title */}
      <div className="flex items-center gap-4 ml-12">
        {" "}
        {/* add left margin to avoid overlapping arrow */}
        <p className="text-xl md:text-[28px] text-[#17191B] font-semibold">
          {t(`navigation.${routeName}`)}
        </p>
      </div>

      {/* Right Side: Language + Profile */}
      <div className="flex items-center gap-4">
        <LanguageDropdown onChange={handleChange} />

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
                <p className="text-xs text-black">
                  {user?.first_name + " " + user?.last_name}
                </p>
                <p className="text-xs text-[#7A7E83]">
                  {user?.is_admin ? "Admin" : "User"}
                </p>
              </div>
            </div>
            <IoIosArrowDown size={14} className="cursor-pointer" />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-full bg-white border border-[#EEEEEE] rounded-lg shadow-lg z-50">
              <ul className="text-sm text-black">
                <li
                  onClick={() => router("/dashboard/profile")}
                  className="p-2 hover:bg-gray-100 cursor-pointer border-b border-[#EEEEEE]"
                >
                  {t("profile.settings")}
                </li>
                <li
                  onClick={handlelogout}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {t("profile.logout")}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LanguageDropdown({ onChange }) {
  const [selected, setSelected] = useState("du");

  const handleChange = (lang) => {
    setSelected(lang);
    onChange(lang);
  };

  const languageLabel = selected === "en" ? "English" : "German";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{languageLabel}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChange("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange("du")}>
          German
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
