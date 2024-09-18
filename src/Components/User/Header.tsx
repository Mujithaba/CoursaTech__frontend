import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import Logo from "/Logo/icon/SVG-Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logOut } from "../../redux/slices/authSlice";

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isBlock: boolean;
  isAdmin: boolean;
  isGoogle: boolean;
}

interface NavLinksProps {
  userInfo: UserInfo | null;
  mobile?: boolean;
  closeMenu?: () => void;
}

interface UserSectionProps {
  userInfo: UserInfo | null;
  handleLogout: () => void;
  navigate: (path: string) => void;
  mobile?: boolean;
}

function Header() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    try {
      dispatch(logOut());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header
      className={`fixed w-full z-50 mb-6 transition-all duration-300 ${
        scrolled ? "bg-gray-900 shadow-lg" : "bg-gray-600 "
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <div className="lg:hidden mr-4">
              <button
                onClick={toggleSideMenu}
                className={`${
                  scrolled ? "text-white" : "text-gray-900"
                } hover:text-gray-300 transition-colors`}
              >
                <FaBars size={24} />
              </button>
            </div>

            <Link to={userInfo ? "/home" : "/"} className="flex items-center">
              <img src={Logo} alt="Logo" className="h-16 w-auto " />
              {/* <span className={`ml-2 ${scrolled ? 'text-gray-900' : 'text-white'} md:text-xs font-semibold `}>CoursaTech</span> */}
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <NavLinks userInfo={userInfo} />
          </nav>

          <UserSection
            userInfo={userInfo}
            handleLogout={handleLogout}
            navigate={navigate}
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
            scrolled={scrolled}
          />
        </div>
      </div>

      {/* Side menu for mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 transform ${
          isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden z-50`}
      >
        <div className="p-6">
          <button
            onClick={toggleSideMenu}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <FaTimes size={24} />
          </button>
          <div className="mt-8">
            <NavLinks
              userInfo={userInfo}
              mobile
              closeMenu={() => setIsSideMenuOpen(false)}
            />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSideMenu}
        ></div>
      )}
    </header>
  );
}

const NavLinks: React.FC<NavLinksProps> = ({
  userInfo,
  mobile = false,
  closeMenu,
}) => {
  const location = useLocation();
  const linkClass = `relative ${mobile ? "block py-2" : ""}`;

  const links = [
    { to: userInfo ? "/home" : "/", label: "Home" },
    { to: userInfo ? "/coursePage" : "#", label: "Courses" },
    { to: userInfo ? "/aboutSection" : "/aboutSection", label: "About" },
    { to: userInfo ? "/contactus" : "/contactus", label: "Contact" },
  ];

  return (
    <div
      className={
        mobile ? "flex flex-col space-y-4" : "flex items-center space-x-8"
      }
    >
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.to}
          className={`${linkClass} ${
            location.pathname === link.to
              ? "text-white font-bold" // Color for active link
              : "text-white font-semibold hover:text-gray-300" // Default color and hover
          }`}
          onClick={closeMenu}
        >
          {link.label}
          {location.pathname === link.to && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div> // Indicator for active link
          )}
        </Link>
      ))}
    </div>
  );
};

const UserSection: React.FC<
  UserSectionProps & {
    toggleDropdown: () => void;
    isDropdownOpen: boolean;
    scrolled: boolean;
  }
> = ({
  userInfo,
  handleLogout,
  navigate,
  mobile = false,
  toggleDropdown,
  isDropdownOpen,
  scrolled,
}) => {
  const buttonClass =
    "px-4 py-2 rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors";

  if (userInfo) {
    return (
      <div className={`relative ${mobile ? "mt-4" : ""}`}>
        <button
          onClick={toggleDropdown}
          className={`flex items-center ${
            scrolled ? "text-gray-900" : "text-white"
          } hover:bg-gray-800 p-2 rounded-full transition-colors focus:outline-none ${
            location.pathname === "/userProfile"
              ? "text-white font-bold border p-2 rounded-full" // Color for active link
              : "text-white font-semibold hover:text-gray-300" // Default color and hover
          }`}
        >
          <BsPerson size={24} className="mr-2" />
          <span className="mr-1">{userInfo.name}</span>
          <FiChevronDown
            className={`transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* <div
          className={`absolute bottom-0 left-0 w-full h-0.5 ${
            location.pathname === "/userProfile"
              ? "bg-white" // Active route color
              : "bg-transparent" // Non-active route color
          }`}
        ></div> */}

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <button
              onClick={() => {
                navigate("/userProfile");
                toggleDropdown();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Profile
            </button>
            <button
              onClick={() => {
                handleLogout();
                toggleDropdown();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <button className={buttonClass} onClick={() => navigate("/login")}>
        Login
      </button>
    );
  }
};

export default Header;

// import React, { useState } from "react";
// import { Link, NavigateFunction, useNavigate } from "react-router-dom";
// import { BsPerson } from "react-icons/bs";
// import { FaBars, FaTimes } from "react-icons/fa";
// import Logo from "/Logo/icon/SVG-Logo.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { logOut } from "../../redux/slices/authSlice";

// interface UserInfo {
//   _id:string;
// name:string;
// email:string;
// isBlock:boolean;
// isAdmin:boolean;
// isGoogle:boolean;

// }

// interface NavLinksProps {
//   userInfo: UserInfo | null;
//   mobile?: boolean;
// }

// interface UserSectionProps {
//   userInfo: UserInfo | null;
//   handleLogout: () => void;
//   navigate: NavigateFunction;
//   mobile?: boolean;
// }

// function Header() {
//   const { userInfo } = useSelector((state: RootState) => state.auth);
//   const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     try {
//       dispatch(logOut());
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const toggleSideMenu = () => {
//     setIsSideMenuOpen(!isSideMenuOpen);
//   };

//   return (
//     <>
//       <div className="bg-gray-950 px-4 lg:px-14 py-4 flex justify-between items-center h-20">
//         <div className="flex items-center">
//           {/* Hamburger menu for smaller screens */}
//           <div className="lg:hidden mr-4">
//             <button onClick={toggleSideMenu} className="text-white">
//               <FaBars size={24} />
//             </button>
//           </div>

//           <Link to={userInfo ? "/home" : "/"}>
//             <img src={Logo} alt="Logo" className="h-16" />
//           </Link>
//         </div>

//         {/* Navigation for larger screens */}
//         <div className="hidden lg:flex items-center space-x-4">
//           <NavLinks userInfo={userInfo} />
//         </div>

//         <UserSection userInfo={userInfo} handleLogout={handleLogout} navigate={navigate} />
//       </div>

//       {/* Side menu */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-gray-900 transform ${
//           isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out lg:hidden z-50`}
//       >
//         <div className="p-4">
//           <button onClick={toggleSideMenu} className="text-white float-right">
//             <FaTimes size={24} />
//           </button>
//           <div className="mt-12">
//             <NavLinks userInfo={userInfo} mobile />
//           </div>
//         </div>
//       </div>

//       {/* Overlay */}
//       {isSideMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
//           onClick={toggleSideMenu}
//         ></div>
//       )}
//     </>
//   );
// }

// const NavLinks: React.FC<NavLinksProps> = ({ userInfo, mobile = false }) => {
//   const linkClass = `text-white hover:text-gray-300 ${mobile ? "block py-2" : "px-4"}`;
//   return (
//     <div className={mobile ? "flex flex-col" : "flex"}>
//       <Link  to={userInfo ? "/home" : "/"} className={linkClass}>
//         Home
//       </Link>
//       <Link to={userInfo ? "/coursePage" : "#"} className={linkClass}>
//         Courses
//       </Link>
//       <Link to="#" className={linkClass}>
//         About
//       </Link>
//       <Link to="#" className={linkClass}>
//         Contact
//       </Link>
//     </div>
//   );
// };

// const UserSection: React.FC<UserSectionProps> = ({ userInfo, handleLogout, navigate, mobile = false }) => {
//   const buttonClass = `border px-3 py-1 rounded-md text-white font-mono hover:bg-gray-700 ${
//     mobile ? "w-full mt-2" : "ms-2"
//   }`;

//   if (userInfo) {
//     return (
//       <div className={`flex items-center ${mobile ? "flex-col" : ""}`}>
//         <div className="flex items-center">
//           <BsPerson size={30} className="px-1 text-white" />
//           <p className="text-white text-s">{userInfo.name}</p>
//         </div>
//         <button className={buttonClass} onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     );
//   } else {
//     return (
//       <button className={buttonClass} onClick={() => navigate("/login")}>
//         Login
//       </button>
//     );
//   }
// };

// export default Header;

// // import React from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { BsPerson } from "react-icons/bs";
// // import { BiSearch } from "react-icons/bi";
// // import Logo from "/Logo/icon/SVG-Logo.svg";
// // import { useDispatch, useSelector } from "react-redux";
// // import { RootState } from "../../redux/store";
// // import { logOut } from "../../redux/slices/authSlice";

// // function Header() {
// //   const { userInfo } = useSelector((state: RootState) => state.auth);

// //   const navigate = useNavigate();
// //   const dispatch = useDispatch()

// //   const handleLogout =()=>{
// //     try {
// //       dispatch(logOut());
// //       navigate("/login");
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   }

// //   return (
// //     <div className=" flex bg-gray-950  justify-between items-center h-20 px-14 py-4  ">
// //       <div>
// //         {userInfo ? (
// //           <Link to={"/home"}>
// //             <img src={Logo} alt="" />
// //           </Link>
// //         ) : (
// //           <Link to={"/"}>
// //             <img src={Logo} alt="" />
// //           </Link>
// //         )}
// //       </div>
// //         {userInfo ? (
// //       <div className=" hidden md:flex ">
// //            <Link to={"/home"} className="text-white hover:text-gray-300 px-4">
// //            Home
// //          </Link>
// //          <Link to={"/coursePage"} className="text-white hover:text-gray-300 px-4">
// //            Courses
// //          </Link>
// //          <Link to={"#"} className="text-white hover:text-gray-300 px-4">
// //            About
// //          </Link>
// //          <Link to={"#"} className="text-white hover:text-gray-300 px-4">
// //            Contact
// //          </Link>
// //       </div>
// //         ):(
// //           <div className="hidden md:flex ">
// //            <Link to={"/"} className="text-white hover:text-gray-300 px-4">
// //            Home
// //          </Link>
// //          <Link to={"#"} className="text-white hover:text-gray-300 px-4">
// //            Courses
// //          </Link>
// //          <Link to={"#"} className="text-white hover:text-gray-300 px-4">
// //            About
// //          </Link>
// //          <Link to={"#"} className="text-white hover:text-gray-300 px-4">
// //            Contact
// //          </Link>
// //       </div>
// //         )}

// //       <div className="flex">
// //         {userInfo ? (
// //           <div className="flex items-center">

// //             <BsPerson size={30} className="px-1  text-white" />
// //             <p className="text-white text-s">{userInfo.name}</p>
// //         <button
// //             className=" border ms-2 px-3 py-1 rounded-md text-white font-mono hover:bg-gray-700"
// //             onClick={handleLogout}
// //           >
// //            Logout
// //           </button>

// //           </div>
// //         ) : (
// //           <button
// //             className=" border px-4 py-1 rounded-md text-white font-mono hover:bg-gray-700"
// //             onClick={() => navigate("/login")}
// //           >
// //             Login
// //           </button>
// //         )}
// //         {/* <BiSearch size={29} className="px-1  text-white" /> */}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Header;

// // // <div>
// // //    {/* Navbar */}
// // //    <nav className="bg-black shadow-md">
// // //         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
// // //             <a href="#" className="text-2xl font-bold text-gray-800">CoursaTech</a>
// // //             <div>
// // //                 <Link to={'#'} className="text-white hover:text-gray-600 px-3">Home</Link>
// // //                 <Link to={'#'} className="text-white hover:text-gray-600 px-3">Courses</Link>
// // //                 <Link to={'#'} className="text-white hover:text-gray-600 px-3">About</Link>
// // //                 <Link to={'#'}className="text-white hover:text-gray-600 px-3">Contact</Link>
// // //                 {/* <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">Sign Up</a> */}
// // //             </div>
// // //         </div>
// // //     </nav>
// // // </div>
