import { useContext, useEffect } from "react";
import { useNavigate, Navigate, Outlet, useParams, redirect } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import useCheckUser from "../hooks/useCheckUser";

const PrivateRoutes = () => {
   let { id } = useParams();
   const url = import.meta.env.VITE_API_URL + `/user/${id}/isAuthorized`;
   const navigate = useNavigate();

   const {reqUserId, isAuthenticated} = useContext(AuthContext);
   const { isAuthorized, isLoading } = useCheckUser(url);


   useEffect(() => {
      if (!isLoading) {
         if (!isAuthenticated) {
            return navigate("/");
         } else if (isAuthenticated && !isAuthorized) {
            const redirectLink = "/user/" + reqUserId;
            return navigate(redirectLink);
         }
      }
   }, [navigate, isAuthenticated, isAuthorized, reqUserId, isLoading, id]);

   if (isLoading) {
      return (
         <div className="flex justify-center font-semibold text-sm md:text-base w-full md:w-auto text-center mt-5 px-14 py-1.5 lg:py-2.5 text-teal-400">
            Loading...
         </div>
      );
   }

   if (isAuthenticated && isAuthorized) {
      return <Outlet />;
   }
};

export default PrivateRoutes;