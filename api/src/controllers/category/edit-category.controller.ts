import { RequestHandler } from "express";
import { categoryModel } from "../../models/category.schema";

export const editCategoryController: RequestHandler = async (req, res) => {
  const { _id, newCategoryName } = req.body;
  try {
    const result = await categoryModel.findByIdAndUpdate(
      _id,
      {
        categoryName: newCategoryName,
      },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: "Category олдсонгүй" });
    }
    res
      .status(200)
      .json({ message: "Мэдээллийг амжилттай шинэчиллээ", result });
  } catch (error) {
    console.error("Error updating Category:", error);
    res.status(500).json({ message: "Category-г шинэчлэхэд алдаа гарлаа" });
  }
};
