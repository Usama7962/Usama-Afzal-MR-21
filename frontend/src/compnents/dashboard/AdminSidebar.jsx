// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaBuilding,
//   FaCalendar,
//   FaCogs,
//   FaMoneyBillWave,
//   FaTachometerAlt,
//   FaUser,
// } from "react-icons/fa";

// const AdminSidebar = () => {
//   return (
//     <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
//       <div className="bg-teal-600 h-12 flex items-center justify-center">
//         <h3 className="text-2xl text-center font-pacific">Employee MS</h3>
//       </div>
//       <div className="px-4">
//         <NavLink
//           to="/admin-dashboard/leave"
//           className={({ isActive }) =>
//             `${
//               isActive ? "bg-teal-500" : " "
//             } flex items-center space-x-4 block py-2.5 px-4 rounded`
//           }
//         >
//           <FaCalendar />
//           <span>Leave</span>
//         </NavLink>

//         <NavLink
//           to="/admin-dashboard"
//           className="flex items-center space-x-4 block py-2.5 px-4 rounded"
//         >
//           {/* // className={({isActive}) =>`${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}end> */}
//           <FaUser />
//           <span>Employee</span>
//         </NavLink>
//         <NavLink
//           to="/admin-dashboard/department"
//           className={({ isActive }) =>
//             `${
//               isActive ? "bg-teal-500" : " "
//             } flex items-center space-x-4 block py-2.5 px-4 rounded`
//           }
//         >
//           <FaBuilding />
//           <span>Department</span>
//         </NavLink>
//         <NavLink
//           to="/admin-dashboard"
//           className="flex items-center space-x-4 block py-2.5 px-4 rounded"
//         >
//           <FaCalendar />
//           <span>Leave</span>
//         </NavLink>
//         <NavLink
//           to="/admin-dashboard"
//           className="flex items-center space-x-4 block py-2.5 px-4 rounded"
//         >
//           <FaMoneyBillWave />
//           <span>Salary</span>
//         </NavLink>
//         <NavLink
//           to="/admin-dashboard"
//           className="flex items-center space-x-4 block py-2.5 px-4 rounded"
//         >
//           <FaCogs />
//           <span>setting</span>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;




import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBuilding, FaCalendar, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUser } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
      <div className='bg-teal-600 h-12 flex items-center justify-center'>
        <h3 className='text-2xl text-center font-pacific'>Employee MS</h3>
      </div>
      <div className='px-4'>
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink
          to="/admin-dashboard/employee"
          className={({ isActive }) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}
        >
          <FaUser />
          <span>Employee</span>
        </NavLink>
        
        <NavLink
          to="/admin-dashboard/department"
          className={({ isActive }) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>
        
        <NavLink
          to="/admin-dashboard/leave"
          className={({ isActive }) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}
        >
          <FaCalendar />
          <span>Leave</span>
        </NavLink>
        
        <NavLink
          to="/admin-dashboard/salary"
          className={({ isActive }) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>
        
        <NavLink
          to="/admin-dashboard/settings"
          className={({ isActive }) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
