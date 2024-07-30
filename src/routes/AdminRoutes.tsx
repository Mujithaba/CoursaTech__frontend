import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AdminLayouts from "../Layouts/AdminLayouts";
import LoadingSpinner from "../Components/Common/LoadingSpinner";

const DashBoard = lazy(()=> import("../Components/Admin/DashBoard"))
const UsersList = lazy(()=> import("../Components/Admin/Users"))
const TutorsList = lazy(()=> import("../Components/Admin/Tutors"))
const CourseShow = lazy(()=> import("../Pages/Admin/Courses"))
const CategoryList = lazy(()=> import("../Pages/Admin/Categories"))




 function AdminRoutes() {
  return (
    <div>
    <Suspense fallback={<LoadingSpinner/>}>
      <Routes>
       

        <Route element={<AdminLayouts />}>
          <Route index element={<DashBoard />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/usersList" element={<UsersList/>} />
          <Route path="/tutorsList" element={<TutorsList/>} />
          <Route path="/allCourse" element={<CourseShow/>} />
          <Route path="/categories" element={<CategoryList/>} />

          
        </Route>
      </Routes>
    </Suspense>
  </div>
  )
}
export default AdminRoutes;