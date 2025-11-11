import React from "react";
import TableHeader from "./table-header";
import TableRow from "./table-row";
import Loader from "@/common/loader";
import { useTranslation } from "react-i18next";

export default function CasesTable({ cases, onIsLoading, refetch }) {
  const { t } = useTranslation();
  return (
    <div className="overflow-x-auto border border-[#DBE0E5] rounded-xl mt-5">
      <div className="max-w-[300px] xl:max-w-full">
        <TableHeader />
        {onIsLoading ? (
          <Loader />
        ) : cases?.length > 0 ? (
          cases?.map((item, index) => {
            return <TableRow key={index} item={item} refetch={refetch} />;
          })
        ) : (
          <div className="flex flex-col items-center py-4">
            <p className="text-md text-[#121417] font-medium">
              {t("case_table.no_accounts")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
