import CasesTable from "@/components/gutachto-views/dash-board/cases-table";
import { Button } from "@/components/ui/button";
import { useGetCasesQuery } from "@/services/admin-api";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AllCase() {
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
  });
  const { data: cases, isLoading } = useGetCasesQuery(filters);
  return (
    <div className="font-sans">
      <div className="text-right">
        <Link to="/dashboard/all-case/register-case">
          <Button>Register Case</Button>
        </Link>
      </div>
      <div>
        <CasesTable
          cases={cases}
          onIsLoading={isLoading}
          setFilters={setFilters}
          filters={filters}
        />
      </div>
    </div>
  );
}
