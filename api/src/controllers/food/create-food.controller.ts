import { RequestHandler } from "express";
import { foodModel } from "../../models/food.schema";

export const createFoodController: RequestHandler = async (req, res) => {
  try {
    await foodModel.create({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.status(201).json({
      message: "Product nemegdlee",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Product buruu l nemeed bndaa",
    });
  }
};

// afafa
