import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

export default function GenericDeleteDialog({
  isOpen,
  setIsOpen,
  item,
  deleteAction,
  refetch,
  entityName = "item",
}) {
  const [deleteItem, { isLoading }] = deleteAction || [];
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("delete_case_model.title")}</DialogTitle>
          <DialogDescription>
            {t("delete_case_model.description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="destructive"
            onClick={async () => {
              const id = item._id;
              try {
                await deleteItem(id).unwrap();
                toast.success(`${entityName} deleted successfully`);
                refetch();
                setIsOpen(false);
              } catch (error) {
                console.log(
                  error?.data?.message || `Failed to delete ${entityName}.`
                );
              }
            }}
          >
            {isLoading ? (
              <div className="flex items-center text-center  gap-2 justify-center mx-auto">
                <Loader color="#00132f" />
              </div>
            ) : (
              t("delete_case_model.delete")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
