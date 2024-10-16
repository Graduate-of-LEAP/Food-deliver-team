import mongoose from "mongoose";
const { Schema, model } = mongoose;

const savedFoodSchema = new Schema({
  FoodId: {
    type: Schema.Types.ObjectId,
    ref: "Food",
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
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
export const savedFoodModel = model("savedProducts", savedFoodSchema);
