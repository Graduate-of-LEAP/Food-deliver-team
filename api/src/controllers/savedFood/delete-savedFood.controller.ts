import { RequestHandler } from "express";
import { savedFoodModel } from "../../models/savedFood.schema";

export const deleteSavedFoodController: RequestHandler = async (req, res) => {
    const  { _id} = req.body;
    try {
        const result = await savedFoodModel.deleteOne({_id});
        if(result.deletedCount ===0) {
            return res.status(404).json ({
                message: "savedfood not fount", 
            })
        }
        return res.status(200).json({
            message: "savedfood successfully removed",

        });
    }catch (error){
        return res.status(500).json({
            message: "Internet server error"
        });
    };
};