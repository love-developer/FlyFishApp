// components/ReferralDashboard.jsx
import { Settings } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import './styles.css';

import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    LineElement,
    PointElement,
    Filler,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // Add this registration step right after the imports
  ChartJS.register(
    LinearScale,
    CategoryScale,
    LineElement,
    PointElement,
    Filler,
    Title,
    Tooltip,
    Legend
  );

// Sample data for the graph (Jan to Sep)
const graphData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  values: [0, 50, 25, 0, 0, 25, 75, 50, 25], // Approximate values from the screenshot
};

// Sample table data
const tableData = [
  { userName: 'Mohamed Ali', date: '03/03/2025', status: 'Pending', amount: 100, percentage: '50%' },
  { userName: 'Jeni', date: '02/05/2025', status: 'Done', amount: 50, percentage: '25%' },
];

const ReferralDashboard = () => {
  const [balance] = useState(40); // Static balance for now

  const chartData = {
    labels: graphData.labels,
    datasets: [
      {
        label: 'Referral Earnings',
        data: graphData.values,
        fill: true,
        backgroundColor: 'rgba(255, 229, 153, 0.3)', // Light yellow fill
        borderColor: '#FFD700', // Gold border
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 25 },
      },
    },
  };

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="header-section">
        <h1 className="referral-code">Your Referral Code: Y4053</h1>
        <Settings className="settings-icon" />
      </div>

      <div className="main-content">
        {/* Left Section: Balance and Button */}
        <div className="balance-section">
          <h2 className="balance-title">Ref Balance</h2>
          <div className="balance-display">
            <div className="circle-container">
              <svg className="progress-circle" viewBox="0 0 100 100">
                <circle
                  className="circle-bg"
                  strokeWidth="10"
                  stroke="#e0e0e0"
                  fill="transparent"
                  r="45"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="circle-progress"
                  strokeWidth="10"
                  strokeDasharray="283"
                  strokeDashoffset="170" // Adjusted for 40 AED (max 100)
                  strokeLinecap="round"
                  stroke="#f4a261"
                  fill="transparent"
                  r="45"
                  cx="50"
                  cy="50"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="balance-text">
                <span className="balance-value">{balance}</span>
                <span className="balance-unit">AED</span>
              </div>
            </div>
            <button className="payout-button">Request Payout</button>
          </div>
        </div>

        {/* Right Section: Graph */}
        <div className="graph-section">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Table Section */}
      <div className="table-section">
        <table className="referral-table">
          <thead>
            <tr className="table-header">
              <th className="table-cell">User Name</th>
              <th className="table-cell">Date</th>
              <th className="table-cell">Status</th>
              <th className="table-cell">Amount</th>
              <th className="table-cell">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="table-row">
                <td className="table-cell">{row.userName}</td>
                <td className="table-cell">{row.date}</td>
                <td className="table-cell">{row.status}</td>
                <td className="table-cell">{row.amount}</td>
                <td className="table-cell">{row.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferralDashboard;