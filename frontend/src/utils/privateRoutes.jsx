import React from 'react'
import {useAuth} from '../context/authContext.jsx'
import { Navigate } from 'react-router-dom'

export const privateRoutes = ({children}) => {
    const{user,londing}=useAuth()

    
  if(londing){
   
 return<div>Loading...</div>


  }
  return user ? children:<Navigate to="/login"/>
}
export default privateRoutes
