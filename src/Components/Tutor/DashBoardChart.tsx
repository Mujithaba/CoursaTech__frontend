// src/components/DashboardChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Monthly Revenue',
      data: [12000, 15000, 18000, 22000, 24000, 20000, 21000, 25000, 27000, 30000, 32000, 34000],
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    },
  ],
};

const weeklyData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Weekly Revenue',
      data: [3000, 4500, 6000, 7500],
      fill: false,
      backgroundColor: 'rgba(153,102,255,0.2)',
      borderColor: 'rgba(153,102,255,1)',
    },
  ],
};

const yearlyData = {
  labels: ['2019', '2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: 'Yearly Revenue',
      data: [100000, 150000, 200000, 250000, 300000],
      fill: false,
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
    },
  ],
};

const DashboardChart: React.FC = () => {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Monthly Revenue</h2>
        <Line data={monthlyData} />
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Weekly Revenue</h2>
        <Line data={weeklyData} />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Yearly Revenue</h2>
        <Line data={yearlyData} />
      </div>
    </div>
  );
};

export default DashboardChart;
