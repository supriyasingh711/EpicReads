const express=require('express')

const app=express()
require("dotenv").config()
const conn=require('./connection/connection')
conn()
const user=require("./routes/user")
const book=require("./routes/book")
const favourite=require("./routes/favourite")
const cart=require("./routes/cart")
const order=require("./routes/order")
app.use(express.json())
app.use("/api/v1",user)
app.use("/api/v1",book)
app.use("/api/v1",favourite)
app.use("/api/v1",cart)
app.use("/api/v1",order)





//creating port
app.listen(process.env.PORT,()=>{
    console.log(`Server Started at ${process.env.PORT}`);
})