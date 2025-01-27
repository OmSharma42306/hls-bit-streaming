import express from "express"
import rootRouter from "./api/index"

const app = express();
const PORT = 3002;

app.use("api/v1",rootRouter);



app.listen(PORT,()=>{
    console.log(`http Server Started! at ${PORT}`)
})