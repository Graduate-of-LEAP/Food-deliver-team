import { RequestHandler } from "express";
import { categoryModel } from "../../models/category.schema";

export const createCategoryController: RequestHandler = async (req, res) => {
  try {
    const { categoryName } = req.body;
    await categoryModel.create({
      categoryName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.status(201).json({
      message: "Category nemegdsen",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Category buruu l nemeed bndaa",
    });
  }
};
