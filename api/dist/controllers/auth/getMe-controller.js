"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const user_schema_1 = require("../../models/user.schema");
const getMe = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await user_schema_1.userModel.findById(req.user.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const userData = {
            id: user._id,
            owog: user.owog,
            userName: user.userName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            avatarImg: user.avatarImg,
        };
        res.json(userData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getMe = getMe;
