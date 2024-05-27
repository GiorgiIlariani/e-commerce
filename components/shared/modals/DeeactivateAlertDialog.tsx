import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction } from "react";

export function DeactivateAccountAlertDialog({
  open,
  onOpenChange,
  onDeleteAccount,
  onCancel,
  isRemoving,
}: DeactivateAccountAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white border border-red-600">
        <AlertDialogHeader className="text-red-600">
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-black">
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="text-red-600 hover:bg-red-100"
            onClick={onCancel}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-white bg-red-600 hover:bg-red-700"
            onClick={onDeleteAccount}>
            {isRemoving ? "Deleting" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
