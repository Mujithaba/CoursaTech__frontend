import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Check, X } from 'lucide-react';
import { FiEdit } from "react-icons/fi";
import { IStudentInfo } from '../../services/types'; // Adjust the import path
import { updateUserData } from '../../api/user';
import { toast } from 'react-toastify';

interface UserDetailsProps {
    userId:string;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  // onSave: (updatedData: IStudentInfo) => void; // Updated type
}

const UserDetails: React.FC<UserDetailsProps> = ({userId, name, email, phoneNumber, profileImage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);
  const [editPhoneNumber, setEditPhoneNumber] = useState(phoneNumber);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phoneNumber?: string }>({});

  const [originalValues, setOriginalValues] = useState({
    name,
    email,
    phoneNumber,
    profileImage,
  });

  useEffect(() => {
    setOriginalValues({
      name,
      email,
      phoneNumber,
      profileImage,
    });
  }, [name, email, phoneNumber, profileImage]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const validateFields = (): boolean => {
    const newErrors: { name?: string; email?: string; phoneNumber?: string } = {};
    let isValid = true;

    if (editName.trim() === '') {
      newErrors.name = 'Name is required.';
      isValid = false;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,}$/.test(editEmail)) {
      newErrors.email = 'Email is invalid.';
      isValid = false;
    }
    if (!/^\d{10}$/.test(editPhoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveClick = async () => {
    if (validateFields()) {
      setIsEditing(false);
      const formData = new FormData();
  
      formData.append('userId', userId);
      formData.append('name', editName);
      formData.append('email', editEmail);
      formData.append('phoneNumber', editPhoneNumber);
  
      if (newProfileImage) {
        formData.append('profileImage', newProfileImage);
      }
  
      try {
        const response = await updateUserData(formData);
  
        if (response) {
          toast.success(response.data.message)
          // onSave(response.data.updatedUser);
        }
      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewProfileImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mt-10 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex justify-center mb-6">
        <img
          src={currentProfileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
        />
        {isEditing && (
          <button
            onClick={triggerFileInput}
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg"
          >
            <Edit2 size={16} />
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">User Details</h2>

      <div className="text-center mb-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveClick}
              className="bg-green-500 text-white px-4 py-2 rounded-lg focus:outline-none mr-2"
            >
              <Check size={16} className="inline mr-1" /> Save
            </button>
            <button
              onClick={handleEditClick}
              className="bg-red-500 text-white px-4 py-2 rounded-lg focus:outline-none"
            >
              <X size={16} className="inline mr-1" /> Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none"
          >
            <FiEdit size={20} className="inline mr-1" /> Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm">
          <div className="w-full text-sm font-semibold text-gray-700 mb-1">Name:</div>
          <div className="w-full text-sm text-gray-900">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </>
            ) : (
              <span>{editName}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm">
          <div className="w-full text-sm font-semibold text-gray-700 mb-1">Email:</div>
          <div className="w-full text-sm text-gray-900">
            {isEditing ? (
              <>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </>
            ) : (
              <span>{editEmail}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm">
          <div className="w-full text-sm font-semibold text-gray-700 mb-1">Phone Number:</div>
          <div className="w-full text-sm text-gray-900">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editPhoneNumber}
                  onChange={(e) => setEditPhoneNumber(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </>
            ) : (
              <span>{editPhoneNumber}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDetails;
