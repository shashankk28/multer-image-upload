const express=require("express");
const router=express.Router();
const multer=require("multer");
const {v4:uuidv4}=require("uuid");
const User=require("../models/userModel")
const path=require("path");

const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "C:\\Users\\hp\\Desktop\\images")
      },
      filename: function (req, file, cb) {
        cb(null,uuidv4()+'-'+Date.now()+path.extname(file.originalname))
      }
})

const fileFilter=(req,file,cb)=>{
    const allowedFileTypes=['image/jpg','image/jpeg','image/png'];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

let upload=multer({storage,fileFilter});

router.route("/add").post(upload.single('photo'),(req,res)=>{
    const name=req.body.name;
    const birthDate=req.body.birthDate;
    const photo=req.file.filename;

    const newUserData={
        name,
        birthDate,
        photo,
    }

    const newUser=User(newUserData);
    newUser.save().then(()=>res.status(200).json("User Added")).catch(err=>res.status(400).json(err));
})

router.route("/rec").get((req,res)=>{
    User.find().then(user=>res.status(200).json(user)).catch(err=>res.status(400).json(err));
})
module.exports=router;