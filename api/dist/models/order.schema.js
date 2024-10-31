"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const orderFoodSchema = new Schema({
    food: {
        type: [Schema.Types.ObjectId],
        ref: "Food",
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    price: {
        type: String,
    },
});
const orderSchema = new Schema({
    status: {
        type: String,
        required: true,
        default: "Shine zahialga",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderNumber: {
        type: Number,
        required: true,
        default: 0,
    },
    userName: {
        type: String,
        required: true,
        default: "Нэр оруулаагүй байна",
    },
    phoneNumber: {
        type: String,
        required: true,
        default: "Утасны дугаар оруулаагүй байна",
    },
    district: {
        type: String,
        required: true,
        default: "Хүргэлтийн дэлгэрэнгүй хаяг",
    },
    khoroo: {
        type: String,
        required: true,
        default: "Хүргэлтийн дэлгэрэнгүй хаяг",
    },
    apartment: {
        type: String,
        required: true,
        default: "Хүргэлтийн дэлгэрэнгүй хаяг",
    },
    orderDetail: {
        type: String,
        required: true,
        default: "Дэлгэрэнгүй мэдээлэл",
    },
    foods: [orderFoodSchema],
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
exports.orderModel = model("Order", orderSchema);
