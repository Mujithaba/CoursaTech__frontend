import React, { useState, FormEvent, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newPasswordSet } from "../../api/tutor";

interface Errors {
  password?: string;
  confirmPassword?: string;
}

export default function ForgotNewPass() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  //error state handle
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;
  console.log(email, "location11");

  //form validation
  const validateForm = () => {
    const newErrors: Errors = {};

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must contain atleast 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not matching";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //form handle submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();

      const isValid = validateForm();
      if (isValid) {
        console.log(email, password, "kkkk");
        const response = await newPasswordSet(email, password);

        if (response) {
          toast.success(response.data.message);
          navigate("/tutor/tutorLogin");
        }
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <div className="relative w-full  min-h-screen bg-gray-900 flex justify-center items-center ">
      <div className=" relative w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4 text-black">
          Enter New Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div className="flex justify-between max-md:flex-col"> */}
            <div className="flex flex-col ">
              <label
                htmlFor="password"
                className="text-sm font-sans text-black font-medium"
              >
                New Password
              </label>
              <input
                className="border text-black bg-gray-200 p-2 rounded-md h-9"
                type="password"
                id="password"
                name="password"
                placeholder="Enter New Password"
                value={password}
                onChange={handleInputChange(setPassword)}
                required
              />
              {errors.password && (
                <p className="text-sm  text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="flex flex-col max-md:mt-3">
              <label
                htmlFor="confirmpass"
                className="text-sm font-sans text-black font-medium"
              >
                Confirm Password
              </label>
              <input
                className="border text-black bg-gray-200 p-2 rounded-md h-9 border-none"
                type="password"
                id="confirmpass"
                name="confirmpass"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleInputChange(setConfirmPassword)}
                required
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          {/* </div> */}

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
