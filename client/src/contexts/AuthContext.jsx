import { createContext } from "react";
import useCheckAuthentication from "../hooks/useCheckAuthentication";

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
   const url = import.meta.env.VITE_API_URL + "/isAuthenticated";
   const { reqUserId, isAuthenticated, setIsAuthenticated, setReqUserId } = useCheckAuthentication(url);

   return(
      <AuthContext.Provider value={{ reqUserId, isAuthenticated, setIsAuthenticated, setReqUserId}}>{children}</AuthContext.Provider>
   )
   
}

export default AuthContext;
export {AuthContextProvider};