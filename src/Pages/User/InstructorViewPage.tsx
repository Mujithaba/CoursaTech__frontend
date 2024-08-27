// import React from 'react';
// import { MdMessage } from "react-icons/md";
// import { useNavigate } from 'react-router-dom';


// interface IInstructorProps {
//   instructorId: string;
// }

// const InstructorView: React.FC<IInstructorProps> = ({ instructorId }) => {

//     const navigate = useNavigate()

//     const handleChatScreen = () => {
//         console.log('Navigating with instructorId:', instructorId);
//         navigate('/userChatscreen', {
//           state: { id: instructorId }
//         });
//       };

//   return (
//     <div className="m-5 border-2 p-11 rounded-md bg-card">
//       <h1>Instructor ID: {instructorId}</h1>
//       <div className='flex'>
      
//       <button className='p-3 rounded-md bg-gray-200 flex' onClick={handleChatScreen}><MdMessage className='mt-1 mr-1' />Chat
//                 </button>
//       </div>
//       {/* Additional content here */}
//     </div>
//   );
// };

// export default InstructorViewPage;
