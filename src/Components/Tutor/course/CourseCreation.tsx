import React, { useCallback, useEffect, useState } from "react";
// import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../redux/slices/tutorSlice";
import { basicInfoUpload, tutorUpdateCheck } from "../../../api/tutor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import BasicCourseInfo from "./courseCreate.tsx/BasicCourseInfo";
import CurriculumOfCourse from "./courseCreate.tsx/CuricculumOfCourse";
import Uploading from "../../Common/Uploading";
import { toast } from "react-toastify";



export default function CourseCreation() {
const [isLoading,setIsLoading] = useState<boolean>(false)


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);
  // const [formData1,setFormData] = useState<any>([])

 

  const fetchUpdateData = async () => {
    try { 
      if (tutorInfo) {
        // console.log(tutorInfo._id, "jjjj");

        const response = await tutorUpdateCheck(tutorInfo._id);
        // console.log(response, "home response");
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
    fetchUpdateData();
  }, []);

  

// basic info upload
  const handleCourseSubmit =useCallback(async (data: FormData) => {
    // setFormData(data);
    try {
      setIsLoading(true)
      const response = await basicInfoUpload(data,tutorInfo._id)
      console.log(response.message);
      if (response) {
        
        navigate('/tutor/addCuricculum')
        toast.success(response.message,{
          position: "top-center",
          autoClose:2000,
          hideProgressBar:true,
          closeButton:false
        })
        console.log('Upload successful:', response);
      }
    } catch (error) {
      console.error('Error handling course submit:', error);
    }finally {
      setIsLoading(false);
    }
  }, [tutorInfo]);
 


 
  

  return (
    <>
    {/* <button
          className={`px-4 py-2 text-lg font-semibold ${
            activeTab === "basicInfo"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("basicInfo")}
        >
          Basic Information
        </button> */}
    
    {isLoading ? <Uploading /> :< BasicCourseInfo onSubmit={handleCourseSubmit} />}
   
    </>
   
  );
}
