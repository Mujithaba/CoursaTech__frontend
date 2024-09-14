
// import React, { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { getCourseGrowth } from '../../../api/tutor'; // Adjust the import path

// interface GrowthData {
//   date: string;
//   [key: string]: number | string; // Course growth values as dynamic keys
// }

// interface CourseGrowthGraphProps {
//   instructorId: string;
// }

// const CourseGrowthGraph: React.FC<CourseGrowthGraphProps> = ({ instructorId }) => {
//   const [growthData, setGrowthData] = useState<GrowthData[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchGrowthData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await getCourseGrowth(instructorId);

//         // Extract the growth data array from the response object
//         const data = response.getCourseGrowth || []; // Default to empty array if not found
//         console.log('Fetched Course Growth Data:', data);

//         if (data.length > 0) {
//           setGrowthData(data);
//         } else {
//           setError('No data available for course growth.');
//         }
//       } catch (err) {
//         console.error('Error fetching course growth data:', err);
//         setError('Failed to load course growth data. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchGrowthData();
//   }, [instructorId]);

//   if (isLoading) return <div className="text-white">Loading...</div>;
//   if (error) return <div className="text-red-500">Error: {error}</div>;
//   if (growthData.length === 0) return <div className="text-white">No course growth data available.</div>;

//   const courses = Object.keys(growthData[0] || {}).filter(key => key !== 'date');
//   const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c'];

//   console.log('Growth Data for Graph:', growthData);

//   return (
//     <div className="bg-gradient-to-br from-[#1c233e] to-[#0f1128] p-6 rounded-lg shadow-lg border border-[#303c6c]">
//       <h3 className="text-2xl font-bold mb-6 text-white text-center">Course Growth Over Time</h3>
//       <div className="bg-[#2a2d46] p-4 rounded-lg shadow-md">
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart data={growthData} layout="vertical">
//             <CartesianGrid strokeDasharray="3 3" stroke="#444b6b" />
//             <XAxis type="number" stroke="#dddddd" />
//             <YAxis dataKey="date" type="category" stroke="#dddddd" />
//             <Tooltip
//               contentStyle={{ backgroundColor: '#2a2a2a', border: 'none', borderRadius: '8px' }}
//               itemStyle={{ color: '#ffffff' }}
//               labelStyle={{ color: '#8884d8' }}
//             />
//             <Legend wrapperStyle={{ color: '#ffffff' }} />
//             {courses.map((course, index) => (
//               <Bar
//                 key={course}
//                 dataKey={course}
//                 fill={colors[index % colors.length]}
//                 barSize={15}
//               />
//             ))}
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default CourseGrowthGraph;
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { getCourseGrowth } from '../../../api/tutor';

interface GrowthData {
  date: string;
  [key: string]: number | string;
}

interface CourseGrowthGraphProps {
  instructorId: string;
}

const CourseGrowthGraph: React.FC<CourseGrowthGraphProps> = ({ instructorId }) => {
  const [growthData, setGrowthData] = useState<GrowthData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrowthData = async () => {
      try {
        setIsLoading(true);
        const response = await getCourseGrowth(instructorId);

      
        const data = response.getCourseGrowth || [];
        console.log('Fetched Course Growth Data:', data);

        if (data.length > 0) {
          
          const sortedData = data.sort((a:any, b:any) => new Date(a.date).getTime() - new Date(b.date).getTime());
          setGrowthData(sortedData);
        } else {
          setError('No data available for course growth.');
        }
      } catch (err) {
        console.error('Error fetching course growth data:', err);
        setError('Failed to load course growth data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrowthData();
  }, [instructorId]);

  if (isLoading) return <div className="text-white text-center p-8">Loading course growth data...</div>;
  if (error) return <div className="text-red-500 text-center p-8">Error: {error}</div>;
  if (growthData.length === 0) return <div className="text-white text-center p-8">No course growth data available.</div>;

  const courses = Object.keys(growthData[0] || {}).filter(key => key !== 'date');
  const colors = ['#5c6bc0', '#ff7043', '#66bb6a', '#fdd835', '#ab47bc', '#26a69a', '#ec407a'];

  // Tooltip formatter function with correct typing
//   const formatTooltip = (value: number, name: string, props: TooltipProps<number, string>): [string, string] => {
//     const { payload } = props;

//     // Type assertion to inform TypeScript about the payload structure
//     const typedPayload = payload as { [key: string]: number };

//     // Calculate the total for percentage calculation
//     const total = courses.reduce((sum, course) => sum + (typedPayload[course] || 0), 0);
//     const percentage = ((value / total) * 100).toFixed(1);

//     return [`${name}: ${value} (${percentage}%)`, `Total: ${total}`];
//   };

  return (
    <div className="bg-gradient-to-br from-[#1c233e] to-[#0f1128] p-6 md:p-8 rounded-xl shadow-lg border border-[#303c6c]">
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white text-center">Course Growth </h3>
      <div className="bg-[#2a2d46] p-4 md:p-6 rounded-xl shadow-lg">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={growthData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3b3f5c" />
            <XAxis type="number" stroke="#dddddd" tick={{ fill: '#ffffff' }} />
            <YAxis 
              dataKey="date" 
              type="category" 
              stroke="#dddddd" 
              tick={{ fill: '#ffffff' }} 
              width={100}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#333333', border: 'none', borderRadius: '8px' }}
              itemStyle={{ color: '#ffffff' }}
              labelStyle={{ color: '#ffd54f' }}
            //   formatter={formatTooltip}
            />
            <Legend wrapperStyle={{ color: '#ffffff', paddingTop: '20px' }} />
            {courses.map((course, index) => (
              <Bar
                key={course}
                dataKey={course}
                fill={colors[index % colors.length]}
                barSize={25}
                name={course}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourseGrowthGraph;
