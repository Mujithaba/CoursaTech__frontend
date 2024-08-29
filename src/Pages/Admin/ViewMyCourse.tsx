import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ICourse } from "../../services/types";
import { FaBook, FaFileAlt, FaComments, FaUser } from "react-icons/fa";

import { viewCoureseDetails } from "../../api/admin";
import CommonCuricculum from "../../Components/Common/tutorCommon/CommonCuricculum";
import CommonInstructorViewA from "../../Components/Common/adminCommon/InstructorView";
import AssignmentsViewCommonA from "../../Components/Common/adminCommon/AssignmentsView";
import CommonReviewsA from "../../Components/Common/adminCommon/Reviews";

const ViewMyCourse: React.FC = () => {
  const [courseData, setCourse] = useState<ICourse | null>(null);
  const [state, setState] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("Curriculum");

  console.log(courseData, "setCourseData");

  const location = useLocation();
  const course = location.state?.CourseData as ICourse;
  console.log(course._id, "lecture............");

  useEffect(() => {
    getViewCourse();
  }, []);

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

  const courseid = courseData._id as string;
  const instructor_id = courseData.instructor_id as string;


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


           {/* course layouts */}
      <div className="flex border-b ms-32">
        <button
          className={`px-4 py-2 text-lg flex font-semibold ${
            activeTab === "Curriculum"
              ? "text-black border-b-2 border-green-800"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Curriculum")}
        >
          <FaBook className="mr-2 mt-2" size={15} />
          Curriculum
        </button>
        <button
          className={`px-4 py-2 flex text-lg font-semibold ${
            activeTab === "Instructor"
              ? "text-black border-b-2 border-green-800"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Instructor")}
        >
          <FaUser className="mr-2 mt-2" size={15} />
          Instructor
        </button>

        <button
          className={`px-4 py-2 flex text-lg font-semibold ${
            activeTab === "Assignments"
              ? "text-black border-b-2 border-green-800"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Assignments")}
        >
          <FaFileAlt className="mr-2 mt-2" />
          Assignments
        </button>
        <button
          className={`px-4 py-2 flex text-lg font-semibold ${
            activeTab === "reviews"
              ? "text-black border-b-2 border-green-800"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          <FaComments className="mr-2 mt-2" />
          Reviews
        </button>
      </div>

         {/* components of the nav bar in the course view page start*/}

          {/* Curriculum  start*/}
          {activeTab === "Curriculum" && (
            <div>
              <CommonCuricculum modules={courseData.modules} />
            </div>
          )}
          {/* instructor page start */}
          {activeTab === "Instructor" && (
            <div>
              <CommonInstructorViewA instructorId={instructor_id} />
            </div>
          )}
          {/* assignments page start */}
          {activeTab === "Assignments" && (
            <div>
              <AssignmentsViewCommonA courseID={courseid} />
            </div>
          )}
          {/* reviews page start */}
          {activeTab === "reviews" && (
            <div>
              <CommonReviewsA courseID={courseid} />
            </div>
          )}
          {/* components of the nav bar in the course view page  end*/}

      
      </div>
    </>
  );
};

export default ViewMyCourse;

