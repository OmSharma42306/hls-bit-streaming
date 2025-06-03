import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { authRequest } from "../types/types";
// .env stuff
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY!;


export async function authMiddleware(req:authRequest,res:Response,next:NextFunction){
    try{
        const authHeaders = req.headers["authorization"];
        if(!authHeaders || !authHeaders.startsWith('Bearer ')){
            res.status(400).json({msg:"Missing Headers!"});
            return;
        }
        
        const token : any = authHeaders?.split(' ')[1];
        console.log("TOKEN",token);
        
        const decoded:any = jwt.verify(token,JWT_SECRET) ;
        if(!decoded){
            res.status(400).json({msg:"Invalid Token!"});
            return;
        }

        const userId = decoded.userId;
        
        req.userId = userId;


        next();

    }catch(error){
        res.status(400).json({msg:"Middleware Failed!"});
    }
}