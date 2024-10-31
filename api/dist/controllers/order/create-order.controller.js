"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderController = void 0;
const order_schema_1 = require("../../models/order.schema");
const createOrderController = async (req, res) => {
    try {
        await order_schema_1.orderModel.create({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return res.status(201).json({
            message: "order Nemegdlee",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Order buruu l nemeed bndaa",
        });
    }
};
exports.createOrderController = createOrderController;
