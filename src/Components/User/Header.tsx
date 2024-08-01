import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import Logo from "/Logo/icon/SVG-Logo.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function Header() {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  return (
    <div className="flex bg-gray-950  justify-between items-center h-20 px-14 ">
      <div>
        {userInfo ? (
          <Link to={"/home"}>
            <img src={Logo} alt="" />
          </Link>
        ) : (
          <Link to={"/"}>
            <img src={Logo} alt="" />
          </Link>
        )}
      </div>
        {userInfo ? (
      <div className=" hidden md:flex ">
           <Link to={"/home"} className="text-white hover:text-gray-300 px-4">
           Home
         </Link>
         <Link to={"#"} className="text-white hover:text-gray-300 px-4">
           Courses
         </Link>
         <Link to={"#"} className="text-white hover:text-gray-300 px-4">
           About
         </Link>
         <Link to={"#"} className="text-white hover:text-gray-300 px-4">
           Contact
         </Link>
      </div>
        ):(
          <div className="hidden md:flex ">
           <Link to={"/"} className="text-white hover:text-gray-300 px-4">
           Home
         </Link>
         <Link to={"#"} className="text-white hover:text-gray-300 px-4">
           Courses
         </Link>
         <Link to={"#"} className="text-white hover:text-gray-300 px-4">
           About
         </Link>
         <Link to={"#"} className="text-white hover:text-gray-300 px-4">
           Contact
         </Link>
      </div>  
        )}
       
      <div className="flex">
        {userInfo ? (
          <div className="flex items-center">
            <BsPerson size={30} className="px-1  text-white" />
            <p className="text-white text-s">{userInfo.name}</p>
          </div>
        ) : (
          <button
            className=" border px-4 py-1 rounded-md text-white font-mono hover:bg-gray-700"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
        {/* <BiSearch size={29} className="px-1  text-white" /> */}
      </div>
    </div>
  );
}

export default Header;

// <div>
//    {/* Navbar */}
//    <nav className="bg-black shadow-md">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//             <a href="#" className="text-2xl font-bold text-gray-800">CoursaTech</a>
//             <div>
//                 <Link to={'#'} className="text-white hover:text-gray-600 px-3">Home</Link>
//                 <Link to={'#'} className="text-white hover:text-gray-600 px-3">Courses</Link>
//                 <Link to={'#'} className="text-white hover:text-gray-600 px-3">About</Link>
//                 <Link to={'#'}className="text-white hover:text-gray-600 px-3">Contact</Link>
//                 {/* <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">Sign Up</a> */}
//             </div>
//         </div>
//     </nav>
// </div>
