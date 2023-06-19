import {Form, json, Navigate, useActionData } from "react-router-dom";
import Axios from "axios";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useEffect } from "react";

const LogIn = () => {
   let data = useActionData();
   const { reqUserId, isAuthenticated, setIsAuthenticated, setReqUserId } = useContext(AuthContext);

   useEffect(() =>{
      if (data && data.authenticated) {
         setIsAuthenticated(true);
         setReqUserId(data.userId);
      }
   },[data])

   if(isAuthenticated){
      const redirectLink = "/user/" + reqUserId;
      return (<Navigate to={redirectLink}/>)
   }else{
      return (
         <div className="flex h-screen flex-col justify-center pb-10 pt-2 px-6 py-2">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
               <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-800">Log in</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
               <Form method="post" action="/log-in">
                  <div className="mb-4">
                     <label htmlFor="email" className="block text-nase font-medium leading-6 text-gray-800">Username</label>
                     <div className="mt-2">
                        <input id="username" name="username" type="text" required className="block w-full rounded-md px-2.5 py-2.5 text-gray-900  ring-1 ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-teal-500 sm:text-sm sm:leading-6" />
                     </div>
                  </div>
                  <div className="mb-8">
                     <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-base font-medium leading-6 text-gray-800">Password</label>
                     </div>
                     <div className="mt-2">
                        <input id="password" name="password" type="password" required className="block w-full rounded-md px-2.5 py-2.5 text-gray-900  ring-1 ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-teal-500 sm:text-sm sm:leading-6" />
                     </div>
                  </div>
                  <div >
                     <button type="submit" className="flex w-full justify-center rounded-md bg-teal-400 px-3 py-2.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:ring-2 active:ring-teal-500">Log in</button>
                  </div>
               </Form>

               {data && data.error && <p className="mt-6 text-center text-rose-400 font-medium">{data.errorMessage}</p>}

            </div>
         </div>
      )
   }
}

const logInAction = async ({request}) => {
   try{
      const data =  await request.formData();
      const url = import.meta.env.VITE_API_URL + "/log-in";
      const response = await Axios({
         method: "POST",
         data: {
            username: data.get("username"),
            password: data.get("password")
         },
         withCredentials: true,
         url: url
         
      })

      return response.data;

   }catch(err){
      if(err.response){
         return { error: true, errorMessage: err.response.data.errorMessage }
      }else{
         throw Error("Internal sever error");

      }
   }
}

export default LogIn;
export {logInAction};
