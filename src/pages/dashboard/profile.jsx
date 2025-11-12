import AccountForm from "@/components/gutachto-views/dash-board/profile/account-form";
import DeleteForm from "@/components/gutachto-views/dash-board/profile/delete-form";
import PasswordForm from "@/components/gutachto-views/dash-board/profile/password-form";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();
  return (
    <div className="font-sans">
      <div>
        <AccountForm />
      </div>
      <div>
        <hr className="border-t border-[#EEEEEE] my-10" />
      </div>
      <p className="text-xl text-black font-bold">
        {t("profile.account_information.change_password")}
      </p>
      <div>
        <PasswordForm />
      </div>
      <hr className="border-t border-[#EEEEEE] my-10" />

      <p className="text-xl text-black font-bold">
        {t("profile.account_information.delete_account")}
      </p>
      <div>
        <p className="text-sm text-[#696F79] font-medium">
          {t("profile.account_information.danager_text")}
        </p>
        <DeleteForm />
      </div>
    </div>
  );
}
