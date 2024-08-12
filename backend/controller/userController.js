let jwt = require("jsonwebtoken");
let{ObjectId} = require("mongodb");
let userSchema = require("../models/user");
let bcrypt = require("bcrypt")



const updateUser = async(req,res) => {
    let token = req.headers.authorization
    let result = jwt.verify(token  ,  "Shh");
    console.log(result);
    if(req.params.id == result._id){
      await  userSchema.findByIdAndUpdate({ _id : new ObjectId(req.params.id)} , req.body)
      return res.json({
        Success:"User Updated"
      })
    }else{
     return res.json({
        Error: "You are not allowed to make update request"
     })
    }
    
}

const getUser = async(req,res) => {
    let users = await userSchema.find();
    return res.json(users);
}

const loginUser = async (req,res) => {
    let {Email , Password} = req.body;
    let userDetails = await  userSchema.findOne({Email : Email})
    if( userDetails == null){
        return res.status(404).json({
            Error : "No user is registered with this email"
        })
    }
    let passwordResult = bcrypt.compareSync( Password , userDetails.Password);
    if(passwordResult == false){
        return res.json({
            Error: "Incorrect Password"
        })
    }
    
    let token = jwt.sign( { _id :userDetails._id , Email:  userDetails.Email} , "Shh")
    
    return res.json({
        Success: "Login Successfully",
        token
    })
    }

    const registerUser =  async(req,res) => {

        let{Password} = req.body;
        let encryPassword = bcrypt.hashSync( Password , 10)
        req.body.Password = encryPassword;
    
         let user = new userSchema(req.body)
    
    
    
        let userDetails = await user.save();
    
    return res.json({
        Success : "user Stored in DB",
        userDetails
    })
    }

module.exports = {
    updateUser,
    getUser,
    loginUser,
    registerUser
}