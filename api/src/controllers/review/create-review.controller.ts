import { RequestHandler } from "express";
import { reviewModel } from "../../models/review.schema";
import { foodModel } from "../../models/food.schema";

export const createReviewController: RequestHandler = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.productId);
    const { foodId, comment, rating } = req.body;

    await reviewModel.create({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!food) return;
    await foodModel.findOneAndUpdate(
      { _id: req.body.productId },
      { $inc: { reviewCount: 1 } },
      { new: true }
    );
    const reviews = await reviewModel.find({ foodId });
    const validReviews = reviews.filter((review) => review.rating != null);
    const totalRating = validReviews.reduce(
      (acc, review) => acc + review.rating!,
      0
    );
    const averageRating =
      validReviews.length > 0 ? totalRating / validReviews.length : 0;

    const updatedFood = await foodModel.findOneAndUpdate(
      { _id: foodId },
      { averageRating: averageRating },
      { new: true }
    );
    return res.status(200).json({
      message: "review amljilttai nemegdlee",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Review buruu l nemeed bndaa",
    });
  }
};
