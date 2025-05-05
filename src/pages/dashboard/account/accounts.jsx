import AccountTable from "@/components/gutachto-views/dash-board/account-table";
import { useGetAccountsQuery } from "@/services/admin-api";
import React, { useState } from "react";

export default function Accounts() {
  const [filters,setFilters]=useState({
    page:1,
    size:10
  })
  const {data,isLoading,refetch}=useGetAccountsQuery(filters)
  return (
    <div className="font-sans">
      <div>
        <AccountTable setFilters={setFilters} accounts={data} refetch={refetch} filters={filters} onIsLoading={isLoading}/>
      </div>
    </div>
  );
}
