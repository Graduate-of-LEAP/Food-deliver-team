import React from "react";
import { FoodDiscount } from "./FoodDiscount";

export type DiscountCalculatorType = {
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  discountPrice: number;
};

export const DiscountCalculator = () => {
  const originalPrice = 6800;
  const discountPercentage = 20;
  const discountAmount = originalPrice * (discountPercentage / 100);
  const discountPrice = originalPrice - discountAmount;

  return (
    <>
      <div>
        <h1>Хямдралын Тооцоо</h1>
        <p>Анхны үнэ: {originalPrice}₮</p>
        <p>Хямдралын хувь: {discountPercentage}%</p>
        <p>Хямдралын дүн: {discountAmount}₮</p>
        <p>Хямдралын үнэ: {discountPrice}₮</p>
      </div>
    </>
  );
};
