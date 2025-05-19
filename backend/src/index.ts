import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer"
import {S3Client,PutObjectCommand} from "@aws-sdk/client-s3"

const PORT = 3000;
const upload = multer();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/upload-video",upload.single('file'),async(req:Request,res:Response)=>{
    const file = req.file;
    if(!file){
        res.json(400).json({msg:"File is Empty!"});
        return;
    }

    // Upload to S3 The File.

    try{

        return;
    }catch(error){
        res.status(400).json({msg:error});
        return;
    }

})


app.listen(PORT,()=>{console.log("Server Started at PORT: ",PORT)});