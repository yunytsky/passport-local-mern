import { useNavigate } from "react-router-dom";

const Error404 = () => {
   const navigate = useNavigate();
   const goBack = () => {
      navigate(-1)
   }

   return(
      <div className="flex flex-col items-center justify-center h-screen w-screen px-10">
         <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-800">404</h2>
         <div className="flex justify-center font-semibold text-sm md:text-base w-full md:w-auto text-center px-14 py-1.5 lg:py-2.5 text-rose-400">
            Page not found
         </div>
         <button onClick={goBack} className="font-semibold text-xs xsm:text-sm sm:text-base  w-auto text-center mt-2 px-11 py-1.5 lg:py-2.3 text-rose-400 bg-white border border-rose-400 rounded-md hover:text-white hover:bg-rose-400  active:text-white active:border-rose-500 active:bg-rose-500 ">
            Go back
         </button>
      </div>
    
 );
}

export default Error404;