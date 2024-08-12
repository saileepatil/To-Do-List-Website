const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const userRoutes = require("./routes/Users")


const routes = require("./routes/ToDoRoute")

const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected...");
}).catch((error) => {
console.log(error);
})

app.use("/api" , routes)
app.use("/api" ,  userRoutes)

app.listen(PORT , () => {
    console.log(`Listenning at ${PORT}...`);
})
