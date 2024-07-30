import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import UserLayouts from "../Layouts/UserLayouts";
import LoadingSpinner from "../Components/Common/LoadingSpinner";

const SIgnUpPage = lazy(() => import("../Pages/User/SIgnupPage"));
const Otp = lazy(()=> import  ("../Pages/User/Otp"));
const LoginPage = lazy(()=>import ("../Pages/User/LoginPage"));
const Home = lazy(() => import("../Components/User/Home"));
const ForgotUserPass = lazy(()=>import("../Pages/User/ForgotUser"))
const ForgetPassOTP = lazy(()=>  import("../Pages/User/ForgetPassOTP"))
const ForgotPassEnter = lazy(()=> import("../Pages/User/ForgotPassEnter"))



function UserRoutes() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner/>}>
        <Routes>
          <Route element={<UserLayouts />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Route>

          <Route path="/register" element={<SIgnUpPage />} />
          <Route path="/otpVerify" element={<Otp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/userForgetPassword" element={<ForgotUserPass/>} />
          <Route path="/forgotPassOTP" element={<ForgetPassOTP/>} />
          <Route path="/resetPassword" element={<ForgotPassEnter/>}/>
        </Routes>
      </Suspense>
    </div>
  );
}

export default UserRoutes;
