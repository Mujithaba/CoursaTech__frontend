import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import UserLayouts from "../Layouts/UserLayouts";


const SIgnUpPage = lazy(() => import("../Pages/User/SIgnupPage"));
const Otp = lazy(()=> import  ("../Pages/User/Otp"));
const LoginPage = lazy(()=>import ("../Pages/User/LoginPage"));
const Home = lazy(() => import("../Components/User/Home"));



function UserRoutes() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<UserLayouts />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Route>

          <Route path="/register" element={<SIgnUpPage />} />
          <Route path="/otpVerify" element={<Otp />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default UserRoutes;
