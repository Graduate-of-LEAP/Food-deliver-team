"use client";
import { useState } from "react";

export const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const openDrawer = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button onClick={openDrawer}>Open</button>
      <div
        className={`fixed top-0 right-0 ${
          isOpen ? "translate-x-0" : "translate-x-[100%]"
        } h-screen w-[400px] p-6 shadow-md bg-white duration-300 z-50 `}
      >
        <button onClick={closeDrawer}>Close</button>
      </div>
    </>
  );
};
