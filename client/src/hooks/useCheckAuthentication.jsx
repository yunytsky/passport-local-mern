import { useEffect, useState } from "react";
import Axios from "axios";

const useCheckAuthentication = (url) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [reqUserId, setReqUserId] = useState(null);
   
   useEffect(() => {
      const checkAuthentication = async () => {
         try {
            const response = await Axios({
               method: "GET",
               withCredentials: true,
               url: url,
            });
            
            setIsAuthenticated(response.data.isAuthenticated);
            setReqUserId(response.data.reqUserId);
         } catch (err) {
            throw Error("Internal sever error");
         }
      };
      checkAuthentication();
   }, [url]);


   return { reqUserId, isAuthenticated, setIsAuthenticated, setReqUserId };

}
export default useCheckAuthentication;