import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import TutorLayouts from "../Layouts/TutorLayouts";
import LoadingSpinner from "../Components/Common/LoadingSpinner";

const SignupTutor = lazy(() => import("../Pages/Tutor/SignupTutor"));
const OtpTutor = lazy(() => import("../Pages/Tutor/OtpTutor"));
const LoginTutor = lazy(() => import("../Pages/Tutor/LoginTutor"));
const TutorDashboard = lazy(() => import("../Components/Tutor/TutorDashboard"));
const ForgotTutor = lazy(() => import("../Pages/Tutor/ForgotTutor"));
const ForgotPassOTP = lazy(() => import("../Pages/Tutor/ForgotPassOTP"));
const ForgotNewPass = lazy(() => import("../Pages/Tutor/ForgotNewPass"));
const Course = lazy(() => import("../Pages/Tutor/course/Course"));
const CourseCreation = lazy(() => import("../Components/Tutor/course/CourseCreation"));
const AddCuricculum = lazy(()=> import("../Components/Tutor/course/courseCreate.tsx/CuricculumOfCourse"))



function TutorRoutes() {
  return (
    <div >
      <Suspense  fallback={<LoadingSpinner/>}>
        <Routes>
          <Route path="/register" element={<SignupTutor />} />
          <Route path="/tutorOtp" element={<OtpTutor />} />
          <Route path="/tutorLogin" element={<LoginTutor />} />
          <Route path="/tutorForgetPassword" element={<ForgotTutor />} />
          <Route path="/forgotPassOTP" element={<ForgotPassOTP />} />
          <Route path="/resetPassword" element={<ForgotNewPass />} />

          <Route element={<TutorLayouts />}>
            <Route index element={<TutorDashboard />} />
            <Route path="/tuturDashboard" element={<TutorDashboard />} />
            <Route path="/Course" element={<Course />} />
            <Route path="/createCourse" element={<CourseCreation />} />
            <Route path="/addCuricculum" element={<AddCuricculum />} />
            
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}
export default TutorRoutes;
