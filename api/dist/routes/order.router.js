"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const order_1 = require("../controllers/order");
const orderRouter = (0, express_1.Router)();
exports.orderRouter = orderRouter;
orderRouter
    .post("/", order_1.createOrderController)
    .get("/", order_1.getOrdersController)
    .get("/:id", order_1.getOneOrderController)
    .delete("/", order_1.deleteOrderController);
