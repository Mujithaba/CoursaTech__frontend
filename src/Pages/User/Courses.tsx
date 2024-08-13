import React from "react";
import CardUi from "../../Components/Ui/User/Course/Card";
import coverImage from "../../../public/Logo/images/Untitled design (2).png";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

export default function Courses() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  //   const variant = "outlined";
  return (
    <>
      <div className=" ">
        <div className="relative flex items-center justify-center    bg-pink-900 p-4 rounded-lg shadow-md">
          {/* Background image */}

          <img
            className="absolute bg-white h-full w-full object-cover "
            src={coverImage}
            alt=""
          />

          {/* Content */}
          <div className="relative m-24 z-10 max-w-4xl w-full bg-black/50 p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl text-black font-bold ">
              Take the first step,
              <span className="text-lg">to learn with us</span>
            </h1>
            <div className="w-full flex flex-col gap-4 mb-6 ">
              <div className="flex w-full  flex-wrap md:flex-nowrap gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search"
                  className="text-black p-2 rounded-lg border-2 w-full border-black"
                />
                <button className="pt-2 pb-2 bg-white">
                  <FaSearch size={20} className="bg-white" />
                </button>
              </div>
            </div>
            
            {!userInfo && (
              <button
                className="mt-10 border border-black px-4 py-1 rounded-md text-black font-mono hover:bg-gray-700"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </div>
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            <button onClick={()=>navigate('/Courseview')}>

          <CardUi />
            </button>
          <CardUi />
          <CardUi />
          <CardUi />
          <CardUi />
          <CardUi />
          <CardUi />
        </div>
      </div>
    </>
  );
}
