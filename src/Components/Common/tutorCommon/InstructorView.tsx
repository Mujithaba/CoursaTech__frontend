import React, { useEffect, useState } from "react";
import {Card, CardHeader, CardBody,Avatar} from "@nextui-org/react";



import { getInstructorDataT } from "../../../api/tutor";

interface IInstructorProps {
  instructorId: string;
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

const CommonInstructorView: React.FC<IInstructorProps> = ({
  instructorId,

}) => {
  const [instructor, setInstructor] = useState<IInstructor | null>(null); 

  

  useEffect(()=>{
    fetchInstructorData()
  },[instructorId])

  const fetchInstructorData=async()=>{
try {
  const response = await getInstructorDataT(instructorId)
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
        
      </CardHeader>
      <CardBody className="px-3 py-2 text-small text-default-400">
        <p>Company: {instructor?.companyName == 'Please give Company' ? "CompanyName not available" :(<span className="text-black">{instructor?.companyName}</span>) }</p>
        <p>Positions: {instructor?.position == 'Please give your role' ?   "position not available"  :(<span className="text-black">{instructor?.position}</span>) }</p>
        <p>Positions: {instructor?.experience == 'Please give your experience' ?   "position not available"  :(<span className="text-black">{ instructor?.experience}</span>)}</p>
        <p>Bio: {instructor?.aboutBio == 'write something about yourself' ? "Bio not available" :(<span className="text-black">{instructor?.aboutBio}</span>)}</p>
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

export default CommonInstructorView;
