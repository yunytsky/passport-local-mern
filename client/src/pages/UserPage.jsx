import { useLoaderData } from "react-router-dom"
import catLogo from "../assets/cat-5.png";
import Axios from "axios";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const UserPage = () => {
   let data = useLoaderData();

   const {setReqUserId, setIsAuthenticated} = useContext(AuthContext);

   const handleLogout = async () => {
      try {
         const url = import.meta.env.VITE_API_URL + "/log-out"
         const response = await Axios({
            method: "GET",
            withCredentials: true,
            url: url
         })

         if (response.status === 200) {
            setIsAuthenticated(false);
            setReqUserId(null);
         }
      } catch (err) {
         throw Error("Internal server error")
      }
   }

   return(
      <div className="flex flex-col items-center justify-center h-screen w-screen pb-10 px-10">
         <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-800">Welcome, {data.username}</h2>
         <img src={catLogo} alt="kitty" className="w-1/2 smd:w-1/3 md:w-1/4 lg:w-1/5 mx-auto animate-bounce mt-10" />
         <button onClick={handleLogout} className="font-semibold text-xs xsm:text-sm sm:text-base  w-auto text-center mt-2 px-11 py-1.5 lg:py-2.3 text-teal-400 bg-white border border-teal-400 rounded-md hover:text-white hover:bg-teal-400  active:text-white active:border-teal-500 active:bg-teal-500 ">
            Log out
         </button>
      </div>
   )
}

const userLoader =  async ({params}) => {
   try{
      const {id} = params;
      const url = import.meta.env.VITE_API_URL + "/user/" + id;
      const response = await Axios({
         method: "GET",
         withCredentials: true,
         url: url
      })

      return response.data;

   }catch(err){
      if(err.response){
         return err.response.data;
      }else{
         throw Error("Internal sever error");
      }
   }
}

export default UserPage;
export {userLoader};