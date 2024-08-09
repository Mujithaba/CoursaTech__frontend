import Lottie from "lottie-react";
import uploading from "../../assets/uploading.json";

export default function Uploading() {
    return (
        <div className="flex justify-center items-center w-full h-full">
        <div className="w-80 h-80">
          <Lottie animationData={uploading} loop={true} />
        </div>
      </div>
      );
    };






 


