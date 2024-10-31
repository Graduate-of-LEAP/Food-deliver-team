"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletFoodController = void 0;
const food_schema_1 = require("../../models/food.schema");
const deletFoodController = async (req, res) => {
    const { _id } = req.body;
    try {
        const result = await food_schema_1.foodModel.deleteOne({ _id });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "food not found",
            });
        }
        return res.status(200).json({
            message: "food successfully removed",
        });
    }
    catch (error) {
        console.error("Error deleting food:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.deletFoodController = deletFoodController;
