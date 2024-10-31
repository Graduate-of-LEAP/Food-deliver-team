"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFoodsController = void 0;
const food_schema_1 = require("../../models/food.schema");
const getFoodsController = async (req, res) => {
    try {
        const { page, limit, selectedCategory } = req.query;
        const filter = {};
        if (selectedCategory) {
            filter.category = selectedCategory; // Directly match the selected category
        }
        const foods = await food_schema_1.foodModel
            .find(filter)
            .populate("category")
            .limit(Number(limit))
            .skip((Number(page) - 1) * 9);
        const totalCount = await food_schema_1.foodModel.countDocuments(filter);
        return res.status(200).json({
            foods,
            totalCount,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Food Awahad asuudaltai l bndaa",
        });
    }
};
exports.getFoodsController = getFoodsController;
