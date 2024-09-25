import { useEffect, useState } from "react";
import ChangePassword from "../../Components/Common/ChangePasswordUser";
import UserDetails, { updateData } from "../../Components/User/UserDetails";
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
      console.log("Current Password:", currentPassword);
      console.log("New Password:", newPassword);
      if (!userId) {
        console.error("User ID is missing.");
        return;
      }
      const response = await updatePassword(
        userId,
        currentPassword,
        newPassword
      );

      if (response && response.status === 200) {
        toast.success("Password changed successfully");
        console.log("Password changed successfully.");
      } else {
        console.error("Failed to change password:", response?.data.message);
      }
    } catch (error) {
      console.error("Error while changing password:", error);
    }
  };

  const updatedUserData = (userData: boolean) => {
    setIsEdited(true);
  };

  return (
    <>
      <div className="w-full h-20 bg-gray-100"></div>

      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-1/4 bg-white border-r border-gray-300 p-4 ">
          <hr className="bg-red-500 font-extrabold" />

          {/* Menu Items */}
          <ul className="space-y-2 mt-16">
            {[
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
              { label: "Wallet", icon: <GiWallet size={18} /> },
            ].map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center text-left px-4 py-2 rounded-md focus:outline-none ${
                    activeTab === item.label
                      ? "bg-gray-300 font-bold"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {loading && <div className="text-center">Loading...</div>}
          {!loading && activeTab === "Your info" && studentInfo && (
            <UserDetails
              userId={userId}
              name={studentInfo.name}
              email={studentInfo.email}
              phoneNumber={studentInfo.phone}
              profileImage={
                profileUril && profileUril != "nopic"
                  ? profileUril
                  : "https://via.placeholder.com/100"
              }
              isBlocked={studentInfo.isBlocked}
              isGoogle={studentInfo.isGoogle}
              onSave={updatedUserData}
            />
          )}
          {activeTab === "Change Password" && (
            <ChangePassword onChangePassword={onChangePassword} />
          )}
          {activeTab === "Enrolled Courses" && (
            <EntrolledCourses userId={userId} />
          )}
          {activeTab === "Wallet" && <Wallet userId={userId} />}
        </div>
      </div>
    </>
  );
}
