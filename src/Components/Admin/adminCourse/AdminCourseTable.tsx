import React from 'react'
import { ICourse } from '../../../services/types'
import CourseTableRow from './CourseTableRow';
import Pagination from '../../Common/Pagination';

interface AdminCourseTableProps {
  courses: ICourse[];
  itemsPerPage:number
  totalItems:number;
  paginate: (handlePaginate:number) => void;
  currentPage:number;
  handleApprove: (courseId: string,  is_verified: boolean) => void; 
  }

  const AdminCourseTable: React.FC<AdminCourseTableProps> = ({ courses ,itemsPerPage, totalItems, paginate, currentPage,handleApprove }) => {

   
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
              <CourseTableRow key={course._id} data={course}  handleApprove={handleApprove} />
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
