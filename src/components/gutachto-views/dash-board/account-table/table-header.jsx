import React from "react";
import { useTranslation } from "react-i18next";

export default function TableHeader() {
  const { t } = useTranslation();
  return (
    <div className="min-w-[1000px] flex items-center justify-between px-5 py-3 border-b border-[#DBE0E5]">
      <div className="w-[190px] text-sm text-[#121417] font-medium">
        {t("accounts_table.name")}
      </div>
      <div className="w-[190px] text-sm text-[#121417] font-medium text-center">
        {t("accounts_table.enable_email_alerts")}
      </div>
      <div className="w-[189px] text-sm text-[#121417] font-medium text-center">
        {t("accounts_table.enable_sms_alerts")}
      </div>
      <div className="w-[170px] text-sm text-[#121417] font-medium text-center">
        {t("accounts_table.phone")}
      </div>

      <div className="w-[100px] text-sm text-[#121417] font-medium text-center">
        {t("accounts_table.action")}
      </div>
    </div>
  );
}
