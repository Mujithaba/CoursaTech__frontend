
import { FaStar, FaChevronDown, FaBook, FaFileAlt, FaComments, FaUser } from 'react-icons/fa';
import {  useNavigate } from 'react-router-dom';
import coverImage from "../../../public/Logo/images/Untitled design (2).png";
import trailer from "../../../public/video/MERN Auth - Google Chrome 2024-07-23 16-21-22.mp4";

export default function CourseViewPage() {
const navigate = useNavigate()
  return (
    <div className="max-full p-8 mx-auto  bg-whiye rounded-lg shadow-md ">
      <div className="ms-32 mb-4">
        <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold mr-2" onClick={()=>navigate('/Courseview/Curriculum')}>Featured</span>
        {/* <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">UX Design</span> */}
      </div>
      <div className="flex ms-32 items-center mb-4">
        <div className="flex text-yellow-400 mr-2">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <span className="text-gray-600 mr-4">(44)</span>
        <span className="text-gray-600">Last Update: Sep 29, 2024</span>
      </div>

      <div className='flex  justify-around m-4'>
      <div >
 <img className='h-72 w-80 rounded-md' src={coverImage} alt="Cover Image" /> 
      <h1 className=" text-3xl font-bold ">JavaScript</h1>
      </div>

      <div >
 
 <video className='h-72 w-98 text-center border-2 border-card text-red-700 rounded-md'  src={trailer} controls>
   traile video not working 
 </video>
      <h1 className=" text-3xl font-bold ">Trailer</h1>
</div></div>
      
      <div className="flex border-b ms-32">
        <button className="flex items-center px-4 py-2 text-purple-600 border-b-2 border-purple-600 font-medium">
          <FaBook className="mr-2" />
          Curriculum
        </button>
        <button className="flex items-center px-4 py-2 text-gray-600 font-medium">
          <FaFileAlt className="mr-2" />
          Assignments
        </button>
        <button className="flex items-center px-4 py-2 text-gray-600 font-medium">
          <FaComments className="mr-2" />
          Reviews
        </button>
        <button className="flex items-center px-4 py-2 text-gray-600 font-medium">
          <FaUser className="mr-2" />
          Instructor
        </button>
      </div>
      
      <div className="mt-4 ms-32 me-28 ">
        <div className="flex justify-between items-center p-4 bg-gray-100 rounded">
          <span className="font-semibold">Intro Course content</span>
          <span className="text-gray-600">02hr 35min</span>
          <FaChevronDown className="text-gray-600" />
        </div>
      </div>
    </div>
  );
  
}
