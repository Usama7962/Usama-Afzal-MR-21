// import React, { useState,useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios'

// const EditDepartment = () => {
//     const [department,setDepartment]=useState([])
    
//     const [depLoading,setDepLoading]=useState(false)
//     const navigate = useNavigate()
//     const {id}=useParams()
//     useEffect(()=>{
//         const fetchDepartments = async ()=>{
//           setDepLoading(true)
//           try{
//             const responns = await axios.get(`http://localhost:5001/api/department/${id}`,{
//               headers:{
//                 "Authorization" : `Bearer ${localStorage.getItem('token')}`
//               },
//             });
//             if(responns.data.success){
//                 setDepartment(responns.data.department)
              
//             }
//           }catch(error){
//             if(error.response && !error.response.data.success){
//               alert(error.response.data.error)
//           }
//         }finally{
//           setDepLoading(false)
//         }
    
          
//         };
//         fetchDepartments();
//       },[]);
//       const handleChange=(e)=>{
//         const{name,value}=e.target;
//         setDepartment({...department,[name]:value})
//     }
//     const handleSubmit= async (e)=>{
//         e.preventDefault()
//         try{
//             const response= await axios.put(`http://localhost:5001/api/department/${id}`,department,{
//                 headers:{
//                     "authorization":`Bearer ${localStorage.getItem('token')}`
//                 }
//             })
//             if(response.data.success){
//                 navigate("/admin-dashboard/department");

//             }
//         }catch(error){
//             if(error.response && !error.response.data.success){
//                 alert(error.response.data.error)
//             }
//         }
//     }
//   return (
//     <>{depLoading ? <div>Loading...</div>:
//     <div className="flex justify-center pt-16">
//       <div className="max-w-3xl mx-auto-mt-10 bg-white p-8 rounded-md shadow-md w-96">
//         <h3 className="text-2xl font-bold mb-6">Edit Department</h3>
//         <form onSubmit={handleSubmit} >
//           <div>
//             <label
//               htmlFor="dep_name"
//               className="text-sm font-medium text-gray-700"
//             >
//               Department Name
//             </label>
//             <input
//               type="text"
//               name="dep_name"
//               onChange={handleChange}
//               value={department.dep_name}
//               placeholder="Enter Dep Name"
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div className="mt-3">
//             <label
//               htmlFor="description"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Description
//             </label>
//             <textarea
//               name="description"
//               placeholder="Description"
//               onChange={handleChange}
//               value={department.dep_description}

//                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               rows="4"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full mt-6 bg-teal-600 hover:bg-teal-700
//                  text-white font-bold py-2 px-4 rounded"
//           >
//             Edit Department
//           </button>
//         </form>
//       </div>
//     </div>
//     }</>
//   )
// }

// export default EditDepartment



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditDepartment = ({ departmentData }) => {
  const [department, setDepartment] = useState({
    dep_name: "", // Current department name (editable now)
    description: "",
    newDepName: "",  // New department name (editable by the user)
  });
  const [depLoading, setDepLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // On component mount, initialize department with data passed as prop (departmentData)
  useEffect(() => {
    if (departmentData) {
      setDepartment({
        dep_name: departmentData.dep_name, // Current department name (editable)
        description: departmentData.description, // Description (editable)
        newDepName: departmentData.dep_name,  // New department name initialized to current name
      });
    }
  }, [departmentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation before submitting
    if (!department.dep_name || !department.description || !department.newDepName) {
      setError("All fields are required");
      return;
    }

    setIsSubmitting(true);
    setError(null); // Reset any previous error

    try {
      // Update department by dep_name and newDepName
      const response = await axios.put(
        `http://localhost:5002/api/department/update`, // Endpoint to update department
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/department");
      } else {
        setError(response.data.error || "Failed to update department");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Failed to update department");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {depLoading ? (
        <div className="flex justify-center items-center h-20">
          <div className="loader" /> {/* Replace with a spinner component */}
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex justify-center pt-16">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md w-96">
            <h3 className="text-2xl font-bold mb-6">Edit Department</h3>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="dep_name" className="text-sm font-medium text-gray-700">
                  Current Department Name
                </label>
                <input
                  type="text"
                  name="dep_name"
                  onChange={handleChange}
                  value={department.dep_name || ""} // Display the current department name
                  placeholder="Enter Department Name"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  required // Make this field required for form submission
                />
              </div>

              <div className="mt-3">
                <label htmlFor="newDepName" className="text-sm font-medium text-gray-700">
                  New Department Name
                </label>
                <input
                  type="text"
                  name="newDepName"
                  onChange={handleChange}
                  value={department.newDepName || ""} // Allow the user to change the department name here
                  placeholder="Enter New Department Name"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mt-3">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter Department Description"
                  onChange={handleChange}
                  value={department.description || ""} // Ensure the description field is editable
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  rows="4"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Edit Department"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
