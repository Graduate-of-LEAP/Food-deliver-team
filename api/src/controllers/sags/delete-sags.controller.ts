import { RequestHandler } from "express";
import { sagsModel } from "../../models/sags.schema";


export const deletSagsController: RequestHandler = async (req, res) => {
  const { _id } = req.body;
  try {
    const result = await sagsModel.deleteOne({ _id });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "sags not found",
      });
    }
    return res.status(200).json({
      message: "sags successfully removed",
    });
  } catch (error) {
    console.error("Error deleting sags:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
