"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sagsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const sagsSchema = new Schema({
    foodId: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    count: {
        type: Number,
        required: true,
        default: 1,
    },
    price: {
        type: Number,
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
exports.sagsModel = model("Sags", sagsSchema);
