"use client";
import Image from "next/image";

const Main = () => {
  return (
    <>
      {" "}
      Main page
      <div className="flex bg-pink-200 "></div>
      <Image
        src="/images/food1.png"
        alt="Description"
        width={500}
        height={500}
        className=" flex
          items-center justify-center mb-20 m-auto bg-green-200"
      />
    </>
  );
};
export default Main;
