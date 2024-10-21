import { RequestHandler } from "express";
import { foodModel } from "../../models/food.schema";

export const deletFoodController: RequestHandler = async (req, res) => {
  const { _id } = req.body;
  try {
    const result = await foodModel.deleteOne({ _id });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "food not found",
      });
    }
    return res.status(200).json({
      message: "food successfully removed",
    });
  } catch (error) {
    console.error("Error deleting food:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
