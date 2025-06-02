import express, { Request, Response } from "express";
import { signInSchema,signUpSchema } from "../validation/zod";
import { userModel } from "../models/userModel";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

// .env stuff
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY!;
const router = express.Router();

router.post('/signup',async(req:Request,res:Response)=>{
    try{
        const {success} = signUpSchema.safeParse(req.body);
        
        if(!success){
            res.status(400).json({msg:"Invalid Inputs!"});
            return;
        }
        
        const {name,email,password} = req.body;
        
        const user = await userModel.findOne({email:email});
        
        if(user){
            res.status(400).json({msg:"User Already Exists!"})
            return;
        }
        
        const newUser = new userModel({
            name:name,
            email:email,
            password:password
        });

        await newUser.save();

        res.status(200).json({msg:"SignUp Successful!"});
        return;
    }catch(error){
        res.status(400).json({msg:error});
    }
});

router.post('/signin',async(req:Request,res:Response)=>{
    try{
        const {success} = signInSchema.safeParse(req.body);
        if(!success){
            res.status(400).json({msg:"Invalid Inputs!"});
            return;
        }
        
        const {email,password} = req.body;
        
        const user = await userModel.findOne({email:email});
        if(!user){
            res.status(400).json({msg:"User Not Exists!"});
            return;
        }

        if(password !== user.password){
            res.status(403).json({msg:"Invalid Credentials!"});
            return;
        }
        
        const token = jwt.sign({userId : user.id},JWT_SECRET);

        res.status(200).json({msg:"Login Successful!",token:token});
        return;
    }catch(error){
        res.status(400).json({msg:error});
    }
})



export default router;