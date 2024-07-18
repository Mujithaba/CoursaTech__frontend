import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import TutorLayouts from "../Layouts/TutorLayouts";

const SignupTutor = lazy(() => import("../Pages/Tutor/SignupTutor"));
const OtpTutor = lazy(() => import("../Pages/Tutor/OtpTutor"));
const LoginTutor = lazy(() => import("../Pages/Tutor/LoginTutor"));
const TutorDashboard = lazy(() => import("../Components/Tutor/TutorDashboard"));

function TutorRoutes() {
  return (
    <div >
      <Suspense  fallback={<div >Loading...</div>}>
        <Routes>
          <Route path="/register" element={<SignupTutor />} />
          <Route path="/tutorOtp" element={<OtpTutor />} />
          <Route path="/tutorLogin" element={<LoginTutor />} />

          <Route element={<TutorLayouts />}>
            <Route index element={<TutorDashboard />} />
            <Route path="/tuturDashboard" element={<TutorDashboard />} />
            
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}
export default TutorRoutes;
