import CasesTable from "@/components/gutachto-views/dash-board/cases-table";
import { useGetCasesQuery } from "@/services/admin-api";
import React from "react";

export default function AllCase() {
  const {data:cases,isLoading,refetch}=useGetCasesQuery()

  return (
    <div className="font-sans">
      <div>
        <CasesTable accounts={cases} refetch={refetch} onIsLoading={isLoading} />
      </div>
    </div>
  );
}
