import React from 'react'

 function TutorHearder() {
  return (
    <header className="bg-gray-800 text-white flex justify-between items-center p-4">
    <div className="text-xl  font-bold"></div>
    <div className="flex items-center">
      <input 
        type="text" 
        placeholder="Search..." 
        className="bg-gray-700 text-white rounded-lg p-2 mr-4"
      />
      <div className="relative">
        <button className="relative z-10 block rounded-md bg-gray-800 p-2 focus:outline-none">
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M3 12h18m-7 6h7"></path>
          </svg>
        </button>
        <div className="absolute right-0 z-20 mt-2 w-48 bg-white rounded-md shadow-xl">
          
        </div>
      </div>
    </div>
  </header>
  )
}
export default TutorHearder;