import { Router } from "express";
import {
  CreateSavedFoodController,
  editFoodController,
  getOneSavedFoodController,
  getSavedFoodsController,
} from "../controllers";

const savedFoodRouter = Router();
savedFoodRouter
  .post("/", CreateSavedFoodController)
  .get("/", getSavedFoodsController)
  .get("/:id", getOneSavedFoodController)
  .put("/", editFoodController)

export { savedFoodRouter };
