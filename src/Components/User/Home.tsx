import React, { useEffect, useState } from "react";
import s from "/Logo/images/ai-generated-8309926_1280.jpg";
import course from "/Logo/images/otp-backgroud-image.jpg";
import becomeTutor from "/Logo/images/pexels-george-milton-6954188.jpg";
import Tutor from "/Logo/images/pexels-hasibullah-zhowandai-248954-819530.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import { homePageData } from "../../api/user";

interface User {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
}

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  const logoutHandler = async () => {
    try {
      dispatch(logOut());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const fetchHomeData = async () => {
    try {
      if (userInfo) {
        console.log(userInfo._id, "jjjj");

        const response = await homePageData(userInfo._id);
        console.log(response, "home response");
        if (response.data.data) {
          if (response.data.data.isBlocked) {
            dispatch(logOut());
            navigate("/login");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <div className="bg-gray-100 ">
      <div className="  px-6 py-12 flex flex-col md:flex-row rounded items-center bg-green-100">
        <section className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Our E-Learning Platform
            </h1>
            <p className="text-xl mb-2">
              Enhance your skills with the best online courses
            </p>
            <h2 className="text-xl font-bold mb-4">Learn from the Best</h2>
            <p className="text-gray-600 mb-4">
              Join our platform and get access to top-notch courses that will
              help you grow your skills and advance your career.
            </p>
            {/* <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">Sign Up</a> */}
            {userInfo ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
                onClick={logoutHandler}
              >
                logout
              </button>
            ) : (
              <Link
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
                to="/register"
              >
                Sign Up
              </Link>
            )}
          </div>
          <div className="md:w-1/2">
            <img src={s} alt="Learning" className="rounded" />
          </div>
        </section>
      </div>
      {/* Container hero Section */}

      {/* Popular Courses Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">
          Popular Available Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded shadow-md  hover:bg-green-100">
            <img src={course} alt="Course" className="mb-4 rounded" />
            <h3 className="text-xl font-bold mb-2">Course Title</h3>
            <p className="text-gray-600 mb-4">
              Short description of the course.
            </p>
            <p className="text-gray-600 ">★★★★★</p>
            <a href="#" className="text-blue-500 hover:underline">
              Learn More
            </a>
          </div>
          <div className="bg-white p-6 rounded shadow-md  hover:bg-green-100">
            <img src={course} alt="Course" className="mb-4 rounded" />
            <h3 className="text-xl font-bold mb-2">Course Title</h3>
            <p className="text-gray-600 mb-4">
              Short description of the course.
            </p>
            <p className="text-gray-600 ">★★★★★</p>
            <a href="#" className="text-blue-500 hover:underline">
              Learn More
            </a>
          </div>
          <div className="bg-white p-6 rounded shadow-md  hover:bg-green-100">
            <img src={course} alt="Course" className="mb-4 rounded" />
            <h3 className="text-xl font-bold mb-2">Course Title</h3>
            <p className="text-gray-600 mb-4">
              Short description of the course.
            </p>
            <p className="text-gray-600 ">★★★★★</p>
            <a href="#" className="text-blue-500 hover:underline">
              Learn More
            </a>
          </div>
          <div className="bg-white p-6 rounded shadow-md  hover:bg-green-100">
            <img src={course} alt="Course" className="mb-4 rounded" />
            <h3 className="text-xl font-bold mb-2">Course Title</h3>
            <p className="text-gray-600 mb-4">
              Short description of the course.
            </p>
            <p className="text-gray-600 ">★★★★★</p>
            <a href="#" className="text-blue-500 hover:underline">
              Learn More
            </a>
          </div>
          {/* Repeat similar blocks for more courses */}
        </div>
      </section>

      {/* Main Section */}
      <section className="container mx-auto px-6 py-12 flex flex-col md:flex-row rounded items-center bg-green-100">
        <div className="md:w-1/2 ">
          <img
            src={becomeTutor}
            alt="Main Content"
            className="rounded"
            style={{ width: "500px", height: "500px" }}
          />
        </div>
        <div className="md:w-1/2 md:ml-6 mt-6 md:mt-0">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 mb-4">
            We provide high-quality courses with industry experts to help you
            achieve your goals.
          </p>
        </div>
      </section>

      {/* Top Instructor of the Month */}
      <section className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Top Instructor of the Month</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-10">
            <div className="bg-white p-6 rounded shadow-md">
              <img
                src={Tutor}
                alt="Instructor"
                className="rounded-full mb-4 mx-auto w-24 h-24"
              />
              <h3 className="text-xl font-bold mb-2">Instructor Name</h3>
              <p className="text-gray-600 mb-4">★★★★★</p>
            </div>
          </div>
          <div className="p-10">
            <div className="bg-white p-6 rounded shadow-md">
              <img
                src={Tutor}
                alt="Instructor"
                className="rounded-full mb-4 mx-auto w-24 h-24"
              />
              <h3 className="text-xl font-bold mb-2">Instructor Name</h3>
              <p className="text-gray-600 mb-4">★★★★★</p>
            </div>
          </div>
          <div className="p-10">
            <div className="bg-white p-6 rounded shadow-md">
              <img
                src={Tutor}
                alt="Instructor"
                className="rounded-full mb-4 mx-auto w-24 h-24"
              />
              <h3 className="text-xl font-bold mb-2">Instructor Name</h3>
              <p className="text-gray-600 mb-4">★★★★★</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
