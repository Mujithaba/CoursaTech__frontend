import React from "react";
import { ICourse } from "../../services/types";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FaStar } from "react-icons/fa6";

interface CardUIProps {
  data: ICourse;
}

const CardUI: React.FC<CardUIProps> = ({ data }) => {
  let formattedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString()
    : "Date not available";
  const navigate = useNavigate();

  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);
  const { adminInfo } = useSelector((state: RootState) => state.adminAuth);

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

  return (
    <div className=" w-full flex justify-center ">
      <div className=" w-[300px]  rounded-md overflow-hidden relative p-4 bg-white shadow-md">
        <div className="h-[150px] bg-black rounded-md overflow-hidden ">
          <img
            src={
              data.thumbnailSignedUrl ||
              "https://nextui.org/images/album-cover.png"
            }
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* <div className="absolute left-0 right-0 top-0 p-3 flex justify-end">
          {tutorInfo && (
            <Button color="warning" variant="contained" size="small">
              Unlist
            </Button>
          )}

          {adminInfo && (
            <Button color="warning" variant="contained" size="small">
              Approved
            </Button>
          )}
        </div> */}
        <div className="h-[170px] w-full bg-white mt-3 flex flex-col justify-between m-1">
          <div className=" flex justify-between">
            <p className="bg-green-100 px-2 flex items-center rounded-full">
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

export default CardUI;
