import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import rootRouter from "./api/api"    
import initDb from "./models/userModel";
        
// .env 
dotenv.config();

// Database Stuff
initDb();

// HTTP SERVER STUFF
const PORT = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1',rootRouter);

app.get('/',(req:Request,res:Response)=>{
        res.json({msg:"I am Up!"})
        return;
    })

    
app.listen(PORT,()=>{console.log("Server Started at PORT: ",PORT)});