import  {FaStar,
FaChevronDown,
FaBook,
FaFileAlt,
FaComments,
FaUser,
} from "react-icons/fa";

export default function courseLayoutsTut() {
  return (
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
  </div>
  )
}
