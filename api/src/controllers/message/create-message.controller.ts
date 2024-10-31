import { RequestHandler } from "express";
import { messageModel } from "../../models/message.schema";

export const createMessageController: RequestHandler = async (req, res) => {
  // const { userId, userName, avatarImg, phoneNumber, text } = req.body;
  try {
    await messageModel.create({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.status(201).json({
      message: "createMessageController DEER Message Nemegdlee",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "createMessageController buruu l nemeed bndaa",
    });
  }
};
