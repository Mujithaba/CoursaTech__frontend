import React from 'react';

export default function UserProfile() {
  return (
    <>
    <div className="w-full h-24 bg-gray-100"></div>
   
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300 p-4">
        {/* User Profile */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            className="w-24 h-24 rounded-full mb-2"
          />
          <h2 className="text-xl font-semibold">Zohar Zain</h2>
          <p className="text-gray-500">admin@course.com</p>
        </div>

        {/* Menu Items */}
        <ul className="space-y-2">
          {['Edit Profile', 'Available Course', 'Payment History', 'Messages', 'Assignments', 'Notifications'].map((item) => (
            <li key={item}>
              <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none">
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h2 className="text-2xl font-semibold mb-4">Available Course</h2>

        {/* Courses List */}
        <div className="space-y-4">
          {['React.js', 'Node.js', 'React.js', 'Node.js'].map((course, index) => (
            <div
              key={index}
              className="flex items-center bg-white rounded-lg p-4 shadow-md"
            >
              {/* Course Icon */}
              <div className="flex-shrink-0 mr-4">
                {course === 'React.js' ? (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                    alt="React"
                    className="w-12 h-12"
                  />
                ) : (
                  <img
                    src="https://nodejs.org/static/images/logo.svg"
                    alt="Node"
                    className="w-12 h-12"
                  />
                )}
              </div>

              {/* Course Details */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{course}</h3>
                <p className="text-sm text-gray-500">13 Lessons</p>
              </div>

              {/* Course Rating */}
              <div className="flex items-center ml-auto">
                <span className="bg-yellow-500 text-white rounded-full px-3 py-1 text-sm flex items-center">
                  4.9
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  
    </>
  );
}
