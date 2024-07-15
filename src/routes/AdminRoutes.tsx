import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AdminLayouts from "../Layouts/AdminLayouts";


const DashBoard = lazy(()=> import("../Components/Admin/DashBoard"))

 function AdminRoutes() {
  return (
    <div>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
       

        <Route element={<AdminLayouts />}>
          <Route index element={<DashBoard />} />
          <Route path="/dashboard" element={<DashBoard />} />
          
        </Route>
      </Routes>
    </Suspense>
  </div>
  )
}
export default AdminRoutes;