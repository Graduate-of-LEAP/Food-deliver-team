import { Router } from "express";
import { createFoodController, getFoodsController } from "../controllers";

const foodRouter = Router();
foodRouter.post("/", createFoodController).get("/", getFoodsController);
export { foodRouter };
