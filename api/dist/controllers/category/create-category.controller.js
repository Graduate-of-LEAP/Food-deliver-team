"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryController = void 0;
const category_schema_1 = require("../../models/category.schema");
const createCategoryController = async (req, res) => {
    try {
        const { categoryName } = req.body;
        await category_schema_1.categoryModel.create({
            categoryName,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return res.status(201).json({
            message: "Category nemegdsen",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Category buruu l nemeed bndaa",
        });
    }
};
exports.createCategoryController = createCategoryController;
