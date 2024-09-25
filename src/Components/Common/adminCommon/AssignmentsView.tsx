import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { IAssignment } from "../../../services/types";
import document from "/Logo/images/documentImg.png";
import { eachAssignmentsFetchA } from "../../../api/admin";

interface AssignmentProps {
  courseID: string;
}

function AssignmentsViewCommonA({ courseID }: AssignmentProps) {
  const [assignments, setAssignments] = useState<IAssignment[]>([]);

  useEffect(() => {
    fetchEachAssignments();
  }, [courseID]);

  const fetchEachAssignments = async () => {
    try {
      const response = await eachAssignmentsFetchA(courseID);
      if (response) {
        setAssignments(response);
      } else {
        setAssignments([]);
      }
    } catch (error) {
      console.error("Assignments fetching error:", error);
      setAssignments([]);
    }
  };

  console.log(assignments, "assignments----");

  return (
    <div className="m-5 border-2 p-11 rounded-md bg-card">
      {assignments.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assignments.map((assignment) => (
            <div key={assignment._id} className="m-2">
              <Card className="max-w-[400px]">
                <CardHeader className="flex gap-3">
                  <Image
                    alt="Document"
                    height={40}
                    radius="sm"
                    src={document}
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md font-bold underline">
                      {assignment.title}
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-xs font-sans">
                    Assignment available for this course. Click the link below
                    to view the document.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    href={assignment.assignmentUrl}
                    className="text-xs font-mono font-semibold"
                  >
                    View {assignment.title} Assignment
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-red-900 w-full font-semibold flex justify-center items-center">
          No assignments have been added for this course yet. Please check back
          later or contact the instructor.
        </div>
      )}
    </div>
  );
}

export default AssignmentsViewCommonA;
