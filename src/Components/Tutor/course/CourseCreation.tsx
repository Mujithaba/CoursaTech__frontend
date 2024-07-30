import React, { useEffect, useState } from "react";
// import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../redux/slices/tutorSlice";
import { tutorUpdateCheck } from "../../../api/tutor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface Lecture {
  title: string;
  content: string;
}

export default function CourseCreation() {
  const [activeTab, setActiveTab] = useState("basicInfo");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [lessons, setLessons] = useState("");
  const [price ,setPrice] = useState("90")
  const [lectures, setLectures] = useState<Lecture[]>([
    { title: "", content: "" },
  ]);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);

  const fetchUpdateData = async () => {
    try {
      if (tutorInfo) {
        console.log(tutorInfo._id, "jjjj");

        const response = await tutorUpdateCheck(tutorInfo._id);
        console.log(response, "home response");
        if (response.data.data) {
          if (response.data.data.isBlocked) {
            dispatch(logOut());
            navigate("/login");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUpdateData();
  }, []);

  

  const handleAddLecture = () => {
    setLectures([...lectures, { title: "", content: "" }]);
  };

  const handleLectureChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const newLectures = lectures.map((lecture, i) => {
      if (index === i) {
        return { ...lecture, [name]: value };
      }
      return lecture;
    });
    setLectures(newLectures);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic
    console.log({
      title,
      subtitle,
      category,
      lessons,
      lectures,
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-1 px-5 bg-gray-50 shadow-sm  mb-4 pb-3">
      {/* close page icon*/}
      {/* <div className="flex justify-end py-4">
        <button
          type="button"
          className="py-2 px-4 rounded-md"
          onClick={() => navigate("/tutor/Course")} 
        >
          <CloseIcon style={{ color: "black" }} />
        </button>
      </div> */}

      <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
        Create a New Course
      </h2>
      <div className="flex mb-3 border-b border-gray-200">
        <button
          className={`px-4 py-2 text-lg font-semibold ${
            activeTab === "basicInfo"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("basicInfo")}
        >
          Basic Information
        </button>
        <button
          className={`ml-4 px-4 py-2 text-lg font-semibold ${
            activeTab === "curriculum"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("curriculum")}
        >
          Curriculum
        </button>
      </div>

      {activeTab === "basicInfo" && (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Course Thumbnail
              </h3>
              <div className="w-40 h-40 bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Upload Image
                </button>
              </div>
              {/* <p className="text-gray-500 mt-2 text-sm text-center">Upload your course thumbnail here. Important guidelines: 1200*800 pixels or 12:8 Ratio. Supported format: .jpg, .jpeg, or .png</p> */}
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Course Trailer
              </h3>
              <div className="w-40 h-40 bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Upload Video
                </button>
              </div>
              {/* <p className="text-gray-500 mt-2 text-sm text-center">Students who watch a well-made promo video are 5X more likely to enroll in your course. We've seen that statistic go up to 10X for exceptionally awesome videos.</p> */}
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-semibold ">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-green-100 text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-semibold ">
              Subtitle
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-green-100 text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Course Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-green-100 text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="">Select...</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Price
              </label>
              <input
                value={lessons}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-green-100 text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
                {/* <option value="">Select...</option>
                <option value="lesson1">Lesson 1</option>
                <option value="lesson2">Lesson 2</option>
              </select> */}
            </div>
          </div>
          {/* <div className="mt-2">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Course Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Save & Next
            </button>
          </div>
        </form>
      )}

      {activeTab === "curriculum" && (
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Curriculum
          </h3>
          {lectures.map((lecture, index) => (
            <div
              key={index}
              className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg"
            >
              <div className="mb-2">
                <label className="block text-gray-600 text-sm font-semibold mb-1">
                  Lecture Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={lecture.title}
                  onChange={(e) => handleLectureChange(index, e)}
                  className="w-full bg-green-100 text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-1">
                  Content
                </label>
                <textarea
                  name="content"
                  value={lecture.content}
                  onChange={(e) => handleLectureChange(index, e)}
                  className="w-full bg-green-100 text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                ></textarea>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddLecture}
            className="mt-2 w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Another Lecture
          </button>
          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition duration-200"
            >
              Save & Apply approval
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
