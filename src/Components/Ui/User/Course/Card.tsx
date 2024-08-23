import React from "react";
import { ICourse } from "../../../../services/types";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa6";

interface CardUIProps {
  data: ICourse;
}

const CardUi: React.FC<CardUIProps> = ({ data }) => {
  let formattedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString()
    : "Date not available";
  const navigate = useNavigate();

  const handleCourseView = () => {
    try {
      navigate("viewCourse", {
        state: {
          CourseData: data,
        },
      });
    } catch (error) {
      console.log("fetching this course have some error, Please try later");
    }
  };

  return (
    <div className=" w-full flex justify-center mb-3 mt-3   rounded-md">
      <div className=" w-[300px]  rounded-md overflow-hidden relative p-4 bg-white">
        <div className="h-[150px] bg-black rounded-md overflow-hidden ">
          <img
            src={
              data.thumbnailSignedUrl ||
              "https://nextui.org/images/album-cover.png"
            }
            alt=""
            className="w-auto h-auto object-cover"
          />
        </div>
        <div className="h-[170px] w-full bg-white mt-3 flex flex-col justify-between m-1">
          <div className=" flex justify-between">
            <p className="bg-green-200 text-xs font-serif px-2 flex items-center rounded-full">
              {data.category_id
                ? data.category_id.categoryName
                : "Category not available"}
            </p>
            <p className="bg-yellow-400 px-2 flex items-center font-semibold rounded-full">
              ${data.price}
            </p>
          </div>
          <h2 className="text-lg font-semibold">
            {data.title.toLocaleUpperCase()}
          </h2>
          <p className="text-gray-500 text-sm">{data.description}</p>
          <div className="flex justify-between">
            <div className="flex mt-3">
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
            </div>
            <button
              className="w-10 h-10 flex justify-center items-center rounded-full bg-yellow-300 hover:shadow-md relative group"
              onClick={handleCourseView}
            >
              <div className="absolute arrow-icon">
                <FaArrowRight />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUi;
