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
        console.log(tutorInfo._id, "jjjj");

        const response = await tutorUpdateCheck(tutorInfo._id);
        console.log(response, "home response");
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