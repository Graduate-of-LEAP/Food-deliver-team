"use client";
import Image from "next/image";

export type FoodDiscountCardProps = {
  src: string;
  title: string;
  price: number;
  discountPercentage?: number;
  discountAmount?: number;
  discountedPrice?: number;
};

export const FoodDiscountCard = ({
  src,
  title,
  price,
  discountPercentage = 0,
  discountAmount,
  discountedPrice,
}: FoodDiscountCardProps) => {
  return (
    <div className="">
      <div className="relative flex justify-center  overflow-hidden">
        <div className="relative w-[250px] h-[320px] transition-transform transform hover:scale-105 hover:shadow-lg">
          <Image
            src={src}
            alt="Зураг"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
        {discountPercentage > 0 && (
          <div className="absolute top-5 right-10">
            <button className="bg-[#18BA51] rounded-lg px-2 text-white font-semibold text-[12px]">
              {discountPercentage}%
            </button>

            <div className="hidden">{discountAmount}</div>
          </div>
        )}
      </div>
      <div className="pl-6">
        <p className="text-[15px] font-semibold text-gray-600">{title}</p>
        <div className="flex gap-5">
          {discountPercentage > 0 ? (
            <>
              <div className="text-base font-serif text-[#18BA51]">
                {discountedPrice}₮
              </div>
              <div className="text-base font-serif text-black line-through">
                {price}₮
              </div>
            </>
          ) : (
            <div className="font-sans text-black text-xl font-bold">
              {price}₮
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
