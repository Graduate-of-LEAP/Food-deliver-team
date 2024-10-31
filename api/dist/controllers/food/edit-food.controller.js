"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editFoodController = void 0;
const food_schema_1 = require("../../../src/models/food.schema");
const editFoodController = async (req, res) => {
    const { _id, newPrice, newFoodtName, newQuantity, newOrts } = req.body;
    try {
        const result = await food_schema_1.foodModel.findByIdAndUpdate(_id, {
            foodName: newFoodtName,
            price: newPrice,
            quantity: newQuantity,
            orts: newOrts,
        }, { new: true });
        if (!result) {
            return res.status(404).json({ message: "food олдсонгүй" });
        }
        res
            .status(200)
            .json({ message: "Мэдээллийг амжилттай шинэчиллээ", result });
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "food-г шинэчлэхэд алдаа гарлаа" });
    }
};
exports.editFoodController = editFoodController;
