import React, { useState } from "react";
import TableHeader from "./table-header";
import TableRow from "./table-row";
import Mypaginations from "@/components/my-paginations";
import Loader from "@/common/loader";
import {  useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function AccountTable({ accounts, onIsLoading,refetch,setFilters,filters }) {
  const [currentPage, setCurrentPage] = useState(1);
  const {items,pages } = accounts || {};
  const location=useLocation()
  const navigate=useNavigate()
  const [searchParams,setSearchParams]=useSearchParams()
  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilters({...filters,page:newPage})
    navigate(location.pathname);
    setSearchParams({ ...searchParams, page: newPage });
  };
  return (
    <div className="overflow-x-auto border border-[#DBE0E5] rounded-xl mt-5">
      <div className="max-w-[300px] xl:max-w-full">
        <TableHeader />
        {onIsLoading ? (
          <Loader />
        ) : items?.length > 0 ? (
          items?.map((item, index) => {
            return <TableRow refetch={refetch} key={index} item={item} />;
          })
        ) : (
          <div className="flex flex-col items-center py-4">
            <p className="text-md text-[#121417] font-medium">No Accounts</p>
          </div>
        )}
        <div className="flex justify-center my-4 ">
          <Mypaginations
            count={pages}
            page={currentPage}
            onChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
