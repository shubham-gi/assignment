import { useState,useContext, Children } from "react";
import AuthContext from "./AuthContext";
const  AuthProvider=({children})=>{
    const [userDetails, setuserDetails] = useState("")
    return (
        <AuthContext.Provider value={{userDetails,setuserDetails}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider