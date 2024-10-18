import { RequestHandler } from "express";
import { savedFoodModel } from "../../models/savedFood.schema";


export const getOneSavedFoodController: RequestHandler = async (req, res) => {
    const {id} = req.params;
    try{
        const savedFood = await savedFoodModel.findById(id);
        if(!savedFood) {
         return res.status(404).json({
            message:"iim id tai savedFood aldaa",
         });
        }
        return res.status(200).json({
            savedFood
        });

    }catch (error) {
        console.log(error)
    }
  
    
}