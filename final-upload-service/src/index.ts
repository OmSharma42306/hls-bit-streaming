import path from "path";
import fs from "fs/promises";
import {S3Client,PutObjectCommand} from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
    region:process.env.AWS_REGION!,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY!
    }
})

// function to upload final files to S3.
async function uploadToS3(segmentFilesPath:string){

    try{
        const foldeContent = await fs.readdir(segmentFilesPath);
        for(const fileName of foldeContent){
            console.log("File Data",fileName);
            // read file Path
            const filePath = path.join(segmentFilesPath,fileName);
            // read file data
            const fileBuffer = await fs.readFile(filePath);

            // Key Name
            const s3Key = `outputs/${fileName}`
            // create a command to upload file with filename and data to S3
            const command = new PutObjectCommand({
                Bucket:process.env.S3_BUCKET_NAME!,
                Key:s3Key,
                Body:fileBuffer                
            });

            const response = await s3Client.send(command);
            console.log(response);
        }
    }catch(error){
        console.error(error);
    }
}

const segmentFilesPath = path.join(__dirname,'..','outputs');
console.log("FINAL PATH",segmentFilesPath);

uploadToS3(segmentFilesPath);
