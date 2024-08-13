import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ICourse, Modules } from "../../../services/types";
import { FaChevronDown, FaBook, FaFileAlt, FaComments } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { Button } from "@nextui-org/react";
import CurriculumOfCourse from "../../../Components/Tutor/course/courseCreate.tsx/CuricculumOfCourse";
import { uploadCuricculum, viewCoureseDetails } from "../../../api/tutor";
import { toast } from "react-toastify";
import Uploading from "../../../Components/Common/Uploading";
import AccordionUi from "../../../Components/Ui/AccordionUi";

const ViewMyCourse: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading,setIsLoading]= useState<boolean>(false)
 const [courseData,setCourse] = useState<ICourse | null>(null)
 const [render,setRender] = useState<boolean>(false)

console.log(courseData,"setCourseData");

  
  const location = useLocation();
  const course = location.state?.CourseData as ICourse;
console.log(course._id,"lecture............");

useEffect(()=>{
  getViewCourse()
},[render])
console.log(courseData,"setCourseData...........");
const getViewCourse =async()=>{
  try {
    let courseId = course._id as string
    const response = await viewCoureseDetails(courseId);
    if (response && response.getTutorCourses) {
      console.log(response.getTutorCourses, "getInstructorCourses..........");
      setCourse(response.getTutorCourses);

    } else {
      console.error("No course data in the response");
      setCourse(null);
    }
  } catch (error) {
    console.error("Error fetching the course:", error);
    setCourse(null);
  }
}


  if (!courseData) {
    return <div>No course data available</div>;
  }

  const handleModalForCuricculum = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitCurriculum = async(modules:any) => {
    console.log('Submitted curriculum:',course._id, modules);
    const id = course._id as string;
    try {
      setIsLoading(true)
      const response = await uploadCuricculum(id,modules)
      console.log('Response from curcculum:', response);
      if(response){
        setRender(true)
        toast.success(response.data.message,{
          position: "top-center"
        })
      }
    } catch (error) {
      console.error('Error handling curicculum submit:', error);
    }finally{
      setIsLoading(false);
      handleCloseModal();
    }

  };

  // const 

  return (
    <>{isLoading ? <Uploading/> : 
    
    (
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
              {/* <h2 className="text-2xl font-bold mb-4">Add Curriculum</h2> */}
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



      {/* <div className="ms-32 mb-4">
        <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold mr-2" onClick={()=>navigate('/Courseview/Curriculum')}>Featured</span>
        <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">UX Design</span>
      </div> */}
      {/* <div className="flex ms-32 items-center mb-4">
        <div className="flex text-yellow-400 mr-2">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <span className="text-gray-600 mr-4">(44)</span>
        <span className="text-gray-600">Last Update: Sep 29, 2024</span>
      </div> */}



{/* course view page contents starts here*/}
      <div className="flex  justify-between m-4">
        <div>
          <img
            className="h-44 w-64 rounded-md"
            src={courseData.thumbnailSignedUrl}
            alt="Cover Image"
          />
          <h1 className=" text-2xl font-bold ">{courseData.title}</h1>
          <span className="bg-green-300  text-black rounded-2xl py-1 px-2 mb-2 text-sm font-semibold font-mono">{courseData.category_id.categoryName}</span>
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
  <p className="text-center text-gray-600 mt-4 font-bold font-mono">No modules are available now. Add them!</p>
)}
      {/* <div className="mt-3 mx-14 ">
        <AccordionUi modules={courseData.modules} />
      </div> */}



    </div>

)}
    
    </>
   
  );
};

export default ViewMyCourse;

{/* {courseData.chapters?.length !== 0 ? (
  <div className="flex justify-between items-center p-4 bg-gray-100 rounded">
    <span className="font-semibold">Intro Course content</span>
    <span className="text-gray-600">02hr 35min</span>
    <FaChevronDown className="text-gray-600" />
  </div>
) : (
  <p className="text-gray-700 font-mono font-semibold">
    Curicculums are Empty...!{" "}
  </p>
)} */}