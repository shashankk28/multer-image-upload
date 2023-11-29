const express = require('express');
const cors = require('cors');
const dotenv=require("dotenv");
const userRoutes=require("./routes/userRoute")
dotenv.config();
const app=express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(userRoutes);
module.exports=app;