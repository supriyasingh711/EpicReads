const router=require("express").Router()
const User=require("../models/user")
const {authenticateToken}=require("./userAuth")

//add book to favourite
router.put("/add-to-favourite",authenticateToken,async(req,res)=>{
    try {
        const {bookid,id}=req.headers
        const userData=await User.findById(id)
        //we didn't do find and update by id beacuse then the book will continuously get added to the favourite we want only to add one book once
        const isBookFavourite=userData.favourites.includes(bookid)
        if(isBookFavourite){
            return res.status(200).json({message:"Already in Favourites"})
        }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}})
        return res.status(200).json({message:"Added to Favourites"})

    } catch (error) {
        res.status(500).json({message:error})
    }
})
//delete book from favourites
router.put("/delete-from-favourite",authenticateToken,async(req,res)=>{
    try {
        const {bookid,id}=req.headers
        const userData=await User.findById(id)
        //we didn't do find and update by id beacuse then the book will continuously get added to the favourite we want only to add one book once
        const isBookFavourite=userData.favourites.includes(bookid)
        if(isBookFavourite){
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}})
        }
      
        return res.status(200).json({message:"Removed from Favourites"})

    } catch (error) {
        res.status(500).json({message:error})
    }
})
//fetch favourite books
router.get("/get-favourite-books",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers
        const userData=await User.findById(id).populate("favourites")//populate is used to fetch data using the id from other referenced table
        const favouriteBooks=userData.favourites
        return res.json({
            status:"Success",
            data:favouriteBooks,
        })

    } catch (error) {
       return res.status(500).json({message:error}) 
    }
})



















module.exports=router