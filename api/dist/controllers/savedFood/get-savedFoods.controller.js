"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSavedFoodsController = void 0;
const savedFood_schema_1 = require("../../models/savedFood.schema");
const getSavedFoodsController = async (req, res) => {
    try {
        const savedFoods = await savedFood_schema_1.savedFoodModel.find({}).populate("foodId"); // Populate productId with Product documents
        return res.status(200).json({
            savedFoods,
        });
    }
    catch (error) {
        console.error("Error fetching saved products:", error);
        return res.status(500).json({
            message: "Error fetching saved products",
        });
    }
};
exports.getSavedFoodsController = getSavedFoodsController;
