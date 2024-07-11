const router=require("express").Router()
const User=require("../models/user")
const {authenticateToken}=require("./userAuth")


//add book to cart
router.put("/add-to-cart",authenticateToken,async(req,res)=>{
    try {
        const {bookid,id}=req.headers
        const userData=await User.findById(id)
        const isBookCarted=userData.cart.includes(bookid)
        if(isBookCarted){
            return res.json({
                status:"success",
                message:"book is already in cart"
            })
        }
        await User.findByIdAndUpdate(id,{$push:{card:bookid}})
        return res.json({
            status:"Success",
            message:"Book added to cart"
        })
    } catch (error) {
        return res.status(500).json({message:error})
    }
})
router.put("/remove-from-cart/:bookid",authenticateToken,async(req,res)=>{
    try {
        const {bookid}=req.params
        const {id}=req.headers;
        await User.findByIdAndUpdate(id,{
            $pull:{cart:bookid}
        })
        return res.json({
            status:"Success",
            message:"Removed from Cart"
        })
    } catch (error) {
        return res.status(500).json({message:error})
    }
})
router.get("/get-user-cart",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers
        const userData=await User.findById(id).populate("cart")
        const cart=userData.cart.reverse()
        return res.json({
            status:"Success",
            data:cart,
        })
        
    }catch(error){
        return res.status(500).json({
            message:error
        })
    }
})























module.exports=router