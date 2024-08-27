import { Outlet, NavLink } from 'react-router-dom';
import { FaBook, FaFileAlt, FaComments, FaUser } from 'react-icons/fa';

export default function CourseDataLayouts() {
  return (
    <div>
      <div className="flex border-b ms-32">
        <NavLink
          to="curriculums"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 font-medium ${
              isActive ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'
            }`
          }
        >
          <FaBook className="mr-2" />
          Curriculum
        </NavLink>
        <NavLink
          to="assignmentsview"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 font-medium ${
              isActive ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'
            }`
          }
        >
          <FaFileAlt className="mr-2" />
          Assignments
        </NavLink>
        <NavLink
          to="instructorview"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 font-medium ${
              isActive ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'
            }`
          }
        >
          <FaUser className="mr-2" />
          Instructor
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 font-medium ${
              isActive ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'
            }`
          }
        >
          <FaComments className="mr-2" />
          Reviews
        </NavLink>
      </div>
     
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}