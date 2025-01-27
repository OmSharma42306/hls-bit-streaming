import express, { Router } from "express"
import userRouter from "../routes/user"
const router : Router= express.Router();

router.use("/user",userRouter);



export default router;