import { CardType } from "./Main";
import Image from "next/image";

export const CardComponent = ({ icon, title, desc }: CardType) => {
  return (
    <div className="border w-fit h-fit rounded-xl p-3 my-10">
      <div className="text-[#18BA51]">
        {/* <Image src={icon} alt="Description" width={20} height={20} /> */}
        {/* <img src={icon}></img> */}
        {icon}
      </div>
      {/* <div className={`bg-pink-800 relative`}>
        <Image
          src={icon}
          alt="Picture"
          width={40}
          height={30}
          // fill
          className={`object-cover rounded-2xl`}
        ></Image>
      </div> */}

      <div>
        <div className="text-sm font-serif mt-10 font-bold">{title}</div>
        <div className="text-sm font-serif mb-2">{desc}</div>
      </div>
    </div>
  );
};
