"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneSagsController = void 0;
const sags_schema_1 = require("../../models/sags.schema");
const getOneSagsController = async (req, res) => {
    const { id } = req.params;
    try {
        const sags = await sags_schema_1.sagsModel.findById(id);
        if (!sags) {
            return res.status(404).json({
                message: "Iim id tai sags algaa",
            });
        }
        return res.status(200).json({
            sags,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getOneSagsController = getOneSagsController;
