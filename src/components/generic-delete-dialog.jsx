import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Loader from "@/common/loader";

export default function GenericDeleteDialog({
  isOpen,
  setIsOpen,
  item,
  deleteAction,
  refetch,
  entityName = "item",
}) {
  const [deleteItem, { isLoading }] = deleteAction || [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this {entityName} from our servers?
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
                <Loader color="#00132f" /> <span>Loading...</span>
              </div>
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
