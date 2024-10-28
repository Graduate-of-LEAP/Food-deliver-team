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
import { useEffect } from "react";

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
          <AlertDialogCancel onClick={LogOut}>Тийм</AlertDialogCancel>
          <AlertDialogAction>Үгүй</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
