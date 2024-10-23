import { RequestHandler } from "express";
import { savedFoodModel } from "../../models/savedFood.schema";

export const editSavedFoodController: RequestHandler = async (req, res) => {
    const { _id,  newFoodId, newUserId } = req.body;
    try{
        const result = await savedFoodModel.findByIdAndUpdate(
            _id,
            {
                foodId: newFoodId,
                userId: newUserId,
            },
            {new:true}
        );
        if(!result) {
            return res.status(404).json({ message: "foodSaved олдсонгүй"});

        }
        res.status(200)
        .json({message: "Мэдээллийг амжилттай шинэчиллээ", result});

    }catch (error) {
        console.log("error updating fooddated:", error);
        res.status(500).json({ message: "savedFood-г шинэчлэхэд алдаа гарлаа"})
    }
};