import { MdAssignmentAdd } from "react-icons/md";

import {
  Modal,
  Select,
  SelectItem,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { instructorCourse, uploadingAssignment } from "../../../api/tutor";
import { ICoursesForAssignment } from "../../../services/types";
import { toast } from "react-toastify";
import { Spinner } from '@nextui-org/react'; // Assuming you're using NextUI

interface AddAssignmentsProps{
  AssignmentState:(setState:boolean)=>void;
}


const AddAssignments: React.FC<AddAssignmentsProps> = ({ AssignmentState }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [assignment, setAssignment] = useState<File | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [courseData, setCourseData] = useState<ICoursesForAssignment[]>([]);
  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAssignment(file);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const fetchCourseData = async () => {
    try {
      const instructor_id = tutorInfo._id as string;

      const response = await instructorCourse(instructor_id);
      if (response) {
        setCourseData(response.data.fetchCourses);
      }
    } catch (error) {
      console.log(error);
    }
  };




  const submitAssignment = async (courseId: string, courseTitle: string) => {
    onOpenChange();
    console.log(courseId, "courseid");
    console.log(courseTitle, "coursetitle");

    if (!assignment) {
      console.error("No assignment file selected");
      return;
    }
    
  const formdata = new FormData()
  formdata.append('assignment', assignment) 
  formdata.append('courseTitle', courseTitle)
  formdata.append('courseId', courseId)
  try {
    setIsUploading(true);
    const response = await uploadingAssignment(formdata);
    console.log(response);
    
    if (response) {  // Assuming your API returns a success flag
      // toast.success("Assignment uploaded successfully!");
      AssignmentState(true);
      onOpenChange(); // Close the modal if it's in one
    } else {
      toast.error("Failed to upload assignment. Please try again.");
      AssignmentState(false);
    }
  } catch (error) {
    console.error("Error uploading assignment:", error);
    toast.error("Error uploading assignment. Please try again.");
    AssignmentState(false);
  } finally {
    setIsUploading(false);
  }
  };

  return (
    <>
      <Button onPress={onOpen} className="font-bold text-white bg-gray-950">
        {" "}
        <MdAssignmentAdd size={15} />
        Add Assignment
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add assignment
            </ModalHeader>
            <ModalBody>
              {/* Course Selection Input using Next UI */}
              <Select
                label="Choose a course"
                placeholder="Select a course"
                variant="bordered"
                fullWidth
                className="text-black"
                value={selectedCourse?.id || ""}
                onChange={(e) => {
                  const course = courseData.find(
                    (c) => c._id === e.target.value
                  );
                  if (course) {
                    setSelectedCourse({
                      id: course._id,
                      title: course.courseName,
                    });
                  }
                }}
              >
                {courseData.map((course) => (
                  <SelectItem key={course._id} value={course._id}>
                    {course.courseName}
                  </SelectItem>
                ))}
              </Select>

              <Input
                className="mt-2"
                type="file"
                variant="bordered"
                label="Choose a file"
                fullWidth
                onChange={handleChange}
              />

              {assignment && (
                <div className="mt-2 text-blue-400 font-medium">
                  Selected file: {assignment.name}
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="shadow" onPress={onOpenChange}>
                Close
              </Button>
              <Button
      color="success"
      variant="shadow"
      onClick={() => {
        if (selectedCourse && assignment) {
          submitAssignment(selectedCourse.id, selectedCourse.title);
        } else {
          toast.error("Please select a course and upload an assignment");
        }
      }}
      isDisabled={!selectedCourse || !assignment || isUploading}
    >
      {isUploading ? (
        <>
          <Spinner size="sm" color="current" />
          <span className="ml-2">Uploading...</span>
        </>
      ) : (
        "Add Assignment"
      )}
    </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
export default React.memo(AddAssignments);
