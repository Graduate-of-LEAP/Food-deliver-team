"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageController = void 0;
const message_schema_1 = require("../../models/message.schema");
const createMessageController = async (req, res) => {
    // const { userId, userName, avatarImg, phoneNumber, text } = req.body;
    try {
        await message_schema_1.messageModel.create({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return res.status(201).json({
            message: "createMessageController DEER Message Nemegdlee",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "createMessageController buruu l nemeed bndaa",
        });
    }
};
exports.createMessageController = createMessageController;
