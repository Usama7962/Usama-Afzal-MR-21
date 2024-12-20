import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// Create the context
const userContext = createContext();

// Define the AuthContext component
const AuthContext = ({ children }) => { // 'children' should be lowercase
  const [user, setUser] = useState(null); // Destructure correctly as [user, setUser]
   const [loading, setloading]=useState(true);
useEffect(()=>{
    const verifyUser = async () =>{
        try{
            const token = localStorage.getItem('token');
            if(token){
            const response = await axios.get("http://localhost:5002/api/auth/verify",{
                headers:{
                    "Authorization" : `Bearer ${token}`,
                }
            })
            if(response.data.success){
                setUser(response.data.user)
            }
        }else{
            setUser(null)
            setloading(false);

        }
        }catch(error){
            if(error.response && !error.response.data.error){
                setUser(null);

            }
        }finally{
            setloading(false)
        }
    }
    verifyUser()
})
  const login = (user) => {
    setUser(user);
    // Optionally store token in localStorage
    localStorage.setItem('token', user.token); // Example: store token
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <userContext.Provider value={{ user, login, logout ,loading}}>
      {children} 
    </userContext.Provider>
  );
};

// Create the custom hook to access the context
const useAuth = () => {
  return useContext(userContext); // Correctly useContext
};

export { AuthContext, useAuth }; // Named exports
