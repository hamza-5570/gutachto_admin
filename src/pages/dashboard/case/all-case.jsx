import CasesTable from "@/components/gutachto-views/dash-board/cases-table";
import { useGetCasesQuery } from "@/services/admin-api";
import React, { useState } from "react";

export default function AllCase() {
   const [filters,setFilters]=useState({
      page:1,
      size:10
    })
  const {data:cases,isLoading,refetch}=useGetCasesQuery(filters)
  return (
    <div className="font-sans">
      <div>
        <CasesTable accounts={cases} refetch={refetch} onIsLoading={isLoading} setFilters={setFilters} filters={filters} />
      </div>
    </div>
  );
}
