import { FaBook, FaFileAlt, FaComments, FaUser } from "react-icons/fa";
import { FcPaid } from "react-icons/fc";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import file from "/Logo/icon/file (1).png";
import { useLocation } from "react-router-dom";
import {  useEffect, useState } from "react";
import { ICourse } from "../../services/types";
import {
  createPayment,
  paymentSuccess,
  viewCoureseDetails,
} from "../../api/user";
import AccordionUi from "../../Components/Ui/AccordionUi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import InstructorViewPage from "./InstructorViewPage";

export default function CourseViewPage() {
  const [courseData, setCourse] = useState<ICourse | null>(null);
  const [activeTab,setActiveTab]=useState('Curriculum')
  const [states,setStates]=useState<boolean>(false)
  const [isPurchase,setIsPurchased] = useState<boolean>(false)
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
      const response = await viewCoureseDetails(courseId,userId);
      
      if (response && response.getViewCourses) {
        setCourse(response.getViewCourses);
        setIsPurchased(response.isPurchased)
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
  
  
  let instructorId = courseData.instructor_id as string
  console.log(instructorId,"instrctor id");
  

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
          toast.success(paymentData.data.message)
          setStates(true)
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
                <span className="bg-green-300  text-black rounded-2xl py-1 px-2 mb-2 text-sm font-semibold font-mono">
                  {courseData.category_id.categoryName}
                </span>
              </div>
              <div>
              {/* <p className="bg-yellow-100 px-2 flex items-center font-semibold rounded-full">${courseData.price}</p> */}

              {isPurchase ?(
                <div className="flex">
                <p className="flex justify-center  bg-gray-300 rounded-md px-1">
                <FcPaid size={30} />
                <span className="text-xs  mt-2 font-sans font-semibold">
              Purchased
              </span>
                </p>
                
                </div>
                ) :(

              <button
                className="bg-yellow-400 px-4 py-2 font-bold rounded-md hover:bg-yellow-500 flex"
                onClick={handlePayment}
              >
                <span className="text-sm me-1 font-semibold">
                <FontAwesomeIcon icon={faShoppingBag} className="mr-1 mt-1" />
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

      <div className="flex border-b ms-32">

              <button
          className={`px-4 py-2 text-lg flex font-semibold ${
            activeTab === "Curriculum"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("Curriculum")}
        ><FaBook className="mr-2 mt-2" size={15}/>
         Curriculum
        </button>
        <button
          className={`px-4 py-2 flex text-lg font-semibold ${
            activeTab === "Instructor"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("Instructor")}
        ><FaUser className="mr-2 mt-2" size={15}/>
        Instructor
        </button>
        
        {/* <button className="flex items-center px-4 py-2 text-purple-600 border-b-2 border-purple-600 font-medium">
          <FaBook className="mr-2" />
          Curriculum
        </button> */}
        <button className="flex items-center px-4 py-2 text-gray-600 font-medium">
          <FaFileAlt className="mr-2" />
          Assignments
        </button>
        <button className="flex items-center px-4 py-2 text-gray-600 font-medium">
          <FaComments className="mr-2" />
          Reviews
        </button>
        {/* <button className="flex items-center px-4 py-2 text-gray-600 font-medium">
          <FaUser className="mr-2" />
          Instructor
        </button> */}
      </div>



{/* Curriculum  start*/}
      {activeTab === 'Curriculum' && (
  <div>
    {courseData.modules && courseData.modules.length > 0 ? (
      <div className="mt-3 mx-2 bg-card p-3 rounded-md">
        <AccordionUi modules={courseData.modules} isPurchased={isPurchase} />
      </div>
    ) : (
      <p className="text-center text-gray-600 mt-4 font-bold font-mono">
        No modules are available now.
      </p>
    )}
  </div>
)}
{/* Curriculum  end*/}

{/* instructor page start */}
{activeTab === 'Instructor' && (
  <div>
    <InstructorViewPage instructorId={instructorId}/>
  </div>
)}
{/* instructor page end */}


    </div>
  );
}
