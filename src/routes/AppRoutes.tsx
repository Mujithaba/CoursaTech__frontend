import { Routes, Route } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import TutorRoutes from "./TutorRoutes";
import AdminRoutes from "./AdminRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/tutor/*" element={<TutorRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}

export default AppRoutes;
