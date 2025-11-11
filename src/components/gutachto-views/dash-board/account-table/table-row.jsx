import DeleteModal from "@/common/delete-modal";
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
} from "@/services/admin-api/accountsApi";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Ellipsis, MenuIcon } from "lucide-react";
import { t } from "i18next";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function TableRow({ item }) {
  const [unblockUser, { isLoading }] = useUnblockUserMutation();
  const [blockUser, { isLoading: blockLoading }] = useBlockUserMutation();
  const deleteAccount = useDeleteAccountMutation();
  const handleBlock = async () => {
    try {
      const res = await blockUser({ user_id: item?._id }).unwrap();
      // refetch();
      if (res) {
        toast.success("Account blocked");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to block user");
    }
  };

  const handleUnBlock = async () => {
    try {
      const res = await unblockUser({ user_id: item?._id }).unwrap();
      // refetch();
      toast.success(res?.message || "Account unblocked");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to unblock user");
    }
  };

  return (
    <div className="min-w-[1000px] flex items-center justify-between border-b border-[#DBE0E5] p-5">
      <div className="w-[190px] text-sm text-[#61788A] text-left">
        {item?.first_name} {item?.last_name}
      </div>
      <div className="w-[190px] text-sm  text-[#121417] text-center">
        {item?.enable_email_alerts ? "Yes" : "No"}
      </div>

      <div className="w-[200px] text-sm truncate text-[#61788A] text-center">
        {item?.enable_sms_alerts ? "Yes" : "No"}
      </div>

      <div className="w-[170px] text-sm text-[#61788A] text-center">
        {item?.phone}
      </div>

      <AccountActionsDropdown
        item={item}
        isLoading={isLoading}
        blockLoading={blockLoading}
        handleBlock={handleBlock}
        handleUnBlock={handleUnBlock}
        deleteAccount={deleteAccount}
      />
    </div>
  );
}

function AccountActionsDropdown({
  item,
  isLoading,
  blockLoading,
  handleBlock,
  handleUnBlock,
  deleteAccount,
}) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="w-[100px] text-sm text-[#61788A] text-center">
      <DropdownMenuPrimitive.Root open={dropdown} onOpenChange={setDropdown}>
        <DropdownMenuPrimitive.Trigger className="px-2 py-1  rounded cursor-pointer ">
          <BsThreeDotsVertical size={20} />
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Content className="bg-white shadow-md rounded-md w-40 p-2">
          {isLoading || blockLoading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <DropdownMenuPrimitive.Item
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
                onClick={item?.is_active ? handleBlock : handleUnBlock}
              >
                {item?.is_active ? (
                  <MdBlock size={18} />
                ) : (
                  <CgUnblock size={18} />
                )}
                {item?.is_active
                  ? t("accounts_table.block")
                  : t("accounts_table.unblock")}
              </DropdownMenuPrimitive.Item>

              <DropdownMenuPrimitive.Item
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setDropdown(false);
                  setOpen(true);
                }}
              >
                <MdDelete size={18} />
                {t("accounts_table.delete")}
              </DropdownMenuPrimitive.Item>

              <DropdownMenuPrimitive.Item
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setDropdown(false);
                  navigate(`/dashboard/accounts/${item?._id}`);
                }}
              >
                <IoMdEye size={18} />
                {t("accounts_table.view_detail")}
              </DropdownMenuPrimitive.Item>
            </>
          )}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Root>

      <DeleteModal
        className="cursor-pointer"
        id={item?._id}
        open={open}
        setOpen={setOpen}
        deleteAction={deleteAccount}
      />
    </div>
  );
}
