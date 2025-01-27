import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common/config"

async function authMiddleware(req:any,res:any,next:any){
    
    const authHeader = req.headers["authorization"];

    if(!authHeader || authHeader.startsWith("Bearer")){
        return res.status(400).json({msg:"Invalid Auth Info!"});
    }
    try{
        const token = authHeader.split(" ")[1];
      
        const decodedToken = jwt.verify(token,JWT_SECRET);
    if(typeof decodedToken === "string"){
        return;
    }
    if(decodedToken){
        // @ts-ignore
        req.userId = decodedToken.userId;
        next();
    }
    res.status(403).json({msg:"Unauthorized!"})
    
    
    }catch(error){
        return res.status({msg:"Middleware Failed!"})
    }
    

}

export default authMiddleware;