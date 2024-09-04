import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { deleteReportCourse, reportsFetching } from "../../api/admin";
import { MdDeleteSweep } from "react-icons/md";

interface Report {
  courseId: string;
  courseName: string;
  instructor: {
    instructorName: string;
    email: string;
  };
  reportedCount: number;
  thumbnail: string;
}

export default function ReportedCourses() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<{
    courseId: string;
    courseName: string;
    instructorMail: string;
    instructorName: string;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const data = await reportsFetching();
      console.log(data, "***************");

      if (Array.isArray(data)) {
        setReports(data);
      } else {
        console.error("Unexpected data format:", data);
        toast.error("Failed to fetch reports. Unexpected data format.");
        setReports([]);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("An error occurred while fetching reports.");
      setReports([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show modal and set the selected course for deletion
  const handleDeleteClick = (
    courseId: string,
    courseName: string,
    email: string,
    instrctorName: string
  ) => {
    console.log(courseId, courseName, "oooppppssssss");

    setSelectedCourse({
      courseId: courseId,
      courseName: courseName,
      instructorMail: email,
      instructorName: instrctorName,
    });
    setShowModal(true);
  };

  // Confirm delete handler
  const confirmDelete = async () => {
    if (selectedCourse) {
      // Perform delete operation
      console.log("Deleting course:", selectedCourse);
      setShowModal(false);
      setSelectedCourse(null);
      // You can call your delete API function here
      const response = await deleteReportCourse(
        selectedCourse.courseId,
        selectedCourse.instructorMail,
        selectedCourse.instructorName,
        selectedCourse.courseName
      );
      if (response && response.data) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to delete the course. Please try again.");
      }
    }
  };

  // Cancel delete handler
  const cancelDelete = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Reported Courses</h1>
      {reports.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-md">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Course Thumbnail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Reported Counts
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Instructor Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((course, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {course.courseName}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 ">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="w-16 h-18 rounded-md border-1"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-serif text-md text-gray-900">
                  {course.reportedCount}
                  <span className="bg-red-400 text-xs px-1 text-black rounded-full ml-2">
                    reports
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950">
                  {course.instructor.instructorName}
                  <br />
                  <span className="text-gray-600 text-xs">
                    {course.instructor.email}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="p-1 text-black rounded-md hover:bg-gray-100"
                    onClick={() =>
                      handleDeleteClick(
                        course.courseId,
                        course.courseName,
                        course.instructor.email,
                        course.instructor.instructorName
                      )
                    }
                  >
                    <MdDeleteSweep size={30} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reported courses found.</p>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p>
              Are you sure, you want to delete the course{" "}
              <strong>"{selectedCourse?.courseName}"</strong>?
            </p>
            <div className="flex justify-end mt-6">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-700"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
