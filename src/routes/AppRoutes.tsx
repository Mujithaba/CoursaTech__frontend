import {Routes,Route} from "react-router-dom";
import UserRoutes from "./UserRoutes";


function AppRoutes() {
  return (
    <Routes>
        <Route path="/*" element={<UserRoutes />} />
    </Routes>
  )
}


export default AppRoutes;