// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import { tutorUpdateCheck } from '../../api/tutor';
// import { useNavigate } from 'react-router-dom';
// import { logOut } from '../../redux/slices/tutorSlice';
// import { io, Socket } from 'socket.io-client';
// import DashboardStats from './DashboardStats';

// export const socketUrl = "http://localhost:3000";

// const TutorDashboard: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { tutorInfo } = useSelector((state: RootState) => state.tutorAuth);
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const newSocket = io(socketUrl);
//     setSocket(newSocket);

//     // Socket event listeners
//     newSocket.on('connect', () => {
//       console.log('Connected to socket server');
//     });

//     newSocket.on('disconnect', () => {
//       console.log('Disconnected from socket server');
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   console.log(socket,"ppp");
  

//   useEffect(() => {
//     const fetchHomeData = async () => {
//       try {
//         if (tutorInfo) {
//           const response = await tutorUpdateCheck(tutorInfo._id);
//           if (response.data.data && response.data.data.isBlocked) {
//             dispatch(logOut());
//             navigate("/login");
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchHomeData();
//   }, [tutorInfo, dispatch, navigate]);

//   return (
//     <div className="flex bg-white px-6 py-4">
//       <main className="p-6">
//         <DashboardStats />
//         {/* You can pass the socket to other components that need it */}
//         {/* <SomeComponent socket={socket} /> */}
//       </main>
//     </div>
//   );
// };

// export default TutorDashboard;






import React, { useEffect } from 'react'
import DashboardStats from './DashboardStats';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { tutorUpdateCheck } from '../../api/tutor';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/slices/tutorSlice';

const TutorDashboard: React.FC = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {tutorInfo} = useSelector((state:RootState)=>state.tutorAuth)


  const fetchHomeData = async () => {
    try {
      if (tutorInfo) {
        // console.log(tutorInfo._id, "jjjj");

        const response = await tutorUpdateCheck(tutorInfo._id);
        // console.log(response, "home response");
        if (response.data.data) {
          if (response.data.data.isBlocked) {
            dispatch(logOut());
            navigate("/login");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);


  return (
    <div className="flex  bg-white px-6 py-4">
   
    
        
        <main className="p-6">
          <DashboardStats />
        
        </main>
      </div>
    
  );
};

export default TutorDashboard;