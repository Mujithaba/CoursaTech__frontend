import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPasswordEmail } from "../../api/user";
import CloseIcon from "@mui/icons-material/Close";

export default function ForgotUser() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { email?: string } = {};
    if (!email) newErrors.email = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(email, "email");

    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const response = await forgotPasswordEmail(email);
      if (response) {
        toast.success(response.data.message);
        navigate("/forgotPassOTP", {
          state: {
            name: response.data.userData.name,
            email: response.data.userData.email,
            phone: response.data.userData.phone,
            password: response.data.userData.password,
          },
        });
      }
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <div className="relative w-full min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="relative w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-end mb-4">
        <button
            type="button"
            className="py-2 px-4 rounded-md"
            onClick={() => navigate("/login")}
          >
            <CloseIcon style={{ color: 'black' }}/>
          </button>
        </div>
        <h2 className="text-xl font-bold text-center mb-4 text-black">
          Forget Passwrod Recovery
        </h2>
      
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm text-black font-sans font-medium"
            >
              Email
            </label>
            <input
              className="border text-black bg-gray-200 p-2 rounded-md h-9"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange(setEmail)}
              // required
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

         

          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="w-50 py-2 px-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
