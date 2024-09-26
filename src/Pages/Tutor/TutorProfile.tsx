import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import {
  fetchtutorRegisterData,
  profileDataSave,
  updateTutorPassword,
  uploadProfileImage,
} from "../../api/tutor";
import ChangePassword from "../../Components/Common/ChangePasswordUser";
import defaultProfile from "/Logo/images/default profile.jpg";
import { ITutorDetails, Tutor } from "../../services/types";
import { RootState } from "../../redux/store";
import { setCredentials } from "../../redux/slices/tutorSlice";

const TutorProfile: React.FC = () => {
  const [registerData, setRegisterData] = useState<Tutor | undefined>(
    undefined
  );
  const [instructorDetails, setInstructorDetails] = useState<
    ITutorDetails | undefined
  >(undefined);
  const [profileImgUrl, setProfileImgUrl] = useState<string>("");
  const [isReadOnly, _] = useState<boolean>(false);
  const [saveChange, setSaveChange] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchTutorData();
  }, []);

  const fetchTutorData = async () => {
    try {
      const instructorId = tutorInfo._id;
      const response = await fetchtutorRegisterData(instructorId);
      setRegisterData(response.data.getInstructorDetails);
      setInstructorDetails(response.data.existDetailsDocument);
      setProfileImgUrl(response.data.profileImgUrl || "");
      setPreviewImage(response.data.profileImgUrl || null);
    } catch (error) {
      console.error("Error fetching tutor data:", error);
      toast.error("Failed to load profile data. Please try again.");
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSaveChange(true);

    if (
      registerData &&
      (name === "name" || name === "phone" || name === "email")
    ) {
      setRegisterData((prevData) =>
        prevData ? { ...prevData, [name]: value } : prevData
      );
    }

    if (
      instructorDetails &&
      (name === "experience" ||
        name === "position" ||
        name === "companyName" ||
        name === "aboutBio")
    ) {
      setInstructorDetails((prevData) =>
        prevData ? { ...prevData, [name]: value } : prevData
      );
    }
  };

  const handleSaveChanges = async () => {
    if (!registerData || !instructorDetails) {
      toast.error("Missing data. Please ensure all fields are filled.");
      return;
    }

    setIsLoading(true);
    try {
      const saveChangesProfile = await profileDataSave(
        registerData,
        instructorDetails
      );
      console.log(saveChangesProfile, "saveChangesProfile");

      if (saveChangesProfile) {
        const updateStore = saveChangesProfile.data.updateRegister;
        dispatch(setCredentials(updateStore));
        toast.success(saveChangesProfile.data.message);

        setSaveChange(false);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async () => {
    if (!selectedFile) {
      toast.error("No file selected");
      return;
    }

    setIsLoading(true);
    const instructorId = tutorInfo._id as string;
    try {
      const response = await uploadProfileImage(selectedFile, instructorId);
      if (response) {
        toast.success("Profile image updated successfully");
        setInstructorDetails((prevDetails) =>
          prevDetails
            ? { ...prevDetails, profileImgUrl: response.newImageUrl }
            : prevDetails
        );
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      toast.error("Failed to update profile image");
    } finally {
      setIsLoading(false);
    }
  };

  const saveChangePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    console.log(currentPassword, newPassword, "currentPassword, newPassword");
    try {
      console.log("Current Password:", currentPassword);
      console.log("New Password:", newPassword);
      if (!tutorInfo._id) {
        console.error("User ID is missing.");
        return;
      }
      const response = await updateTutorPassword(
        tutorInfo._id as string,
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

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 p-8">
            <div className="space-y-6">
              <div className="relative">
                <img
                  className="h-40 w-40 rounded-full object-cover border-4 border-indigo-500 shadow-lg mx-auto"
                  src={
                    previewImage ||
                    (profileImgUrl && profileImgUrl !== "nopic"
                      ? profileImgUrl
                      : defaultProfile)
                  }
                  alt="User Profile"
                />
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-1/4 bg-indigo-500 rounded-full p-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              {selectedFile && (
                <Button
                  color="primary"
                  onClick={handleProfileUpdate}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? "Updating..." : "Update Profile Image"}
                </Button>
              )}
              <Button
                color="secondary"
                onClick={() => setShowChangePassword(!showChangePassword)}
                className="w-full"
              >
                {showChangePassword
                  ? "Hide Password Change"
                  : "Change Password"}
              </Button>
            </div>
          </div>
          <div className="p-8 flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Tutor Profile
            </h2>
            {showChangePassword ? (
              <ChangePassword onChangePassword={saveChangePassword} isGoogle={registerData?.isGoogle as boolean}/>
            ) : (
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={registerData?.name || ""}
                    onChange={handleInputChange}
                    readOnly={isReadOnly}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  {registerData?.isGoogle ? (
                    <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 p-2 text-gray-500">
                      {registerData?.email}
                      <span className="block text-xs text-red-500 mt-1">
                        (Can't change the email, as you signed up through
                        Google)
                      </span>
                    </p>
                  ) : (
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={registerData?.email || ""}
                      onChange={handleInputChange}
                      readOnly={isReadOnly}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={registerData?.phone || ""}
                    onChange={handleInputChange}
                    readOnly={isReadOnly}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    id="experience"
                    value={instructorDetails?.experience || ""}
                    onChange={handleInputChange}
                    readOnly={isReadOnly}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    name="position"
                    id="position"
                    value={instructorDetails?.position || ""}
                    onChange={handleInputChange}
                    readOnly={isReadOnly}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    value={instructorDetails?.companyName || ""}
                    onChange={handleInputChange}
                    readOnly={isReadOnly}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="aboutBio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    About or Bio
                  </label>
                  <textarea
                    name="aboutBio"
                    id="aboutBio"
                    value={instructorDetails?.aboutBio || ""}
                    onChange={handleInputChange}
                    readOnly={isReadOnly}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                {saveChange && (
                  <div className="mt-4">
                    <Button
                      color="success"
                      onClick={handleSaveChanges}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
