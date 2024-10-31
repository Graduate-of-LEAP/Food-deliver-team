"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSavedFoodController = void 0;
const savedFood_schema_1 = require("../../models/savedFood.schema");
const CreateSavedFoodController = async (req, res) => {
    try {
        await savedFood_schema_1.savedFoodModel.create({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return res.status(201).json({
            message: "Saved food nemegdsen",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Saved food buruu l nemeed bndaa",
        });
    }
};
exports.CreateSavedFoodController = CreateSavedFoodController;
