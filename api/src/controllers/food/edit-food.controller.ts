import { RequestHandler } from "express";
import { foodModel } from "../../../src/models/food.schema";

export const editFoodController: RequestHandler = async (req, res) => {
  const { _id, newPrice, newProductName, newQuantity, newOrts } = req.body;
  try {
    const result = await foodModel.findByIdAndUpdate(
      _id,
      {
        productName: newProductName,
        price: newPrice,
        quantity: newQuantity,
        orts: newOrts,
      },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: "food олдсонгүй" });
    }
    res
      .status(200)
      .json({ message: "Мэдээллийг амжилттай шинэчиллээ", result });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "food-г шинэчлэхэд алдаа гарлаа" });
  }
};
