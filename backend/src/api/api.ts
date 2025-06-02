import express from "express";
import userRouter from "../routes/user"
import awsRouter from "../routes/aws";

const router = express.Router();

router.use('/user',userRouter);
router.use('/aws',awsRouter);

export default router;