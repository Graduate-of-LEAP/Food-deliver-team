"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderController = void 0;
const order_schema_1 = require("../../models/order.schema");
const deleteOrderController = async (req, res) => {
    const { _id } = req.body;
    try {
        const result = await order_schema_1.orderModel.deleteOne((_id));
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        return res.status(200).json({
            message: "Order successfully removed",
        });
    }
    catch (error) {
        console.error("Error deleting order:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.deleteOrderController = deleteOrderController;
