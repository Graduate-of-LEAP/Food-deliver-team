// "use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoStar, IoStarHalf } from "react-icons/io5";

export const CarouselContainer = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const images = [
    "/hool12.jpg",
    "/hool14.jpg",
    "/hool10.jpg",
    "/hool9.jpg",
    "/hool7.jpg",
    "/hool3.jpg",
    "/hool13.jpg",
    "/hool5.jpg",
    "/hool4.jpg",
    "/hool12.jpg",
    "/hool14.jpg",
  ];

  useEffect(() => {
    if (autoplay) {
      const timeout = setTimeout(slideRight, 2500);
      return () => clearTimeout(timeout);
    }
  }, [autoplay, current]);
  useEffect(() => {
    const date = new Date();
    const currentHour = date.getHours();
    if (currentHour >= 11 && currentHour <= 23) {
      setIsOpen(true);
    }
  });
  const slideRight = () => {
    setIsTransitioning(true);
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const slideLeft = () => {
    setIsTransitioning(true);
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full">
      <div
        style={{ transform: `translateX(-${(current * 100) / 11}%)` }}
        className={`absolute bg-red-200 w-[240%] flex h-full ${
          isTransitioning ? "duration-1000" : null
        }`}
        // style={{
        //   animation: isTransitioning
        //     ? "carouselAnimation 60s linear infinite"
        //     : "none",
        // }}
        //className="flex w-[5500px] bg-gradient-to-b from-gray-500 to-transparent overflow-hidden"
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        {images.map((src, index) => (
          <div key={index} className="relative h-[800px] w-[500px]">
            <Image src={src} fill alt={`Image ${index}`} />
          </div>
        ))}
      </div>
      <div className="w-full">
        <div className="px-[400px] pt-[500px] h-[800px]  bg-transparent z-50 space-y-4 absolute text-white ">
          <div className="p-8 bg-gradient-to-r from-gray-800 to-transparent rounded">
            <h1 className="text-6xl font-bold ">Beeeeeeef & Soup</h1>
            <div className="space-y-2">
              <div className="flex gap-2 text-xl items-center">
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStarHalf />
                <p className="shadow-md font-semibold">(reviews)</p>
              </div>

              <div className="flex gap-4 text-xl font-semibold">
                {isOpen ? (
                  <p className="text-green-500">open</p>
                ) : (
                  <p className="text-red-500">close</p>
                )}
                <p>11:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="z-50 absolute top-1/2 left-4 bg-gray-100 rounded-md flex items-center justify-center h-8 w-4 cursor-pointer"
          onClick={slideLeft}
        >
          &lsaquo;
        </button>
        <button
          className="z-50 absolute top-1/2 right-4 bg-gray-100 rounded-md flex items-center justify-center h-8 w-4 cursor-pointer"
          onClick={slideRight}
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
};
