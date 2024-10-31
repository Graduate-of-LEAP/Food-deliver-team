"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editSavedFoodController = void 0;
const savedFood_schema_1 = require("../../models/savedFood.schema");
const editSavedFoodController = async (req, res) => {
    const { _id, newFoodId, newUserId } = req.body;
    try {
        const result = await savedFood_schema_1.savedFoodModel.findByIdAndUpdate(_id, {
            foodId: newFoodId,
            userId: newUserId,
        }, { new: true });
        if (!result) {
            return res.status(404).json({ message: "foodSaved олдсонгүй" });
        }
        res.status(200)
            .json({ message: "Мэдээллийг амжилттай шинэчиллээ", result });
    }
    catch (error) {
        console.log("error updating fooddated:", error);
        res.status(500).json({ message: "savedFood-г шинэчлэхэд алдаа гарлаа" });
    }
};
exports.editSavedFoodController = editSavedFoodController;
