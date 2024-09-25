import React, { useEffect, useState } from "react";
import { MdMessage } from "react-icons/md";
import { Card, CardHeader, CardBody, Avatar, Button, useSlider } from "@nextui-org/react";
import { motion } from "framer-motion";
import UserChatScreenModal, { Message } from "../../User/UserChatScreenModal";
import { getInitialMsgs, getInstructorData } from "../../../api/user";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MessagePrev } from "../../../services/types";

interface IInstructorProps {
  instructorId: string;
  isPurchase: boolean;
}

interface IInstructor {
  _id: string;
  instructorId: string;
  instructorName: string;
  instructorEmail: string;
  profileImg?: string;
  experience?: string;
  position?: string;
  companyName?: string;
  aboutBio?: string;
}

const InstructorView: React.FC<IInstructorProps> = ({
  instructorId,
  isPurchase,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [instructor, setInstructor] = useState<IInstructor | null>(null);
  const [instructorImgUrl,setInstructorUrl]= useState<string>("")
  const [initialMsgs,setInitialMsgs]= useState<MessagePrev[]>([])

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const {userInfo}= useSelector((state:RootState)=>state.auth)
const userId = userInfo._id
  useEffect(() => {
    fetchInstructorData();
    loadInitialMessages();
  }, [instructorId]);

  const fetchInstructorData = async () => {
    try {
      const {getInstructor,instructorImgUrl} = await getInstructorData(instructorId);
      console.log(getInstructor,instructorImgUrl, "getInstructor");
     

      if (getInstructor) {
        setInstructor(getInstructor);
        setInstructorUrl(instructorImgUrl)
      }
    } catch (error) {
      console.error("Assignments fetching error:", error);
    }
  };

  const loadInitialMessages = async () => {
    try {
      const initialMessages = await getInitialMsgs(userId, instructorId);
      setInitialMsgs(initialMessages);
      console.log(initialMessages,"initialMessages");
      
    } catch (error) {
      console.error("Error loading initial messages:", error);
     
    }
  };


  console.log(instructor,initialMsgs, "99999");

  return (
    <motion.div
      className="m-5 border-2 w-full px-5 py-4 rounded-md bg-card flex justify-center items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* <h1>Instructor ID: {instructorId}</h1> */}
      <div className="w-full max-w-md">
        <div className="flex mb-3 text-sm">
          {!isPurchase && (
            <div className="text-red-500">
              After purchasing this course, you can chat with the tutor.
            </div>
          )}
        </div>

        <Card className="w-full">
          <CardHeader className="flex flex-col md:flex-row justify-between">
            <div className="flex gap-5 mb-4 md:mb-0">
              <Avatar
                isBordered
                radius="full"
                size="md"
                showFallback
                src={
                  instructor?.profileImg === "nopic"
                    ? "https://avatars.githubusercontent.com/u/30373425?v=4"
                    : instructorImgUrl
                }
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-lg font-semibold leading-none text-gray-900">
                  {instructor?.instructorName || "Name Not Available"}
                </h4>
                <h5 className="text-sm tracking-tight text-default-400">
                  @{instructor?.instructorEmail || "Unknown"}
                </h5>
              </div>
            </div>
            {isPurchase && (
              <div className="flex items-center">
                <Button
                  onPress={openModal}
                  size="sm"
                  className="bg-gray-950 text-xs text-white"
                >
                  <MdMessage /> Chat
                </Button>
                <UserChatScreenModal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  receiverId={instructorId}
                  previousMsgs={initialMsgs}
                  instructorName={instructor?.instructorName as string}
                />
              </div>
            )}
          </CardHeader>
          <CardBody className="px-3 py-2 text-sm text-default-400">
            <p>
              Company:{" "}
              {instructor?.companyName === "Please give Company"
                ? "Company Name not available"
                : <span className="text-black">{instructor?.companyName}</span>}
            </p>
            <p>
              Position:{" "}
              {instructor?.position === "Please give your role"
                ? "Position not available"
                : <span className="text-black">{instructor?.position}</span>}
            </p>
            <p>
              Experience:{" "}
              {instructor?.experience === "Please give your experience"
                ? "Experience not available"
                : <span className="text-black">{instructor?.experience}</span>}
            </p>
            <p>
              Bio:{" "}
              {instructor?.aboutBio === "write something about yourself"
                ? "Bio not available"
                : <span className="text-black">{instructor?.aboutBio}</span>}
            </p>
          </CardBody>
        </Card>
      </div>
    </motion.div>
  );
};

export default InstructorView;







