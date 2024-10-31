"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const userSchema = new Schema({
    owog: {
        type: String,
        required: true,
        default: "No Owog",
    },
    userName: {
        type: String,
        required: true,
        default: "No Name",
    },
    phoneNumber: {
        type: String,
        required: true,
        default: "No number added",
    },
    email: {
        type: String,
        required: true,
        default: "No email added",
    },
    password: {
        type: String,
        required: true,
        default: "duus2",
    },
    address: {
        type: String,
        required: true,
        default: "No address added",
    },
    role: {
        type: String,
        required: true,
        default: "Costumer",
    },
    avatarImg: {
        type: String,
        required: true,
        default: "No image added",
    },
    buyedCount: {
        type: String,
        required: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});
exports.userModel = model("User", userSchema);
