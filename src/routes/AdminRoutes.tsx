import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AdminLayouts from "../Layouts/AdminLayouts";
import LoadingSpinner from "../Components/Common/LoadingSpinner";
import AdminProtected from "../protected/adminProtected";

const DashBoard = lazy(() => import("../Components/Admin/AdminDashBoard"));
const UsersList = lazy(() => import("../Components/Admin/Users"));
const TutorsList = lazy(() => import("../Components/Admin/Tutors"));
const CategoryList = lazy(() => import("../Pages/Admin/Categories"));
const ViewMyCourse = lazy(() => import("../Pages/Admin/ViewMyCourse"));
const AdminCoursePage = lazy(() => import("../Pages/Admin/AdminCoursePage"));
const ReportedCourses = lazy(() => import("../Components/Admin/ReportedCourses"));



function AdminRoutes() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<AdminProtected />}>
            <Route element={<AdminLayouts />}>
              <Route index element={<DashBoard />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/usersList" element={<UsersList />} />
              <Route path="/tutorsList" element={<TutorsList />} />
              <Route path="/coursesList" element={<AdminCoursePage />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route
                path="/coursesList/courseView"
                element={<ViewMyCourse />}
              />
              <Route path="/reportedCourses" element={<ReportedCourses />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}
export default AdminRoutes;
