
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AccountForm from "../profile/account-form";
import CaseStausForm from "./case-form";
  export default function UpdateStatus({ isOpen, setIsOpen,refetch,isedit,object }) {  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <CaseStausForm object={object} refetch={refetch}/>
            {/* <ContactForm setIsOpen={setIsOpen} isedit={isedit} refetch={refetch} contact={object}/> */}
        </DialogContent>
      </Dialog>
    );
  }
  