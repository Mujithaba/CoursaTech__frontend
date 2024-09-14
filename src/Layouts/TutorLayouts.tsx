import { Outlet } from "react-router-dom";
import TutorHearder from "../Components/Tutor/TutorHearder";
import TutorSideBar from "../Components/Tutor/TutorSideBar";

function TutorLayouts() {
  return (
    <div className="flex h-screen bg-card  ">
      <TutorSideBar />
      <div className="flex flex-col flex-1 ml-60 ">
        <TutorHearder  />
        <main className="pt-3 ps-7  pb-4 mb-3 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default TutorLayouts;
