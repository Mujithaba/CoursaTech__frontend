import React, { useEffect, useState } from "react";
import { FaBook, FaFileAlt, FaComments, FaUser } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import file from "/Logo/icon/file (1).png";
import { MdOutlineReport } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { ICourse, IWallet } from "../../services/types";
import {
  createPayment,
  paymentSuccess,
  viewCoureseDetails,
  walletPayment,
} from "../../api/user";
import { Chip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import CuricculumsData from "../../Components/Common/CoursesCommon/CuricculumsData";
import InstructorView from "../../Components/Common/CoursesCommon/InstructorView";
import AssignmentsView from "../../Components/Common/CoursesCommon/AssignmentsView";
import Reviews from "../../Components/Common/CoursesCommon/Reviews";
import ReportModal from "../../Components/User/ReportModal";
import { motion } from "framer-motion";

export default function CourseViewPage() {
  const [courseData, setCourse] = useState<ICourse | null>(null);
  const [activeTab, setActiveTab] = useState("Curriculum");
  const [states, setStates] = useState<boolean>(false);
  const [isPurchase, setIsPurchased] = useState<boolean>(false);
  const [walletData, setWalletData] = useState<IWallet | null>(null);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [Razorpay] = useRazorpay();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false); // New state for toggling payment options

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const location = useLocation();
  const course = location.state?.CourseData as string;

  useEffect(() => {
    getViewCourse();
  }, [states]);

  const getViewCourse = async () => {
    try {
      const response = await viewCoureseDetails(
        course as string,
        userInfo._id as string
      );
      if (response && response.getViewCourses) {
        setCourse(response.getViewCourses);
        setIsPurchased(response.isPurchased);
        setWalletData(response.getWallet);
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

  const instructorId = courseData.instructor_id as string;
  const courseId = courseData._id as string;

  const handlePayment = async () => {
    const order = await createPayment(courseData._id as string);

    const options: RazorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order?.data.amount,
      currency: "INR",
      name: "CoursaTech",
      description: "Test Transaction",
      image: file,
      order_id: order?.data.id,
      handler: async (res) => {
        const data = {
          res: res,
          courseID: courseData._id,
          userID: userInfo._id,
          instructorId: courseData.instructor_id as string,
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

  const handleWalletPayment = async() => {
    // Logic for wallet payment here

    const response = await walletPayment(userInfo._id ,instructorId,courseId,courseData.price,courseData.title)
    if (response) {
      setStates(true);
      toast.success(response.data.message)
    }
  };

  console.log(walletData, "getWallet");

  return (
    <>
      <div className="w-full h-20 bg-red-300"></div>
      <div className="max-w-full p-8 mx-auto bg-white rounded-lg shadow-lg">
        {/* Report Modal */}
        {isPurchase && (
          <div className="flex justify-end mb-4">
            <ReportModal
              courseId={courseId}
              userId={userInfo._id}
              Open={isModalOpen}
              Close={closeModal}
            />
            <button className="flex" onClick={openModal}>
              <MdOutlineReport size={25} className="text-gray-700" />
            </button>
          </div>
        )}

        {/* Course Header */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center sm:items-start">
            <img
              className="h-64 w-full sm:w-72 object-cover rounded-md mb-4"
              src={courseData.thumbnailSignedUrl}
              alt="Cover Image"
            />
            <div className="flex flex-col items-center sm:items-start">
              <h1 className="text-2xl font-bold mb-2">{courseData.title}</h1>
              <Chip color="success" variant="dot" className="mb-2">
                {courseData.category_id.categoryName}
              </Chip>
              {isPurchase ? (
                <Chip
                  startContent={<SiTicktick size={15} />}
                  variant="faded"
                  color="success"
                >
                  Purchased
                </Chip>
              ) : showPaymentOptions ? (
                <div className="flex flex-col items-start space-y-2">
                  <button
                    className="bg-green-400 px-4 py-2 font-bold rounded-md hover:bg-green-500 flex items-center"
                    onClick={handlePayment}
                  >
                    <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
                    <span className="text-sm font-semibold">Razorpay</span>
                  </button>
                  {walletData?.balance != null ? (
                    walletData.balance < courseData.price ? (
                      <button
                        className="bg-blue-400 px-4 py-2 font-bold rounded-md hover:bg-blue-500 flex items-center disabled:opacity-50"
                        disabled
                      >
                        <FontAwesomeIcon
                          icon={faShoppingBag}
                          className="mr-2"
                        />
                        <span className="text-sm font-semibold">
                          Wallet Payment (Sufficient balance in your wallet, no
                          need to pay)
                        </span>
                      </button>
                    ) : (
                      <button
                        className="bg-blue-400 px-4 py-2 font-bold rounded-md hover:bg-blue-500 flex items-center"
                        onClick={handleWalletPayment}
                      >
                        <FontAwesomeIcon
                          icon={faShoppingBag}
                          className="mr-2"
                        />
                        <span className="text-sm font-semibold">
                          Wallet Payment
                        </span>
                      </button>
                    )
                  ) :  <button
                  className="bg-blue-400 px-4 py-2 font-bold rounded-md hover:bg-blue-500 flex items-center disabled:opacity-50"
                  disabled
                >
                  <FontAwesomeIcon
                    icon={faShoppingBag}
                    className="mr-2"
                  />
                  <span className="text-sm font-semibold">
                    Wallet Payment (Sufficient balance in your wallet, no
                    need to pay)
                  </span>
                </button>}
                </div>
              ) : (
                <button
                  className="bg-yellow-400 px-4 py-2 font-bold rounded-md hover:bg-yellow-500 flex items-center"
                  onClick={() => setShowPaymentOptions(true)}
                >
                  <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
                  <span className="text-sm font-semibold">
                    Buy ${courseData.price}
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-start md:me-10">
            <video
              src={courseData.trailerSignedUrl}
              className="h-64 w-full sm:w-98 bg-gray-700 rounded-md mb-4"
              controls
              controlsList="nodownload"
            >
              Trailer video not working
            </video>
            <h1 className="text-2xl font-bold">Preview</h1>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap border-b mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {["Curriculum", "Instructor", "Assignments", "reviews"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-base sm:text-lg font-semibold flex items-center ${
                activeTab === tab
                  ? "text-black border-b-2 border-green-800"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "Curriculum" && (
                <FaBook
                  className={`mr-2 mt-1 ${
                    activeTab === tab && "animate-bounce"
                  }`}
                  size={15}
                />
              )}
              {tab === "Instructor" && (
                <FaUser
                  className={`mr-2 mt-1 ${
                    activeTab === tab && "animate-bounce"
                  }`}
                  size={15}
                />
              )}
              {tab === "Assignments" && (
                <FaFileAlt
                  className={`mr-2 mt-1 ${
                    activeTab === tab && "animate-bounce"
                  }`}
                  size={15}
                />
              )}
              {tab === "reviews" && (
                <FaComments
                  className={`mr-2 mt-1 ${
                    activeTab === tab && "animate-bounce"
                  }`}
                  size={15}
                />
              )}
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        {activeTab === "Curriculum" && (
          <CuricculumsData
            modules={courseData.modules}
            isPurchase={isPurchase}
          />
        )}
        {activeTab === "Instructor" && (
          <InstructorView instructorId={instructorId} isPurchase={isPurchase} />
        )}
        {activeTab === "Assignments" && (
          <AssignmentsView courseID={courseId} isPurchase={isPurchase} />
        )}
        {activeTab === "reviews" && (
          <Reviews courseID={courseId} isPurchase={isPurchase} />
        )}
      </div>
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import { FaBook, FaFileAlt, FaComments, FaUser } from "react-icons/fa";
// import { SiTicktick } from "react-icons/si";
// import useRazorpay, { RazorpayOptions } from "react-razorpay";
// import file from "/Logo/icon/file (1).png";
// import { MdOutlineReport } from "react-icons/md";
// import { useLocation } from "react-router-dom";
// import { ICourse } from "../../services/types";
// import {
//   createPayment,
//   paymentSuccess,
//   viewCoureseDetails,
// } from "../../api/user";
// import { Chip } from "@nextui-org/react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { toast } from "react-toastify";
// import CuricculumsData from "../../Components/Common/CoursesCommon/CuricculumsData";
// import InstructorView from "../../Components/Common/CoursesCommon/InstructorView";
// import AssignmentsView from "../../Components/Common/CoursesCommon/AssignmentsView";
// import Reviews from "../../Components/Common/CoursesCommon/Reviews";
// import ReportModal from "../../Components/User/ReportModal";
// import { motion } from "framer-motion";

// export default function CourseViewPage() {
//   const [courseData, setCourse] = useState<ICourse | null>(null);
//   const [activeTab, setActiveTab] = useState("Curriculum");
//   const [states, setStates] = useState<boolean>(false);
//   const [isPurchase, setIsPurchased] = useState<boolean>(false);
//   const { userInfo } = useSelector((state: RootState) => state.auth);
//   const [Razorpay] = useRazorpay();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const location = useLocation();
//   const course = location.state?.CourseData as string;

//   useEffect(() => {
//     getViewCourse();
//   }, [states]);

//   const getViewCourse = async () => {
//     try {
//       const response = await viewCoureseDetails(course as string, userInfo._id as string);
//       if (response && response.getViewCourses) {
//         setCourse(response.getViewCourses);
//         setIsPurchased(response.isPurchased);
//       } else {
//         console.error("No course data in the response");
//         setCourse(null);
//       }
//     } catch (error) {
//       console.error("Error fetching the course:", error);
//       setCourse(null);
//     }
//   };

//   if (!courseData) {
//     return <div>No course data available</div>;
//   }

//   const instructorId = courseData.instructor_id as string;
//   const courseId = courseData._id as string;

//   const handlePayment = async () => {
//     const order = await createPayment(courseData._id as string);

//     const options: RazorpayOptions = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order?.data.amount,
//       currency: "INR",
//       name: "CoursaTech",
//       description: "Test Transaction",
//       image: file,
//       order_id: order?.data.id,
//       handler: async (res) => {
//         const data = {
//           res: res,
//           courseID: courseData._id,
//           userID: userInfo._id,
//           instructorId:courseData.instructor_id as string,
//         };
//         const paymentData = await paymentSuccess(data);
//         if (paymentData) {
//           toast.success(paymentData.data.message);
//           setStates(true);
//         }
//       },
//       prefill: {
//         name: userInfo.name,
//         email: userInfo.email,
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const rzpay = new Razorpay(options);
//     rzpay.open();
//   };

//   return (
//     <>
//     <div className="w-full h-20 bg-red-300"></div>
//     <div className="max-w-full p-8 mx-auto bg-white rounded-lg shadow-lg">
//       {/* Report Modal */}
//       {isPurchase && (
//         <div className="flex justify-end mb-4">
//           <ReportModal
//             courseId={courseId}
//             userId={userInfo._id}
//             Open={isModalOpen}
//             Close={closeModal}
//           />
//           <button className="flex" onClick={openModal}>
//             <MdOutlineReport size={25} className="text-gray-700" />
//           </button>
//         </div>
//       )}

//       {/* Course Header */}
//       <motion.div
//         className="flex flex-col sm:flex-row justify-between mb-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="flex flex-col items-center sm:items-start">
//           <img
//             className="h-64 w-full sm:w-72 object-cover rounded-md mb-4"
//             src={courseData.thumbnailSignedUrl}
//             alt="Cover Image"
//           />
//           <div className="flex flex-col items-center sm:items-start">
//             <h1 className="text-2xl font-bold mb-2">{courseData.title}</h1>
//             <Chip color="success" variant="dot" className="mb-2">
//               {courseData.category_id.categoryName}
//             </Chip>
//             {isPurchase ? (
//               <Chip
//                 startContent={<SiTicktick size={15} />}
//                 variant="faded"
//                 color="success"
//               >
//                 Purchased
//               </Chip>
//             ) : (
//               <button
//                 className="bg-yellow-400 px-4 py-2 font-bold rounded-md hover:bg-yellow-500 flex items-center"
//                 onClick={handlePayment}
//               >
//                 <FontAwesomeIcon
//                   icon={faShoppingBag}
//                   className="mr-2"
//                 />
//                 <span className="text-sm font-semibold">
//                   Buy ${courseData.price}
//                 </span>
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="flex flex-col items-center sm:items-start md:me-10">
//           <video
//             src={courseData.trailerSignedUrl}
//             className="h-64 w-full sm:w-98 bg-gray-700 rounded-md mb-4"
//             controls
//             controlsList="nodownload"
//           >
//             Trailer video not working
//           </video>
//           <h1 className="text-2xl font-bold">Preview</h1>
//         </div>
//       </motion.div>

//       {/* Tab Navigation */}
//       <motion.div
//         className="flex flex-wrap border-b mb-4"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.4 }}
//       >
//         {["Curriculum", "Instructor", "Assignments", "reviews"].map(tab => (
//           <button
//             key={tab}
//             className={`px-4 py-2 text-base sm:text-lg font-semibold flex items-center ${
//               activeTab === tab
//                 ? "text-black border-b-2 border-green-800"
//                 : "text-gray-500"
//             }`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab === "Curriculum" && <FaBook className={`mr-2 mt-1 ${activeTab === tab && "animate-bounce"}`} size={15} />}
//             {tab === "Instructor" && <FaUser className={`mr-2 mt-1 ${activeTab === tab && "animate-bounce"}`} size={15} />}
//             {tab === "Assignments" && <FaFileAlt className={`mr-2 mt-1 ${activeTab === tab && "animate-bounce"}`} />}
//             {tab === "reviews" && <FaComments className={`mr-2 mt-1 ${activeTab === tab && "animate-bounce"}`} />}
//             {tab}
//           </button>
//         ))}
//       </motion.div>

//       {/* Tab Content */}
//       <div className="transition-all">
//         {activeTab === "Curriculum" && (
//           <CuricculumsData
//             modules={courseData.modules}
//             isPurchase={isPurchase}
//           />
//         )}
//         {activeTab === "Instructor" && (
//           <InstructorView instructorId={courseData.instructor_id} isPurchase={isPurchase} />
//         )}
//         {activeTab === "Assignments" && (
//           <AssignmentsView courseID={courseId} />
//         )}
//         {activeTab === "reviews" && (
//           <Reviews courseID={courseId} isPurchase={isPurchase} />
//         )}
//       </div>
//     </div>
//     </>
//   );
// }
