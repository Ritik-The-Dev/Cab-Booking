const express = require("express");
const app = express();
const dbConnect = require("./database/database")
const Route = require("./route")
const cors = require("cors")

//ENV
require("dotenv").config();
//define PORT
const PORT = process.env.PORT || 5000;

//use middleware
app.use(express.json());
app.use(cors())
app.use("/api/v1",Route)
dbConnect();

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

//default route
app.get("/",(req,res)=>{
    res.send("<h1>CodeBuddy by Ritik => Backend Started</h1>");
})