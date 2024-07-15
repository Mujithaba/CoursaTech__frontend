import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate,Link } from "react-router-dom";
import signupImage from "/Logo/images/ai-generated-8309926_1280.jpg";
import { FcGoogle } from "react-icons/fc";
import { signup } from "../../api/user";
import { toast } from "react-toastify";
import validator from "validator";

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const SignupPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  //error state handle
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();

  //form validation
  const validateForm = () => {
    const newErrors: Errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim() || !validator.isEmail(email)) {
      newErrors.email = "Valid email is required";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phone.length < 10 || phone.length > 10) {
      newErrors.phone = "Phone number must contain 10 numbers";
    }

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
        const userData = {
          name: name,
          email: email,
          phone: phone,
          password: password,
        };

        const response = await signup(userData);

        if (response) {
          toast.success(response.data.message);
          navigate("/otpVerify", {
            state: {
              name: name,
              email: email,
              phone: phone,
              password: password,
            },
          });
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
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={signupImage}
        alt="signupImage"
      />

      <div className=" relative w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4 text-black">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-sans text-black font-medium">
              Name
            </label>
            <input
              className="border text-black bg-gray-200 p-2 rounded-md h-9"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleInputChange(setName)}
              required
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm text-black font-sans font-medium">
              Email
            </label>
            <input
              className="border bg-gray-200 text-black p-2 rounded-md h-9 border-none"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange(setEmail)}
              required
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm text-black font-sans font-medium">
              Phone
            </label>
            <input
              className="border bg-gray-200 p-2 text-black rounded-md h-9"
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={phone}
              onChange={handleInputChange(setPhone)}
              required
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
          <div className="flex justify-between max-md:flex-col">
            <div className="flex flex-col ">
              <label
                htmlFor="password"
                className="text-sm font-sans text-black font-medium"
              >
                Password
              </label>
              <input
                className="border text-black bg-gray-200 p-2 rounded-md h-9"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
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
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md"
          >
            Sign up
          </button>
          <p className="text-gray-600 mt-3 mb-3 text-center">
            Already have an acoount? 
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
          <hr className="border-red-950" />
          <div className="flex justify-center">
            <button className="flex text-black items-center bg-white py-2 px-2 border border-gray-200 rounded-md hover:bg-gray-200">
              <FcGoogle className="mr-1" /> Sign up with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
