// import mongoose from "mongoose"; 
// const connectToDatabasen = async () => {
//     try{
//         await mongoose.connect(process.env.MONGODB_URL)
//     }catch(error){
//         console.log(error)
//     }
// }
// export default connectToDatabasen

import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

export default connectToDatabase;
