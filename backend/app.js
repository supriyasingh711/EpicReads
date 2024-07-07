const express=require('express')

const app=express()
require("dotenv").config()
const conn=require('./connection/connection')
conn()
const user=require("./routes/user")
app.use(express.json())
app.use("/api/v1",user)
//creating port
app.listen(process.env.PORT,()=>{
    console.log(`Server Started at ${process.env.PORT}`);
})