import DeleteModal from "@/common/delete-modal";
import { Tooltip } from "@/components/ui/tooltip";
import ToolTipCom from "@/components/ui/tooltip-com";
import { Item } from "@radix-ui/react-select";
import React, { useState } from "react";
import { MdBlock, MdDelete } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";

import Loader from "@/common/loader";
import toast from "react-hot-toast";
import { IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  useBlockUserMutation,
  useDeleteAccountMutation,
  useUnblockUserMutation,
} from "@/services/admin-api/accountapi";

export default function TableRow({ item, refetch }) {
  const [unblockUser, { isLoading }] = useUnblockUserMutation();
  const [blockUser, { isLoading: blockLoading }] = useBlockUserMutation();
  const deleteAccount = useDeleteAccountMutation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleBlock = () => {
    blockUser({
      user_id: item?._id,
    })
      .unwrap()
      .then((res) => {
        refetch();
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };
  const handleUnBlock = () => {
    unblockUser({
      user_id: item?._id,
    })
      .unwrap()
      .then((res) => {
        refetch();
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };
  return (
    <div className="min-w-[1000px] flex items-center justify-between border-b border-[#DBE0E5] p-5">
      <div className="w-[190px] text-sm text-[#61788A] text-left">
        {item?.first_name} {item?.last_name}
      </div>
      <div className="w-[190px] text-sm  text-[#121417] text-left">
        {item?.enable_email_alerts ? "Yes" : "No"}
      </div>

      <div className="w-[200px] text-sm truncate text-[#61788A] text-left">
        {item?.enable_sms_alerts ? "Yes" : "No"}
      </div>

      <div className="w-[170px] text-sm text-[#61788A] text-left">
        {item?.phone}
      </div>

      <div className="w-[100px] text-sm text-[#61788A] text-left">
        {item?.is_admin ? "Yes" : "No"}
      </div>
      <div className="w-[100px] text-sm text-[#61788A] text-left">
        <div className="flex items-center">
          {isLoading || blockLoading ? (
            <Loader />
          ) : (
            <ToolTipCom
              icon={
                item?.is_active ? (
                  <MdBlock
                    className="cursor-pointer"
                    onClick={handleBlock}
                    size={20}
                  />
                ) : (
                  <CgUnblock
                    className="cursor-pointer"
                    onClick={handleUnBlock}
                    size={20}
                  />
                )
              }
              content="Block/Unblock"
            />
          )}
          <ToolTipCom
            icon={
              <MdDelete
                className="cursor-pointer"
                onClick={() => setOpen(true)}
                size={20}
              />
            }
            content="Delete"
          />
          <DeleteModal
            className="cursor-pointer"
            id={item?._id}
            open={open}
            setOpen={setOpen}
            deleteAction={deleteAccount}
          />
          <ToolTipCom
            icon={
              <IoMdEye
                className="cursor-pointer"
                onClick={() => {
                  navigate(`/dashboard/accounts/${item?._id}`);
                }}
                size={20}
              />
            }
            content="View Details"
          />
        </div>
      </div>
    </div>
  );
}
