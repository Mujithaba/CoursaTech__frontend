import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { OTPverify } from "../../api/user";
import errorHandler from "../../api/error";


function Otp() {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const userData = location.state;

  const submitOtp = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault()
      const data = { otp, userData };
      let response = await OTPverify(data);
console.log(response);

      // toast.success(response)
    } catch (error:any) {
      errorHandler(error)
    }
  };

  return (
    <div className="w-full min-h-screen  bg-slate-950 flex justify-center items-center">
      <div className="relative w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-lg shadow-red-500">
        <h2 className="text-center text-2xl font-bold mb-4">Enter OTP</h2>
        <form onSubmit={submitOtp}>
          <div className="mb-4 flex justify-center items-center">
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-28 px-3 py-1 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-700 text-center font-bold tracking-wide sm:w-40 lg:w-48"
              placeholder="OTP"
              required
            />
          </div>
          <div className="mt-4 flex justify-center items-center">
            <button
              type="submit"
              className="w-36 py-2 px-4 bg-indigo-600 text-white font-bold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-48 lg:w-56"
            >
              Submit OTP
            </button>
          </div>
        </form>
        <div>
          <p>timer</p>
        </div>
        {/* Additional content like timer and resend OTP button */}
      </div>
    </div>
  );
}

export default Otp;
