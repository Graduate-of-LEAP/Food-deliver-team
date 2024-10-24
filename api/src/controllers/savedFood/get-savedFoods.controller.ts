import { RequestHandler } from "express";
import { savedFoodModel } from "../../models/savedFood.schema";

export const getSavedFoodsController: RequestHandler = async (_req, res) => {
  try {
    const savedFoods = await savedFoodModel.find({}).populate("foodId"); // Populate productId with Product documents

    return res.status(200).json({
      savedFoods,
    });
  } catch (error) {
    console.error("Error fetching saved products:", error);
    return res.status(500).json({
      message: "Error fetching saved products",
    });
  }
};
