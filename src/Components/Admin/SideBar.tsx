import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { adminLogout } from "../../redux/slices/adminSlice";
import Logo from "/Logo/icon/SVG-Logo.svg";
import {
  HiOutlineLogout,
  HiOutlineCollection,
  HiOutlineChartSquareBar,
} from "react-icons/hi";
import { GoReport } from "react-icons/go";
import { TbCategoryPlus } from "react-icons/tb";
import { GiTeacher } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";

function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // logout function
  const logoutHandler = async () => {
    try {
      dispatch(adminLogout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <aside className="bg-teal-900 m-3 text-white w-64 space-y-6 py-7 px-6 absolute inset-y-0 left-0 rounded-lg">
      <div className="text-2xl font-semibold flex justify-center">
        <img className="" src={Logo} alt="logo" />
      </div>
      <hr />

      <nav className="font-sans font-semibold ">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center m-2 py-2.5 px-4 rounded-xl transition duration-200 ${
              isActive ? "bg-gray-800 justify-center" : "hover:bg-gray-800"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <HiOutlineChartSquareBar
                size={isActive ? 13 : 20}
                className="mr-2"
              />
              <span
                className={`transition-all duration-200 ${
                  isActive ? "text-sm" : "font-mono"
                }`}
              >
                Dashboard
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/admin/usersList"
          className={({ isActive }) =>
            `flex items-center py-2.5 m-2 px-4 rounded-xl transition duration-200 ${
              isActive ? "bg-gray-800 justify-center" : "hover:bg-gray-800"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <FaUsers
                size={isActive ? 13 : 20} 
                className="mr-2"
              />
              <span
                className={`transition-all duration-200 ${
                  isActive ? "text-sm" : "font-mono"
                }`}
              >
                Users
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/admin/tutorsList"
          className={({ isActive }) =>
            `flex items-center py-2.5 m-2 px-4 rounded-xl transition duration-200 ${
              isActive ? "bg-gray-800 justify-center" : "hover:bg-gray-800"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <GiTeacher
                size={isActive ? 13 : 20} 
                className="mr-2"
              />
              <span
                className={`transition-all duration-200 ${
                  isActive ? "text-sm" : "text-sm"
                }`}
              >
                Instructors
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/coursesList"
          className={({ isActive }) =>
            `flex items-center py-2.5 m-2 px-4 rounded-xl transition duration-200 ${
              isActive ? "bg-gray-800 justify-center" : "hover:bg-gray-800"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <HiOutlineCollection
                size={isActive ? 13 : 20} 
                className="mr-2"
              />
              <span
                className={`transition-all duration-200 ${
                  isActive ? "text-sm" : "font-mono"
                }`}
              >
                Cousrse List
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `flex items-center py-2.5 m-2 px-4 rounded-xl transition duration-200 ${
              isActive ? "bg-gray-800 justify-center" : "hover:bg-gray-800"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <TbCategoryPlus
                size={isActive ? 16 : 20} 
                className="mr-2"
              />
              <span
                className={`transition-all duration-200 ${
                  isActive ? "text-sm" : "font-mono"
                }`}
              >
                Category
              </span>
            </>
          )}
        </NavLink>
        {/* /reportedCourses */}
        <NavLink
          to="/admin/reportedCourses"
          className={({ isActive }) =>
            `flex items-center py-2.5 m-2 px-4 rounded-xl transition duration-200 ${
              isActive ? "bg-gray-800 justify-center" : "hover:bg-gray-800"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <GoReport
                size={isActive ? 18 : 20} 
                className="mr-2"
              />
              <span
                className={`transition-all duration-200 ${
                  isActive ? "text-sm" : "font-mono"
                }`}
              >
                Reports
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            `flex items-center mt-11 py-2.5 m-2 px-4 rounded-xl transition duration-200 ${
              isActive
                ? "bg-gray-800 justify-center"
                : "hover:bg-red-900 border border-gray-900 hover:border-0 hover:opacity-90"
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

export default SideBar;
