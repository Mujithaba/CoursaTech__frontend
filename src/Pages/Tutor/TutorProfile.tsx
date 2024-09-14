import React, { useEffect, useState } from "react";
import { ITutorDetails, Tutor, User } from "../../services/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchtutorRegisterData, profileDataSave } from "../../api/tutor";
import defaultProfile from "/Logo/images/default profile.jpg";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";

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
      const instructorId = tutorInfo._id as string;
      const response = await fetchtutorRegisterData(instructorId);
      setRegisterData(response.data.getInstructorDetails);
      setInstructorDetails(response.data.existDetailsDocument);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSaveChange(true);

    // Update the registerData object
    if (registerData && (name === "name" || name === "phone" || name === "email")) {
      setRegisterData((prevData) => prevData ? { ...prevData, [name]: value } : prevData);
    }

    // Update the instructorDetails object
    if (instructorDetails && (name === "experience" || name === "position" || name === "companyName" || name === "aboutBio")) {
      setInstructorDetails((prevData) => prevData ? { ...prevData, [name]: value } : prevData);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const saveChangesProfile = await profileDataSave(registerData, instructorDetails);
      if (saveChangesProfile) {
        console.log(saveChangesProfile.data.message, "profile data");
        toast.success(saveChangesProfile.data.message);
        setSaveChange(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const emailChangeGoogle = () => {
    // Add logic for handling Google account emails
  };

  return (
    <div className="bg-[#0a0e3c]  p-8 rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <div className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center md:items-start">
          <div className="relative">
            {instructorDetails?.profileImg === "nopic" ? (
              <img
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                src={defaultProfile}
                alt="User Profile"
              />
            ) : (
              <img
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                src={instructorDetails?.profileImgUrl}
                alt="User Profile URL"
              />
            )}
          </div>
          <Button 
            color="primary" 
            onClick={handleSaveChanges} 
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-sm"
          >
            Upload New Photo
          </Button>
        </div>

        <div>
          {saveChange && (
            <div className="flex justify-end mb-4">
              <Button color="success" onClick={handleSaveChanges} >
                Save Changes
              </Button>
            </div>
          )}
          <h3 className="text-sm font-medium text-gray-700">Name</h3>
          <input
            type="text"
            name="name"
            value={registerData?.name || ""}
            onChange={handleInputChange}
            readOnly={isReadOnly}
            className="text-gray-800 bg-gray-100 rounded-md w-full p-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <h3 className="mt-4 text-sm font-medium text-gray-700">Email</h3>
          {registerData?.isGoogle ? (
            <p className="text-gray-800 w-full font-sans rounded-md p-2 bg-gray-100 mt-1">
              {registerData?.email}
              <br />
              <span className="text-xs text-red-400">(Can't change the mail, because you signed up through Google)</span>
            </p>
          ) : (
            <input
              type="email"
              name="email"
              value={registerData?.email || ""}
              onChange={handleInputChange}
              readOnly={isReadOnly}
              className="text-gray-800 bg-gray-100 rounded-md w-full p-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          )}

          <h3 className="mt-4 text-sm font-medium text-gray-700">Phone Number</h3>
          <input
            type="text"
            name="phone"
            value={registerData?.phone || ""}
            onChange={handleInputChange}
            readOnly={isReadOnly}
            className="text-gray-800 bg-gray-100 rounded-md w-full p-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <h3 className="mt-4 text-sm font-medium text-gray-700">Experience</h3>
          <input
            type="text"
            name="experience"
            value={instructorDetails?.experience || ""}
            onChange={handleInputChange}
            readOnly={isReadOnly}
            className="text-gray-800 bg-gray-100 rounded-md w-full p-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <h3 className="mt-4 text-sm font-medium text-gray-700">Role</h3>
          <input
            type="text"
            name="position"
            value={instructorDetails?.position || ""}
            onChange={handleInputChange}
            readOnly={isReadOnly}
            className="text-gray-800 bg-gray-100 rounded-md w-full p-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <h3 className="mt-4 text-sm font-medium text-gray-700">Company</h3>
          <input
            type="text"
            name="companyName"
            value={instructorDetails?.companyName || ""}
            onChange={handleInputChange}
            readOnly={isReadOnly}
            className="text-gray-800 bg-gray-100 rounded-md w-full p-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">About or Bio</h3>
            <textarea
              name="aboutBio"
              value={instructorDetails?.aboutBio || ""}
              onChange={handleInputChange}
              readOnly={isReadOnly}
              className="text-gray-800 bg-gray-100 rounded-md w-full p-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}





// import React, { useEffect, useState } from "react";
// import { ITutorDetails, Tutor, User } from "../../services/types";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { fetchtutorRegisterData, profileDataSave } from "../../api/tutor";
// import defaultProfile from "/Logo/images/default profile.jpg";
// import { Button } from "@nextui-org/react";
// import { toast } from "react-toastify";

// const data = [
//   { name: "Mon", Hours: 30 },
//   { name: "Tue", Hours: 45 },
//   { name: "Wed", Hours: 60 },
//   { name: "Thu", Hours: 50 },
//   { name: "Fri", Hours: 70 },
//   { name: "Sat", Hours: 40 },
//   { name: "Sun", Hours: 60 },
// ];

// export default function TutorProfile() {
//   const [registerData, setRegisterData] = useState<Tutor>();
//   const [instructorDetails, setInstructorDetails] = useState<ITutorDetails>();
//   const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
//   const [saveChange, setSaveChange] = useState<boolean>(false);

//   const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);

//   useEffect(() => {
//     fetchTutorData();
//   }, []);

//   const fetchTutorData = async () => {
//     try {
//       let instructorId = tutorInfo._id as string;
//       const response = await fetchtutorRegisterData(instructorId);
//       setRegisterData(response.data.getInstructorDetails);
//       setInstructorDetails(response.data.existDetailsDocument);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   console.log(registerData,"is goole");
  


//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setSaveChange(true);

//     // Update the registerData object
//     if (
//       registerData &&
//       (name === "name" || name === "phone" || name === "email")
//     ) {
//       setRegisterData((prevData) => {
//         if (!prevData) return prevData; // Handle undefined prevData
//         return {
//           ...prevData,
//           [name]: value,
//         };
//       });
//     }

//     // Update the instructorDetails object
//     if (
//       instructorDetails &&
//       (name === "experience" ||
//         name === "position" ||
//         name === "companyName" ||
//         name === "aboutBio")
//     ) {
//       setInstructorDetails((prevData) => {
//         if (!prevData) return prevData; // Handle undefined prevData
//         return {
//           ...prevData,
//           [name]: value,
//           // profileImg: prevData.profileImg || '', // Ensure profileImg is always a string
//           // profileImgUrl: prevData.profileImgUrl || '', // Ensure profileImgUrl is always a string
//         };
//       });
//     }
//   };

//   const handleSaveChanges =async()=>{
//     try {
      
//       const saveChangesProfile = await profileDataSave(registerData,instructorDetails)
//       if (saveChangesProfile) {
//         console.log(saveChangesProfile.data.message,"profile data");
//         toast.success(saveChangesProfile.data.message)
//         setSaveChange(false)
//       }
      
//     } catch (error) {
//       console.error(error);
      
//     }
//   }


//   const emailChangeGoogle =()=>{
    
//   }
//   return (
//     <div className="bg-[#0a0e3c] from-gray-900 to-white p-6 rounded-md">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center space-x-6">
//           {instructorDetails?.profileImg === "nopic" ? (
//             <img
//               className="w-24 h-24 rounded-full object-cover"
//               src={defaultProfile}
//               alt="User Profile"
//             />
//           ) : (
//             <img
//               className="w-24 h-24 rounded-full object-cover"
//               src={instructorDetails?.profileImgUrl}
//               alt="User Profile url"
//             />
//           )}
//           {/* <div>
//             <h2 className="text-2xl text-white font-semibold">
//               name
//             </h2>
//             <input
//               type="text"
//               name="name"
//               value={registerData?.name || ''}
//               onChange={handleInputChange}
//               readOnly={isReadOnly}
//               className="text-black "
//             /><br/>
//             <input
//               type="email"
//               name="email"
//               value={registerData?.email || ''}
//               onChange={handleInputChange}
//               readOnly={isReadOnly}
//               className="text-black text-sm w-full p-1 "
//             />
//           </div> */}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
//           <div className="bg-white rounded-lg shadow p-6">
//             {saveChange && (
//               <div className="flex justify-end">
//                 <Button color="success" onClick={handleSaveChanges}>Save</Button>
//                 </div>)}
//             <h3 className="mt-4 text-xs">Name</h3>
//             <input
//               type="text"
//               name="name"
//               value={registerData?.name || ""}
//               onChange={handleInputChange}
//               readOnly={isReadOnly}
//               className="text-black rounded-md font-sans"
//             />
//             <br />
//             <h3 className="mt-4 text-xs">Email</h3>
//             {registerData?.isGoogle ? 
//             ( <p className="text-black w-80 font-sans rounded-md p-1 "  onClick={emailChangeGoogle}>
//               {registerData?.email}  <br/><span className="text-xs text-red-400">(Can't change the mail ,Bcz you signup through Google)</span>
//             </p>
             
//             ):(
//               <input
//               type="email"
//               name="email"
//               value={registerData?.email || ""}
//               onChange={handleInputChange}
//               readOnly={isReadOnly}
//               className="text-black w-80 font-sans rounded-md p-1 "
//             />
//             )}
           

//             <hr className="mt-2" />

//             <h3 className="mt-4 text-xs">Phone Number</h3>
//             <input
//               type="text"
//               name="phone"
//               className="border p-1 font-sans rounded-md"
//               value={registerData?.phone || ""}
//               onChange={handleInputChange}
//               readOnly={isReadOnly}
//             />

//             <h3 className="mt-4 text-xs">Experience</h3>
//             <input
//               type="text"
//               name="experience"
//               className="border p-1 font-sans rounded-md"
//               value={instructorDetails?.experience || ""}
//               onChange={handleInputChange}
//               readOnly={isReadOnly}
//             />

//             <h3 className="mt-4 text-xs">Role</h3>
//             <input
//               type="text"
//               name="position"
//               className="border p-1 font-sans  rounded-md"
//               value={instructorDetails?.position || ""}
//               onChange={handleInputChange}
//               readOnly={isReadOnly}
//             />

//             <h3 className="mt-4 text-xs">Company</h3>
//             <input
//               type="text"
//               name="companyName"
//               className="border p-1 font-sans rounded-md"
//               value={instructorDetails?.companyName || ""}
//               onChange={handleInputChange}
//               readOnly={isReadOnly}
//             />

//             <div className="md:col-span-2 bg-white rounded-lg shadow mt-1 p-2">
//               <h3 className="text-xs font-semibold">About or Bio:</h3>
//               <textarea
//                 name="aboutBio"
//                 className="border w-full p-1 font-sans rounded-md"
//                 value={instructorDetails?.aboutBio || ""}
//                 onChange={handleInputChange}
//                 readOnly={isReadOnly}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
