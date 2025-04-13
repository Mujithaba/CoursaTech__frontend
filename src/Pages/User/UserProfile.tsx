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
import Wallet from "../../Components/User/Wallet";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("Your info");
  const [studentInfo, setStudentInfo] = useState<IStudentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileUril, setProfileUrl] = useState<string>("");
  const [isEdited, setIsEdited] = useState<boolean>(false);

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
      icon: <GrContactInfo size={22} />,
    },
    {
      label: "Change Password",
      icon: <RiLockPasswordLine size={22} />,
    },
    {
      label: "Enrolled Courses",
      icon: <BiSolidPurchaseTagAlt size={22} />,
    },
    { 
      label: "Wallet", 
      icon: <GiWallet size={22} /> 
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header with current section name */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white shadow-md flex items-center px-4 h-16">
        <h1 className="text-lg font-medium mx-auto md:mx-0 md:ml-16">{activeTab}</h1>
      </div>

      {/* Main container */}
      <div className="flex flex-grow pt-16 overflow-hidden">
        {/* Always visible sidebar - icons only on mobile, text + icons on larger screens */}
        <div className="fixed bottom-0 left-0 md:relative md:top-16 z-20 flex md:flex-col bg-white shadow-md md:shadow-none md:border-r border-gray-200">
          {/* Mobile bottom navigation */}
          <div className="flex md:hidden w-full justify-around items-center h-16 border-t border-gray-200">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(item.label)}
                className={`flex flex-col items-center justify-center px-2 py-3 transition-colors ${
                  activeTab === item.label
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                aria-label={item.label}
                title={item.label}
              >
                <div className={`${activeTab === item.label ? "text-blue-600" : "text-gray-600"}`}>
                  {item.icon}
                </div>
              </button>
            ))}
          </div>

          {/* Desktop sidebar */}
          <div className="hidden md:block w-64">
            <ul className="space-y-4 mt-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => setActiveTab(item.label)}
                    className={`w-full flex items-center text-left px-4 py-3 rounded-lg focus:outline-none transition-all duration-200 ${
                      activeTab === item.label
                        ? "bg-gray-300 font-bold shadow-md"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content - adjusted to account for sidebar */}
        <div className="flex-1 p-4 md:p-6 md:ml-64 lg:p-8 bg-gray-50 overflow-y-auto pb-20 md:pb-8">
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