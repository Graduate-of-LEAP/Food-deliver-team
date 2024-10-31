"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const user_schema_1 = require("../../models/user.schema");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await user_schema_1.userModel.findOne({ email, password });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({
        id: user._id,
        userName: user.userName,
        email: user.email,
    }, process.env.JWT_SECRET);
    return res.status(200).json({
        token,
        user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
        },
    });
};
exports.login = login;
