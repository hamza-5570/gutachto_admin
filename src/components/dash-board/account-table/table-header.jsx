import React from "react";

export default function TableHeader() {
  return (
    <div className="min-w-[1000px] flex items-center justify-between px-5 py-3 border-b border-[#DBE0E5]">
      <div className="w-[182px] text-sm text-[#121417] font-medium">
        Account Type
      </div>

      <div className="w-[200px] text-sm text-[#121417] font-medium">Name</div>

      <div className="w-[189px] text-sm text-[#121417] font-medium">
        Company Name
      </div>
      <div className="w-[170px] text-sm text-[#121417] font-medium">Phone</div>

      <div className="w-[185px] text-sm text-[#121417] font-medium">
        Corporation contract
      </div>
    </div>
  );
}
