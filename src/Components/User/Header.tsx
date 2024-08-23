import React, { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "/Logo/icon/SVG-Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logOut } from "../../redux/slices/authSlice";

interface UserInfo {
  _id:string;
name:string;
email:string;
isBlock:boolean;
isAdmin:boolean;
isGoogle:boolean;
  
}

interface NavLinksProps {
  userInfo: UserInfo | null;
  mobile?: boolean;
}

interface UserSectionProps {
  userInfo: UserInfo | null;
  handleLogout: () => void;
  navigate: NavigateFunction;
  mobile?: boolean;
}

function Header() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(logOut());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <>
      <div className="bg-gray-950 px-4 lg:px-14 py-4 flex justify-between items-center h-20">
        <div className="flex items-center">
          {/* Hamburger menu for smaller screens */}
          <div className="lg:hidden mr-4">
            <button onClick={toggleSideMenu} className="text-white">
              <FaBars size={24} />
            </button>
          </div>

          <Link to={userInfo ? "/home" : "/"}>
            <img src={Logo} alt="Logo" className="h-8" />
          </Link>
        </div>

        {/* Navigation for larger screens */}
        <div className="hidden lg:flex items-center space-x-4">
          <NavLinks userInfo={userInfo} />
        </div>

        <UserSection userInfo={userInfo} handleLogout={handleLogout} navigate={navigate} />
      </div>

      {/* Side menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 transform ${
          isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden z-50`}
      >
        <div className="p-4">
          <button onClick={toggleSideMenu} className="text-white float-right">
            <FaTimes size={24} />
          </button>
          <div className="mt-12">
            <NavLinks userInfo={userInfo} mobile />
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
    </>
  );
}

const NavLinks: React.FC<NavLinksProps> = ({ userInfo, mobile = false }) => {
  const linkClass = `text-white hover:text-gray-300 ${mobile ? "block py-2" : "px-4"}`;
  return (
    <div className={mobile ? "flex flex-col" : "flex"}>
      <Link  to={userInfo ? "/home" : "/"} className={linkClass}>
        Home
      </Link>
      <Link to={userInfo ? "/coursePage" : "#"} className={linkClass}>
        Courses
      </Link>
      <Link to="#" className={linkClass}>
        About
      </Link>
      <Link to="#" className={linkClass}>
        Contact
      </Link>
    </div>
  );
};

const UserSection: React.FC<UserSectionProps> = ({ userInfo, handleLogout, navigate, mobile = false }) => {
  const buttonClass = `border px-3 py-1 rounded-md text-white font-mono hover:bg-gray-700 ${
    mobile ? "w-full mt-2" : "ms-2"
  }`;

  if (userInfo) {
    return (
      <div className={`flex items-center ${mobile ? "flex-col" : ""}`}>
        <div className="flex items-center">
          <BsPerson size={30} className="px-1 text-white" />
          <p className="text-white text-s">{userInfo.name}</p>
        </div>
        <button className={buttonClass} onClick={handleLogout}>
          Logout
        </button>
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



















// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BsPerson } from "react-icons/bs";
// import { BiSearch } from "react-icons/bi";
// import Logo from "/Logo/icon/SVG-Logo.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { logOut } from "../../redux/slices/authSlice";

// function Header() {
//   const { userInfo } = useSelector((state: RootState) => state.auth);

//   const navigate = useNavigate();
//   const dispatch = useDispatch()

//   const handleLogout =()=>{
//     try {
//       dispatch(logOut());
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <div className=" flex bg-gray-950  justify-between items-center h-20 px-14 py-4  ">
//       <div>
//         {userInfo ? (
//           <Link to={"/home"}>
//             <img src={Logo} alt="" />
//           </Link>
//         ) : (
//           <Link to={"/"}>
//             <img src={Logo} alt="" />
//           </Link>
//         )}
//       </div>
//         {userInfo ? (
//       <div className=" hidden md:flex ">
//            <Link to={"/home"} className="text-white hover:text-gray-300 px-4">
//            Home
//          </Link>
//          <Link to={"/coursePage"} className="text-white hover:text-gray-300 px-4">
//            Courses
//          </Link>
//          <Link to={"#"} className="text-white hover:text-gray-300 px-4">
//            About
//          </Link>
//          <Link to={"#"} className="text-white hover:text-gray-300 px-4">
//            Contact
//          </Link>
//       </div>
//         ):(
//           <div className="hidden md:flex ">
//            <Link to={"/"} className="text-white hover:text-gray-300 px-4">
//            Home
//          </Link>
//          <Link to={"#"} className="text-white hover:text-gray-300 px-4">
//            Courses
//          </Link>
//          <Link to={"#"} className="text-white hover:text-gray-300 px-4">
//            About
//          </Link>
//          <Link to={"#"} className="text-white hover:text-gray-300 px-4">
//            Contact
//          </Link>
//       </div>  
//         )}
       
//       <div className="flex">
//         {userInfo ? (
//           <div className="flex items-center">

//             <BsPerson size={30} className="px-1  text-white" />
//             <p className="text-white text-s">{userInfo.name}</p>
//         <button
//             className=" border ms-2 px-3 py-1 rounded-md text-white font-mono hover:bg-gray-700"
//             onClick={handleLogout}
//           >
//            Logout
//           </button>

//           </div>
//         ) : (
//           <button
//             className=" border px-4 py-1 rounded-md text-white font-mono hover:bg-gray-700"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </button>
//         )}
//         {/* <BiSearch size={29} className="px-1  text-white" /> */}
//       </div>
//     </div>
//   );
// }

// export default Header;

// // <div>
// //    {/* Navbar */}
// //    <nav className="bg-black shadow-md">
// //         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
// //             <a href="#" className="text-2xl font-bold text-gray-800">CoursaTech</a>
// //             <div>
// //                 <Link to={'#'} className="text-white hover:text-gray-600 px-3">Home</Link>
// //                 <Link to={'#'} className="text-white hover:text-gray-600 px-3">Courses</Link>
// //                 <Link to={'#'} className="text-white hover:text-gray-600 px-3">About</Link>
// //                 <Link to={'#'}className="text-white hover:text-gray-600 px-3">Contact</Link>
// //                 {/* <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">Sign Up</a> */}
// //             </div>
// //         </div>
// //     </nav>
// // </div>
