import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const SALT_ROUNDS=parseInt(process.env.SALT_ROUNDS || "10",10);
const JWT_SECRET=process.env.JWT_SECRET as string;

export const registerController:RequestHandler=async(req,res)=>{
    try{
        const {username,email,address,password}=req.body;
        console.log(username);

        if(!username||!email||!address||!password){
            return res.status(400).json({
message:"Хэрэглэгчийн нэр, email болон нууц үг шаардлагатай.."
            });
        }
        const existingUser=await userModel.findOne({email});

        if (existingUser){
            return res.status(400).json({message:"Хэрэглэгч бүртгэлтэй байна."})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new userModel({
            username,email,password:hashedPassword,
            role:"user",
        });
        await newUser.save();

        // const token=jwt.sign(
        //     {userId:newUser._id,email:newUser.email, role:newUser.role},
        //     JWT_SECRET,
        //     {expiresIn:"24h"}
        // );
        return res.status(201).json({
            message:"Хэрэглэгч амжилттай бүртгэгдлээ.",
            // token,
            user:{
                id:newUser._id,
                username: newUser.userName,
                email:newUser.email,
                address:newUser.address,
                role:newUser.role
            },
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({message:"Дотоод серверийн алдаа."})
    }
};
