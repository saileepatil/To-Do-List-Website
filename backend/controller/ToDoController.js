const ToDoModel = require("../models/ToDooModel");


module.exports.getToDos = async(req , res) => {
    const toDos = await ToDoModel.find()
    res.send(toDos)
}



module.exports.saveToDos = (req , res) => {
const {toDo} = req.body


ToDoModel.create({toDo})
.then(data => {
    console.log("Saved Successfully ...");
    res.status(201).send(data)
})
.catch((error) => {
    console.log(error)
    res.send({error: error , msg: "Something Went Wrong"})
    })
}


module.exports.updateToDos = (req , res) => {
    const {id} = req.params
    const {toDo} = req.body
    
    
    ToDoModel.findByIdAndUpdate(id , {toDo})
    .then(() => {

        res.send("Updated Successfully")

    })
    .catch((error) => {
        console.log(error)
        res.send({error: error , msg: "Something Went Wrong"})
        })
    }

    

    module.exports.deleteToDos = (req , res) => {
        const {id} = req.params
        
        
        ToDoModel.findByIdAndDelete(id )
        .then(() => {
    
            res.send("Deleted Successfully")
    
        })
        .catch((error) => {
        console.log(error)
        res.send({error: error , msg: "Something Went Wrong"})
        })
        }