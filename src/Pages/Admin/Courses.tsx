import { useEffect, useState } from "react";
import CardUI from "../../Components/Ui/CardUI";
import { ICourse } from "../../services/types";
import { getCourses } from "../../api/admin";

export default function Courses() {
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(()=>{
    getAllCourses();
  },[])
console.log(courses,"get admiside courses");

  // getting course
  const getAllCourses = async () => {
    try {
      const response = await getCourses();
      if (response && response.getCourses) {
        console.log(response.getCourses, "getInstructorCourses");
        setCourses(response.getCourses);
      } else {
        console.error("No courses data in the response");
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching the courses:", error);
      setCourses([]);
    }
  };



  return (
    <div className="m-4" >
      {/* <h1>Course</h1> */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {courses.map((course)=>(

        <CardUI key={course._id} data={course} />
        ))}
        
      </div>
    </div>
  )
}
