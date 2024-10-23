import { sagsModel } from "../../models/sags.schema";
import { RequestHandler } from "express";


export const getOneSagsController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const sags = await sagsModel.findById(id);
    if (!sags) {
      return res.status(404).json({
        message: "Iim id tai sags algaa",
      });
      
    }
    return res.status(200).json({
      sags,
    });
  } catch (error) {
    console.log(error);
  }
};
