import express, { Router,Request,Response } from "express"
import jwt from "jsonwebtoken"
import authMiddleware from "../middlewares/middleware";
import {prismaClinet} from "@repo/db/client"
import {signInInput,signUpInput,createRoomInput} from "@repo/common/validation"


const router:Router = express.Router();
const JWT_SECRET:string | any = process.env.JWT_SECRET

router.post("/signup",async (req:Request|any,res:Response|any)=>{
    const {name,email,password} = req.body;
    

    try{
        const {success} = signUpInput.safeParse(req.body);
        if(!success){
          res.json({msg:"Invalid Data Format!"});
        }
    
        // check and insert into database.
        const checkUser = await prismaClinet.user.findFirst({where:{email:email}});
        if(checkUser){
            res.status(400).json({msg:"User Already Exists!"});
        }
        
        const user = await prismaClinet.user.create({
        data:{
            name:name,
            email:email,
            password:password
        }
    })
    console.log(user);

    res.status(200).json({msg:"Registration Successful!"});
    }catch(error){
        res.status(400).json({msg:"Registration Failed!"});
    }
    
})

router.post("/login",async (req:any,res:any)=>{
    const {email,password} = req.body;
    // check user exist in database first
    
    // if exist check password with it!
    try{
        const {success} = signInInput.safeParse(req.body);
        if(!success){
            res.json({msg:"Invalid Inputs!"});
        }
        const user = await prismaClinet.user.findFirst({where:{email:email}});
        if(!user){
            return res.status(400).json({msg:"User Not Exists!"});
        }
        const userId = user.id;
        const token = jwt.sign({userId},JWT_SECRET);

    res.status(200).json({msg:"Login Successful",token})
    }catch(error){
    res.status(400).json({msg:"Error!",error})    
    }
    
});

router.post("/create-room",authMiddleware,async(req:Request,res:Response|any)=>{
    const {success} = createRoomInput.safeParse(req.body);
    if(!success){
        res.json({msg:"Invalid Inputs!"});
    }
try{
    
    
    const checkRoom = await prismaClinet.room.findFirst({select:{roomName:req.body.roomName}});
    if(checkRoom){
        res.status(400).json({msg:"Room Already Exists!"})
    }
    if(!checkRoom){
        //@ts-ignore
        const userId = req.userId;
        const newRoom = await prismaClinet.room.create({
            data:{
            roomName:req.body.roomName,
            userId:userId
        }})
        res.status(200).json({msg:"Room Created",newRoom})
    }
}catch(error){
    res.status(400).json({msg:"Error!",error})
}
})

export default router;