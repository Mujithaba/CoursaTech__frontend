import React, { useEffect, useState } from "react";
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
import { eachAssignmentsFetch } from "../../../api/user";
import { motion } from "framer-motion";

interface AssignmentProps {
  courseID: string;
  isPurchase: boolean;
}

const AssignmentsView: React.FC<AssignmentProps> = ({
  courseID,
  isPurchase,
}) => {
  const [assignments, setAssignments] = useState<IAssignment[]>([]);

  useEffect(() => {
    fetchEachAssignments();
  }, [courseID]);

  const fetchEachAssignments = async () => {
    try {
      const response = await eachAssignmentsFetch(courseID);
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

  return (
    <motion.div
      className="m-5 p-5 rounded-md bg-card border-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isPurchase ? (
        assignments.length ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {assignments.map((assignment) => (
              <motion.div
                key={assignment._id}
                className="m-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="max-w-full md:max-w-[400px]">
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
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-red-900 w-full font-semibold flex justify-center items-center">
            No assignments have been added for this course yet. Please check
            back later or contact the instructor.
          </div>
        )
      ) : (
        <p className="text-center text-gray-700">
          Please purchase the course to view the assignments.
        </p>
      )}
    </motion.div>
  );
};

export default React.memo(AssignmentsView);
