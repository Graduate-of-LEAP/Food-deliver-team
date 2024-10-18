import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET as string;

export const login:RequestHandler=async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user =await userModel.findOne({email})

        if(!user){
            return res.status(401).json({message:" Нэвтрэх мэдээлэл буруу байна"})
        }
        console.log(user)
        const isMatch=await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({message:"Нэвтрэх мэдээлэл буруу байна"})
        }
        const token=jwt.sign(
            {
                id: user._id,
                email: user.email,
                username: user.userName,
            },
            process.env.JWT_SECRET as string,
            {expiresIn:"1h"}
        );
        return res.status(201).json({
            message:"Амжилттай нэвтэрлээ.",
            token,
            user:{
                id:user._id,
                username:user.userName,
                email: user.email,
            },
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Дотоод серверийн алдаа."})
    }
}