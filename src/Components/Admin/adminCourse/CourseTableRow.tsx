import React from 'react'

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { ICourse } from '../../../services/types';

interface CourseTableRowProps {
  data: ICourse;
  handleApprove: (courseId: string,  is_verified: boolean) => void; 

}

const CourseTableRow: React.FC<CourseTableRowProps> = ({ data ,handleApprove}) => {
    let formattedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString()
    : "Date not available";

  
  const navigate = useNavigate();
  
  const handleCourseView = () => {
    try {
      navigate("courseView", {
        state: {
          CourseData: data,
        },
      });
    } catch (error) {
      console.log("fetching this course have some error, Please try later");
    }
  };
const courseId = data._id
  console.log(courseId,"string");
  

  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="p-2">
        <img
          src={data.thumbnailSignedUrl || "https://nextui.org/images/album-cover.png"}
          alt=""
          className="w-16 h-16 object-cover rounded"
        />
      </td>
      <td className="p-2 font-normal">{data.title.toLocaleUpperCase()}</td>
      <td className="p-2">
        <span className="bg-green-100 px-2 py-1 rounded-full text-sm font-normal">
          {data.category_id ? data.category_id.categoryName : "N/A"}
        </span>
      </td>
      <td className="p-2">${data.price}</td>
      <td className="p-2">
        <div className="flex">
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
        </div>
      </td>
      <td className="p-2">{formattedDate}</td>
      <td className="p-2">
        {data.is_verified ?
        (<Button color="warning" variant="contained" size="small"   onClick={() => handleApprove(data._id!, data.is_verified!)}>
        Unapprove
      </Button>):
      (<Button color="success" variant="contained" size="small"   onClick={() => handleApprove(data._id!, data.is_verified!)}>
      Approve
    </Button>) }
        
      </td>
      <td className="p-2">
        
        <button
          className="p-2 rounded-full bg-yellow-300 hover:bg-yellow-400"
          onClick={handleCourseView}
        >
          <FaArrowRight />
        </button>
      </td>
    </tr>
  );
};

export default CourseTableRow;