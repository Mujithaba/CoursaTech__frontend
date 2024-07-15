import { Outlet } from "react-router-dom";
import TutorHearder from "../Components/Tutor/TutorHearder";
import TutorSideBar from "../Components/Tutor/TutorSideBar";

function TutorLayouts() {
  return (
    <div className="flex h-screen bg-gray-100">
      <TutorSideBar />
      <div className="flex flex-col flex-1 ml-64">
        <TutorHearder />
        <main className="p-6">
          
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default TutorLayouts;
