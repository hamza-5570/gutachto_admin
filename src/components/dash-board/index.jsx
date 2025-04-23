import React from "react";
// import { useGetAccountsQuery } from "@/services/admin-api";
import AccountTable from "./account-table";
import { accounts } from "@/data";

export default function Dashboard() {
  // const { data: Accounts, } = useGetAccountsQuery();

  return (
    <div className="font-sans">
      <div>
        <p className="text-[22px] font-bold text-[#121417]">Accounts</p>
        <AccountTable accounts={accounts} />
      </div>
    </div>
  );
}
