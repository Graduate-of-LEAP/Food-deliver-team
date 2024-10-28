import { Router } from "express";
import {
  createCategoryController,
  deletCategoryController,
  editCategoryController,
  getCategoriesController,
} from "../controllers";

const categoryRouter = Router();
categoryRouter
  .post("/", createCategoryController)
  .get("/", getCategoriesController)
  .delete("/", deletCategoryController)
  .put("/", editCategoryController);
export { categoryRouter };
