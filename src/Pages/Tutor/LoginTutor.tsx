import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCredentials } from "../../redux/slices/tutorSlice";
import { googleIN, login } from "../../api/tutor";
import { FcGoogle } from "react-icons/fc";
import loginbg from "/Logo/images/tutorSignup-bg.jpg";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginTutor() {
  const [tutor, setTutor] = useState<{ access_token: string } | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const data = {
        email: email,
        password: password,
      };

      const response = await login(data);

      if (response) {
        console.log(response.data.message, "jiiii");
        if (response.data.isAdmin) {
        } else {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          dispatch(setCredentials(response.data.message));
          navigate("/tutor/tuturDashboard");
        }
      }
    }
  };

  // google login
  const handleGoogleLogin = () => {
    loginWithGoogle();
  };
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (response) => setTutor(response),
    onError: (error) => console.log("login failed", error),
  });

  useEffect(() => {
    const fetchingGRes = async () => {
      try {
        if (tutor) {
          const res = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tutor.access_token}`
          );
          console.log(res, "res data");

          const data = {
            name: res.data.name,
            email: res.data.email,
            phone: "empty",
            password: res.data.id,
            isGoogled: true,
          };

          const responseGoogle = await googleIN(data);

          console.log(responseGoogle, "responseGoogle");

          if (responseGoogle) {
            localStorage.setItem("token", responseGoogle.data.token);
            dispatch(setCredentials(responseGoogle.data.message));
            navigate("/tutor/tuturDashboard");
          }
        }
      } catch (error) {
        console.log("Error fetching tutor info:", error);
      }
    };

    fetchingGRes();
  }, [tutor, dispatch, navigate]);

  return (
    <div className="relative w-full min-h-screen bg-gray-900 flex justify-center items-center">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={loginbg}
        alt="loginImage"
      />

      <div className="relative w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4 text-black">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm text-black font-sans font-medium"
            >
              Email
            </label>
            <input
              className="border bg-gray-200 p-2 text-black rounded-md h-9"
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
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm text-black font-sans font-medium"
            >
              Password
            </label>
            <input
              className="border bg-gray-200 p-2 text-black rounded-md h-9"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange(setPassword)}
              // required
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md"
          >
            Login
          </button>
          <p className="text-gray-600 mt-3 mb-3 text-center">
            Don't have an account?{" "}
            <Link
              to="/tutor/register"
              className="text-indigo-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
          <hr className="border-red-950" />
          <div className="flex justify-center">
            <button
              className="flex items-center text-black bg-white py-2 px-2 border border-gray-200 rounded-md hover:bg-gray-200"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="mr-1" /> Login with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
