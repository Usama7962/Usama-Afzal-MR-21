// import mongoose from "mongoose";

// // Define the User schema
// const departmentschema = new mongoose.Schema({
//     dep_name: { type: String, required: true },
//     description: { type: String},
//     createAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// })

// // Create the model
// const Department = mongoose.model("Department", departmentschema)

// // Export the model
// export default Department;





import mongoose from "mongoose";

// Define the Department schema
const departmentSchema = new mongoose.Schema(
    {
        dep_name: {
            type: String,
            required: [true, "Department name is required"],
            minlength: [3, "Department name must be at least 3 characters long"],
            maxlength: [50, "Department name must not exceed 50 characters"],
            unique: true,
            index: true
        },
        description: {
            type: String,
            default: "No description provided"
        }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Create the model
const Department = mongoose.model("Department", departmentSchema);

// Export the model
export default Department;
