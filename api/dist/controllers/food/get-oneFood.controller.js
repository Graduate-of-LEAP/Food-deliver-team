"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneFoodController = void 0;
const food_schema_1 = require("../../../src/models/food.schema");
const getOneFoodController = async (req, res) => {
    const { id } = req.params;
    try {
        const food = await food_schema_1.foodModel.findById(id);
        if (!food) {
            return res.status(404).json({
                message: "Iim id tai FOOD algaa",
            });
        }
        return res.status(200).json({
            food,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getOneFoodController = getOneFoodController;
