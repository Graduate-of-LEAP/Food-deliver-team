"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewController = void 0;
const review_schema_1 = require("../../models/review.schema");
const getReviewController = async (req, res) => {
    try {
        const reviews = await review_schema_1.reviewModel.find({});
        return res.status(200).json({
            reviews,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Reviews awahad aldaa garlaa",
        });
    }
};
exports.getReviewController = getReviewController;
