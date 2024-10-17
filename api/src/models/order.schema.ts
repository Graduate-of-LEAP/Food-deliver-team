import mongoose from "mongoose";
const { Schema, model } = mongoose;
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
  foods: [
    {
      food: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
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
export const orderModel = model("Order", orderSchema);
