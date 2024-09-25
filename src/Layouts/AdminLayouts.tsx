import Hearder from "../Components/Admin/Header";
import SideBar from "../Components/Admin/SideBar";
import { Outlet } from "react-router-dom";

function AdminLayouts() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <div className="flex flex-col flex-1 ml-60">
        <Hearder />
        <main className="pt-6 ps-9 pe-3 pb-4 mb-3 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayouts;
