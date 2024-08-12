// const express = require("express");
const {Router} = require("express");
const{updateUser , getUser , loginUser , registerUser} = require("../controller/userController")

const router = Router();

router.post("/register" , registerUser)
router.post("/login" , loginUser)
router.get("/getUsers" , getUser)
router.put("/updateUser/:id" , updateUser)

// router.delete("/deleteUser/:id" , async(req,res) => {
//     let {id} = req.params.id;

//     let token = jwt.verify(req.headers.authorization , "Shh")
// if(token){
//     await  userSchema.findByIdAndDelete(id)
//     return res.json({
//         Success: "User Deleted"
//     })
// }else{
//     return res.json({
//        Error: "You are not allowed to make delete request"
//     })
//    }
// })


module.exports = router;