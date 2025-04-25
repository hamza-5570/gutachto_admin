import React, { useState } from "react";
import TableHeader from "./table-header";
import TableRow from "./table-row";
import Mypaginations from "@/components/my-paginations";
import Loader from "@/common/loader";

export default function CasesTable({ accounts,onIsLoading,refetch }) {
  const [currentPage, setCurrentPage] = useState(1);
  const {totalPages}=accounts?.pagination || {}
  // const location=useLocation()
  // const params=URLSearchParams(location.search)
  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
    // navigate({
    //   to: location.pathname, // Keeps the current path
    //   search: { ...params.query, page: newPage }, // Merge existing and new query args
    // });
  };
  return (
    <div className="overflow-x-auto border border-[#DBE0E5] rounded-xl mt-5">
      <div className="max-w-[300px] xl:max-w-full">
        <TableHeader />
        {onIsLoading ? <Loader />:accounts?.length>0 ? accounts?.map((item, index) => {
          return ( <TableRow key={index} item={item} refetch={refetch} /> )
         }):<div className="flex flex-col items-center py-4">
           <p className="text-md text-[#121417] font-medium">
              No Accounts
            </p>
         </div>}
        <div className="flex justify-center my-4 ">
          <Mypaginations
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
