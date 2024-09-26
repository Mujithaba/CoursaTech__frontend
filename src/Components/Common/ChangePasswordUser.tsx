import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface ChangePasswordProps {
  onChangePassword: (currentPassword: string, newPassword: string) => void;
  isGoogle: boolean;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  onChangePassword,
  isGoogle,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error states
  const [currentPasswordError, setCurrentPasswordError] = useState<string | null>(null);
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  // Eye toggle state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setCurrentPasswordError(null);
    setNewPasswordError(null);
    setConfirmPasswordError(null);

    let isValid = true;

    // Validate current password
    if (!currentPassword) {
      setCurrentPasswordError("Current password is required.");
      isValid = false;
    }

    // Validate new password
    if (!newPassword) {
      setNewPasswordError("New password is required.");
      isValid = false;
    } else if (newPassword.length < 6) {
      setNewPasswordError("New password must be at least 6 characters long.");
      isValid = false;
    }

    // Validate confirm password
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match.");
      isValid = false;
    }

    // If all validations pass, trigger the password change
    if (isValid) {
      onChangePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <motion.div
      className="w-full mx-auto bg-white p-8 rounded-lg shadow-lg mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8 flex justify-center">
        Change Password
      </h2>

      {isGoogle ? (
        <p className="text-center text-red-500">
          You cannot change the password because you're signed in with Google.
        </p>
      ) : (
        <form onSubmit={handlePasswordChange} className="space-y-6">
          {/* Current Password */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full mt-1 px-4 py-2 border ${
                  currentPasswordError ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800`}
                aria-invalid={!!currentPasswordError}
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            {currentPasswordError && (
              <p className="text-red-500 text-sm mt-1">{currentPasswordError}</p>
            )}
          </motion.div>

          {/* New Password */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-800"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full mt-1 px-4 py-2 border ${
                  newPasswordError ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800`}
                aria-invalid={!!newPasswordError}
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            {newPasswordError && (
              <p className="text-red-500 text-sm mt-1">{newPasswordError}</p>
            )}
          </motion.div>

          {/* Confirm Password */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full mt-1 px-4 py-2 border ${
                  confirmPasswordError ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800`}
                aria-invalid={!!confirmPasswordError}
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            {confirmPasswordError && (
              <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-gray-950 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Change Password
          </motion.button>
        </form>
      )}
    </motion.div>
  );
};

export default ChangePassword;
