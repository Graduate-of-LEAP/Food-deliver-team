import { RequestHandler } from "express";
import { sagsModel } from "../../models/sags.schema";

export const getSagsController: RequestHandler = async (req, res) => {
  try {
    const sags = await sagsModel.find({}).populate("foodId");
    return res.status(200).json({
      sags,
    });
  } catch (error) {
    return res.status(500).json({
      message: "sags awahad aldaa garlaa",
    });
  }
};
