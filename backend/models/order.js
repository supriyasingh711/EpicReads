const mongoose=require('mongoose')

const order=new mongoose.Schema(
    {
        user:{
            type:mongoose.Types.ObjectId,
            ref:"user"
        },
        book:{
            type:mongoose.Types.ObjectId,
            ref:"user"
        },
        status:{
            type:String,
            default:"Order Placed",
            enum:["Order Placed","Out for Delivery","Delivered","Cancelled"]
        },
    },{timestamps:true}
)
//timestamps will be used laetr to sort the orders as per their placed time!
module.exports=mongoose.model("order",order)