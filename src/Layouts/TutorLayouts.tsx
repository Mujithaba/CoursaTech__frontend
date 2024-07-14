import { Outlet } from "react-router-dom";
import TutorHearder from "../Components/Tutor/TutorHearder";
import TutorSideBar from "../Components/Tutor/TutorSideBar";

function TutorLayouts() {
  return (
    <div>
        {/* header  */}
      <TutorHearder /> 

      <div className=" flex">
        
        {/* sideBar */}
        <div className="w-[16%]">
          <TutorSideBar />
        </div>

        {/* outlet */}
        <div className="w-[84%] mt-[73px]">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default TutorLayouts;
