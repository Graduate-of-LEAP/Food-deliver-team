"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersController = void 0;
const order_schema_1 = require("../../models/order.schema");
const getOrdersController = async (req, res) => {
    try {
        const orders = await order_schema_1.orderModel.find({}).populate([
            {
                path: "foods.food", // Populate the product field within the products array
                model: "Food", // Ensure you reference the correct model
            },
            {
                path: "userId", // Populate the userId field
                model: "User", // Ensure you reference the correct model for users
            },
        ]);
        return res.status(200).json({
            orders,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Order packs авахад алдаа гарлаа",
        });
    }
};
exports.getOrdersController = getOrdersController;
