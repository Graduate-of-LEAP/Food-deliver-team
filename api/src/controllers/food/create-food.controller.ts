import { RequestHandler } from "express";
import { foodModel } from "../../models/food.schema";

export const createOrderController: RequestHandler = async (req, res) => {
  try {
    await foodModel.create({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.status(201).json({
      message: "order Nemegdlee",
    });
  } catch (error) {
    return res.status(400).json({
      message: "createOrderController buruu l nemeed bndaa",
    });
  }
};
