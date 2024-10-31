"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersController = void 0;
const user_schema_1 = require("../../models/user.schema");
const getUsersController = async (req, res) => {
    try {
        const users = await user_schema_1.userModel.find({});
        return res.status(200).json({
            users,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "users Awahad asuudaltai l bndaa",
        });
    }
};
exports.getUsersController = getUsersController;
