import GenericDeleteDialog from "@/components/generic-delete-dialog";
import { useDeleteCaseMutation } from "@/services/admin-api";
import React from "react";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import UpdateStatus from "./update-status";
import { IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Ellipsis } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useTranslation } from "react-i18next";

export default function TableRow({ item, refetch }) {
  return (
    <div className="min-w-[1000px] flex items-center justify-between border-b border-[#DBE0E5] p-5">
      <div className="w-[182px] text-sm text-[#121417]">{item?.account_id}</div>

      <div className="w-[200px] text-sm truncate text-[#61788A] text-center">
        {item?.accident.location}
      </div>

      <div className="w-[189px] text-sm text-[#61788A] text-center">
        {item?.police_file}
      </div>
      <div className="w-[100px] text-sm text-[#61788A] text-center">
        {item?.status}
      </div>

      <div className="w-[170px] text-sm text-[#61788A] text-center">
        {item?.internal_inspector}
      </div>
      <CaseActionsDropdown item={item} refetch={refetch} />
    </div>
  );
}

function CaseActionsDropdown({ item, refetch }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openStatus, setOpenStatus] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <div className="w-[100px] text-sm text-[#61788A] text-center">
      <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenu.Trigger className="p-1 rounded-full hover:bg-gray-100 cursor-pointer">
          <BsThreeDotsVertical size={20} />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="bg-white shadow-md rounded-md w-40 p-2">
          <DropdownMenu.Item
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setOpen(true);
              setDropdownOpen(false); // close dropdown
            }}
          >
            <MdDelete size={18} />
            {t("case_table.delete")}
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              navigate(`/dashboard/all-case/edit-case?id=${item?._id}`);
              setOpen(false);
              setDropdownOpen(false);
            }}
          >
            <HiOutlinePencilAlt size={18} />
            {t("case_table.edit")}
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setOpen(false);
              setDropdownOpen(false);
              navigate(`/dashboard/all-case/${item?._id}`);
            }}
          >
            <IoMdEye size={18} />
            {t("case_table.view_detail")}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {/* Modals */}
      <UpdateStatus
        isOpen={openStatus}
        setIsOpen={setOpenStatus}
        refetch={refetch}
        isedit={true}
        object={item}
      />
      <GenericDeleteDialog
        refetch={refetch}
        isOpen={open}
        setIsOpen={setOpen}
        deleteAction={useDeleteCaseMutation()}
        item={item}
        entityName="case"
      />
    </div>
  );
}
