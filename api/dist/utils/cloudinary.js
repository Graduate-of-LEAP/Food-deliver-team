"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpload = void 0;
const cloudinary_1 = require("cloudinary");
const handleUpload = async (file) => {
    const res = await cloudinary_1.v2.uploader.upload(file, {
        resource_type: "auto",
    });
    return res;
};
exports.handleUpload = handleUpload;
