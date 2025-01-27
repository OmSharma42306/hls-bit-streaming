import express from "express"


const app = express();
const PORT = 3091;

app.listen(PORT,()=>{
    console.log(`http Server Started! at ${PORT}`)
})