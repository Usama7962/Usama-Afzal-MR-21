// import Department from "../models/Department.js"
// const getDepartments = async (req , res) =>{
//     try{
//         const departments = await Department.find()
//         return res.status(200).json({success:true, departments})
//     }catch(error){
//         return   res.status(500).json({success: false , error:"get department server error"})


//     }
// }

// const addDepartment = async (req,res) =>{
//     try{

//         const {dep_name,description}=req.body;
//         const newDep = new Department({
//             dep_name,
//             description

//      } )
//         await newDep.save()
//         return res.status(200).json({success: true , department:newDep})
//     }catch(error) {
//        return   res.status(700).json({success: false , error:"add department server error"})

//     }

// }
// const getDepartment= async (req,res)=>{
//     try{
//         const {id} = req.params;
//         const department = await Department.findById({_id: id})
//         return res.status(200).json({success:true, department})
//     }catch(error){
//         return   res.status(500).json({success: false , error:"get department server error"})


//     }

// }

//     const updateDepartment= async (req,res) => {
//         try{
//             const {id} = req.params;
//             const {dep_name,description}= req.body;
//             const updateDep = await Department.findByIdAndUpdate({_id: id},{
//                 dep_name,
//                 description
//             })
//             return res.status(200).json({success:true, updateDep})
//     }catch(error){
//         return   res.status(500).json({success: false , error:"edit department server error"})


//     }
//         }
   

// export {addDepartment, getDepartments,getDepartment,updateDepartment} 



import mongoose from "mongoose";
import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message || "Failed to fetch departments" });
    }
};

const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body;
        if (!dep_name || !description) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }
        const newDep = new Department({ dep_name, description });
        await newDep.save();
        return res.status(200).json({ success: true, department: newDep });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message || "Failed to add department" });
    }
};

const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid department ID format" });
        }

        const department = await Department.findById(id);
        if (!department) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        return res.status(200).json({ success: true, department });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message || "Failed to fetch department" });
    }
};

// const updateDepartment = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Validate ObjectId format
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ success: false, error: "Invalid department ID format" });
//         }

//         const { dep_name, description } = req.body;
//         if (!dep_name || !description) {
//             return res.status(400).json({ success: false, error: "All fields are required" });
//         }

//         const updateDep = await Department.findByIdAndUpdate(
//             id,
//             { dep_name, description },
//             { new: true }
//         );
//         if (!updateDep) {
//             return res.status(404).json({ success: false, error: "Department not found" });
//         }

//         return res.status(200).json({ success: true, department: updateDep });
//     } catch (error) {
//         return res.status(500).json({ success: false, error: error.message || "Failed to update department" });
//     }
// };


const updateDepartment = async (req, res) => {
    try {
        const { dep_name, description, newDepName } = req.body;

        // Ensure required fields are provided
        if (!dep_name || !description || !newDepName) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        // Find the department by dep_name and update it
        const updateDep = await Department.findOneAndUpdate(
            { dep_name }, // Filter condition
            { dep_name: newDepName, description }, // Update values
            { new: true } // Return the updated document
        );

        if (!updateDep) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        return res.status(200).json({ success: true, department: updateDep });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message || "Failed to update department" });
    }
}
// const deleteDepartment = async (req,res) =>{
//     try {
//         const { dep_name, description, newDepName } = req.body;

//         // Ensure required fields are provided
//         if (!dep_name || !description || !newDepName) {
//             return res.status(400).json({ success: false, error: "All fields are required" });
//         }

//         // Find the department by dep_name and update it
//         const updateDep = await Department.findOneAndUpdate(
//             { dep_name }, // Filter condition
//             { dep_name: newDepName, description }, // Update values
//             { new: true } // Return the updated document
//         );

//         if (!updateDep) {
//             return res.status(404).json({ success: false, error: "Department not found" });
//         }

//         return res.status(200).json({ success: true, department: updateDep });
//     } catch (error) {
//         return res.status(500).json({ success: false, error: error.message || "Failed to update department" });
//     }

// }
const deleteDepartment = async (req, res) => {
    try {
        const { dep_name } = req.params; // Get dep_name from URL parameter

        // Ensure the required field is provided
        if (!dep_name) {
            return res.status(400).json({ success: false, error: "Department name is required" });
        }

        // Find the department by dep_name and delete it
        const deletedDep = await Department.findOneAndDelete({ dep_name });

        if (!deletedDep) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Department deleted successfully",
            department: deletedDep,
        });
    } catch (error) {
        console.error("Error in deleteDepartment:", error.message);
        return res.status(500).json({ success: false, error: "Failed to delete department" });
    }
};


export { addDepartment, getDepartments, getDepartment, updateDepartment,deleteDepartment };
