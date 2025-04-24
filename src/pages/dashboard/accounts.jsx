import AccountTable from "@/components/dash-board/account-table";
import { accounts } from "@/data";
import React from "react";

export default function Accounts() {
  return (
    <div className="font-sans">
      <div>
        <p className="text-[22px] font-bold text-[#121417]">Accounts</p>
        <AccountTable accounts={accounts} />
      </div>
    </div>
  );
}
