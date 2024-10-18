import { CardType } from "./Main";
import Image from "next/image";

export const CardComponent = ({ icon, title, desc }: CardType) => {
  return (
    <div className="border  w-full h-fit rounded-xl p-6 my-10  ">
      <div className="text-[#18BA51]">{icon}</div>

      <div>
        <div className="text-sm font-serif mt-10 font-bold">{title}</div>
        <div className="text-sm font-serif mb-2">{desc}</div>
      </div>
    </div>
  );
};
