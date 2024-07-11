import {Suspense,lazy} from 'react';
import {Routes,Route} from "react-router-dom";
import UserLayouts from '../Layouts/UserLayouts';
import Otp from '../Pages/User/Otp';




const SIgnUpPage = lazy(()=>import("../Pages/User/SIgnupPage"))
const Home = lazy(()=> import("../Components/User/Home"))





function UserRoutes() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
          <Route element={<UserLayouts />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Route>




          <Route path="/register" element={<SIgnUpPage />} />
          <Route path="/otpVerify" element={<Otp />} /> 
        </Routes>
      </Suspense>
    </div>
  )
}

export default UserRoutes;



