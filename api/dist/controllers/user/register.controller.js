"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const user_schema_1 = require("../../models/user.schema");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10", 10);
const JWT_SECRET = process.env.JWT_SECRET;
const registerController = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({
                message: "Хэрэглэгчийн нэр, email болон нууц үг шаардлагатай.."
            });
        }
        const existingUser = await user_schema_1.userModel.findOne({ email });
        console.log("Existing user:", existingUser);
        if (existingUser) {
            return res.status(400).json({ message: "Хэрэглэгч бүртгэлтэй байна." });
        }
        // const salt=await bcrypt.genSalt(10);
        // const hashedPassword=await bcrypt.hash(password,salt)
        const newUser = new user_schema_1.userModel({
            userName, email, password,
            role: "user",
        });
        await newUser.save();
        console.log("New user saved:", newUser);
        // const token=jwt.sign(
        //     {userId:newUser._id,email:newUser.email, role:newUser.role},
        //     JWT_SECRET,
        //     {expiresIn:"24h"}
        // );
        return res.status(201).json({
            message: "Хэрэглэгч амжилттай бүртгэгдлээ.",
            // token,
            user: {
                id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                role: newUser.role
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Дотоод серверийн алдаа." });
    }
};
exports.registerController = registerController;
