import { Router } from "express";
import {
  CreateSavedFoodController,
  getSavedFoodsController,
} from "../controllers";

const savedFoodRouter = Router();
savedFoodRouter
  .post("/", CreateSavedFoodController)
  .get("/", getSavedFoodsController);
export { savedFoodRouter };
