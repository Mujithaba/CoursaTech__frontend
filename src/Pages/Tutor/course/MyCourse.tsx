import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { getCoursesInstructor, tutorUpdateCheck } from "../../../api/tutor";
import { logOut } from "../../../redux/slices/tutorSlice";
import { useEffect, useState } from "react";
import { ICourse } from "../../../services/types";
import CardUI from "../../../Components/Ui/CardUI";

export default function MyCourse() {
  const [courses, setCourses] = useState<ICourse[]>([]);
console.log(courses,"getTutofghdgg");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);

  const fetchHomeData = async () => {
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
    fetchHomeData();
    getInstructorCourses();
  }, []);

  // getting course
  const getInstructorCourses = async () => {
    try {
      const response = await getCoursesInstructor(tutorInfo._id);
      if (response && response.getTutorCourses) {
        console.log(response.getTutorCourses, "getInstructorCourses");
        setCourses(response.getTutorCourses);
      } else {
        console.error("No courses data in the response");
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching the courses:", error);
      setCourses([]);
    }
  };
  // const getInstructorCourses = async () => {
  //   try {
  //     const {getTutorCourses} = await getCoursesInstructor(tutorInfo._id);
  //     console.log(getTutorCourses,"getInstructorCourses");
  //     setCourses(getTutorCourses)
  //   } catch (error) {
  //     console.error("Error fetching the courses:", error);
  //   }
  // };

  return (
    <div className="m-4">
      {/* <h1>My course</h1> */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map((course)=>(

        <CardUI key={course._id} data={course} />
        ))}
        
      </div>
    </div>
  );
}
