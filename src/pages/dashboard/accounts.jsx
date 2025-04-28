import AccountTable from "@/components/gutachto-views/dash-board/account-table";
import { useGetAccountsQuery } from "@/services/admin-api";
import React from "react";

export default function Accounts() {
  const {data,isLoading,refetch}=useGetAccountsQuery()
  return (
    <div className="font-sans">
      <div>
        <AccountTable accounts={data} refetch={refetch}  onIsLoading={isLoading}/>
      </div>
    </div>
  );
}
