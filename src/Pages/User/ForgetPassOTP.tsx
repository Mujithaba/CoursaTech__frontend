import { useState, FormEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { forgotOTPverify, resendOTP } from "../../api/user";
import errorHandler from "../../api/error";
import { toast } from "react-toastify";
import signupImage from "/Logo/images/ai-generated-8309926_1280.jpg";

function ForgetPassOTP() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [resendButton, setShowResendButton] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setShowResendButton(true);
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  const navigate = useNavigate();

  const location = useLocation();
  const roleData = location.state;
  // console.log(roleData);
  
  const role = "user";

  const data = { otp, role, roleData };

  const handleResendOtp = async () => {
    setShowResendButton(false);
    setTimer(30);

    let response = await resendOTP(roleData.name, roleData.email);
    console.log(response, "resendotp data");

    if (response) {
      toast.success(response.data.message);
    }
  };

  const submitOtp = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      console.log("otp1111");

      let response = await forgotOTPverify(data);
      console.log(response, "otp page");
      
      if (response) {
        if (response.status === 200) {
          
          toast.success(response.data.message);  // Show success message
          navigate("/resetPassword", {
            state: {
              email: response.data.data.email
            }
          });
        } else if (response.status === 400) {
          toast.error(response.data.message);  // Show error message
        }
      }

      // toast.success(response)
    } catch (error: any) {
      errorHandler(error);
    }
  };

  return (
    <div className="w-full min-h-screen  bg-gray-900 flex justify-center items-center">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={signupImage}
        alt="signupImage"
      />
      <div className="relative w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-lg shadow-red-400">
        <h2 className="text-center text-black text-2xl font-bold mb-4">Enter OTP</h2>
        <form onSubmit={submitOtp}>
          <div className="mb-4 flex justify-center items-center">
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block  w-28 px-3 py-1 border-b-2 text-black bg-white border-gray-300 focus:outline-none focus:border-indigo-700 text-center font-bold tracking-wide sm:w-40 lg:w-48"
              placeholder="OTP"
              required
            />
          </div>
          <div className="mt-4 flex justify-center items-center">
            <button
              type="submit"
              className="w-36 py-2 px-2 bg-indigo-600 text-white font-bold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-48 lg:w-40"
            >
              Submit OTP
            </button>
          </div>
        </form>

        <div className="mt-4 text-black flex justify-center items-center">
          {resendButton ? (
            <button
              className=" text-sm  px-3 py-2 rounded bg-green-500 hover:bg-green-400"
              onClick={handleResendOtp}
            >
              Resend OTP
            </button>
          ) : (
            <p>
              Resend OTP in: <b>{timer}</b>{" "}
              <span className="text-sm">seconds </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgetPassOTP;
