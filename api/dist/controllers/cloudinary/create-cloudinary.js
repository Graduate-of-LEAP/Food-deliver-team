"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCloudinaryController = void 0;
const cloudinary_1 = require("../../utils/cloudinary");
const createCloudinaryController = async (req, res) => {
    if (!req.file)
        return res.status(400).send("No file uploaded.");
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await (0, cloudinary_1.handleUpload)(dataURI);
        res.json(cldRes);
    }
    catch (error) {
        console.log(error);
    }
};
exports.createCloudinaryController = createCloudinaryController;
