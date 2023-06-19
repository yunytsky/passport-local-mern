import { useContext } from "react";
import { Link, Navigate } from "react-router-dom"
import catLogo from "../assets/cat-1.png";
import AuthContext from "../contexts/AuthContext";
const Home = () => {
   const {isAuthenticated, reqUserId} = useContext(AuthContext);
   
   if(isAuthenticated){
      const redirectLink = "/user/" + reqUserId;
      return (<Navigate to={redirectLink}/>)
   }else{
      return (
         <div className="flex flex-col items-center justify-center h-screen w-screen">
            <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-800">Authorize first</h2>

            <img src={catLogo} alt="kitty" className="w-1/2 smd:w-1/3 md:w-1/4 lg:w-1/5 mx-auto animate-bounce mb-4 mt-10" />
            <div className="flex flex-col md:flex-row items-center justify-center">
               <Link to="/log-in" className=" font-semibold text-sm md:text-base w-full md:w-auto text-center mt-2 md:mr-5 px-14 py-1.5 lg:py-2.5 text-white bg-teal-400 border border-teal-400 rounded-md hover:bg-teal-300 hover:border-teal-300 active:border-2 active:border-teal-500">Log In</Link>
               <Link to="/sign-up" className=" font-semibold text-sm md:text-base w-full md:w-auto text-center mt-2 px-14 py-1.5 lg:py-2.5 text-teal-400 bg-white border border-teal-400 rounded-md hover:bg-green-50 active:text-white active:bg-teal-400 ">Sign Up</Link>
            </div>
         </div>
      )
   }


}

export default Home