import { useEffect, useState } from "react";
import Axios from "axios";

const useCheckUser = (url) => {
   const [isAuthorized, setIsAuthorized] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      const checkUser = async () => {
         try {
            const response = await Axios({
               method: "GET",
               withCredentials: true,
               url: url,
            });

            setIsAuthorized(response.data.isAuthorized);

         } catch (err) {
            if (err.response) {
               setIsAuthorized(err.response.data.isAuthorized);

            } else {
               setIsLoading(false);
               throw Error("Internal server error");
            }
         }
         setIsLoading(false);
      };
      checkUser();
   }, [url]);

   return { isAuthorized, isLoading };

}
export default useCheckUser;