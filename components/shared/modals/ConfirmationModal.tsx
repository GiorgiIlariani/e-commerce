"use client";

import { Dispatch, SetStateAction } from "react";
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

interface ConfirmationModalProps {
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  onCancel: () => void;
}

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
        <AlertDialogDescription className="text-black">
          {message}
        </AlertDialogDescription>
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
