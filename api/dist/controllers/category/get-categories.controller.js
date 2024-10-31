"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesController = void 0;
const category_schema_1 = require("../../models/category.schema");
const getCategoriesController = async (req, res) => {
    try {
        const categories = await category_schema_1.categoryModel.find({});
        return res.status(200).json({
            categories,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Category Awahad asuudaltai l bndaa",
        });
    }
};
exports.getCategoriesController = getCategoriesController;
