"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const foodSchema = new Schema({
    category: {
        type: [Schema.Types.ObjectId],
        ref: "Category", //ene utgaar nogoo model deer nerlesen nereer n bi categorytoi holboltoo hiij ogch bga
        required: true,
    },
    foodName: {
        type: String,
        required: true,
        default: "No Name Added",
    },
    price: {
        type: Number,
        required: true,
        default: 247,
    },
    orts: {
        type: String,
        required: true,
        default: "Not in description",
    },
    images: {
        type: [String],
        required: true,
        default: "/img1.png",
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    saledCount: {
        type: Number,
        required: true,
        default: 0,
    },
    salePercent: {
        type: Number,
        required: false,
        default: 0,
    },
    averageRating: {
        type: Number,
        required: false,
        default: 0,
        min: 0,
        max: 5,
    },
    reviewCount: {
        type: Number,
        required: false,
        default: 0,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
exports.foodModel = model("Food", foodSchema);
