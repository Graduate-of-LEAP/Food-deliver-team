import { Router } from "express";
import { createOrderController, getOrdersController } from "../controllers";

const orderRouter = Router();
orderRouter.post("/", createOrderController).get("/", getOrdersController);
export { orderRouter };
