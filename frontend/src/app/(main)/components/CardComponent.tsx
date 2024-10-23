//import { CardType } from "./Main";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { Clock4 } from "lucide-react";
import { Salad } from "lucide-react";
import { Soup } from "lucide-react";

export type CardType = {
  icon: JSX.Element;
  title: string;
  desc: string;
};
const Card = [
  {
    icon: <BookOpen />,
    title: "Хүргэлтийн төлөв хянах",
    desc: "Захиалга бэлтгэлийн явцыг хянах",
  },
  {
    icon: <Clock4 />,
    title: "Шуурхай хүргэлт",
    desc: "Захиалга бэлтгэлийн явцыг хянах",
  },
  {
    icon: <Salad />,
    title: "Эрүүл, баталгаат орц",
    desc: "Захиалга бэлтгэлийн явцыг хянах",
  },
  {
    icon: <Soup />,
    title: "Хоолны өргөн сонголт",
    desc: "Захиалга бэлтгэлийн явцыг хянах",
  },
];


const CardComponent = () => {
  return (
<div className="flex gap-7 mt-5 justify-center">
{Card.map((item, index) => {
  return (
    <CardComponentProps
      key={index}
      icon={item.icon}
      title={item.title}
      desc={item.desc}
    />
  );
})}
</div>

  )
}


export const CardComponentProps = ({ icon, title, desc }: CardType) => {
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
export default CardComponent;
