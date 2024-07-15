import React from 'react'
import Hearder from '../Components/Admin/Header';
import SideBar from '../Components/Admin/SideBar';
import { Outlet } from 'react-router-dom';

 function AdminLayouts() {
  return (
    <div className="flex h-screen bg-gray-100">
     <SideBar />
      <div className="flex flex-col flex-1 ml-64">
        
        <Hearder />
        <main className="p-6">
          
          <Outlet />
        </main>
      </div>
    </div>
);
}

export default AdminLayouts;
