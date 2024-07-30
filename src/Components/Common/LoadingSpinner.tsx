import Lottie from "lottie-react";
import lazyLoadin from "../../assets/lazyLoading.json";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="w-60 h-60">
        <Lottie animationData={lazyLoadin} loop={true} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
