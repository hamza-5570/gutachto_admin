import AccountTable from "@/components/gutachto-views/dash-board/account-table";
import { Button } from "@/components/ui/button";
import { useGetAccountsQuery } from "@/services/admin-api/accountsApi";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Accounts() {
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
  });
  const { data, isLoading } = useGetAccountsQuery(filters);
  return (
    <div className="font-sans">
      <div className="text-right">
        <Link to="/dashboard/accounts/registor-account">
          <Button>Registor Account</Button>
        </Link>
      </div>
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
