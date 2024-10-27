import mongoose from "mongoose";
const { Schema, model } = mongoose;
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
export const foodModel = model("Food", foodSchema);
