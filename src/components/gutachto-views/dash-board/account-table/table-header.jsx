import React from "react";

export default function TableHeader() {
  return (
    <div className="min-w-[1000px] flex items-center justify-between px-5 py-3 border-b border-[#DBE0E5]">
      <div className="w-[190px] text-sm text-[#121417] font-medium">Name</div>
      <div className="w-[190px] text-sm text-[#121417] font-medium text-left">
        Enable Email Alerts
      </div>
      <div className="w-[189px] text-sm text-[#121417] font-medium text-left">
        Enable Sms Alerts
      </div>
      <div className="w-[170px] text-sm text-[#121417] font-medium text-left">
        Phone
      </div>

      <div className="w-[100px] text-sm text-[#121417] font-medium text-left">
        Admin
      </div>
      <div className="w-[100px] text-sm text-[#121417] font-medium text-left">
        Action
      </div>
    </div>
  );
}
