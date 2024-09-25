import Lottie from "lottie-react";
import uploading from "../../assets/uploading.json";

export default function Uploading() {
  return (
    <div className="flex justify-center items-center  w-full h-full rounded-md">
      <div className="w-80 h-80">
        <Lottie animationData={uploading} loop={true} />
        <p className="text-black font-mono font-bold mr-5">
          <span className="text-red-600 font-bold">Don't go back</span>
          <br />
          Files are uploading...
        </p>
      </div>
    </div>
  );
}
