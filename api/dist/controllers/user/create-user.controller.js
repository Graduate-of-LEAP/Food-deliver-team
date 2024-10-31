"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = void 0;
const user_schema_1 = require("../../models/user.schema");
const createUserController = async (req, res) => {
    try {
        await user_schema_1.userModel.create({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return res.status(200).json({
            message: "User nemegdsen",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "User neg l buruu l nemeed bndaa",
        });
    }
};
exports.createUserController = createUserController;
