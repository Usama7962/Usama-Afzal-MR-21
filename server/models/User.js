import mongoose from "mongoose";

// Define the User schema
const Userschema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "employee"], required: true },  // Fixed "eunm" to "enum" and "empoyee" to "employee"
    profileImage: { type: String },
    createAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Create the model
const User = mongoose.model("User", Userschema);

// Export the model
export default User;
