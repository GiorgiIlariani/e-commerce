"use client";

import { Dispatch, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ConfirmationModal({
  onConfirm,
  title,
  message,
  open,
  onOpenChange,
  isLoading,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white border border-[#fec900]">
        <AlertDialogHeader className="text-[#fec900]">
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="text-black">{message}</div>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel
            className="text-[#fec900] hover:bg-[#fec90033]"
            onClick={onCancel}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-white bg-[#fec900] hover:bg-[#d8a700]"
            onClick={onConfirm}>
            {isLoading ? "Confirming..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
