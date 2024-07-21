import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AdminLayouts from "../Layouts/AdminLayouts";
import Users from "../Components/Admin/Users";
import Tutors from "../Components/Admin/Tutors";


const DashBoard = lazy(()=> import("../Components/Admin/DashBoard"))

 function AdminRoutes() {
  return (
    <div>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
       

        <Route element={<AdminLayouts />}>
          <Route index element={<DashBoard />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/usersList" element={<Users/>} />
          <Route path="/tutorsList" element={<Tutors/>} />
          
        </Route>
      </Routes>
    </Suspense>
  </div>
  )
}
export default AdminRoutes;