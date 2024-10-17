import { Router } from "express";
import { createReviewController, getReviewController } from "../controllers";

const reviewRouter = Router();
reviewRouter.post("/", createReviewController).get("/", getReviewController);
export { reviewRouter };
