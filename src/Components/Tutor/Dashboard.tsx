import React, { useEffect, useState } from "react";
import { DollarSign, Users, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dashboardFetching } from "../../api/tutor";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CourseGrowthGraph from "../Common/tutorCommon/CourseGrowthGraph";

//  types for dashboard data
interface Enrollment {
  title: string;
  students: number;
}

interface CoursePerformance {
  title: string;
  rating: number;
}

interface DashboardData {
  totalEarnings: number;
  totalStudents: number;
  activeCourses: number;
  recentEnrollments: Enrollment[];
  coursePerformance: CoursePerformance[];
}

// types for Card, RecentEnrollments, and CoursePerformance components
interface CardProps {
  title: string;
  amount: string;
  icon: React.ReactNode;
}

interface RecentEnrollmentsProps {
  enrollments: Enrollment[];
}

interface CoursePerformanceProps {
  courses: CoursePerformance[];
}

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalEarnings: 0,
    totalStudents: 0,
    activeCourses: 0,
    recentEnrollments: [],
    coursePerformance: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const instructorId = tutorInfo?._id;
        if (!instructorId) {
          throw new Error("Instructor ID not found");
        }
        const result = await dashboardFetching(instructorId);
        if (result && result.data && result.data.data) {
          setDashboardData(result.data.data);
        } else {
          throw new Error("Invalid data structure received");
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [tutorInfo]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-[#0a0e3c] text-white min-h-screen rounded-md">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Instructor Dashboard</h1>
        <div className="flex space-x-4">
          <button
            className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md"
            onClick={() => navigate("/tutor/createCourse")}
          >
            Create Course
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card
          title="Total Earnings"
          amount={`$${dashboardData.totalEarnings?.toFixed(2) ?? "0.00"}`}
          icon={<DollarSign />}
        />
        <Card
          title="Total Students"
          amount={dashboardData.totalStudents?.toString() ?? "0"}
          icon={<Users />}
        />
        <Card
          title="Active Courses"
          amount={dashboardData.activeCourses?.toString() ?? "0"}
          icon={<Book />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentEnrollments
          enrollments={dashboardData.recentEnrollments ?? []}
        />
        <CoursePerformance courses={dashboardData.coursePerformance ?? []} />
      </div>
      <div className="mt-8">
        <CourseGrowthGraph instructorId={tutorInfo?._id} />
      </div>
    </div>
  );
}
const Card: React.FC<CardProps> = ({ title, amount, icon }) => (
  <div className="bg-[#1c233e] p-6 rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {icon}
    </div>
    <p className="text-3xl font-bold">{amount}</p>
  </div>
);

const RecentEnrollments: React.FC<RecentEnrollmentsProps> = ({
  enrollments,
}) => (
  <div className="bg-[#1c233e] p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4">Recent Enrollments</h3>
    <ul>
      {enrollments.map((item, idx) => (
        <li key={idx} className="flex justify-between mb-2">
          <span>{item.title}</span>
          <span className="text-green-500">+{item.students} students</span>
        </li>
      ))}
    </ul>
  </div>
);

const CoursePerformance: React.FC<CoursePerformanceProps> = ({ courses }) => (
  <div className="bg-[#1c233e] p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4">Course Performance</h3>
    <div className="space-y-2">
      {courses.map((course, idx) => (
        <div key={idx} className="flex justify-between items-center">
          <span>{course.title}</span>
          <span
            className={`text-${course.rating >= 4.5 ? "green" : "yellow"}-500`}
          >
            {course.rating.toFixed(1)} ⭐
          </span>
        </div>
      ))}
    </div>
  </div>
);
