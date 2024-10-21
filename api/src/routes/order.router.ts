import { Router } from "express";
import { createOrderController, deleteOrderController, getOneOrderController, getOrdersController } from "../controllers/order";

const orderRouter = Router();
orderRouter
    .post("/", createOrderController)
    .get("/", getOrdersController)
    .get("/:id", getOneOrderController)
    .delete("/", deleteOrderController);

export { orderRouter };
