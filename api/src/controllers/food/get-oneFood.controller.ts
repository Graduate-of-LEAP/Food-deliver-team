import { RequestHandler } from "express";
import { foodModel } from "../../../src/models/food.schema";

export const getOneFoodController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).json({
        message: "Iim id tai FOOD algaa",
      });
    }
    return res.status(200).json({
      food,
    });
  } catch (error) {
    console.log(error);
  }
};
