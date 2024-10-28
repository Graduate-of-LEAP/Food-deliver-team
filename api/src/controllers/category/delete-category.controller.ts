import { RequestHandler } from "express";
import { categoryModel } from "../../models/category.schema";

export const deletCategoryController: RequestHandler = async (req, res) => {
  const { _id } = req.body;
  try {
    const result = await categoryModel.deleteOne({ _id });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "category not found",
      });
    }
    return res.status(200).json({
      message: "category successfully removed",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
