import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";

export const editUserController:RequestHandler=async(req,res)=>{
    const{_id, newUserName,newEmail,newPhoneNumber,newPassword, newAddress, newAvatarImg}=req.body;
    try{
        const result=await userModel.findByIdAndUpdate(
            _id,
            {
                userName: newUserName,
                email:newEmail,
                phonenumber:newPhoneNumber,
                password:newPassword,
                address:newAddress,
                avatarImg:newAvatarImg
            },
            {new:true}
        );
        if (!result){
            return res.status(404).json({message:"Хэрэглэгч олдсонгүй!"})
        }
        res.status(200).json({message:"Мэдээллийг амжилттай шинэчиллээ",result})
    }catch(error){
        console.error("Error updating user:", error);
        res.status(500).json({message:"Мэдээллийг шинэчлэхэд алдаа гарлаа"})
    }
};