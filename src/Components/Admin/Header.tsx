import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { fetchNotApprovedCourses } from "../../api/admin";
import { ICourse } from "../../services/types";

function Header() {
  const [_, setIsInvisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [count, setCount] = useState(Number);

  
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    handleUnapproveCourses();
  }, [isOpen]);

  const handleUnapproveCourses = async () => {
    setIsInvisible(true);
    try {
      const response = await fetchNotApprovedCourses();
      if (response && response.getUnapproCourses) {
        console.log(response.getUnapproCourses, "getInstructorCourses");
        setCourses(response.getUnapproCourses);
        setCount(response.totalUnverify);
      } else {
        console.error("No courses data in the response");
        setCourses([]);
      }
    } catch (error) {
      console.log("course approve fetching facing have some issues");
      setCourses([]);
    }
  };

  console.log(courses, "courses");
  console.log(count, "courses...........");

  return (
    <header className="bg-teal-900 text-black flex justify-between items-center p-4 mt-3 ms-8 me-2 rounded-lg">
      <div className="text-xl font-bold"></div>
      <div className="flex items-center">
        {/* <div className="me-6 mt-2">
          <Badge content="9" shape="circle" color="danger">
            <Button
              radius="full"
              isIconOnly
              aria-label="more than 99 notifications"
              variant="bordered"
              onClick={openModal}
            >
              <NotificationIcon size={33} />
            </Button>
          </Badge>
        </div> */}
        <button className="rounded-md bg-gray-800 p-2 focus:outline-none">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 6h18M3 12h18m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
          onClick={closeModal}
        >
          <div
            className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Notifications
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  You have 9 new notifications.
                </p>
              </div>
              <div className="items-center px-4 py-3 flex justify-between">
                {/* <button
                  onClick={handleApproveModal}
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Approve All
                </button> */}
                <Button
                  color="warning"
                  onClick={closeModal}
                  className="px-4 py-2  text-white text-base font-medium rounded-md shadow-sm   "
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

// import { BsBellFill } from "react-icons/bs";
// import NotificationIcon from "../Ui/NotificationIcon";
// import { Badge } from "@nextui-org/badge";
// import React, { useState } from "react";
// import { Button } from "@nextui-org/react";

// function Hearder() {
//   const [isInvisible, setIsInvisible] = useState(false);

//   const handleApproveModal =()=>{
//     setIsInvisible(true)
//   }

//     return (
//       <header className="  bg-teal-900 text-black flex justify-between items-center p-4 mt-3 ms-8 me-2 rounded-lg">
//       <div className="text-xl font-bold"></div>
//       <div className="flex items-center">
//         {/* <input
//           type="text"
//           placeholder="Search..."
//           className="bg-gray-200 text-black rounded-lg p-2 mr-4 focus:outline-none"
//         /> */}
//         <div className="me-6 mt-2">

//         <Badge  content="9" shape="circle" color="danger">
//       <Button
//         radius="full"
//         isIconOnly
//         aria-label="more than 99 notifications"
//         variant="bordered"

//         onClick={handleApproveModal}
//       >
//         <NotificationIcon size={33} />

//       </Button>
//     </Badge>
//         </div>
//         <button className="rounded-md bg-gray-800 p-2 focus:outline-none">
//           <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M3 12h18m-7 6h7"></path>
//           </svg>
//         </button>
//       </div>
//     </header>
//     )
//   }
//   export default Hearder;
