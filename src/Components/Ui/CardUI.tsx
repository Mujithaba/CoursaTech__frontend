import React from "react";
import { ICourse } from "../../services/types";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface CardUIProps {
  data: ICourse;
}

const CardUI: React.FC<CardUIProps> = ({ data }) => {
 let formattedDate =data.createdAt ? new Date(data.createdAt).toLocaleDateString():"Date not available";
  const navigate = useNavigate();

  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);
  const { adminInfo } = useSelector((state: RootState) => state.adminAuth);

  const handleCourseView =  () => {
    try {
      navigate('courseView',{
        state:{
          CourseData:data
        }
      })
    } catch (error) {
      console.log("fetching this course have some error, Please try later");
    }
  };

  return (
    // <div className="flex m-4 bg-gray-700 rounded-lg">
    //   <div className="relative max-w-xl bg-gray-800 shadow-xl rounded-lg overflow-hidden">
    //     <div className="grid grid-cols-1 md:grid-cols-2">
    //       <div className="p-2 h-44 w-40">
    //         <img
    //           src={
    //             data.thumbnailSignedUrl ||
    //             "https://nextui.org/images/album-cover.png"
    //           }
    //           alt="Course Cover"
    //           className="w-full h-full object-cover rounded-lg"
    //           onClick={handleCourseView}
    //         />
    //       </div>
    //       <div className="p-2 flex flex-col mt-8 rounded-md">
    //         <h1 className="text-xl ms-1 font-mono font-semibold text-white ">{data.title.toLocaleUpperCase()}</h1>
    //       <div className="flex ">
    //         <p className="text-xs px-1 rounded-md bg-green-200 font-mono text-black">  {data.category_id ? data.category_id.categoryName : "Category not available"}</p>
    //       </div>
    //          <p className="text-sm font-mono ms-1  text-gray-800 ">Price: <span className="font-bold ">${data.price}</span></p>
            
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className=" w-full flex justify-center ">
      <div className=" w-[300px]  rounded-md overflow-hidden relative p-4 bg-white">
        <div className="h-[150px] bg-black rounded-md overflow-hidden ">
          <img src={
                data.thumbnailSignedUrl ||
                "https://nextui.org/images/album-cover.png"
              } alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute left-0 right-0 top-0 p-3 flex justify-end">
          
          {tutorInfo && (

          <Button color="warning" variant="contained" size="small">Unlist</Button>
          )}  

          {adminInfo && (
             <Button color="warning" variant="contained" size="small">Unproved</Button>
          )}
        </div>
        <div className="h-[170px] w-full bg-white mt-3 flex flex-col justify-between m-1">
             <div className=" flex justify-between">
              <p className="bg-green-400 px-2 flex items-center rounded-full">{data.category_id ? data.category_id.categoryName : "Category not available"}</p>
              <p className="bg-yellow-400 px-2 flex items-center font-semibold rounded-full">${data.price}</p>
             </div>
             <h2 className="text-lg font-semibold">{data.title.toLocaleUpperCase()}</h2>
             <p className="text-gray-500">{data.description}</p>
             <div className="flex justify-between">
              <div className=""></div>
              <button className="w-10 h-10 flex justify-center items-center  rounded-full bg-yellow-300" onClick={handleCourseView}><FaArrowRight /></button>
             </div>
        </div>
      </div>
    </div>
  );
};

export default CardUI;
