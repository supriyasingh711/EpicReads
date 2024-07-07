const router=require("express").Router()
//sign-up
const User=require("../models/user")
const bcrypt=require("bcrypt")




router.post("/sign-up",async(req,res)=>{
    try {
       const {username,email,password,address}=req.body;
       //check username length is more than 6
       if(username.length<4){
        return res.status(400).json({message:"username must have atleast four or more characters"})
       }
       //check if username is already in database
const existingUser=await User.findOne(({username:username}))
if(existingUser){
    return res.status(400).json({message:"username already exists"})

}
//check email already exists

const existingEmail=await User.findOne(({email:email}))
if(existingEmail){
    return res.status(400).json({message:"Email already exists"})

}
//check password length
if(password.length<8){
    return res
    .status(400)
    .json({message:"password must have 8 or more characters"})
}
const hashPassword= await bcrypt.hash(password,10);
const newUser=new User({username:username,email:email,password:hashPassword,address:address})
await newUser.save();
return res.status(200).json({message:"Signed Up Successfully"})
    } catch (error) {
        res.status(500).json({message:error})
    }
})

module.exports=router;