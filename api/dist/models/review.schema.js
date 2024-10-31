"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const reviewSchema = new Schema({
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
    rating: {
        type: Number,
        required: true,
        default: 5,
    },
    comment: {
        type: String,
        required: true,
        default: "no Comment",
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
exports.reviewModel = model("Review", reviewSchema);
