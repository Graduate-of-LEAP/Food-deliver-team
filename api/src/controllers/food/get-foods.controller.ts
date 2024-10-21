import { RequestHandler } from "express";
import { foodModel } from "../../models/food.schema";

export const getFoodsController: RequestHandler = async (req, res) => {
  try {
    const { page, limit, selectedCategory } = req.query;

    const filter: any = {};
    if (selectedCategory) {
      filter.category = selectedCategory; // Directly match the selected category
    }

    const foods = await foodModel
      .find(filter)
      .populate("category")
      .limit(Number(limit))
      .skip((Number(page) - 1) * 9);

    const totalCount = await foodModel.countDocuments(filter);

    return res.status(200).json({
      foods,
      totalCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Food Awahad asuudaltai l bndaa",
    });
  }
};
