// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import DataTable from "react-data-table-component"
// import { columns, DepartmentButtons } from "../../utils/DepartmentHelper.jsx";
// import axios from "axios";



// const DepartmentList = () => {
//   const [departments, setDepartments]= useState([])
//   const [depLoading, setDepLoading]=useState(false)

//   const onDepartmentDelete = async (id) =>{
//     const data = departments.filter(dep=>dep._id !== id)
//     setDepartments(data)
//   }

//   useEffect(()=>{
//     const fetchDepartments = async ()=>{
//       setDepLoading(true)
//       try{
//         const responns = await axios.get('http://localhost:5001/api/department',{
//           headers:{
//             "Authorization" : `Bearer ${localStorage.getItem('token')}`
//           }
//         })
//         if(responns.data.success){
//           let sno = 1;
//           const data = await responns.data. departments.map ((dep)=> (
//             {
//               _id: dep._id,
//               sno: sno++,
//               dep_name: dep.dep_name,
//               action:(<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete}/>),
//             }

//           ));
//           setDepartments(data);
//         }
//       }catch(error){
//         if(error.response && !error.response.data.success){
//           alert(error.response.data.error)
//       }
//     }finally{
//       setDepLoading(false)
//     }

      
//     };
//     fetchDepartments();
//   },[]);

//   return (
//     <>{depLoading ? <div>Loading...</div>:
//     <div className="p-5">
//       <div className="text-center">
//         <h3 className="text-2xl font-bold">Manage Departments</h3>
//       </div>
//       <div className="flex justify-between items-center">
//         <input
//           type="text"
//           placeholder="Seach By Dep Name"
//           className="px-4 py-8.5 border"
//         />
//         <Link
//           to="/admin-dashboard/add-department"
//           className="px-4 py-1 bg-teal-600 rounded text-white"
//         >
//           Add New Department
//         </Link>
//       </div>
//       <div className="mt-5">
//         <DataTable
//         columns={columns} data={departments}
//         />


//       </div>
//     </div>
//  } </>
//   );
// };

// export default DepartmentList;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { DepartmentButtons } from "../../utils/DepartmentHelper.jsx";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);

  // Function to update state after department is deleted
  const onDepartmentDelete = (dep_name) => {
    const updatedDepartments = departments.filter(dep => dep.dep_name !== dep_name);
    setDepartments(updatedDepartments); // Update state with the new list
  };

  // Fetch departments on mount
  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get('http://localhost:5002/api/department', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            ...dep,
            sno: sno++, // Add serial number
          }));
          setDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          alert("Failed to fetch departments");
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []); // Empty dependency array ensures it runs only once when component mounts

  // Dynamically generate columns to include the updated "Action" buttons
  const columns = [
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
      cell: (row) => (
        <DepartmentButtons dep_name={row.dep_name} onDepartmentDelete={onDepartmentDelete} />
      ),
    },
  ];

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center">
            <input type="text" placeholder="Search By Dep Name" className="px-4 py-1 border" />
            <Link to="/admin-dashboard/add-department" className="px-4 py-1 bg-teal-600 rounded text-white">
              Add New Department
            </Link>
          </div>
          <div className="mt-5">
            <DataTable columns={columns} data={departments} />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
