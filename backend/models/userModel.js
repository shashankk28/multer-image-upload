const mongoose=require("mongoose");
const userModel=new mongoose.Schema({
    name:{
        type:String,
    },
    photo:{
        type:String,
    },
    birthDate:{
        type:String,
    }

},{timestamps:true});

const User=mongoose.model("User",userModel);
module.exports=User;