import React, { useEffect, useState } from "react";
import CardUi from "../../Components/Ui/User/Course/Card";
import coverImage from "../../../public/Logo/images/Untitled design (2).png";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { ICourse } from "../../services/types";
import { getCourses } from "../../api/user";
import Pagination from "../../Components/Common/Pagination";

export default function Courses() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage] = useState<number>(2);

  const navigate = useNavigate();

  useEffect(() => {
    getAllCourses();
  }, [currentPage]);
  console.log(courses, "get course userside");

  // getting course
  const getAllCourses = async () => {
    try {
      const response = await getCourses(currentPage, itemsPerPage);
      console.log(response, "luuuuu");

      if (response && response.getCourses) {
        console.log(response.getCourses, "getInstructorCourses");
        setCourses(response.getCourses);
        setTotalItems(response.totalItems);
      } else {
        console.error("No courses data in the response");
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching the courses:", error);
      setCourses([]);
    }
  };

  const handlePaginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  //   const variant = "outlined";
  return (
    <>
      <div className="bg-gray-700 h-[880px] ">
        <div className="relative flex items-center justify-center    bg-pink-900 p-4 rounded-lg shadow-md  ">
          {/* Background image */}

          <img
            className="absolute bg-white h-full w-full object-cover "
            src={coverImage}
            alt=""
          />

          {/* Content */}
          <div className="relative m-24 z-10 max-w-4xl w-full bg-black/50 p-8 rounded-lg shadow-lg">
            <h1 className="text-xl  text-card font-sans font-semibold mb-2">
              Take the first step,
              <span className="text-sm">to learn with us</span>
            </h1>
            <div className="w-full flex flex-col gap-4 mb-6 ">
              <div className="flex w-full  flex-wrap md:flex-nowrap gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search"
                  className="text-black p-2 rounded-lg border-2 w-full border-black"
                />
                <button className=" bg-white p-2 rounded-md">
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

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {courses.map((course) => (
            <CardUi key={course._id} data={course} />
          ))}
        </div>

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          paginate={handlePaginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}
