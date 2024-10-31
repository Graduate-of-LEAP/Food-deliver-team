import Image from "next/image";
import { PiStarFourFill } from "react-icons/pi";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const Page = () => {
  type Location = {
    title: string;
    about: string;
    text: string;
    list: string[];
  };

  const locationBar: Location[] = [
    {
      title: "А бүс",
      about: "Нархан хотхон",
      text: "26-р байр",
      list: ["Хоймор хотхон"],
    },
    {
      title: "Б бүс",
      about: "Нархан хотхон",
      text: "26-р байр",
      list: ["Хоймор хотхон"],
    },
  ];

  return (
    <div className="w-full bg-slate-50">
      <Header />
      <div className="flex justify-center pt-[60px]">
        <div className="container">
          <div className="w-full mt-12 h-fit">
            <div className="relative w-full h-[616px] mt-15">
              <Image
                src="/map.png"
                alt="Food delivery logo"
                layout="fill"
                className="object-cover"
              />
            </div>
          </div>

          <div className="pt-10 text-[22px] font-bold">
            <div className="flex py-4  gap-4 items-center">
              <PiStarFourFill className="text-[#18BA51]" /> Хүргэлтийн бүс дэх
              хаягууд
            </div>
          </div>
          <div className="flex gap-6 pb-12">
            {locationBar.map((location, index) => (
              <div
                key={index}
                className="drop-shadow-lg bg-white rounded-xl w-full  py-6 px-6"
              >
                <div className="font-semibold text-xl ">{location.title}</div>
                <div className=" border-y my-4 rounded-xl border-[#18BA51]"></div>
                <div className="flex w-full">
                  <div className="flex w-full h-fit ">
                    <div className="">
                      <p>{location.about}</p>
                      <p className="pt-4 text-base">{location.text}</p>
                      <p className="pt-4 text-base">{location.text}</p>
                      <p className="pt-4 text-base">{location.list}</p>
                      <p className="pt-4 text-base">{location.list}</p>
                    </div>
                  </div>
                  <div className="flex w-full h-fit">
                    <div>
                      <p>{location.about}</p>
                      <p className="pt-4 text-base">{location.text}</p>
                      <p className="pt-4 text-base">{location.text}</p>
                      <p className="pt-4 text-base">{location.list}</p>
                      <p className="pt-4 text-base">{location.list}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Page;
