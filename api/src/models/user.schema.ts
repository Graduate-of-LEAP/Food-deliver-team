import mongoose from "mongoose";
const { Schema, model } = mongoose;

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
export const userModel = model("User", userSchema);
