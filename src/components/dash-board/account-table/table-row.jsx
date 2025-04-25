import DeleteModal from "@/common/delete-modal";
import { Tooltip } from "@/components/ui/tooltip";
import ToolTipCom from "@/components/ui/tooltip-com";
import { Item } from "@radix-ui/react-select";
import React, { useState } from "react";
import { MdBlock, MdDelete } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { useBlockUserMutation, useUnblockUserMutation } from "@/services/admin-api";
import { toast } from "react-toastify";
import Loader from "@/common/loader";

export default function TableRow({ item ,refetch}) {
const [unblockUser,{isLoading}]=useUnblockUserMutation()
const [blockUser,{isLoading:blockLoading}] =useBlockUserMutation()

  const [open,setOpen]=useState(false)
  const handleBlock=()=>{
     blockUser({
      user_id:item?._id
    }).unwrap().then((res)=>{
      refetch()
      toast.success(res?.message,{
        position:"top-center",
        autoClose:2000,
        hideProgressBar:true,
        theme:"colored"
      })
    })
  }
  const handleUnBlock=()=>{
    unblockUser({
      user_id:item?._id
    }).unwrap().then((res)=>{
      refetch()
      toast.success(res?.message,{
        position:"top-center",
        autoClose:2000,
        hideProgressBar:true,
        theme:"colored"
      })
    })
  }
  return (
    <div className="min-w-[1000px] flex items-center justify-between border-b border-[#DBE0E5] p-5">
      <div className="w-[189px] text-sm text-[#61788A]">
        {item?.first_name} {item?.last_name}
      </div>
      <div className="w-[182px] text-sm  text-[#121417]">
        {item?.enable_email_alerts ? "Yes" : "No"}
      </div>

      <div className="w-[200px] text-sm truncate text-[#61788A]">
        {item?.enable_sms_alerts ? "Yes" : "No"}
      </div>

      <div className="w-[170px] text-sm text-[#61788A]">{item?.phone}</div>

      <div className="w-[100px] text-sm text-[#61788A]">
        {item?.is_admin ? "Yes" : "No"}
      </div>
      <div className="w-[100px] text-sm text-[#61788A]">
        <div className="flex items-center">
          {isLoading || blockLoading ? <Loader/> : <ToolTipCom icon={item.is_active ? <MdBlock 
          onClick={handleBlock}
          size={20} />: <CgUnblock
          onClick={handleUnBlock}
          size={20} />} content="Block/Unblock" />}
          <ToolTipCom icon={<MdDelete onClick={() => setOpen(true)}  size={20} />} content="Delete" />
          <DeleteModal open={open} setOpen={setOpen} />

        </div>
      </div>
    </div>
  );
}
