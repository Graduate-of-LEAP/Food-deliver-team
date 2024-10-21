import { RequestHandler } from "express";
import { foodModel } from "../../models/food.schema";

export const getFoodsController: RequestHandler = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    return res.status(200).json({
      foods,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Food Awahad asuudaltai l bndaa",
    });
  }
};
