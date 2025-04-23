import CasesTable from "@/components/dash-board/cases-table";
import { cases } from "@/data";
import React from "react";

export default function AllCase() {
  // const { data: Accounts, } = useGetAccountsQuery();

  return (
    <div className="font-sans">
      <div>
        <p className="text-[22px] font-bold text-[#121417]">All Cases</p>
        <CasesTable accounts={cases} />
      </div>
    </div>
  );
}
