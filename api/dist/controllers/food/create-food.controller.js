"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFoodController = void 0;
const food_schema_1 = require("../../models/food.schema");
const createFoodController = async (req, res) => {
    try {
        await food_schema_1.foodModel.create({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return res.status(201).json({
            message: "Food Nemegdlee",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "createFoodController buruu l nemeed bndaa",
        });
    }
};
exports.createFoodController = createFoodController;
