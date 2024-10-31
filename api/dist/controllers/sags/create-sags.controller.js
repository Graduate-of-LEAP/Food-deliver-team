"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSagsController = void 0;
const sags_schema_1 = require("../../models/sags.schema");
const createSagsController = async (req, res) => {
    const { foodId, userId } = req.body; // Extract productId and userId from the request body
    try {
        // Check if an order with the same productId and userId already exists
        const existingOrder = await sags_schema_1.sagsModel.findOne({ foodId, userId });
        console.log(existingOrder);
        if (existingOrder) {
            // If an order exists, return a conflict status
            return res.status(409).json({
                message: "Энэ бүтээгдэхүүн аль хэдийн захиалгад байгаа.",
            });
        }
        // Create a new order
        await sags_schema_1.sagsModel.create({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return res.status(201).json({
            message: "Захиалга амжилттай нэмэгдлээ.",
        });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(400).json({
            message: "Захиалга буруу байна.",
        });
    }
};
exports.createSagsController = createSagsController;
