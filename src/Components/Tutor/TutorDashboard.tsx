import React from 'react'

import DashboardStats from './DashboardStats';
import DashboardChart from './DashBoardChart';

const TutorDashboard: React.FC = () => {
  return (
    <div className="flex  bg-gray-100">
   
    
        
        <main className="p-6">
          <DashboardStats />
        
        </main>
      </div>
    
  );
};

export default TutorDashboard;