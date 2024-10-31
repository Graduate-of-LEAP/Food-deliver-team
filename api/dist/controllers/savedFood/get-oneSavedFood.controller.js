"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneSavedFoodController = void 0;
const savedFood_schema_1 = require("../../models/savedFood.schema");
const getOneSavedFoodController = async (req, res) => {
    const { id } = req.params;
    try {
        const savedFood = await savedFood_schema_1.savedFoodModel.findById(id);
        if (!savedFood) {
            return res.status(404).json({
                message: "iim id tai savedFood aldaa",
            });
        }
        return res.status(200).json({
            savedFood
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getOneSavedFoodController = getOneSavedFoodController;
