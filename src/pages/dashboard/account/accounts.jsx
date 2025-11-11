import AccountTable from "@/components/gutachto-views/dash-board/account-table";
import { Button } from "@/components/ui/button";
import { useGetAccountsQuery } from "@/services/admin-api/accountsApi";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Accounts() {
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
  });
  const { data, isLoading } = useGetAccountsQuery(filters);
  const { t } = useTranslation();
  return (
    <div className="font-sans">
      <div className="text-right">
        <Link to="/dashboard/accounts/registor-account">
          <Button>{t("register_account")}</Button>
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
