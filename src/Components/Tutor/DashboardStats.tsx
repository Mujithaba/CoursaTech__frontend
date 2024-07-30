// src/components/DashboardStats.tsx
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white mr-3 p-4 rounded shadow-md flex items-center">
      <div className="mr-4">
        {icon}
      </div>
      <div>
        <h4 className="text-gray-600">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <StatsCard 
        title="Total Revenue"
        value="$120,00"
        icon={<svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m9-5A9 9 0 1112 3v2m0 0h3"></path></svg>}
      />
      <StatsCard 
        title="Total Students"
        value="150"
        icon={<svg className="h-12 w-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5V8H2v12h5m7-12v12M7 12v8M17 12v8"></path></svg>}
      />
      <StatsCard 
        title="Most Selling Course"
        value="React Basics"
        icon={<svg className="h-12 w-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 2h2m-1 17h.01M17 17h.01M13 2.05a9 9 0 00-2 0M4.22 4.22a9 9 0 0112.78 0M4 22h16a1 1 0 001-1v-5a1 1 0 00-.293-.707l-7-7a1 1 0 00-1.414 0l-7 7A1 1 0 004 16v5a1 1 0 001 1z"></path></svg>}
      />
      <StatsCard 
        title="Monthly Revenue"
        value="$10,000"
        icon={<svg className="h-12 w-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 104 4H5a5 5 0 00-5-5v3m8-9a4 4 0 104 4H8a5 5 0 00-5-5v3m12-3a4 4 0 104 4H8a5 5 0 00-5-5v3"></path></svg>}
      />
    </div>
  );
};

export default DashboardStats;
