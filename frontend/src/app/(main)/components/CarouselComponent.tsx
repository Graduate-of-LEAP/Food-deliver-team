"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoStar, IoStarHalf } from "react-icons/io5";
import anime from "animejs";

export const CarouselContainer = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const images = [
    "/hool12.jpeg",
    "/hool14.jpeg",
    "/hool10.jpeg",
    "/hool9.jpeg",
    "/hool7.jpeg",
    "/hool3.jpeg",
    "/hool13.jpeg",
    "/hool5.jpeg",
    "/hool4.jpeg",
    "/hool12.jpeg",
    "/hool14.jpeg",
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
    if (currentHour >= 16 && currentHour <= 23) {
      setIsOpen(true);
    }
  });

  useEffect(() => {
    if (isTransitioning) {
      anime({
        targets: ".carousel-track",
        translateX: `-${(current * 100) / 11}%`,
        easing: "easeInOutQuad",
        duration: 1000,
        complete: () => {
          setIsTransitioning(false);

          if (current === images.length - 5) setCurrent(1);
          if (current === 0) setCurrent(images.length - 2);
        },
      });
    }
  }, []);

  const slideRight = () => {
    setIsTransitioning(true);
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const slideLeft = () => {
    setIsTransitioning(true);
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  useEffect(() => {
    anime({
      target: ".drawer",
      translateX: ["100%", 0],
      easing: "easeInOutQuad",
      duration: 300,
    });
    anime({
      targets: ".drawer .desc-item",
      opacity: [0, 1],
      translateX: [-10, 0],
      delay: anime.stagger(50, { start: 400 }),
      easing: "easeInOutQuad",
      duration: 500,
    });
  }, []);

  return (
    <div className="relative w-full overflow-hidden h-[800px]">
      <div
        style={{ transform: `translateX(-${(current * 100) / 17}%)` }}
        className={`carousel-track absolute bg-red-200 w-[5500px] flex h-full ${
          isTransitioning ? "duration-1000" : null
        }`}
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
          <div className="drawer p-8 bg-gradient-to-r from-gray-700 to-transparent rounded">
            <h1 className=" desc-item text-6xl font-semibold ">
              Beeeeeeef & Soup
            </h1>
            <div className=" space-y-2">
              <div className="desc-item flex gap-2 text-xl items-center">
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStarHalf />
                <p className="shadow-md font-semibold">(reviews)</p>
              </div>

              <div className=" desc-item flex gap-4 text-xl font-semibold">
                {isOpen ? (
                  <p className="desc-item text-green-500">Now open</p>
                ) : (
                  <p className="desc-item text-red-500">Close</p>
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
