import { RequestHandler } from "express";
import { sagsModel } from "../../models/sags.schema";

export const getSagsController: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.query;
    const sags = await sagsModel.find({ userId }).populate("foodId");
    return res.status(200).json({
      sags,
    });
  } catch (error) {
    return res.status(500).json({
      message: "sags awahad aldaa garlaa",
    });
  }
};
