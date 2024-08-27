import AddAssignments from "../../../Components/Tutor/course/AddAssignments";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { assignmentFetching } from "../../../api/tutor";
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
import document from "/Logo/images/documentImg.png"

export default function Assignments() {
  const [state, setState] = useState(false);
  const [assignments, setAssigments] = useState<IAssignment[]>([]);
  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);

  useEffect(() => {
    fetchAssigments();
  }, [state]);

  const fetchAssigments = async () => {
    try {
      const instructor_id = tutorInfo._id as string;
      const responseData = await assignmentFetching(instructor_id);
      if (responseData) {
        setAssigments(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const onAssigmentAdd = async (newState: boolean) => {
    setState(newState);
    if (newState) {
      toast.success("Assignment added successfully");
    }
  };
  return (
    <div className="m-4">
      <div className="m-3">
        <AddAssignments AssignmentState={onAssigmentAdd} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {assignments.map((assignment) => (
          <div key={assignment._id} className="m-2">
            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <Image
                  alt="nextui logo"
                  height={40}
                  radius="sm"
                  src={document}
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-md font-bold underline ">
                    {assignment.title}
                  </p>
                  {/* <p className="text-small text-default-500">nextui.org</p> */}
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-xs font-sans">
                  Assignment available for this course. Click the link below to
                  view the document.
                </p>
              </CardBody>
              <Divider  />
              <CardFooter>
                <Link
                  isExternal
                  showAnchorIcon
                  href={assignment.assignmentUrl}
                  className="text-xs font-mono font-semibold"
                  // color="danger"
                >
                  View {assignment.title} Assignment
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
