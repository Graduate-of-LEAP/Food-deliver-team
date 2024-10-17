import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";

export const createUserController: RequestHandler = async (req, res) => {
  try {
    await userModel.create({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.status(200).json({
      message: "User nemegdsen",
    });
  } catch (error) {
    return res.status(500).json({
      message: "User neg l buruu l nemeed bndaa",
    });
  }
};
