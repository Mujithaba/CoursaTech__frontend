import { Outlet } from "react-router-dom";
import TutorHearder from "../Components/Tutor/TutorHearder";
import TutorSideBar from "../Components/Tutor/TutorSideBar";

function TutorLayouts() {
  return (
    <div className="flex h-screen bg-gray-100  ">
      <TutorSideBar />
      <div className="flex flex-col flex-1 ml-60 ">
        {/* <TutorHearder  /> */}
        <main className="p-2 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default TutorLayouts;
