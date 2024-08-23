import noDataAvailableAnimy from '../../assets/noData.json'
import Lottie from 'lottie-react'


export default function NoCourseDataAnimy() {
  return (
    <div className="flex   justify-center items-center  w-full h-full rounded-md">
        <div className="w-[500px] ">
          <p className="text-green-900 font-mono font-bold flex justify-center">No courses are yours 
          </p>
          <Lottie animationData={noDataAvailableAnimy} loop={true} />
        </div>
      </div>
  )
}
