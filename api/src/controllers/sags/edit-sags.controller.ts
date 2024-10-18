import { RequestHandler } from "express";
import { sagsModel } from "../../models/sags.schema";


export const editSagsController: RequestHandler = async (req, res) => {
  const { _id, newPrice, newCount, newfoodId, newuserId } = req.body;
  try {
    const result = await sagsModel.findByIdAndUpdate(
      _id,
      {
        count: newCount,
        price: newPrice,
        foodId: newfoodId,
        userId: newuserId,
      },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: "sags олдсонгүй" });
    }
    res
      .status(200)
      .json({ message: "Мэдээллийг амжилттай шинэчиллээ", result });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "sags-г шинэчлэхэд алдаа гарлаа" });
  }
};
