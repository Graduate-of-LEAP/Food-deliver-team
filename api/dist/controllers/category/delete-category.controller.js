"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletCategoryController = void 0;
const category_schema_1 = require("../../models/category.schema");
const deletCategoryController = async (req, res) => {
    const { _id } = req.body;
    try {
        const result = await category_schema_1.categoryModel.deleteOne({ _id });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "category not found",
            });
        }
        return res.status(200).json({
            message: "category successfully removed",
        });
    }
    catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.deletCategoryController = deletCategoryController;
