import { RequestHandler } from "express";
import { messageModel } from "../../models/message.schema";

export const createMessageController: RequestHandler = async (req, res) => {
  if (req.method === "POST") {
    const { text } = req.body;

    try {
      // Мессежийг өгөгдлийн санд хадгалах
      const savedMessage = await messageModel.create({
        data: { text },
      });
      return res.status(201).json(savedMessage);
    } catch (error) {
      return res
        .status(500)
        .json({ errorMessage: "Failed to save message", error });
    }
  }
};
