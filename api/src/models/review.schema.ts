import mongoose from "mongoose";
const { Schema, model } = mongoose;

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
export const reviewModel = model("Review", reviewSchema);
