import React from "react";
import TableHeader from "./table-header";
import TableRow from "./table-row";
import Mypaginations from "@/components/my-paginations";
import Loader from "@/common/loader";

export default function AccountTable({ accounts, onIsLoading, refetch }) {
  return (
    <div className="overflow-x-auto border border-[#DBE0E5] rounded-xl mt-5">
      <div className="max-w-[300px] xl:max-w-full">
        <TableHeader />
        {onIsLoading ? (
          <Loader />
        ) : accounts?.length > 0 ? (
          accounts
            .filter((item) => !item?.is_admin)
            ?.map((item, index) => {
              return <TableRow refetch={refetch} key={index} item={item} />;
            })
        ) : (
          <div className="flex flex-col items-center py-4">
            <p className="text-md text-[#121417] font-medium">No Accounts</p>
          </div>
        )}
      </div>
    </div>
  );
}
