import React from 'react'
import { CgProfile } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../redux/store';

 function TutorHearder() {

  const {tutorInfo} = useSelector((state:RootState)=>state.tutorAuth)


  return (
    <header className="bg-[#0a0e3c]  text-white flex justify-between items-center p-4 mt-1 ms-6 me-1 rounded-lg">
    <div className="text-xl  font-bold"></div>
    <div className="flex items-center">
      <div className="relative">
        
        {/* <button className="relative z-10 block rounded-md bg-gray-800 p-2 focus:outline-none">
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M3 12h18m-7 6h7"></path>
          </svg>
        </button> */}

<NavLink
          to="/tutor/instructorProfile"
          className={({ isActive }) =>
            `  flex items-center py-2.5 hover:border rounded-full  px-4  transition duration-200 ${
              isActive
                ? "border justify-center rounded-full text-white"
                : "hover:border text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <CgProfile
              className='mr-2'
                size={isActive ? 17 : 20} // Change size based on isActive
                //  
              />
              <span
                className={` transition-all duration-200 ${
                  isActive ? "text-sm" : "text-sm"
                }`}
              >
                  {tutorInfo.name}
              </span>
            </>
          )}
        </NavLink>

        <div className="absolute right-0 z-20 mt-2 w-48 bg-white rounded-md shadow-xl">
          
        </div>
      </div>
    </div>
  </header>
  )
}
export default TutorHearder;