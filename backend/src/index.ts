    import express, { Request, Response } from "express";
    import cors from "cors";
    import bodyParser from "body-parser";
    import multer, { Field } from "multer"
    import {S3Client,PutObjectCommand} from "@aws-sdk/client-s3"
    import dotenv from "dotenv"
    import { fileType } from "./types/types";
    import initDb from "./models/userModel";
    // .env 
    dotenv.config();

    // Database Stuff
    initDb();

    // AWS CLIENT STUFF
    const s3 = new S3Client({
        region:process.env.AWS_REGION!,
        credentials:{
            accessKeyId:process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY!
        }
    });

    // HTTP SERVER STUFF
    const PORT = 3000;
    const upload = multer();
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.get('/',(req:Request,res:Response)=>{
        res.json({msg:"HI"})
        return;
    })

    app.post("/upload-video",upload.single('file'),async(req:Request,res:Response)=>{
        console.log("i am here");
        const file = req.file;
        if(!file){
            res.json(400).json({msg:"File is Empty!"});
            return;
        }
        console.log("file",file);
        // Upload to S3 The File.

        try{
            const url = await uploadToS3(file);
            res.status(200).json({url:url});
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

    app.listen(PORT,()=>{console.log("Server Started at PORT: ",PORT)});