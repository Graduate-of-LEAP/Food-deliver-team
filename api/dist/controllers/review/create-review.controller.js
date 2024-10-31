"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewController = void 0;
const review_schema_1 = require("../../models/review.schema");
const food_schema_1 = require("../../models/food.schema");
const createReviewController = async (req, res) => {
    try {
        const food = await food_schema_1.foodModel.findById(req.body.foodId);
        const { foodId, comment, rating } = req.body;
        await review_schema_1.reviewModel.create({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        if (!food)
            return;
        await food_schema_1.foodModel.findOneAndUpdate({ _id: req.body.foodId }, { $inc: { reviewCount: 1 } }, { new: true });
        const reviews = await review_schema_1.reviewModel.find({ foodId });
        const validReviews = reviews.filter((review) => review.rating != null);
        const totalRating = validReviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = validReviews.length > 0 ? totalRating / validReviews.length : 0;
        const updatedFood = await food_schema_1.foodModel.findOneAndUpdate({ _id: foodId }, { averageRating: averageRating }, { new: true });
        return res.status(200).json({
            message: "review amljilttai nemegdlee",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Review buruu l nemeed bndaa",
        });
    }
};
exports.createReviewController = createReviewController;
