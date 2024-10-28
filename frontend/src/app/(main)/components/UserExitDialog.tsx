"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuthContext } from "@/components/utils/authProvider";

export const UserExitDialog = () => {
  const { LogOut } = useAuthContext();

  return (
    <AlertDialog>
      <AlertDialogTrigger>Гарах</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Та системээс гарахдаа итгэлтэй байна уу?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Үгүй</AlertDialogCancel>
          <AlertDialogAction onClick={() => LogOut()}>Тийм</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
