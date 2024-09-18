import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import TutorLayouts from "../Layouts/TutorLayouts";
import TutorProtected from "../protected/tutorProtected";
import LoadingSpinner from "../Components/Common/LoadingSpinner";

const SignupTutor = lazy(() => import("../Pages/Tutor/SignupTutor"));
const OtpTutor = lazy(() => import("../Pages/Tutor/OtpTutor"));
const LoginTutor = lazy(() => import("../Pages/Tutor/LoginTutor"));
const TutorDashboard = lazy(() => import("../Components/Tutor/TutorDashboard"));
const ForgotTutor = lazy(() => import("../Pages/Tutor/ForgotTutor"));
const ForgotPassOTP = lazy(() => import("../Pages/Tutor/ForgotPassOTP"));
const ForgotNewPass = lazy(() => import("../Pages/Tutor/ForgotNewPass"));
const MyCourse = lazy(() => import("../Pages/Tutor/course/MyCourse"));
const CourseCreation = lazy(
  () => import("../Components/Tutor/course/CourseCreation")
);
const AddCuricculum = lazy(
  () => import("../Components/Tutor/course/courseCreate.tsx/CuricculumOfCourse")
);
const ViewMyCourse = lazy(() => import("../Pages/Tutor/course/ViewMyCourse"));
const TutorProfile = lazy(() => import("../Pages/Tutor/TutorProfile"));
const ChatList = lazy(() => import("../Components/Tutor/ChatList"));
const ChatScreenTutor = lazy(
  () => import("../Components/Tutor/ChatScreenTutor")
);
const Assignments = lazy(() => import("../Pages/Tutor/course/Assignments"));
const VideoCallRoom = lazy(() => import("../Components/Common/VideoCallRoom"));
const InstructorDashboard = lazy(() => import("../Components/Tutor/Dashboard"));

function TutorRoutes() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/register" element={<SignupTutor />} />
          <Route path="/tutorOtp" element={<OtpTutor />} />
          <Route path="/tutorLogin" element={<LoginTutor />} />
          <Route path="/tutorForgetPassword" element={<ForgotTutor />} />
          <Route path="/forgotPassOTP" element={<ForgotPassOTP />} />
          <Route path="/resetPassword" element={<ForgotNewPass />} />

          <Route element={<TutorProtected />}>
            <Route element={<TutorLayouts />}>
              <Route index element={<InstructorDashboard />} />
              <Route path="/tuturDashboard" element={<InstructorDashboard />} />
              <Route path="/myCourses" element={<MyCourse />} />
              <Route path="/createCourse" element={<CourseCreation />} />
              <Route path="/addCuricculum" element={<AddCuricculum />} />
              <Route path="/myCourses/courseView" element={<ViewMyCourse />} />
              <Route path="/instructorProfile" element={<TutorProfile />} />
              <Route path="/chatList" element={<ChatList />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route
                path="/chatList/viewChatScreen"
                element={<ChatScreenTutor />}
              />
              <Route
                path="/videoCallRoom/:roomId"
                element={<VideoCallRoom />}
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}
export default TutorRoutes;
