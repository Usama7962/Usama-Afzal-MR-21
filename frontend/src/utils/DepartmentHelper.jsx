// import { useNavigate } from "react-router-dom";

// export const columns = [
//   {
//     name: "S No",
//     selector: (row) => row.sno,
//   },
//   {
//     name: "Department Name",
//     selector: (row) => row.dep_name,
//   },
//   {
//     name: "Action",
//     selector: (row) => row.action,
//   },
// ];
// export const DepartmentButtons = ({id,onDepartmentDelete }) => {
//   const navigate = useNavigate();
//   const handleDelete = async (id) => {
//     try {
//       const responns = await axios.Delete(
//         `http://localhost:5001/api/department/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (responns.data.success) {
//         onDepartmentDelete(id)
//       }
//     } catch (error) {
//       if (error.response && !error.response.data.success) {
//         alert(error.response.data.error);
//       }
//     }
//   };
//   return (
//     <div className="flex space-x-3">
//       <button
//         className="px-3 py-1 bg-teal-600 text-white"
//         onClick={() => navigate("/admin-dashboard/department/${_id}")}
//       >
//         Edit
//       </button>
//       <button
//         className="px-3 py-1 bg-red-600 text-white"
//         onClick={() => handleDelete(id)}
//       >
//         Delete
//       </button>
//     </div>
//   );
// };


import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ dep_name, onDepartmentDelete }) => {
  const navigate = useNavigate();


  // Function to handle department deletion
  const handleDelete = async (dep_name) => {
    try {
      // Send the dep_name in the URL as part of the DELETE request
      const response = await axios.delete(
        `http://localhost:5002/api/department/${dep_name}`, // Pass dep_name in the URL
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.data.success) {
        alert("Department deleted successfully");
        onDepartmentDelete(dep_name); // Call the parent method to update the UI
      } else {
        alert(response.data.error || "Failed to delete department");
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      alert(error.response?.data?.error || "An unexpected error occurred");
    }
  };
  

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/department/${dep_name}`)} // Navigate using dep_name
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={() => handleDelete(dep_name)} // Pass dep_name for deletion
      >
        Delete
      </button>
    </div>
  );
};
