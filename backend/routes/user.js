const router=require("express").Router()
//sign-up
const User=require("../models/user")
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
const {authenticateToken}=require('./userAuth')




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
if(password.length<3){
    return res
    .status(400)
    .json({message:"password must have 3 or more characters"})
}
const hashPassword= await bcrypt.hash(password,10);
const newUser=new User({username:username,email:email,password:hashPassword,address:address})
await newUser.save();
return res.status(200).json({message:"Signed Up Successfully"})
    } catch (error) {
        res.status(500).json({message:error})
    }
})
//login api
router.post("/sign-in",async(req,res)=>{
    try {
       const {username,password}=req.body;
       const existingUser=await User.findOne({username});
       if(!existingUser){
        res.status(400).json({message:"Invalid credentials"});
       }
       await bcrypt.compare(password,existingUser.password,(err,data)=>{
        if(data){
            const authClaims=[
                {
                    name:existingUser.username
                },{
                    role:existingUser.role
                }

            ]
            const token=jwt.sign({authClaims},"EpicReads123",{expiresIn:"30d"})
        res.status(200).json({id:existingUser._id,role:existingUser.role,token:token});


        }else{
        res.status(400).json({message:"Invalid Credentials"})
        }
       })

    } catch (error) {
        res.status(500).json({message:error})
    }
})
//get user information
router.get("/get-user-information",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers
        const data=await User.findById(id).select("-password");
        return res.status(200).json(data)
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})
//update address
router.put("/update-address",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const {address}=req.body
        await User.findByIdAndUpdate(id,{address:address})
        return res.status(200).json({message:"Address updated Successfully!"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
module.exports=router;