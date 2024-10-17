import { RequestHandler } from "express";
import { reviewModel } from "../../models/review.schema";

export const getReviewController: RequestHandler = async (req, res) => {
  try {
    const reviews = await reviewModel.find({});
    return res.status(200).json({
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Reviews awahad aldaa garlaa",
    });
  }
};
