import React from 'react'
import {useAuth} from '../context/authContext.jsx';
import  AdminSidebar from '../compnents/dashboard/AdminSidebar.jsx'
import Navbar from '../compnents/dashboard/Navbar.jsx';
import AdminSummary from "../compnents/dashboard/AdminSummary.jsx";
import { Outlet } from 'react-router-dom';


const AdminDashboard = () => {
  const {user} = useAuth()
  
  return (
    <div className='flex'>
      <AdminSidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar/>
        <Outlet/>

      </div>
    </div>
  )
}

export default AdminDashboard

