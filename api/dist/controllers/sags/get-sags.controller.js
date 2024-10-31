"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSagsController = void 0;
const sags_schema_1 = require("../../models/sags.schema");
const getSagsController = async (req, res) => {
    try {
        const { userId } = req.query;
        const sags = await sags_schema_1.sagsModel.find({ userId }).populate("foodId");
        return res.status(200).json({
            sags,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "sags awahad aldaa garlaa",
        });
    }
};
exports.getSagsController = getSagsController;
