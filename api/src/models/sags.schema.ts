import mongoose from "mongoose";

const { Schema, model } = mongoose;
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
export const sagsModel = model("Sags", sagsSchema);
