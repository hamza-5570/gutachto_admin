import { Dialog, DialogContent } from "@/components/ui/dialog";
import AccountForm from "../profile/account-form";
import CaseStausForm from "./case-form";
export default function UpdateStatus({ isOpen, setIsOpen, refetch, object }) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <CaseStausForm object={object} refetch={refetch} />
      </DialogContent>
    </Dialog>
  );
}
