import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { IoAddCircle } from "react-icons/io5";

interface Lecture {
  title: string;
  description: string;
  video?: File | null;
  pdf?: File | null;
}

interface Module {
  name: string;
  lectures: Lecture[];
}

interface CurriculumOfCourseProps {
  initialModules?: Module[];
  onModulesChange?: (modules: Module[]) => void;
  onSubmit?: (modules: Module[]) => void;
}

const CurriculumOfCourse: React.FC<CurriculumOfCourseProps> = ({
  initialModules = [],
  onModulesChange,
  onSubmit,
}) => {
  const [modules, setModules] = useState<Module[]>(initialModules);

  const addModule = () => {
    const updatedModules = [...modules, { name: "", lectures: [] }];
    setModules(updatedModules);
    onModulesChange?.(updatedModules);
  };

  const removeModule = (index: number) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
    onModulesChange?.(updatedModules);
  };

  const handleModuleChange = (
    index: number,
    field: keyof Module,
    value: string
  ) => {
    const updatedModules = [...modules];
    updatedModules[index] = { ...updatedModules[index], [field]: value };
    setModules(updatedModules);
    onModulesChange?.(updatedModules);
  };

  const addLecture = (moduleIndex: number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lectures.push({
      title: "",
      description: "",
      video: null,
      pdf: null,
    });
    setModules(updatedModules);
    onModulesChange?.(updatedModules);
  };

  const removeLecture = (moduleIndex: number, lectureIndex: number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lectures = updatedModules[
      moduleIndex
    ].lectures.filter((_, i) => i !== lectureIndex);
    setModules(updatedModules);
    onModulesChange?.(updatedModules);
  };

  const handleLectureChange = (
    moduleIndex: number,
    lectureIndex: number,
    field: keyof Lecture,
    value: string | File | null
  ) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lectures[lectureIndex] = {
      ...updatedModules[moduleIndex].lectures[lectureIndex],
      [field]: value,
    };
    setModules(updatedModules);
    onModulesChange?.(updatedModules);
  };

  const  handleFileChange = (
    moduleIndex: number,
    lectureIndex: number,
    field: "video" | "pdf",
    file: File | null
  ) => {
    handleLectureChange(moduleIndex, lectureIndex, field, file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(modules);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200"
    >
      <h2 className="text-2xl font-mono font-bold text-gray-800 mb-6 text-center">
        Curriculum
      </h2>
      
      {modules.map((module, moduleIndex) => (
        <div
          key={moduleIndex}
          className="mb-6 p-4 border border-gray-300 rounded-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Module {moduleIndex + 1}</h3>
            <button
              type="button"
              onClick={() => removeModule(moduleIndex)}
              className="text-red-500 font-medium hover:text-red-700"
            >
              Remove Module
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Module Name
            </label>
            <input
              type="text"
              value={module.name}
              onChange={(e) =>
                handleModuleChange(moduleIndex, "name", e.target.value)
              }
              className="block p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Lectures</h4>
            {module.lectures.map((lecture, lectureIndex) => (
              <div
                key={lectureIndex}
                className="mb-4 p-4  border-2 border-gray-900 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-lg font-bold">
                    Lecture {lectureIndex + 1}
                  </h5>
                  <button
                    type="button"
                    onClick={() => removeLecture(moduleIndex, lectureIndex)}
                    className="text-red-500 font-medium hover:text-red-700"
                  >
                    Remove Lecture
                  </button>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lecture Title
                  </label>
                  <input
                    type="text"
                    value={lecture.title}
                    onChange={(e) =>
                      handleLectureChange(
                        moduleIndex,
                        lectureIndex,
                        "title",
                        e.target.value
                      )
                    }
                    className="block w-full text-sm p-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lecture Description
                  </label>
                  <textarea
                    value={lecture.description}
                    onChange={(e) =>
                      handleLectureChange(
                        moduleIndex,
                        lectureIndex,
                        "description",
                        e.target.value
                      )
                    }
                    rows={3}
                    className="block w-full p-1 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lecture Video
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    name="video"
                    onChange={(e) =>
                      handleFileChange(
                        moduleIndex,
                        lectureIndex,
                        "video",
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm"
                  />
                  {lecture.video && (
                    <video
                      src={URL.createObjectURL(lecture.video)}
                      controls
                      className="mt-2 w-full h-32 object-cover border border-gray-300 rounded-lg"
                    />
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lecture PDF
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    name="pdf"
                    onChange={(e) =>
                      handleFileChange(
                        moduleIndex,
                        lectureIndex,
                        "pdf",
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm"
                  />
                  {lecture.pdf && (
                    <iframe
                      src={URL.createObjectURL(lecture.pdf)}
                      className="mt-2 w-full h-32 border border-gray-300 rounded-lg"
                      title="PDF Preview"
                    />
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addLecture(moduleIndex)}
              className="text-blue-950  flex items-center space-x-2 hover:bg-gray-500 p-2 rounded-md hover:text-black hover:font-medium"
            >
              <IoAddCircle className="text-lg" />
              <span>Add Lecture</span>
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-end ">
        <button
          type="button"
          onClick={addModule}
          className="text-white mb-4 font-mono p-2 rounded-md bg-gray-700 hover:bg-green-950 flex items-center"
        >
          <IoAddCircle className="mr-2" />
          Add Module
        </button>
      </div>
      {modules.length !== 0 && 
      
      <Button
        type="submit"
        className="ms-52 mt-4 w-80 bg-gray-950 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:ring-1 focus:ring-gray-900"
      >
        Submit Curriculum
      </Button>
      }
      
    </form>
  );
};

export default CurriculumOfCourse
// export default CurriculumOfCourse;