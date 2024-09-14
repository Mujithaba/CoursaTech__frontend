import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CardUi from "../../Components/Ui/User/Course/Card";
import coverImage from "../../../public/Logo/images/Untitled design (2).png";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { ICourse } from "../../services/types";
import { getCourses, getRatings } from "../../api/user";
import Pagination from "../../Components/Common/Pagination";

export interface CourseRating {
  _id: string;
  title: string;
  averageRating: number;
  totalReviews: number;
}

export default function Courses() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [ratings, setRatings] = useState<CourseRating[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage] = useState<number>(2);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    getAllCourses();
    getAllRatings();
  }, [currentPage, searchTerm, filterCategory]);

  // fetching ratings
  const getAllRatings = async () => {
    try {
      const response = await getRatings();

      if (response) {
        setRatings(response.getRate)
      } else {
      }
    } catch (error) {
      console.error("Error fetching the rating:", error);
      setRatings([]);
    }
  };

  console.log(ratings,"ooppoooppoooppooiiiuuu");
  
  // Fetching courses
  const getAllCourses = async () => {
    try {
      const response = await getCourses(currentPage, itemsPerPage);
      console.log(response, "luuuuu");

      if (response && response.getCourses) {
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(event.target.value);
  };

  const handlePaginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const findRatingForCourse = (courseId:string)=>{
    const rating = ratings.find((r)=>r._id === courseId);
    return rating ? rating.averageRating : 0
  }

  return (
    <>
      <div className="bg-gray-200 min-h-screen p-4 sm:p-6 lg:p-8 ">
        <motion.div
          className="relative flex items-center justify-center bg-pink-900 p-4 rounded-lg shadow-md overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background image */}
          <img
            className="absolute inset-0 bg-gray-900 h-full w-full object-cover"
            src={coverImage}
            alt="Cover Image"
          />

          {/* Content */}
          <motion.div
            className="relative z-10 max-w-4xl w-full bg-black/50 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg m-4 lg:m-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-lg sm:text-xl lg:text-2xl text-white font-sans font-semibold mb-2">
              Take the first step,
              <span className="block text-sm sm:text-base">
                to learn with us
              </span>
            </h1>

            {/* Search and Filter Section */}
            <div className="w-full flex flex-col sm:flex-row gap-4 mb-6">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search courses"
                className="text-black p-2 rounded-lg border-2 border-black w-full sm:w-auto"
              />
              <select
                value={filterCategory}
                onChange={handleFilterChange}
                className="text-black p-2 rounded-lg border-2 border-black w-full sm:w-auto"
              >
                <option value="">All Categories</option>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                {/* Add more categories as needed */}
              </select>
            </div>

            {!userInfo && (
              <motion.button
                className="mt-6 border border-black px-4 py-2 rounded-md text-white font-mono hover:bg-gray-700"
                onClick={() => navigate("/login")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Login
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        {/* Course Grid */}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
               <CardUi 
               data={course} 
               ratings={{ 
                 averageRating: findRatingForCourse(course._id as string), 
                 totalRatings: ratings.find((r) => r._id === course._id)?.totalReviews || 0 
               }} 
             />
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
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

// import React, { useEffect, useState } from "react";
// import CardUi from "../../Components/Ui/User/Course/Card";
// import coverImage from "../../../public/Logo/images/Untitled design (2).png";
// import { useNavigate } from "react-router-dom";
// import { RootState } from "../../redux/store";
// import { useSelector } from "react-redux";
// import { ICourse } from "../../services/types";
// import { getCourses } from "../../api/user";
// import Pagination from "../../Components/Common/Pagination";

// export default function Courses() {
//   const { userInfo } = useSelector((state: RootState) => state.auth);
//   const [courses, setCourses] = useState<ICourse[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalItems, setTotalItems] = useState<number>(0);
//   const [itemsPerPage] = useState<number>(2);

//   const navigate = useNavigate();

//   useEffect(() => {
//     getAllCourses();
//   }, [currentPage]);
//   console.log(courses, "get course userside");

//   // getting course
//   const getAllCourses = async () => {
//     try {
//       const response = await getCourses(currentPage, itemsPerPage);
//       console.log(response, "luuuuu");

//       if (response && response.getCourses) {
//         console.log(response.getCourses, "getInstructorCourses");
//         setCourses(response.getCourses);
//         setTotalItems(response.totalItems);
//       } else {
//         console.error("No courses data in the response");
//         setCourses([]);
//       }
//     } catch (error) {
//       console.error("Error fetching the courses:", error);
//       setCourses([]);
//     }
//   };

//   const handlePaginate = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   //   const variant = "outlined";
//   return (
//     <>
//       <div className="bg-gray-700 h-[880px] ">
//         <div className="relative flex items-center justify-center    bg-pink-900 p-4 rounded-lg shadow-md  ">
//           {/* Background image */}

//           <img
//             className="absolute bg-gray-900 h-full w-full object-cover "
//             src={coverImage}
//             alt=""
//           />

//           {/* Content */}
//           <div className="relative m-24 z-10 max-w-4xl w-full bg-black/50 p-8 rounded-lg shadow-lg">
//             <h1 className="text-xl  flte text-card font-sans font-semibold mb-2">
//               Take the first step,
//               <span className="text-sm">to learn with us</span>
//             </h1>
//             <div className="w-full flex flex-col gap-4 mb-6 ">
//               {/* <div className="flex w-full  flex-wrap md:flex-nowrap gap-4 mb-6">
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   className="text-black p-2 rounded-lg border-2 w-full border-black"
//                 />
//                 <button className=" bg-white p-2 rounded-md">
//                   <FaSearch size={20} className="bg-white" />
//                 </button>
//               </div> */}
//             </div>

//             {!userInfo && (
//               <button
//                 className="mt-10 border border-black px-4 py-1 rounded-md text-black font-mono hover:bg-gray-700"
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </button>
//             )}
//           </div>
//         </div>

//         <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
//           {courses.map((course) => (
//             <CardUi key={course._id} data={course} />
//           ))}
//         </div>

//         <Pagination
//           itemsPerPage={itemsPerPage}
//           totalItems={totalItems}
//           paginate={handlePaginate}
//           currentPage={currentPage}
//         />
//       </div>
//     </>
//   );
// }
