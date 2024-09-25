import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ICourse } from "../../../services/types";
import { FaBook, FaFileAlt, FaComments, FaUser } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { Button } from "@nextui-org/react";
import CurriculumOfCourse from "../../../Components/Tutor/course/courseCreate.tsx/CuricculumOfCourse";
import { uploadCuricculum, viewCoureseDetails } from "../../../api/tutor";
import { toast } from "react-toastify";
import Uploading from "../../../Components/Common/Uploading";
import CommonCuricculum from "../../../Components/Common/tutorCommon/CommonCuricculum";

import CommonInstructorView from "../../../Components/Common/tutorCommon/InstructorView";
import CommonReviews from "../../../Components/Common/tutorCommon/Reviews";
import AssignmentsViewCommon from "../../../Components/Common/tutorCommon/AssignmentsView";

const ViewMyCourse: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [courseData, setCourse] = useState<ICourse | null>(null);
  const [render, setRender] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("Curriculum");

  const location = useLocation();
  const course = location.state?.CourseData as ICourse;

  useEffect(() => {
    getViewCourse();
  }, [render]);
  const getViewCourse = async () => {
    try {
      let courseId = course._id as string;
      const response = await viewCoureseDetails(courseId);
      if (response && response.getTutorCourses) {
        setCourse(response.getTutorCourses);
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

  const handleModalForCuricculum = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitCurriculum = async (modules: any) => {
    const id = course._id as string;
    try {
      setIsLoading(true);
      const response = await uploadCuricculum(id, modules);
      if (response) {
        setRender(true);
        toast.success(response.data.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error handling curicculum submit:", error);
    } finally {
      setIsLoading(false);
      handleCloseModal();
    }
  };

  const courseid = courseData._id as string;
  const instructor_id = courseData.instructor_id as string;

  return (
    <>
      {isLoading ? (
        <Uploading />
      ) : (
        <div className="max-full p-3 mx-auto  bg-white rounded-lg shadow-md ">
          {/* curicculum modal start here */}
          <Button
            className="ms-4 mt-2 bg-gray-950 text-white font-mono font-semibold"
            onClick={handleModalForCuricculum}
          >
            Add Curicculum
          </Button>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto z-50">
              <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg p-2 max-w-5xl w-full my-8">
                  <div>
                    <GrFormClose
                      size={30}
                      className="ms-auto me-7 text-red-700 hover:bg-gray-200 hover:rounded-md"
                      onClick={handleCloseModal}
                    />
                  </div>
                  <CurriculumOfCourse
                    onSubmit={handleSubmitCurriculum}
                    onModulesChange={(modules) =>
                      console.log("Modules changed:", modules)
                    }
                  />
                  <button
                    className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* curicculum modal end here */}

          {/* course view page contents starts here*/}
          <div className="flex  justify-between m-4">
            <div>
              <img
                className="h-40  rounded-md"
                src={courseData.thumbnailSignedUrl}
                alt="Cover Image"
              />
              <h1 className=" text-2xl font-bold ">{courseData.title}</h1>
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
              <CommonInstructorView instructorId={instructor_id} />
            </div>
          )}
          {/* assignments page start */}
          {activeTab === "Assignments" && (
            <div>
              <AssignmentsViewCommon courseID={courseid} />
            </div>
          )}
          {/* reviews page start */}
          {activeTab === "reviews" && (
            <div>
              <CommonReviews courseID={courseid} />
            </div>
          )}
          {/* components of the nav bar in the course view page  end*/}
        </div>
      )}
    </>
  );
};

export default ViewMyCourse;
