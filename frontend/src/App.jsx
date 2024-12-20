import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Login'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/privateRoutes.jsx'
import RoleBaseRoutes from './utils/RoleBaseRoutes.jsx'
import AdminSummary from './compnents/dashboard/AdminSummary.jsx'
import  DepartmentList  from './compnents/department/DepartmentList.jsx'
import AddDepartment from './compnents/department/AddDepartment.jsx'
import EditDepartment from './compnents/department/EditDepartment.jsx'


function App() {
 

  return (
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard"/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
     <Route path="/admin-dashboard" element={
  <PrivateRoutes>  {/* Corrected casing */}
  <RoleBaseRoutes requiredRole={["admin"]}>
    <AdminDashboard />
  </RoleBaseRoutes>
</PrivateRoutes>
       }>

        <Route index element={<AdminSummary/>}></Route>
        <Route path="/admin-dashboard/department"element={<DepartmentList/> }></Route>
        <Route path="/admin-dashboard/add-department"element={<AddDepartment/> }></Route>
        <Route path="/admin-dashboard/department/:id"element={<EditDepartment/> }></Route>


        




       </Route>
     <Route path="/employee-dashboard"element={<EmployeeDashboard/>}></Route>
   </Routes>
   </BrowserRouter>
   )
}

export default App











