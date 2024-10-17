import { Router } from "express";
import {
  createCategoryController,
  getCategoriesController,
} from "../controllers";

const categoryRouter = Router();
categoryRouter
  .post("/", createCategoryController)
  .get("/", getCategoriesController);
export { categoryRouter };
