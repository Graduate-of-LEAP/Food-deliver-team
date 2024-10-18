import { Router } from "express";
import {
  createFoodController,
  getFoodsController,
  getOneFoodController,
  editFoodController,
  deletFoodController,
} from "../controllers";

const foodRouter = Router();
foodRouter
  .post("/", createFoodController)
  .get("/", getFoodsController)
  .get("/:id", getOneFoodController)
  .put("/", editFoodController)
  .delete("/", deletFoodController);

export { foodRouter };
