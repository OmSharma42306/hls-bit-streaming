import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI=process.env.MONGODB_URI!;

// DB INIT SETUP..
export default async function initDb(){
    mongoose.connect(MONGODB_URI).then(()=>{
        console.log("Mongoose Connected!")
    }).catch((error)=>{
        console.log("Error",error);
    })
};


// UserSchema
const userSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    }

});


export const userModel = mongoose.model('Users',userSchema);