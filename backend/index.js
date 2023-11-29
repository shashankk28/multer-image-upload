const mongoose=require("mongoose");
const app=require("./app");
const setUpAndStartServer = async () => {
  if(!process.env.MONGO_DB_URI) {
    throw new Error('MONGO_DB_URI must be defined');
  }

  app.listen(process.env.PORT, () => {
    console.log(`Server is running at PORT: ${process.env.PORT}`);
  });
  try {
    await mongoose.connect(process.env.MONGO_DB_URI).then((con)=>{
      console.log("Connected to MongoDB Database");
    });
    
  } catch (err) {
    console.log(err);
  }
};

setUpAndStartServer();