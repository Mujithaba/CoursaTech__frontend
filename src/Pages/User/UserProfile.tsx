import { useEffect, useState } from "react";
import ChangePassword from "../../Components/Common/ChangePasswordUser";
import UserDetails from "../../Components/User/UserDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getUserInfo, updatePassword } from "../../api/user";
import { IStudentInfo } from "../../services/types";
import { toast } from "react-toastify";
import EntrolledCourses from "../../Components/User/EntrolledCourses";
import { GrContactInfo } from "react-icons/gr";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { GiWallet } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import Wallet from "../../Components/User/Wallet";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("Your info");
  const [studentInfo, setStudentInfo] = useState<IStudentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileUril, setProfileUrl] = useState<string>("");
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const userId = userInfo._id as string;

  useEffect(() => {
    getStudentInfo();
  }, [isEdited]);

  // Fetch student data
  const getStudentInfo = async () => {
    try {
      setLoading(true);
      const response = await getUserInfo(userId);
      if (response) {
        setStudentInfo(response?.data.userData);
        setProfileUrl(response.data.profileUril);
      }
    } catch (error) {
      console.error("Failed to fetch student info:", error);
      toast.error("Failed to load user information");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle password change
  const onChangePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      if (!userId) {
        toast.error("User ID is missing");
        return;
      }
      const response = await updatePassword(
        userId,
        currentPassword,
        newPassword
      );

      if (response && response.status === 200) {
        toast.success("Password changed successfully");
      } else {
        toast.error(response?.data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error while changing password:", error);
      toast.error("An error occurred while changing password");
    }
  };

  const updatedUserData = (_: boolean) => {
    setIsEdited(true);
  };

  // Menu items configuration
  const menuItems = [
    {
      label: "Your info",
      icon: <GrContactInfo size={19} className="ms-2" />,
    },
    {
      label: "Change Password",
      icon: <RiLockPasswordLine size={18} />,
    },
    {
      label: "Enrolled Courses",
      icon: <BiSolidPurchaseTagAlt size={18} />,
    },
    { 
      label: "Wallet", 
      icon: <GiWallet size={18} /> 
    },
  ];

  const handleTabClick = (label: string) => {
    setActiveTab(label);
    setMobileSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Persistent top header with menu toggle */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white shadow-md flex items-center justify-between px-4 h-16">
        <div className="flex items-center">
          <button 
            className="md:hidden flex items-center justify-center mr-3"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            aria-label="Toggle menu"
          >
            {mobileSidebarOpen ? 
              <IoMdClose size={24} className="text-gray-700" /> : 
              <RxHamburgerMenu size={24} className="text-gray-700" />
            }
          </button>
          <h1 className="text-lg font-medium">{activeTab}</h1>
        </div>
      </div>

      {/* Main container - adjusted to account for fixed header */}
      <div className="flex flex-grow pt-16 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar - hidden on mobile unless open */}
        <div 
          className={`${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:relative z-30 md:z-10 top-16 left-0 bottom-0 
            w-64 bg-white border-r border-gray-300 p-4 overflow-y-auto transition-transform duration-300 ease-in-out`}
        >
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleTabClick(item.label)}
                  className={`w-full flex items-center text-left px-4 py-3 rounded-lg focus:outline-none transition-all duration-200 ${
                    activeTab === item.label
                      ? "bg-gray-300 font-bold shadow-md"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50 overflow-y-auto w-full">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">Loading...</div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {activeTab === "Your info" && studentInfo && (
                <UserDetails
                  userId={userId}
                  name={studentInfo.name}
                  email={studentInfo.email}
                  phoneNumber={studentInfo.phone}
                  profileImage={
                    profileUril && profileUril !== "nopic"
                      ? profileUril
                      : "https://via.placeholder.com/100"
                  }
                  isBlocked={studentInfo.isBlocked}
                  isGoogle={studentInfo.isGoogle}
                  onSave={updatedUserData}
                />
              )}

              {activeTab === "Change Password" && (
                <ChangePassword 
                  onChangePassword={onChangePassword} 
                  isGoogle={studentInfo?.isGoogle as boolean} 
                />
              )}

              {activeTab === "Enrolled Courses" && (
                <EntrolledCourses userId={userId} />
              )}

              {activeTab === "Wallet" && <Wallet userId={userId} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}






















// import { useEffect, useState } from "react";
// import ChangePassword from "../../Components/Common/ChangePasswordUser";
// import UserDetails from "../../Components/User/UserDetails";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { getUserInfo, updatePassword } from "../../api/user";
// import { IStudentInfo } from "../../services/types";
// import { toast } from "react-toastify";
// import EntrolledCourses from "../../Components/User/EntrolledCourses";
// import { GrContactInfo } from "react-icons/gr";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { BiSolidPurchaseTagAlt } from "react-icons/bi";
// import { GiWallet } from "react-icons/gi";
// import Wallet from "../../Components/User/Wallet";

// export default function UserProfile() {
//   const [activeTab, setActiveTab] = useState("Your info");
//   const [studentInfo, setStudentInfo] = useState<IStudentInfo | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [profileUril, setProfileUrl] = useState<string>("");
//   const [isEdited, setIsEdited] = useState<boolean>(false);

//   const { userInfo } = useSelector((state: RootState) => state.auth);
//   const userId = userInfo._id as string;

//   useEffect(() => {
//     getStudentInfo();
//   }, [isEdited]);

//   // Fetch student data
//   const getStudentInfo = async () => {
//     try {
//       setLoading(true);
//       const response = await getUserInfo(userId);
//       if (response) {
//         setStudentInfo(response?.data.userData);
//         setProfileUrl(response.data.profileUril);
//       }
//     } catch (error) {
//       console.error("Failed to fetch student info:", error);
//       toast.error("Failed to load user information");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle password change
//   const onChangePassword = async (
//     currentPassword: string,
//     newPassword: string
//   ) => {
//     try {
//       if (!userId) {
//         toast.error("User ID is missing");
//         return;
//       }
//       const response = await updatePassword(
//         userId,
//         currentPassword,
//         newPassword
//       );

//       if (response && response.status === 200) {
//         toast.success("Password changed successfully");
//       } else {
//         toast.error(response?.data.message || "Failed to change password");
//       }
//     } catch (error) {
//       console.error("Error while changing password:", error);
//       toast.error("An error occurred while changing password");
//     }
//   };

//   const updatedUserData = (_: boolean) => {
//     setIsEdited(true);
//   };

//   // Menu items configuration
//   const menuItems = [
//     {
//       label: "Your info",
//       icon: <GrContactInfo size={19} className="ms-2" />,
//     },
//     {
//       label: "Change Password",
//       icon: <RiLockPasswordLine size={18} />,
//     },
//     {
//       label: "Enrolled Courses",
//       icon: <BiSolidPurchaseTagAlt size={18} />,
//     },
//     { 
//       label: "Wallet", 
//       icon: <GiWallet size={18} /> 
//     },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Top spacer */}
//       <div className="w-full h-20 bg-gray-100"></div>

//       {/* Main container */}
//       <div className="flex flex-grow overflow-hidden">
//         {/* Sidebar */}
//         <div className="w-64 bg-white border-r border-gray-300 p-4 overflow-y-auto">
//           <ul className="space-y-4 mt-8">
//             {menuItems.map((item, index) => (
//               <li key={index}>
//                 <button
//                   onClick={() => setActiveTab(item.label)}
//                   className={`w-full flex items-center text-left px-4 py-3 rounded-lg focus:outline-none transition-all duration-200 ${
//                     activeTab === item.label
//                       ? "bg-gray-300 font-bold shadow-md"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   {item.icon && <span className="mr-3">{item.icon}</span>}
//                   {item.label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-4 sm:p-8 lg:p-12 bg-gray-50 overflow-y-auto">
//           {loading ? (
//             <div className="text-center text-gray-500">Loading...</div>
//           ) : (
//             <>
//               {activeTab === "Your info" && studentInfo && (
//                 <UserDetails
//                   userId={userId}
//                   name={studentInfo.name}
//                   email={studentInfo.email}
//                   phoneNumber={studentInfo.phone}
//                   profileImage={
//                     profileUril && profileUril !== "nopic"
//                       ? profileUril
//                       : "https://via.placeholder.com/100"
//                   }
//                   isBlocked={studentInfo.isBlocked}
//                   isGoogle={studentInfo.isGoogle}
//                   onSave={updatedUserData}
//                 />
//               )}

//               {activeTab === "Change Password" && (
//                 <ChangePassword 
//                   onChangePassword={onChangePassword} 
//                   isGoogle={studentInfo?.isGoogle as boolean} 
//                 />
//               )}

//               {activeTab === "Enrolled Courses" && (
//                 <EntrolledCourses userId={userId} />
//               )}

//               {activeTab === "Wallet" && <Wallet userId={userId} />}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }