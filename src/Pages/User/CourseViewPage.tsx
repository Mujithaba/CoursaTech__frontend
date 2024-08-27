import { FaBook, FaFileAlt, FaComments, FaUser } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import file from "/Logo/icon/file (1).png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ICourse } from "../../services/types";
import {
  createPayment,
  paymentSuccess,
  viewCoureseDetails,
} from "../../api/user";
import {Chip} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import CuricculumsData from "../../Components/Common/CoursesCommon/CuricculumsData";
import InstructorView from "../../Components/Common/CoursesCommon/InstructorView";
import AssignmentsView from "../../Components/Common/CoursesCommon/AssignmentsView";
import Reviews from "../../Components/Common/CoursesCommon/Reviews";

export default function CourseViewPage() {
  const [courseData, setCourse] = useState<ICourse | null>(null);
  const [activeTab, setActiveTab] = useState("Curriculum");
  const [states, setStates] = useState<boolean>(false);
  const [isPurchase, setIsPurchased] = useState<boolean>(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [Razorpay] = useRazorpay();

  const location = useLocation();
  const course = location.state?.CourseData as ICourse;
  console.log(course._id, "lecture............");

  useEffect(() => {
    getViewCourse();
  }, [states]);

  // course fetching api
  const getViewCourse = async () => {
    try {
      let courseId = course._id as string;
      let userId = userInfo._id as string;
      const response = await viewCoureseDetails(courseId, userId);

      if (response && response.getViewCourses) {
        setCourse(response.getViewCourses);
        setIsPurchased(response.isPurchased);
      } else {
        console.error("No course data in the response");
        setCourse(null);
      }
    } catch (error) {
      console.error("Error fetching the course:", error);
      setCourse(null);
    }
  };

  if (!courseData) {
    return <div>No course data available</div>;
  }

  let instructorId = courseData.instructor_id as string;
  console.log(instructorId, "instrctor id");
  const courseId = courseData._id as string;

  // payment gateway started here
  const handlePayment = async () => {
    const courseId = courseData._id as string;
    const order = await createPayment(courseId);

    console.log(order, "payment order details");
    console.log(order?.data.amount, "payment order details");

    const options: RazorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order?.data.amount,
      currency: "INR",
      name: "CoursaTech",
      description: "Test Transaction",
      image: file,
      order_id: order?.data.id,
      handler: async (res) => {
        console.log(res, "res razorpay-------------");

        const data = {
          res: res,
          courseID: courseData._id,
          userID: userInfo._id,
        };
        const paymentData = await paymentSuccess(data);
        if (paymentData) {
          toast.success(paymentData.data.message);
          setStates(true);
        }
      },
      prefill: {
        name: userInfo.name,
        email: userInfo.email,
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  };
  console.log(courseData, "isPurchase------");

  return (
    <div className="max-full p-8 mx-auto  bg-whiye rounded-lg shadow-md ">
      <div className="flex  justify-around m-4">
        <div className="">
          <img
            className="h-64 w-72 bg-black  rounded-md"
            src={courseData.thumbnailSignedUrl}
            alt="Cover Image"
          />
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <div>
                <h1 className=" text-2xl font-bold mb-1">{courseData.title}</h1>
                {/* <span className="bg-green-300  text-black rounded-2xl py-1 px-2 mb-2 text-sm font-semibold font-mono">
                  {courseData.category_id.categoryName}
                </span> */}
                <Chip color="success" variant="dot">{courseData.category_id.categoryName}</Chip>
              </div>
              <div>
                {/* <p className="bg-yellow-100 px-2 flex items-center font-semibold rounded-full">${courseData.price}</p> */}

                {isPurchase ? (
                  <div className="flex">
                    <p className="flex justify-center  rounded-md px-1">
                      {/* <SiTicktick  className="text-green-700 mt-1" size={24} />
                      <span className="text-xs text-green-600 mt-2 font-sans font-semibold">
                        Purchased
                      </span> */}
                      <Chip   startContent={<SiTicktick  size={15} />} 
                      variant="faded"
                      className=""
                      color="success">Purchased</Chip>
                    </p>
                  </div>
                ) : (
                  <button
                    className="bg-yellow-400 px-4 py-2 font-bold rounded-md hover:bg-yellow-500 flex"
                    onClick={handlePayment}
                  >
                    <span className="text-sm me-1 font-semibold">
                      <FontAwesomeIcon
                        icon={faShoppingBag}
                        className="mr-1 mt-1"
                      />
                      Buy
                    </span>
                    ${courseData.price}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <video
            src={courseData.trailerSignedUrl}
            className="h-64  w-98 bg-gray-700 text-center border-2 border-card text-red-700 rounded-md"
            controls
          >
            traile video not working
          </video>
          <h1 className=" text-2xl font-bold ">Trailer</h1>
        </div>
      </div>

      {/* course layouts */}
      <div className="flex border-b ms-32">
        <button
          className={`px-4 py-2 text-lg flex font-semibold ${
            activeTab === "Curriculum"
              ? "text-black border-b-2 border-green-800"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Curriculum")}
        >
          <FaBook className="mr-2 mt-2" size={15} />
          Curriculum
        </button>
        <button
          className={`px-4 py-2 flex text-lg font-semibold ${
            activeTab === "Instructor"
              ? "text-black border-b-2 border-green-800"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Instructor")}
        >
          <FaUser className="mr-2 mt-2" size={15} />
          Instructor
        </button>

        <button
          className={`px-4 py-2 flex text-lg font-semibold ${
            activeTab === "Assignments"
              ? "text-black border-b-2 border-green-800"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Assignments")}
        >
          <FaFileAlt className="mr-2 mt-2" />
          Assignments
        </button>
        <button
          className={`px-4 py-2 flex text-lg font-semibold ${
            activeTab === "reviews"
              ? "text-black border-b-2 border-green-800"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          <FaComments className="mr-2 mt-2" />
          Reviews
        </button>
      </div>

      {/* components of the nav bar in the course view page start*/}

      {/* Curriculum  start*/}
      {activeTab === "Curriculum" && (
        <div>
          <CuricculumsData
            modules={courseData.modules}
            isPurchase={isPurchase}
          />
        </div>
      )}
      {/* instructor page start */}
      {activeTab === "Instructor" && (
        <div>
          <InstructorView instructorId={instructorId} isPurchase={isPurchase} />
        </div>
      )}
      {/* assignments page start */}
      {activeTab === "Assignments" && (
        <div>
          <AssignmentsView courseID={courseId} />
        </div>
      )}
      {/* reviews page start */}
      {activeTab === "reviews" && (
        <div>
          <Reviews courseID={courseId} />
        </div>
      )}
      {/* components of the nav bar in the course view page  end*/}
    </div>
  );
}
