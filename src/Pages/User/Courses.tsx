import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import coverImage from "/Logo/images/Untitled design (2).png";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { categoryData, getCourses, getRatings } from "../../api/user";
import Pagination from "../../Components/Common/Pagination";
import { FaSearch } from "react-icons/fa";
import CourseCard from "../../Components/Ui/User/Course/Card";

// Types
interface ICourse {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnailSignedUrl?: string;
  category_id: {
    categoryName: string;
  };
}

interface CourseRating {
  _id: string;
  title: string;
  averageRating: number;
  totalReviews: number;
}

interface ICategory {
  _id: string;
  categoryName: string;
  is_listed?: boolean;
}

// Skeleton Component
const SkeletonCard: React.FC = () => {
  return (
    <div className="w-full flex justify-center mb-3 mt-3">
      <div className="w-[300px] rounded-md overflow-hidden relative p-4 bg-white">
        <div className="h-[150px] bg-gray-200 rounded-md animate-pulse" />
        <div className="h-[170px] w-full mt-2 flex flex-col justify-between m-1">
          <div className="flex justify-between">
            <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
          </div>
          <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse mt-2" />
          <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse mt-2" />
          <div className="flex justify-between mt-2">
            <div className="h-6 w-16 bg-gray-200 rounded-md animate-pulse" />
            <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Courses() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [ratings, setRatings] = useState<CourseRating[]>([]);
  const [categoriesFetch, setCategoriesFetch] = useState<ICategory[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, [currentPage, searchTerm, filterCategory]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([getAllCourses(), getAllRatings(), categoryDetail()]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllRatings = async () => {
    try {
      const response = await getRatings();
      if (response) {
        setRatings(response.getRate);
      }
    } catch (error) {
      console.error("Error fetching the rating:", error);
      setRatings([]);
    }
  };

  const getAllCourses = async () => {
    try {
      const response = await getCourses(
        currentPage,
        itemsPerPage,
        searchTerm,
        filterCategory
      );
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

  const categoryDetail = async () => {
    try {
      const { getCateData } = await categoryData();
      setCategoriesFetch(getCateData);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(event.target.value);
    setCurrentPage(1);
  };

  const handlePaginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const findRatingForCourse = (courseId: string) => {
    const rating = ratings.find((r) => r._id === courseId);
    return rating ? rating.averageRating : 1.0;
  };

  return (
    <>
      <div className="w-full h-20 bg-red-200"></div>
      <div className="bg-gray-200 min-h-screen p-4 sm:p-6 lg:p-8">
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
              <div className="relative w-full sm:w-auto">
                <FaSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search courses"
                  className="pl-10 text-black p-2 rounded-lg border-2 border-black w-full sm:w-auto"
                />
              </div>
              <select
                value={filterCategory}
                onChange={handleFilterChange}
                className="text-black p-2 rounded-lg border-2 border-black w-full sm:w-auto"
              >
                <option value="">All Categories</option>
                {categoriesFetch.map((category) => (
                  <option key={category._id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
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

        {/* Course Grid with Skeleton Loading */}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading ? (
            // Show skeleton cards while loading
            Array(8)
              .fill(0)
              .map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <SkeletonCard />
                </motion.div>
              ))
          ) : courses.length > 0 ? (
            // Show actual course cards when data is loaded
            courses.map((course) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <CourseCard
                  data={course}
                  ratings={{
                    averageRating: findRatingForCourse(course._id as string),
                    totalRatings: ratings?.length || 0,
                  }}
                />
              </motion.div>
            ))
          ) : (
            // Show message if no courses are found
            <div className="text-center col-span-full">
              <p className="text-lg text-gray-700 font-medium">
                No courses found. Try a different search or category.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <Pagination
            itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        paginate={handlePaginate}
                        currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
}





















// // Courses.tsx
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// import coverImage from "/Logo/images/Untitled design (2).png";
// import { useNavigate } from "react-router-dom";
// import { RootState } from "../../redux/store";
// import { useSelector } from "react-redux";
// import { categoryData, getCourses, getRatings } from "../../api/user";
// import Pagination from "../../Components/Common/Pagination";
// import { FaSearch } from "react-icons/fa";
// import CourseCard from "../../Components/Ui/User/Course/Card";

// // Types
// interface ICourse {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   thumbnailSignedUrl?: string;
//   category_id: {
//     categoryName: string;
//   };
// }

// interface CourseRating {
//   _id: string;
//   title: string;
//   averageRating: number;
//   totalReviews: number;
// }

// interface ICategory {
//   _id: string;
//   categoryName: string;
//   is_listed?: boolean;
// }

// // Skeleton Component
// const SkeletonCard: React.FC = () => {
//   return (
//     <div className="w-full flex justify-center mb-3 mt-3">
//       <div className="w-[300px] rounded-md overflow-hidden relative p-4 bg-white">
//         <div className="h-[150px] bg-gray-200 rounded-md animate-pulse" />
//         <div className="h-[170px] w-full mt-2 flex flex-col justify-between m-1">
//           <div className="flex justify-between">
//             <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
//             <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
//           </div>
//           <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse mt-2" />
//           <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse mt-2" />
//           <div className="flex justify-between mt-2">
//             <div className="h-6 w-16 bg-gray-200 rounded-md animate-pulse" />
//             <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function Courses() {
//   const { userInfo } = useSelector((state: RootState) => state.auth);
//   const [courses, setCourses] = useState<ICourse[]>([]);
//   const [ratings, setRatings] = useState<CourseRating[]>([]);
//   const [categoriesFetch, setCategoriesFetch] = useState<ICategory[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalItems, setTotalItems] = useState<number>(0);
//   const [itemsPerPage] = useState<number>(5);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [filterCategory, setFilterCategory] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const navigate = useNavigate();

//   useEffect(() => {
//     loadData();
//   }, [currentPage, searchTerm, filterCategory]);

//   const loadData = async () => {
//     setIsLoading(true);
//     try {
//       await Promise.all([getAllCourses(), getAllRatings(), categoryDetail()]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getAllRatings = async () => {
//     try {
//       const response = await getRatings();
//       if (response) {
//         setRatings(response.getRate);
//       }
//     } catch (error) {
//       console.error("Error fetching the rating:", error);
//       setRatings([]);
//     }
//   };

//   const getAllCourses = async () => {
//     try {
//       const response = await getCourses(
//         currentPage,
//         itemsPerPage,
//         searchTerm,
//         filterCategory
//       );
//       if (response && response.getCourses) {
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

//   const categoryDetail = async () => {
//     try {
//       const { getCateData } = await categoryData();
//       setCategoriesFetch(getCateData);
//     } catch (error) {
//       console.error("Error fetching category:", error);
//     }
//   };

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1);
//   };

//   const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setFilterCategory(event.target.value);
//     setCurrentPage(1);
//   };

//   const handlePaginate = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   const findRatingForCourse = (courseId: string) => {
//     const rating = ratings.find((r) => r._id === courseId);
//     return rating ? rating.averageRating : 1.0;
//   };

//   return (
//     <>
//       <div className="w-full h-20 bg-red-200"></div>
//       <div className="bg-gray-200 min-h-screen p-4 sm:p-6 lg:p-8">
//         <motion.div
//           className="relative flex items-center justify-center bg-pink-900 p-4 rounded-lg shadow-md overflow-hidden"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           {/* Background image */}
//           <img
//             className="absolute inset-0 bg-gray-900 h-full w-full object-cover"
//             src={coverImage}
//             alt="Cover Image"
//           />

//           {/* Content */}
//           <motion.div
//             className="relative z-10 max-w-4xl w-full bg-black/50 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg m-4 lg:m-6"
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//           >
//             <h1 className="text-lg sm:text-xl lg:text-2xl text-white font-sans font-semibold mb-2">
//               Take the first step,
//               <span className="block text-sm sm:text-base">
//                 to learn with us
//               </span>
//             </h1>

//             {/* Search and Filter Section */}
//             <div className="w-full flex flex-col sm:flex-row gap-4 mb-6">
//               <div className="relative w-full sm:w-auto">
//                 <FaSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={handleSearch}
//                   placeholder="Search courses"
//                   className="pl-10 text-black p-2 rounded-lg border-2 border-black w-full sm:w-auto"
//                 />
//               </div>
//               <select
//                 value={filterCategory}
//                 onChange={handleFilterChange}
//                 className="text-black p-2 rounded-lg border-2 border-black w-full sm:w-auto"
//               >
//                 <option value="">All Categories</option>
//                 {categoriesFetch.map((category) => (
//                   <option key={category._id} value={category.categoryName}>
//                     {category.categoryName}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {!userInfo && (
//               <motion.button
//                 className="mt-6 border border-black px-4 py-2 rounded-md text-white font-mono hover:bg-gray-700"
//                 onClick={() => navigate("/login")}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 Login
//               </motion.button>
//             )}
//           </motion.div>
//         </motion.div>

//         {/* Course Grid with Skeleton Loading */}
//         <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {isLoading ? (
//             // Show skeleton cards while loading
//             Array(8)
//               .fill(0)
//               .map((_, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 * index, duration: 0.5 }}
//                 >
//                   <SkeletonCard />
//                 </motion.div>
//               ))
//           ) : (
//             // Show actual course cards when data is loaded
//             courses.map((course) => (
//               <motion.div
//                 key={course._id}
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2, duration: 0.5 }}
//               >
//                 <CourseCard
//                   data={course}
//                   ratings={{
//                     averageRating: findRatingForCourse(course._id as string),
//                     totalRatings:
//                       ratings.find((r) => r._id === course._id)?.totalReviews || 0,
//                   }}
//                 />
//               </motion.div>
//             ))
//           )}
//         </div>

//         {/* Pagination */}
//         {!isLoading && (
//           <Pagination
//             itemsPerPage={itemsPerPage}
//             totalItems={totalItems}
//             paginate={handlePaginate}
//             currentPage={currentPage}
//           />
//         )}
//       </div>
//     </>
//   );
// }











// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import CardUi from "../../Components/Ui/User/Course/Card";
// import coverImage from "/Logo/images/Untitled design (2).png";
// import { useNavigate } from "react-router-dom";
// import { RootState } from "../../redux/store";
// import { useSelector } from "react-redux";
// import { ICourse } from "../../services/types";
// import { categoryData, getCourses, getRatings } from "../../api/user";
// import Pagination from "../../Components/Common/Pagination";
// import { FaSearch } from "react-icons/fa";

// export interface CourseRating {
//   _id: string;
//   title: string;
//   averageRating: number;
//   totalReviews: number;
// }

// interface ICategory {
//   _id: string;
//   categoryName: string;
//   is_listed?: boolean;
// }

// export default function Courses() {
//   const { userInfo } = useSelector((state: RootState) => state.auth);
//   const [courses, setCourses] = useState<ICourse[]>([]);
//   const [ratings, setRatings] = useState<CourseRating[]>([]);
//   const [categoriesFetch, setCategoriesFetch] = useState<ICategory[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalItems, setTotalItems] = useState<number>(0);
//   const [itemsPerPage] = useState<number>(5);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [filterCategory, setFilterCategory] = useState<string>("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     getAllCourses();
//     getAllRatings();
//     categoryDetail();
//   }, [currentPage, searchTerm, filterCategory]);

//   // Fetching ratings
//   const getAllRatings = async () => {
//     try {
//       const response = await getRatings();
//       if (response) {
//         setRatings(response.getRate);
//       }
//     } catch (error) {
//       console.error("Error fetching the rating:", error);
//       setRatings([]);
//     }
//   };

//   // Fetching courses
//   const getAllCourses = async () => {
//     try {
//       const response = await getCourses(
//         currentPage,
//         itemsPerPage,
//         searchTerm,
//         filterCategory
//       );
//       if (response && response.getCourses) {
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

//   // Fetching categories
//   const categoryDetail = async () => {
//     try {
//       const { getCateData } = await categoryData();
//       setCategoriesFetch(getCateData);
//     } catch (error) {
//       console.error("Error fetching category:", error);
//     }
//   };

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1); // Reset to first page when searching
//   };

//   const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setFilterCategory(event.target.value);
//     setCurrentPage(1); // Reset to first page when changing category
//   };

//   const handlePaginate = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   const findRatingForCourse = (courseId: string) => {
//     const rating = ratings.find((r) => r._id === courseId);
//     return rating ? rating.averageRating : 1.0;
//   };

//   return (
//     <>
//       <div className="w-full h-20 bg-red-200"></div>
//       <div className="bg-gray-200 min-h-screen p-4 sm:p-6 lg:p-8 ">
//         <motion.div
//           className="relative flex items-center justify-center bg-pink-900 p-4 rounded-lg shadow-md overflow-hidden"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           {/* Background image */}
//           <img
//             className="absolute inset-0 bg-gray-900 h-full w-full object-cover"
//             src={coverImage}
//             alt="Cover Image"
//           />

//           {/* Content */}
//           <motion.div
//             className="relative z-10 max-w-4xl w-full bg-black/50 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg m-4 lg:m-6"
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//           >
//             <h1 className="text-lg sm:text-xl lg:text-2xl text-white font-sans font-semibold mb-2">
//               Take the first step,
//               <span className="block text-sm sm:text-base">
//                 to learn with us
//               </span>
//             </h1>

//             {/* Search and Filter Section */}
//             <div className="w-full flex flex-col sm:flex-row gap-4 mb-6">
//               <div className="relative w-full sm:w-auto">
//                 <FaSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={handleSearch}
//                   placeholder="Search courses"
//                   className="pl-10 text-black p-2 rounded-lg border-2 border-black w-full sm:w-auto"
//                 />
//               </div>
//               <select
//                 value={filterCategory}
//                 onChange={handleFilterChange}
//                 className="text-black p-2 rounded-lg border-2 border-black w-full sm:w-auto"
//               >
//                 <option value="">All Categories</option>
//                 {categoriesFetch.map((category) => (
//                   <option key={category._id} value={category.categoryName}>
//                     {category.categoryName}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {!userInfo && (
//               <motion.button
//                 className="mt-6 border border-black px-4 py-2 rounded-md text-white font-mono hover:bg-gray-700"
//                 onClick={() => navigate("/login")}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 Login
//               </motion.button>
//             )}
//           </motion.div>
//         </motion.div>

//         {/* Course Grid */}
//         <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {courses.map((course) => (
//             <motion.div
//               key={course._id}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//             >
//               <CardUi
//                 data={course}
//                 ratings={{
//                   averageRating: findRatingForCourse(course._id as string),
//                   totalRatings:
//                     ratings.find((r) => r._id === course._id)?.totalReviews ||
//                     0,
//                 }}
//               />
//             </motion.div>
//           ))}
//         </div>

//         {/* Pagination */}
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
