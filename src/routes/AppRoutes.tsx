import {Routes,Route} from "react-router-dom";
import UserRoutes from "./UserRoutes";
import TutorRoutes from "./TutorRoutes";


function AppRoutes() {
  return (
    <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/tutor/*" element={<TutorRoutes />} />
    </Routes>
  )
}


export default AppRoutes;