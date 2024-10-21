import { Router } from "express";
import {
  CreateSavedFoodController,
  editFoodController,
  getOneSavedFoodController,
  getSavedFoodsController,
  deleteSavedFoodController,
} from "../controllers";


const savedFoodRouter = Router();
savedFoodRouter
  .post("/", CreateSavedFoodController)
  .get("/", getSavedFoodsController)
  .get("/:id", getOneSavedFoodController)
  .put("/", editFoodController)
  .delete("/", deleteSavedFoodController)

export { savedFoodRouter };
