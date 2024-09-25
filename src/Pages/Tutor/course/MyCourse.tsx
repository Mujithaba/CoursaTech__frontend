import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { getCoursesInstructor, tutorUpdateCheck } from "../../../api/tutor";
import { logOut } from "../../../redux/slices/tutorSlice";
import { useEffect, useState } from "react";
import { ICourse } from "../../../services/types";
import CardUI from "../../../Components/Ui/CardUI";
import NoCourseDataAnimy from "../../../Components/Common/NoCourseDataAnimy";
import Pagination from "../../../Components/Common/Pagination";

export interface CourseRating {
  _id: string;
  title: string;
  averageRating: number;
  totalReviews: number;
}

export default function MyCourse() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage] = useState<number>(2);
  const [ratings, setRatings] = useState<CourseRating[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);

  const fetchHomeData = async () => {
    try {
      if (tutorInfo) {
        const response = await tutorUpdateCheck(tutorInfo._id);
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
    fetchHomeData();
    getInstructorCourses();
  }, [currentPage]);

  // getting course
  const getInstructorCourses = async () => {
    try {
      const response = await getCoursesInstructor(
        tutorInfo._id,
        currentPage,
        itemsPerPage
      );
      if (response && response.getTutorCourses) {
        console.log(response.getTutorCourses, "getInstructorCourses");
        setCourses(response.getTutorCourses);
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

  const handlePaginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="m-4">
      {courses.length === 0 && <NoCourseDataAnimy />}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CardUI key={course._id} data={course} />
        ))}
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        paginate={handlePaginate}
        currentPage={currentPage}
      />
    </div>
  );
}
