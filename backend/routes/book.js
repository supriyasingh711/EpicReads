const router=require("express").Router()
const User=require("../models/user")
const jwt=require('jsonwebtoken')
const {authenticateToken}=require('./userAuth')
const Book=require("../models/book")


router.post("/add-book",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers
        const user=await User.findById(id)
        if(user.role!=="admin"){
        res.status(500).json({message:"You are not having access to perform admin actions!"})

        }
       const book=new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            description:req.body.description,
            language:req.body.language
       }) 
       await book.save()
       res.status(200).json({message:"Book Added Successfully!"})
    } catch (error) {
        res.status(500).json({message:error})
    }
})

router.put("/update-book",authenticateToken,async(req,res)=>{
    try {
        const {bookid}=req.headers
        
        await Book.findByIdAndUpdate(bookid,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            description:req.body.description,
            language:req.body.language
        })
       
       
       res.status(200).json({message:"Book Updated Successfully!"})
    } catch (error) {
        res.status(500).json({message:error})
    }
})

router.delete("/delete-book",authenticateToken,async(req,res)=>{
    try {
        const{bookid}=req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.
        status(200).
        json({
            message:"Book Deleted Successfully!"
        })

    } catch (error) {
       return res.status(500).json({message:error})
    }
})

//get all books
router.get("/get-all-books",async(req,res)=>{
    try {
       const books=await Book.find().sort({createdAt:-1})
       return res.json({
        status:"success",
        data:books
       }) 
    } catch (error) {
        return res.status(500).json({message:error})
    }
})
//get recently added 4 books
router.get("/get-recent-books",async(req,res)=>{
    try {
       const books=await Book.find().sort({createdAt:-1}).limit(4);
       return res.json({
        status:"success",
        data:books
       }) 
    } catch (error) {
        return res.status(500).json({message:error})
    }
})

//get a particular book detail
router.get("/get-book-by-id/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const book=await Book.findById(id);
        return res.json({
            status:"Success",
            data:book,
        })
    } catch (error) {
        return res.status(500).json({message:error})
    }
})





module.exports=router