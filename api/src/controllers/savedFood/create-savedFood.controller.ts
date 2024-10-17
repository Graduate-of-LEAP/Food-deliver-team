import { RequestHandler } from "express";
import { savedFoodModel } from "../../models/savedFood.schema";

export const CreateSavedFoodController: RequestHandler = async (req, res) => {
  try {
    await savedFoodModel.create({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.status(201).json({
      message: "Saved food nemegdsen",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Saved food buruu l nemeed bndaa",
    });
  }
};
