import React from "react";
import { useTranslation } from "react-i18next";

export default function TableHeader() {
  const { t } = useTranslation();
  return (
    <div className="min-w-[1000px] flex items-center justify-between px-5 py-3 border-b border-[#DBE0E5]">
      <div className="w-[182px] text-sm text-[#121417] font-medium">
        {t("case_table.id")}
      </div>

      <div className="w-[200px] text-sm text-[#121417] font-medium text-center">
        {t("case_table.accident_location")}
      </div>

      <div className="w-[189px] text-sm text-[#121417] font-medium text-center ">
        {t("case_table.police_file")}
      </div>
      <div className="w-[100px] text-sm text-[#121417] font-medium text-center">
        {t("case_table.status")}
      </div>

      <div className="w-[170px] text-sm text-[#121417] font-medium text-center">
        {t("case_table.internal_inspector")}
      </div>
      <div className="w-[100px] text-sm text-[#121417] font-medium text-center">
        {t("case_table.action")}
      </div>
    </div>
  );
}
