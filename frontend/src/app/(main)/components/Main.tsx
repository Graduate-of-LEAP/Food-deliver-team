"use client";
import { FoodSalad } from "./FoodSalat";
import CardComponent from "./CardComponent";
import { CarouselContainer } from "./CarouselComponent";

const Main = () => {
  return (
    <>
      <div className="w-full h-fitv  ">
        <div className="flex flex-col w-full">
          <CarouselContainer />
          <div className="container m-auto">
            <CardComponent />

            {/* <div className="flex justify-center">
              <FoodDiscount />
            </div> */}
            {/* <div className="flex justify-center">
              <FoodMain />
            </div>*/}
            <div className="flex justify-center">
              <FoodSalad />
            </div>
            {/* <div className="flex justify-center">
              <FoodSweet />
            </div>  */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
