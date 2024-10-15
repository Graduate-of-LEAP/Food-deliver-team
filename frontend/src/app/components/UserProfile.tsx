"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserProfile = () => {
  return (
    <div>
      <div className="lg:w-[448px]  m-auto mt-[74px] space-y-12 p-8">
        <div className="flex flex-col gap-10 justify-center items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-bold text-2xl text-center">Name</h1>
        </div>
        <div>
          <div>
            <input className="p-2 w-full bg-gray-50 border shadow-md rounded relative"></input>
          </div>
        </div>
      </div>
    </div>
  );
};
