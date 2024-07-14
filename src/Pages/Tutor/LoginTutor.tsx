import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import { setCredentials } from '../../redux/slices/tutorSlice';
import { login } from '../../api/tutor';
import { FcGoogle } from "react-icons/fc";
import loginbg from "/Logo/images/tutorSignup-bg.jpg"


export default function LoginTutor() {


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
      return Object.keys(newErrors).length === 0
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const isValid = validateForm();
  
      if (isValid) {
        const data = {
          email:email,
          password:password
        }
  
        const response  = await login(data)
        
        if (response) {
          
          console.log(response.data.message,"jiiii");
          if (response.data.isAdmin) {
            
          } else {
            console.log(response);
            localStorage.setItem('token',response.data.token)
            dispatch(setCredentials(response.data.message))
            navigate('/tutor/tuturDashboard')
          }
        } 
        
      }
  
  
    };
  

  return (
    <div className="relative w-full min-h-screen bg-gray-900 flex justify-center items-center">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={loginbg}
        alt="loginImage"
      />

      <div className="relative w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-sans font-medium">
              Email
            </label>
            <input
              className="border bg-gray-200 p-2 rounded-md h-9"
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
            <label htmlFor="password" className="text-sm font-sans font-medium">
              Password
            </label>
            <input
              className="border bg-gray-200 p-2 rounded-md h-9"
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
            <Link  to="/register" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
          <hr className="border-red-950" />
          <div className="flex justify-center">
            <button className="flex items-center bg-white py-2 px-2 border border-gray-200 rounded-md hover:bg-gray-200">
              <FcGoogle className="mr-1" /> Login with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
