import { RequestHandler } from "express";
import { orderModel } from "../../models/order.schema";

export const deleteOrderController: RequestHandler = async (req, res) => {
    const { _id } = req.body;
    try {
        const result = await orderModel.deleteOne((_id));
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        return res.status(200).json({
            message: "Order successfully removed",
        });
    } catch (error) {
        console.error("Error deleting order:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};