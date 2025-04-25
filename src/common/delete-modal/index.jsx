import React from "react";
import { Button } from "@/components/ui/button";
import { BsTrash3Fill } from "react-icons/bs";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

export default function DeleteModal({ open, setOpen,deleteAction }) {
  const [deleteItem,] = deleteAction || [];


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[480px] rounded-2xl p-0.5 border-0 bg-gradient-to-b from-[#F0414C] to-[#F0EDFF] shadow-sm animated-gradient">
        <div className="bg-white dark:bg-[#2C2A2B] rounded-2xl px-5 pt-8 pb-5">
          <div className="flex items-center gap-3">
            <BsTrash3Fill size={45} className="text-[#F0414C]" />
            <div>
              <p className="text-xl font-bold text-black dark:text-white">
                Delete Account?
              </p>
              <p className="text-sm font-medium text-black dark:text-white/80 pt-2">
                This account will be Deleted.
              </p>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              onClick={() => setOpen(false)}
              variant={"ghost"}
              className="w-24 h-10 font-bold text-black dark:text-white"
            >
              Cancel
            </Button>
            <Button
              variant={"destructive"}
             onClick={() => deleteItem()}
              className="w-fit h-10 bg-[#F0414C] dark:bg-[#F0414C] dark:text-white"
            >
              { "Delete Account"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
