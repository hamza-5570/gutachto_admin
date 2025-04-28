import React from "react";

export default function TableHeader() {
  return (
    <div className="min-w-[1000px] flex items-center justify-between px-5 py-3 border-b border-[#DBE0E5]">
      <div className="w-[182px] text-sm text-[#121417] font-medium">
        Account Id
      </div>

      <div className="w-[200px] text-sm text-[#121417] font-medium">
        Accident Location
      </div>

      <div className="w-[189px] text-sm text-[#121417] font-medium">
        Police File
      </div>
      <div className="w-[100px] text-sm text-[#121417] font-medium">Status</div>

      <div className="w-[170px] text-sm text-[#121417] font-medium">
        Internal Inspector
      </div>
      <div className="w-[100px] text-sm text-[#121417] font-medium">
       Action
      </div>
    </div>
  );
}
