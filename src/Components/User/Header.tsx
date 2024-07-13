import React from 'react'

function Header() {
  return (
    <div>
       {/* Navbar */}
       <nav className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" className="text-2xl font-bold text-gray-800">E-Learning</a>
                <div>
                    <a href="#" className="text-gray-800 hover:text-gray-600 px-3">Home</a>
                    <a href="#" className="text-gray-800 hover:text-gray-600 px-3">Courses</a>
                    <a href="#" className="text-gray-800 hover:text-gray-600 px-3">About</a>
                    <a href="#" className="text-gray-800 hover:text-gray-600 px-3">Contact</a>
                    <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">Sign Up</a>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Header
