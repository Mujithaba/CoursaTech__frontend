import { useEffect, useState } from 'react'
import { ICourse } from '../../services/types'
import { courseApprove, courseUnapprove, getCourses } from '../../api/admin';
import AdminCourseTable from '../../Components/Admin/adminCourse/AdminCourseTable';
import { toast } from 'react-toastify';

export default function AdminCoursePage() {

    const [courses, setCourses] = useState<ICourse[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [itemsPerPage] = useState<number>(2);

  useEffect(()=>{
    getAllCourses();
  },[currentPage])
console.log(courses,"get admiside courses");

  // getting course
  const getAllCourses = async () => {
    try {
      const response = await getCourses(currentPage, itemsPerPage);
      if (response && response.getCourses) {
        console.log(response.getCourses, "getInstructorCourses");
        setCourses(response.getCourses);
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


  const handleApprove = async (courseId: string,  is_verified: boolean) => {
    console.log(courseId, "courseId",  is_verified);

    if ( is_verified == false) {
      const response = await courseApprove(courseId);
      toast.success(response?.data, {
        position: "top-center",
        autoClose:1000,
        hideProgressBar:true,
        closeButton:false
      });
    }

    if ( is_verified == true) {
      const response2 = await courseUnapprove(courseId);
      toast.info(response2?.data, {
        position: "top-center",
        autoClose:1000,
        hideProgressBar:true,
        closeButton:false
      });
    }

    setCourses((prevUsers) =>
      prevUsers.map((course) =>
        course._id === courseId ? { ...course,  is_verified: ! is_verified } : course
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Course Management</h1>
    <AdminCourseTable courses={courses}  itemsPerPage={itemsPerPage} totalItems={totalItems} paginate={handlePaginate} currentPage={currentPage} handleApprove={handleApprove} />
   
  </div>
  )
}
