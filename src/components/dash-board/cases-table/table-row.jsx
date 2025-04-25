import GenericDeleteDialog from "@/components/generic-delete-dialog";
import ToolTipCom from "@/components/ui/tooltip-com";
import { useDeleteCaseMutation } from "@/services/admin-api";
import React, { useState } from "react";
import { MdDelete, MdPersonPinCircle } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import UpdateStatus from "./update-status";

export default function TableRow({ item ,refetch}) {
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const handleStatus=()=>{
    setOpenStatus(true)
  }

  return (
    <div className="min-w-[1000px] flex items-center justify-between border-b border-[#DBE0E5] p-5">
      <div className="w-[182px] text-sm text-[#121417]">{item?.account_id}</div>

      <div className="w-[200px] text-sm truncate text-[#61788A]">
        {item?.accident.location}
      </div>

      <div className="w-[189px] text-sm text-[#61788A]">
        {item?.police_file}
      </div>
      <div className="w-[100px] text-sm text-[#61788A]">{item?.status}</div>

      <div className="w-[170px] text-sm text-[#61788A]">
        {item?.internal_inspector}
      </div>
      <div className="w-[100px] text-sm text-[#61788A]">
        <div className="flex items-center">
          <ToolTipCom
            icon={<MdDelete onClick={() => setOpen(true)} size={20} />}
            content="Delete"
          />
           <ToolTipCom
            icon={<HiOutlinePencilAlt  onClick={handleStatus} size={20} />}
            content="Status"
          />
          <UpdateStatus isOpen={openStatus} setIsOpen={setOpenStatus} refetch={refetch} isedit={true} object={item}/>
          <GenericDeleteDialog refetch={refetch} isOpen={open} setIsOpen={setOpen} deleteAction={useDeleteCaseMutation()} item={item} entityName="case" />
        </div>
      </div>
    </div>
  );
}
