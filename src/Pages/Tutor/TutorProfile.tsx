import React, { useEffect, useState } from "react";
import { ITutorDetails, Tutor } from "../../services/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  fetchtutorRegisterData,
  profileDataSave,
  uploadProfileImage,
} from "../../api/tutor";
import defaultProfile from "/Logo/images/default profile.jpg";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";

// Add this CSS for the spinner
const spinnerCSS = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #09f;
    animation: spin 1s ease infinite;
  }
`;

export default function TutorProfile() {
  const [registerData, setRegisterData] = useState<Tutor | undefined>(undefined);
  const [instructorDetails, setInstructorDetails] = useState<ITutorDetails | undefined>(undefined);
  const [profileImgUrl, setProfileImgUrl] = useState<string>("");
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const [saveChange, setSaveChange] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);

  useEffect(() => {
    fetchTutorData();
  }, []);

  const fetchTutorData = async () => {
    try {
      const instructorId = tutorInfo._id as string;
      const response = await fetchtutorRegisterData(instructorId);
      setRegisterData(response.data.getInstructorDetails);
      setInstructorDetails(response.data.existDetailsDocument);
      setProfileImgUrl(response.data.profileImgUrl || "");
      setPreviewImage(response.data.profileImgUrl || null);
    } catch (error) {
      console.log(error);
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
      if (saveChangesProfile) {
        console.log(saveChangesProfile.data.message, "profile data");
        toast.success(saveChangesProfile.data.message);
        setSaveChange(false);
      }
    } catch (error) {
      console.error(error);
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

  return (
    <>
      <style>{spinnerCSS}</style>
      <div className="bg-[#0a0e3c] p-8 rounded-lg shadow-md max-w-4xl mx-auto mt-10">
        <div className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative">
              <img
                className="w-32 h-32 rounded-full object-cover border-2 border-black shadow-md"
                src={
                  previewImage ||
                  (profileImgUrl && profileImgUrl !== "nopic"
                    ? profileImgUrl
                    : defaultProfile)
                }
                alt="User Profile"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="mt-4"
            />
            {selectedFile && (
              <Button
                color="danger"
                onClick={handleProfileUpdate}
                className="mt-2"
                disabled={isLoading}
              >
                {isLoading ? <div className="spinner"></div> : "Update Profile Image"}
              </Button>
            )}
          </div>

          <div>
            {saveChange && (
              <div className="flex justify-end mb-4">
                <Button 
                  color="success" 
                  onClick={handleSaveChanges}
                  disabled={isLoading}
                >
                  {isLoading ? <div className="spinner"></div> : "Save Changes"}
                </Button>
              </div>
            )}
          <h3 className="text-sm font-medium text-gray-700">Name</h3>
          <input
            type="text"
            name="name"
            value={registerData?.name || ""}
            onChange={handleInputChange}
            readOnly={isReadOnly}
            className="text-gray-800 bg-gray-100 rounded-md w-full p-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <h3 className="mt-4 text-sm font-medium text-gray-700">Email</h3>
          {registerData?.isGoogle ? (
            <p className="text-gray-800 w-full font-sans rounded-md p-2 bg-gray-100 mt-1">
              {registerData?.email}
              <br />
              <span className="text-xs text-red-400">
                (Can't change the email, as you signed up through Google)
              </span>
            </p>
          ) : (
            <input
              type="email"
              name="email"
              value={registerData?.email || ""}
              onChange={handleInputChange}
              readOnly={isReadOnly}
              className="text-gray-800 bg-gray-100 rounded-md w-full p-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          )}

          <h3 className="mt-4 text-sm font-medium text-gray-700">
            Phone Number
          </h3>
          <input
            type="text"
            name="phone"
            value={registerData?.phone || ""}
            onChange={handleInputChange}
            readOnly={isReadOnly}
            className="text-gray-800 bg-gray-100 rounded-md w-full p-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <h3 className="mt-4 text-sm font-medium text-gray-700">Experience</h3>
          <input
            type="text"
            name="experience"
            value={instructorDetails?.experience || ""}
            onChange={handleInputChange}
            readOnly={isReadOnly}
            className="text-gray-800 bg-gray-100 rounded-md w-full p-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <h3 className="mt-4 text-sm font-medium text-gray-700">Role</h3>
          <input
            type="text"
            name="position"
            value={instructorDetails?.position || ""}
            onChange={handleInputChange}
            readOnly={isReadOnly}
            className="text-gray-800 bg-gray-100 rounded-md w-full p-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <h3 className="mt-4 text-sm font-medium text-gray-700">Company</h3>
          <input
            type="text"
            name="companyName"
            value={instructorDetails?.companyName || ""}
            onChange={handleInputChange}
            readOnly={isReadOnly}
            className="text-gray-800 bg-gray-100 rounded-md w-full p-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">About or Bio</h3>
            <textarea
              name="aboutBio"
              value={instructorDetails?.aboutBio || ""}
              onChange={handleInputChange}
              readOnly={isReadOnly}
              className="text-gray-800 bg-gray-100 rounded-md w-full p-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              rows={5}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
