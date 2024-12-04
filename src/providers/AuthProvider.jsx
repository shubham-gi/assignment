import { useState,useEffect } from "react";
import {AuthContext} from "./AuthContext";
import { useNavigate } from "react-router";
const  AuthProvider=({children})=>{
    const [loggedIn, setloggedIn] = useState(false);
    const navigate=useNavigate();
    useEffect(() => {
        console.log("AuthProvider")
      const token = localStorage.getItem("authToken");
      if(token){
        setloggedIn(true);
      }else{
        navigate("/login")
      }
    
      
    }, [loggedIn])
    const logout=()=>{
        localStorage.removeItem("authToken");
        setloggedIn(false)
        navigate('/login')
    }
    
    return (
        <AuthContext.Provider value={{loggedIn,setloggedIn,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider