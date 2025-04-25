import AccountForm from "@/components/dash-board/profile/account-form";
import DeleteForm from "@/components/dash-board/profile/delete-form";
import PasswordForm from "@/components/dash-board/profile/password-form";
import React from "react";

export default function Profile() {

  return (
    <div className="font-sans">
      <p className="text-xl text-black font-bold">My Account</p>
      <div>
        <AccountForm/>
      </div>
      <div >
      <hr className="border-t border-[#EEEEEE] my-10" />
      </div>
      <p className="text-xl text-black font-bold"> Change Password</p>
      <div>
        <PasswordForm/>
      </div>
      <hr className="border-t border-[#EEEEEE] my-10" />

      <p className="text-xl text-black font-bold">Danger Zone</p>
      <div>
        <p className="text-sm text-[#696F79] font-medium">Once you delete your account, there is no going back. Please be certain.</p>
        <DeleteForm/>
      </div>
    </div>
  );
}
