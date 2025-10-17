import AccountTable from "@/components/gutachto-views/dash-board/account-table";
import { useGetAccountsQuery } from "@/services/admin-api/accountsApi";
import React, { useState } from "react";

export default function Accounts() {
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
  });
  const { data, isLoading } = useGetAccountsQuery(filters);
  return (
    <div className="font-sans">
      <div>
        <AccountTable
          setFilters={setFilters}
          accounts={data}
          onIsLoading={isLoading}
        />
      </div>
    </div>
  );
}
