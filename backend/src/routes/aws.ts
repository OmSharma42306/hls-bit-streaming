import express,{ Request, Response } from "express";
import {S3Client,PutObjectCommand} from "@aws-sdk/client-s3"
import multer from "multer"
import dotenv from "dotenv"
import {  fileType,authRequest } from "../types/types";
import { authMiddleware } from "../middleware/authMiddleware";

// .env 
dotenv.config();

// Created a Router
const router = express.Router();


// AWS CLIENT STUFF
    const s3 = new S3Client({
        region:process.env.AWS_REGION!,
        credentials:{
            accessKeyId:process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY!
        }
    });

    
    
const upload = multer();

    router.post("/upload-video",upload.single('file'),authMiddleware,async(req:authRequest,res:Response)=>{
        const file = req.file;
        if(!file){
            res.json(400).json({msg:"File is Empty!"});
            return;
        }
        console.log("file",file);
        // Upload to S3 The File.

        try{
            const url = await uploadToS3(file);
            res.status(200).json({msg:"Video Uploaded Successfully!",url:url});
            return;
        }catch(error){
            res.status(400).json({msg:error});
            return;
        }

    })


    // function to Upload All Files to S3
    async function uploadToS3(file:fileType){
        const uploadCommand = new PutObjectCommand({
            Bucket:process.env.S3_BUCKET_NAME!,
            Key:file.originalname,
            Body:file.buffer,
            ContentType:file.mimetype
        });

        await s3.send(uploadCommand);

        const s3Url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.originalname}`;
        console.log(s3Url);
        return s3Url;
    }


export default router;
