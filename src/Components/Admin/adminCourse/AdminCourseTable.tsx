import React, { useEffect, useState } from "react";
import { ICourse } from "../../../services/types";
import CourseTableRow from "./CourseTableRow";
import Pagination from "../../Common/Pagination";
import { getRatings } from "../../../api/admin";

interface AdminCourseTableProps {
  courses: ICourse[];
  itemsPerPage: number;
  totalItems: number;
  paginate: (handlePaginate: number) => void;
  currentPage: number;
  handleApprove: (courseId: string, is_verified: boolean) => void;
}

export interface CourseRating {
  _id: string;
  title: string;
  averageRating: number;
  totalReviews: number;
}

const AdminCourseTable: React.FC<AdminCourseTableProps> = ({
  courses,
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  handleApprove,
}) => {
  const [ratings, setRatings] = useState<CourseRating[]>([]);

  useEffect(() => {
    getAllRatings();
  }, []);

  // fetching ratings
  const getAllRatings = async () => {
    try {
      const response = await getRatings();

      if (response) {
        setRatings(response.getRate);
      } else {
      }
    } catch (error) {
      console.error("Error fetching the rating:", error);
      setRatings([]);
    }
  };

  const findRatingForCourse = (courseId: string) => {
    const rating = ratings.find((r) => r._id === courseId);
    return rating ? rating.averageRating : 0;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Thumbnail</th>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Category</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-left">Rating</th>
            <th className="py-3 px-6 text-left">Created At</th>
            <th className="py-3 px-6 text-left">Action</th>
            <th className="py-3 px-6 text-left">View</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {courses.map((course) => (
            <CourseTableRow
              key={course._id}
              data={course}
              handleApprove={handleApprove}
              ratings={{
                averageRating: findRatingForCourse(course._id as string),
                totalRatings:
                  ratings.find((r) => r._id === course._id)?.totalReviews || 0,
              }}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default AdminCourseTable;
