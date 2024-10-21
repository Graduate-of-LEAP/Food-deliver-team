import { RequestHandler } from "express";
import { orderModel } from "../../models/order.schema";


export const getOneOrderController: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await orderModel.findById(id);
        if (!order) {
            return res.status(404).json({
                message: "Iim id tai Order algaa",
            });
        }
        return res.status(200).json({
            order,
        });
    } catch (error) {
        console.log(error);
    }
};
