"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSavedFoodController = void 0;
const savedFood_schema_1 = require("../../models/savedFood.schema");
const deleteSavedFoodController = async (req, res) => {
    const { _id } = req.body;
    try {
        const result = await savedFood_schema_1.savedFoodModel.deleteOne({ _id });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "savedfood not fount",
            });
        }
        return res.status(200).json({
            message: "savedfood successfully removed",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internet server error"
        });
    }
    ;
};
exports.deleteSavedFoodController = deleteSavedFoodController;
