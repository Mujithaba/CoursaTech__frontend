import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ICourse } from "../../services/types";
import { FaChevronDown, FaBook, FaFileAlt, FaComments } from "react-icons/fa";

import AccordionUi from "../../Components/Ui/AccordionUi";
import { viewCoureseDetails } from "../../api/admin";

const ViewMyCourse: React.FC = () => {
  
  const [courseData, setCourse] = useState<ICourse | null>(null);
const [state,setState] = useState<boolean>(false)

  console.log(courseData, "setCourseData");

  const location = useLocation();
  const course = location.state?.CourseData as ICourse;
  console.log(course._id, "lecture............");

  useEffect(() => {
    getViewCourse();
  },[]);

  console.log(courseData, "setCourseData...........");
  const getViewCourse = async () => {
    try {
      let courseId = course._id as string;
      const response = await viewCoureseDetails(courseId);
      if (response && response.getViewCourses) {
        console.log(response.getViewCourses, "getViewCourses..........");
        setCourse(response.getViewCourses);
      } else {
        console.error("No course data in the response");
        setCourse(null);
      }
    } catch (error) {
      console.error("Error fetching the course:", error);
      setCourse(null);
    }
  };

  if (!courseData) {
    return <div>No course data available</div>;
  }

 

  return (
    <>
      
        <div className="max-full p-3 mx-auto  bg-white rounded-lg shadow-md ">
       
          
          {/* course view page contents starts here*/}
          <div className="flex  justify-between m-4">
            <div>
              <img
                className="h-40 rounded-md"
                src={courseData.thumbnailSignedUrl}
                alt="Cover Image"
              />
              <h1 className=" text-2xl font-bold mt-5">{courseData.title}</h1>
              <span className="bg-green-300  text-black rounded-2xl py-1 px-2 mb-2 text-sm font-semibold font-mono">
                {courseData.category_id.categoryName}
              </span>
            </div>

            <div>
          <video
            className="h-44  text-center border-2 border-card text-red-700 rounded-md"
            src={courseData.trailerSignedUrl}
            controls
          >
            traile video not working
          </video>
          <h1 className=" text-xl font-bold ">Preview</h1>
        </div>
        
          </div>
          <div className="flex justify-center border-b ms-32">
            <button className="flex items-center px-4 py-2 text-purple-600 border-b-2 border-purple-600 font-medium">
              <FaBook className="mr-2" />
              Curriculum
            </button>
            <button className="flex items-center px-4 py-2 text-gray-600 font-medium">
              <FaFileAlt className="mr-2" />
              Assignments
            </button>
            <button className="flex items-center px-4 py-2 text-gray-600 font-medium">
              <FaComments className="mr-2" />
              Reviews
            </button>
          </div>
          {/* modules component */}
          {courseData.modules && courseData.modules.length > 0 ? (
            <div className="mt-3 mx-2 bg-card p-3 rounded-md">
              <AccordionUi modules={courseData.modules} />
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-4 font-bold font-mono">
              No modules are available now. Add them!
            </p>
          )}
          {/* <div className="mt-3 mx-14 ">
        <AccordionUi modules={courseData.modules} />
       </div> */}
        </div>
    
    </>
  );
};

export default ViewMyCourse;

{
  /* {courseData.chapters?.length !== 0 ? (
  <div className="flex justify-between items-center p-4 bg-gray-100 rounded">
    <span className="font-semibold">Intro Course content</span>
    <span className="text-gray-600">02hr 35min</span>
    <FaChevronDown className="text-gray-600" />
  </div>
) : (
  <p className="text-gray-700 font-mono font-semibold">
    Curicculums are Empty...!{" "}
  </p>
)} */
}
