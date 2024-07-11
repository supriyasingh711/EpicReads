const router=require("express").Router()
const {authenticateToken}=require("./userAuth")
const Book=require("../models/book")
const User=require("../models/user")
const Order=require("../models/order")






//add book to order
router.post("/place-order",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const {order}=req.body

        for(const orderdata of order){
            const newOrder=new Order({user:id,book:orderdata._id})
            const orderDataFromDb=await newOrder.save();
            await User.findByIdAndUpdate(id,{
                $push:{orders:orderDataFromDb._id}
            }) 
            await User.findByIdAndUpdate(id,{
                $pull:{cart:orderdata._id}
            })
        }
        return res.json({
            status:"Success",
            message:"Order placed Successfully"
        })
    } catch (error) {
        return res.status(500).json({message:error})
    }
    
})
//get order history
router.get("/get-order-history",authenticateToken,async(req,res)=>{
    try {
       const {id}=req.headers;
       const userData=await User.findById(id).populate({
        path:"orders",
        populate:{path:"book"}
       }) 
       const orderData=userData.orders.reverse()
       return res.json({
        status:"Success",
        data:orderData
       })
    } catch (error) {
        return res.status(500).json({message:error})
    }
})

//get-all orders for the admin
router.get("/get-all-orders",authenticateToken,async(req,res)=>{
    try {
       const userData=await Order.find()
       .populate({
        path:"book"
       }) 
       .populate({
        path:"user"
       })
       .sort({createdAt:-1})
       return res.json({
        status:"Success",
        data:userData
       })
    } catch (error) {
        return res.status(500).json({message:error})
    }
})
//admin updating orders
router.put("/update-order-status/:id",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.params
        await Order.findByIdAndUpdate(id,{status:req.body.status})
        return res.json({
            status:"Success",
            message:"Status Updated Successfully"
        })
    } catch (error) {
        return res.status(500).json({message:error})
    }
})

module.exports=router
