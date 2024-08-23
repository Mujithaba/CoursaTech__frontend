import React, { useEffect, useState } from "react";
import { ITutorDetails, Tutor, User } from "../../services/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchtutorRegisterData, profileDataSave } from "../../api/tutor";
import defaultProfile from "/Logo/images/default profile.jpg";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";

const data = [
  { name: "Mon", Hours: 30 },
  { name: "Tue", Hours: 45 },
  { name: "Wed", Hours: 60 },
  { name: "Thu", Hours: 50 },
  { name: "Fri", Hours: 70 },
  { name: "Sat", Hours: 40 },
  { name: "Sun", Hours: 60 },
];

export default function TutorProfile() {
  const [registerData, setRegisterData] = useState<Tutor>();
  const [instructorDetails, setInstructorDetails] = useState<ITutorDetails>();
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const [saveChange, setSaveChange] = useState<boolean>(false);

  const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);

  useEffect(() => {
    fetchTutorData();
  }, []);

  const fetchTutorData = async () => {
    try {
      let instructorId = tutorInfo._id as string;
      const response = await fetchtutorRegisterData(instructorId);
      setRegisterData(response.data.getInstructorDetails);
      setInstructorDetails(response.data.existDetailsDocument);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(registerData,"is goole");
  


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSaveChange(true);

    // Update the registerData object
    if (
      registerData &&
      (name === "name" || name === "phone" || name === "email")
    ) {
      setRegisterData((prevData) => {
        if (!prevData) return prevData; // Handle undefined prevData
        return {
          ...prevData,
          [name]: value,
        };
      });
    }

    // Update the instructorDetails object
    if (
      instructorDetails &&
      (name === "experience" ||
        name === "position" ||
        name === "companyName" ||
        name === "aboutBio")
    ) {
      setInstructorDetails((prevData) => {
        if (!prevData) return prevData; // Handle undefined prevData
        return {
          ...prevData,
          [name]: value,
          // profileImg: prevData.profileImg || '', // Ensure profileImg is always a string
          // profileImgUrl: prevData.profileImgUrl || '', // Ensure profileImgUrl is always a string
        };
      });
    }
  };

  const handleSaveChanges =async()=>{
    try {
      
      const saveChangesProfile = await profileDataSave(registerData,instructorDetails)
      if (saveChangesProfile) {
        console.log(saveChangesProfile.data.message,"profile data");
        toast.success(saveChangesProfile.data.message)
        setSaveChange(false)
      }
      
    } catch (error) {
      console.error(error);
      
    }
  }


  const emailChangeGoogle =()=>{
    
  }
  return (
    <div className="bg-gradient-to-b from-gray-900 to-white p-6 rounded-md">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-6">
          {instructorDetails?.profileImg === "nopic" ? (
            <img
              className="w-24 h-24 rounded-full object-cover"
              src={defaultProfile}
              alt="User Profile"
            />
          ) : (
            <img
              className="w-24 h-24 rounded-full object-cover"
              src={instructorDetails?.profileImgUrl}
              alt="User Profile url"
            />
          )}
          {/* <div>
            <h2 className="text-2xl text-white font-semibold">
              name
            </h2>
            <input
              type="text"
              name="name"
              value={registerData?.name || ''}
              onChange={handleInputChange}
              readOnly={isReadOnly}
              className="text-black "
            /><br/>
            <input
              type="email"
              name="email"
              value={registerData?.email || ''}
              onChange={handleInputChange}
              readOnly={isReadOnly}
              className="text-black text-sm w-full p-1 "
            />
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            {saveChange && (
              <div className="flex justify-end">
                <Button color="success" onClick={handleSaveChanges}>Save</Button>
                </div>)}
            <h3 className="mt-4 text-xs">Name</h3>
            <input
              type="text"
              name="name"
              value={registerData?.name || ""}
              onChange={handleInputChange}
              readOnly={isReadOnly}
              className="text-black rounded-md font-sans"
            />
            <br />
            <h3 className="mt-4 text-xs">Email</h3>
            {registerData?.isGoogle ? 
            ( <p className="text-black w-80 font-sans rounded-md p-1 "  onClick={emailChangeGoogle}>
              {registerData?.email}  <br/><span className="text-xs text-red-400">(Can't change the mail ,Bcz you signup through Google)</span>
            </p>
             
            ):(
              <input
              type="email"
              name="email"
              value={registerData?.email || ""}
              onChange={handleInputChange}
              readOnly={isReadOnly}
              className="text-black w-80 font-sans rounded-md p-1 "
            />
            )}
           

            <hr className="mt-2" />

            <h3 className="mt-4 text-xs">Phone Number</h3>
            <input
              type="text"
              name="phone"
              className="border p-1 font-sans rounded-md"
              value={registerData?.phone || ""}
              onChange={handleInputChange}
              readOnly={isReadOnly}
            />

            <h3 className="mt-4 text-xs">Experience</h3>
            <input
              type="text"
              name="experience"
              className="border p-1 font-sans rounded-md"
              value={instructorDetails?.experience || ""}
              onChange={handleInputChange}
              readOnly={isReadOnly}
            />

            <h3 className="mt-4 text-xs">Role</h3>
            <input
              type="text"
              name="position"
              className="border p-1 font-sans  rounded-md"
              value={instructorDetails?.position || ""}
              onChange={handleInputChange}
              readOnly={isReadOnly}
            />

            <h3 className="mt-4 text-xs">Company</h3>
            <input
              type="text"
              name="companyName"
              className="border p-1 font-sans rounded-md"
              value={instructorDetails?.companyName || ""}
              onChange={handleInputChange}
              readOnly={isReadOnly}
            />

            <div className="md:col-span-2 bg-white rounded-lg shadow mt-1 p-2">
              <h3 className="text-xs font-semibold">About or Bio:</h3>
              <textarea
                name="aboutBio"
                className="border w-full p-1 font-sans rounded-md"
                value={instructorDetails?.aboutBio || ""}
                onChange={handleInputChange}
                readOnly={isReadOnly}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from 'react'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { ITutorDetails, User } from '../../services/types';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import { fetchtutorRegisterData } from '../../api/tutor';
// import defaultProfile from '/Logo/images/default profile.jpg'

// const data = [
//     { name: 'Mon', Hours: 30 },
//     { name: 'Tue', Hours: 45 },
//     { name: 'Wed', Hours: 60 },
//     { name: 'Thu', Hours: 50 },
//     { name: 'Fri', Hours: 70 },
//     { name: 'Sat', Hours: 40 },
//     { name: 'Sun', Hours: 60 },
//   ];

// export default function TutorProfile() {

//   const [registerData,setRegisterData] =useState<User>()
//   const [instructorDetails,setInstructorDetails]= useState<ITutorDetails>()
//   const [isReadOnly,setIsReadOnly]=useState<boolean>(false)

//   const {tutorInfo} = useSelector((state:RootState)=>state.tutorAuth)

//   useEffect(()=>{
//     fetchTutorData()
//   },[])
//   console.log(registerData,instructorDetails,"profile usestate");
//   const fetchTutorData=async()=>{
//     try {
//       let instructorId = tutorInfo._id as string
//       console.log(instructorId,"id instuructor");

//       const response = await fetchtutorRegisterData(instructorId);
//       console.log(response,"resposn profilw");

//       setRegisterData(response.data.getInstructorDetails)
//       setInstructorDetails(response.data.existDetailsDocument)
//     } catch (error) {
//       console.log(error);

//     }
//   }

//   const hanldeReadOnly =()=>{
//     setIsReadOnly(true)
//   }

//   return (
//     <div className="bg-gradient-to-b from-gray-900 to-white p-6 rounded-md">
//     <div className="max-w-4xl mx-auto">
//       <div className="flex items-center space-x-6">
// {instructorDetails?.profileImg === "nopic" ? (

//   <img
//     className="w-24 h-24 rounded-full object-cover"
//     src={defaultProfile}
//     alt="User Profile"

//   />
// ):(
//   <img src={instructorDetails?.profileImgUrl} alt="User Profile url" />
// )}
//         <div className=''>
//           <h2 className="text-2xl text-white font-semibold">{registerData?.name}</h2>
//           <p className="text-white">{registerData?.email}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
//         <div className="bg-white rounded-lg shadow p-6">
//           {/* <h3 className="text-xs ">Your Name</h3> */}
//           {/* <p className=' font-semibold'>{registerData?.name}</p> */}
//           {/* <button className="mt-2 text-blue-500 hover:underline">Edit</button> */}

//           {/* <h3 className="mt-4 text-xs">Email</h3> */}
//           {/* <p className=' font-semibold'>{registerData?.email}</p> */}
//           {/* <button className="mt-2 text-blue-500 hover:underline">Edit</button> */}

//           <hr className='mt-2'/>

//           <h3 className="mt-4 text-xs ">Phone Number</h3>

//           {/* <p className='font-semibold'>{registerData?.phone}</p> */}
//           <input type='text' className='border' value={registerData?.phone} readOnly={isReadOnly} onClick={hanldeReadOnly} onChange={(e)=>setRegisterData(e.target.value)} />
//           {/* <button className="mt-2 text-blue-500 hover:underline">Edit</button> */}

//           <h3 className="mt-4 text-xs">Experience</h3>
//           <p className=' font-semibold'>{instructorDetails?.experience}</p>
//           {/* <button className="mt-2 text-blue-500 hover:underline">Edit</button> */}

//           <h3 className="mt-4 text-xs">Role</h3>
//           <p className='font-semibold'>{instructorDetails?.position}</p>

//           <h3 className="mt-4 text-xs">Company</h3>
//           <p className='font-semibold'>{instructorDetails?.companyName}</p>
//           {/* <button className="mt-2 text-blue-500 hover:underline">Edit</button> */}
//             <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
//           <h3 className="text-xs font-semibold">About or Bio :-</h3>
//           <p className="mt-2 text-gray-600">
//             {instructorDetails?.aboutBio}
//           </p>
//           {/* <button className="mt-2 text-blue-500 hover:underline">Edit</button> */}
//         </div>
//         </div>

//         {/* <div className="bg-white rounded-lg shadow p-6">

//             <h3 className="text-lg font-semibold">Weekly Hours</h3>
//             <BarChart
//               width={400}
//               height={250}
//               data={data}
//               margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="Hours" fill="#8884d8" />
//             </BarChart>

//           </div> */}

//         {/* <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold">About Sid</h3>
//           <p className="mt-2 text-gray-600">
//             Lorem ipsum dolor sit amet consectetur. Erat auctor a aliquam vel congue luctus. Leo diam cras neque mauris ac arcu elit ipsum dolor sit amet consectetur.
//           </p>
//           <button className="mt-2 text-blue-500 hover:underline">Edit</button>
//         </div> */}
//       </div>
//     </div>
//   </div>
//   )
// }
