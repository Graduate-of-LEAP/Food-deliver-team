"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCategoryController = void 0;
const category_schema_1 = require("../../models/category.schema");
const editCategoryController = async (req, res) => {
    const { _id, newCategoryName } = req.body;
    try {
        const result = await category_schema_1.categoryModel.findByIdAndUpdate(_id, {
            categoryName: newCategoryName,
        }, { new: true });
        if (!result) {
            return res.status(404).json({ message: "Category олдсонгүй" });
        }
        res
            .status(200)
            .json({ message: "Мэдээллийг амжилттай шинэчиллээ", result });
    }
    catch (error) {
        console.error("Error updating Category:", error);
        res.status(500).json({ message: "Category-г шинэчлэхэд алдаа гарлаа" });
    }
};
exports.editCategoryController = editCategoryController;
