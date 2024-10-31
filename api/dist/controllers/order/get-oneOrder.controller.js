"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneOrderController = void 0;
const order_schema_1 = require("../../models/order.schema");
const getOneOrderController = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await order_schema_1.orderModel.findById(id);
        if (!order) {
            return res.status(404).json({
                message: "Iim id tai Order algaa",
            });
        }
        return res.status(200).json({
            order,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getOneOrderController = getOneOrderController;
