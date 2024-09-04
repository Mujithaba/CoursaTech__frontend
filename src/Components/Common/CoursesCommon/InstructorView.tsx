import React, { useEffect, useState } from "react";
import { MdMessage } from "react-icons/md";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import {User, Link} from "@nextui-org/react";


import UserChatScreenModal from "../../User/UserChatScreenModal";
import { getInstructorData } from "../../../api/user";

interface IInstructorProps {
  instructorId: string;
  isPurchase: boolean;
}

interface IInstructor {
 _id:string;
    instructorId:string ;
    instructorName:string
    instructorEmail:string;
    profileImg?:string;
    experience?:string;
    position?:string;
    companyName?:string;
    aboutBio?:string;
  }

const InstructorView: React.FC<IInstructorProps> = ({
  instructorId,
  isPurchase,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [instructor, setInstructor] = useState<IInstructor | null>(null); 

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(()=>{
    fetchInstructorData()
  },[instructorId])

  const fetchInstructorData=async()=>{
try {
  const response = await getInstructorData(instructorId)
  console.log(response,"getInstructor");
  
  if(response){
    setInstructor(response)
  }
} catch (error) {
  console.error("Assignments fetching error:", error);
  
}
  }

  console.log(instructor,"99999");
  

  return (
    <div className="m-5 border-2 w-full px-5 py-4 rounded-md bg-card flex justify-center items-center">
    {/* <h1>Instructor ID: {instructorId}</h1> */}
    <div>

    <div className="flex mb-3 text-sm">
      {!isPurchase && (
        <div className="text-red-500">
          After purchasing this course, you can chat with the tutor.
        </div>
      )}
    </div>

    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            showFallback 
            src={instructor?.profileImg == 'nopic' ? "https://avatars.githubusercontent.com/u/30373425?v=4"  : instructor?.profileImg }
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-gray-900">
              {instructor?.instructorName || "Name Not Available"} 
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @{instructor?.instructorEmail || "Unknown"}
            </h5>
          </div>
        </div>
        {isPurchase && (
          <div className="ms-5">
            <Button onPress={openModal} size="sm" className="bg-gray-950 text-xs  text-white">
              <MdMessage /> Chat
            </Button>
            <UserChatScreenModal
              isOpen={isModalOpen}
              onClose={closeModal}
              receiverId={instructorId}
            />
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 text-small text-default-400">
        <p>Company: {instructor?.companyName == 'Please give Company' ? "CompanyName not available" :(<span className="text-black">{instructor?.companyName}</span>) }</p>
        <p>Positions: {instructor?.position == 'Please give your role' ?   "position not available"  :(<span className="text-black">{instructor?.position}</span>) }</p>
        <p>Experience: {instructor?.experience == 'Please give your experience' ?   "position not available"  :(<span className="text-black">{ instructor?.experience}</span>)}</p>
        <p>Bio: {instructor?.aboutBio == 'write something about youself' ? "Bio not available" :(<span className="text-black">{instructor?.aboutBio}</span>)}</p>
        {/* <span className="pt-2">
          #FrontendWithZoey{" "}
          <span className="py-2" aria-label="computer" role="img">
            💻
          </span>
        </span> */}
      </CardBody>
    
    </Card>

    {/* <User   
    className=""
      name={instructor?.instructorName}
      description={(
        <div>

<p>Company: {instructor?.companyName == 'Please give Company' ? "CompanyName not available" : instructor?.companyName}</p>
        <p>Positions: {instructor?.position == 'Please give your role' ?   "position not available"  : instructor?.position}</p>
        <p>Positions: {instructor?.experience == 'Please give your experience' ?   "position not available"  : instructor?.experience}</p>
        <p>Bio: {instructor?.aboutBio == 'write something about youself' ? "Bio not available" : instructor?.aboutBio}</p>
        </div>
      )}
      avatarProps={{
        src: "https://avatars.githubusercontent.com/u/30373425?v=4"
      }}
    /> */}

</div>
  </div>
  );
};

export default InstructorView;
