"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletSagsController = void 0;
const sags_schema_1 = require("../../models/sags.schema");
const deletSagsController = async (req, res) => {
    const { _id } = req.body;
    try {
        const result = await sags_schema_1.sagsModel.deleteOne({ _id });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "sags not found",
            });
        }
        return res.status(200).json({
            message: "sags successfully removed",
        });
    }
    catch (error) {
        console.error("Error deleting sags:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.deletSagsController = deletSagsController;
