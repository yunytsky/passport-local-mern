import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import UserPage, { userLoader } from "./pages/UserPage.jsx";
import Home from "./pages/Home.jsx";
import LogIn, { logInAction } from "./pages/LogIn.jsx";
import SignUp, { signUpAction } from "./pages/SignUp.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import {AuthContextProvider} from "./contexts/AuthContext.jsx";
import Error404 from "./pages/Error404.jsx";
import Error505 from "./pages/Error505.jsx";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/">
         <Route index element={<Home/>} />
         <Route path="/log-in" element={<LogIn />} action={logInAction} errorElement={<Error505/>} />
         <Route path="/sign-up" element={<SignUp />} action={signUpAction} errorElement={<Error505 />} />
         <Route path="/user/:id" element={<PrivateRoutes />} errorElement={<Error505 />}>
            <Route index element={<UserPage />} loader={userLoader} errorElement={<Error505 />}/>
         </Route>
         <Route path="*" element={<Error404/>}/>
      </Route>
   )
)

function App() {
  return (
    <div className="App">
       <AuthContextProvider>
           <RouterProvider router={router} />
       </AuthContextProvider>
    </div>
  )
}

export default App
