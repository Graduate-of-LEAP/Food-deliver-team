"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserController = void 0;
const user_schema_1 = require("../../models/user.schema");
const editUserController = async (req, res) => {
    const { _id, newUserName, newEmail, newPhoneNumber, newAddress } = req.body;
    try {
        const result = await user_schema_1.userModel.findByIdAndUpdate(_id, {
            userName: newUserName,
            email: newEmail,
            phoneNumber: newPhoneNumber,
            address: newAddress,
        }, { new: true });
        if (!result) {
            return res.status(404).json({ message: "user олдсонгүй" });
        }
        res
            .status(200)
            .json({ message: "Мэдээллийг амжилттай шинэчиллээ", result });
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "user-г шинэчлэхэд алдаа гарлаа" });
    }
};
exports.editUserController = editUserController;
