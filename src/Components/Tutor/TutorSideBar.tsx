import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/slices/tutorSlice";
import Logo from "/Logo/icon/SVG-Logo.svg";

import {
  HiOutlineLogout,
  HiOutlineCollection,
  HiOutlineChartSquareBar,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import { MdAssignment } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";

function TutorSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      dispatch(logOut());
      navigate("/tutor/tutorLogin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <aside className="bg-[#0a0e3c] m-1 text-white w-64 space-y-6 py-7 px-6 absolute inset-y-0 left-0 rounded-lg">
      <div className="text-2xl font-semibold flex justify-center">
        <img className="" src={Logo} alt="logo" />
      </div>
      <hr />
      <nav className="font-sans font-semibold ">
        <NavLink
          to="/tutor/tuturDashboard"
          className={({ isActive }) =>
            `flex items-center m-2 py-2.5 px-4 rounded-xl transition duration-200 ${
              isActive
                ? "bg-gray-300 justify-center text-black"
                : "hover:border text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <HiOutlineChartSquareBar
                size={isActive ? 13 : 20} // Change size based on isActive
                className="mr-2"
              />
              <span
                className={`transition-all duration-200 ${
                  isActive ? "text-sm" : "text-sm"
                }`}
              >
                Dashboard
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/tutor/createCourse"
          className={({ isActive }) =>
            `flex items-center py-2.5 m-2 px-4 rounded-xl transition duration-200 ${
              isActive
                ? "bg-gray-300 justify-center text-black"
                : "hover:border text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <HiOutlinePlusCircle
                size={isActive ? 13 : 20} // Change size based on isActive
                className="mr-2"
              />
              <span
                className={`transition-all duration-200 ${
                  isActive ? "text-sm" : "text-sm"
                }`}
              >
                Add Course
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/tutor/myCourses"
          className={({ isActive }) =>
            `flex items-center py-2.5 m-2 px-4 rounded-xl transition duration-200 ${
              isActive
                ? "bg-gray-300 justify-center text-black"
                : "hover:border text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <HiOutlineCollection
                size={isActive ? 13 : 20} // Change size based on isActive
                className="mr-2"
              />
              <span
                className={`transition-all duration-200 ${
                  isActive ? "text-sm" : "text-sm"
                }`}
              >
                My courses
              </span>
            </>
          )}
        </NavLink>

        {/* assignment navlink */}
        <NavLink
          to="/tutor/assignments"
          className={({ isActive }) =>
            ` flex items-center py-2.5 m-2 px-4 rounded-xl transition duration-200 ${
              isActive
                ? "bg-gray-300 justify-center text-black"
                : "hover:border text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <MdAssignment
                size={isActive ? 15 : 20} // Change size based on isActive
                className="mr-2"
              />
              <span
                className={`transition-all duration-200 ${
                  isActive ? "text-sm" : "text-sm"
                }`}
              >
                Assignments
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/tutor/chatList"
          className={({ isActive }) =>
            ` flex items-center py-2.5 m-2 px-4 rounded-xl transition duration-200 ${
              isActive
                ? "bg-gray-300 justify-center text-black"
                : "hover:border text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <LuMessagesSquare
                size={isActive ? 15 : 20} // Change size based on isActive
                className="mr-2"
              />
              <span
                className={`transition-all duration-200 ${
                  isActive ? "text-sm" : "text-sm"
                }`}
              >
                Chat List
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/tutor/tutorLogin"
          className={({ isActive }) =>
            `flex items-center  mt-11 m-2 py-2.5  px-4 rounded-xl transition duration-200 ${
              isActive
                ? "bg-gray-800 justify-center"
                : "hover:bg-red-900 border hover:opacity-90"
            }`
          }
          onClick={logoutHandler}
        >
          <HiOutlineLogout size={22} className="mr-2" />
          Logout
        </NavLink>
      </nav>
    </aside>
  );
}

export default TutorSideBar;
