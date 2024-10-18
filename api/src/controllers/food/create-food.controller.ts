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
      message: "Food order Nemegdlee",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "createFoodController buruu l nemeed bndaa",
    });
  }
};
