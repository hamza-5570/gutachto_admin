import GenericDeleteDialog from "@/components/generic-delete-dialog";
import ToolTipCom from "@/components/ui/tooltip-com";
import { useDeleteCaseMutation } from "@/services/admin-api";
import React, { useState } from "react";
import { MdDelete, MdPersonPinCircle } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import UpdateStatus from "./update-status";
import { IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function TableRow({ item ,refetch}) {
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const handleStatus=()=>{
    setOpenStatus(true)
  }
  const navigate=useNavigate()

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
            icon={<MdDelete className="cursor-pointer"   onClick={() => setOpen(true)} size={20} />}
            content="Delete"
          />
           <ToolTipCom
            icon={<HiOutlinePencilAlt  className="cursor-pointer"  onClick={handleStatus} size={20} />}
            content="Status"
          />
          <UpdateStatus isOpen={openStatus} setIsOpen={setOpenStatus} refetch={refetch} isedit={true} object={item}/>
          <ToolTipCom icon={<IoMdEye className="cursor-pointer" onClick={()=>{navigate(`/dashboard/all-case/${item?._id}`)}} size={20}/>} content="View Details" />
          <GenericDeleteDialog refetch={refetch} isOpen={open} setIsOpen={setOpen} deleteAction={useDeleteCaseMutation()} item={item} entityName="case" />
        </div>
      </div>
    </div>
  );
}
