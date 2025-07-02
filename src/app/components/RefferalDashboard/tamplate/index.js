import { Settings } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { useAuth } from "../../../context/AuthContext";
import "./styles.css";
import { UserService } from "../../../services/userService";
import Image from "next/image";

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
} from "chart.js";

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
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  values: [0, 50, 25, 0, 0, 25, 75, 50, 25],
};

// Sample table data
const tableData = [
  {
    userName: "Mohamed Ali",
    date: "03/03/2025",
    status: "Pending",
    amount: 100,
    percentage: "50%",
  },
  {
    userName: "Jeni",
    date: "02/05/2025",
    status: "Done",
    amount: 50,
    percentage: "25%",
  },
];

// Placeholder for SuccessModal (replace with your actual component)
const SuccessModal = ({ isOpen, onClose, title, description }) => {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          margin: "20% auto",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h3>{title}</h3>
        <p>{description}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

// Placeholder for LoadingIndicator (replace with your actual component)
const LoadingIndicator = ({ text }) => (
  <div style={{ textAlign: "center" }}>{text}...</div>
);

const ReferralDashboard = () => {
  const { user } = useAuth();
  const [balance] = useState(40);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
  });
  const userService = new UserService();

  useEffect(() => {
    const checkMobile = () => window.innerWidth <= 1023;
    const handleResize = () => {
      if (checkMobile()) {
        // No state updates needed as per new design (no inputs)
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [user]);

  const triggerSuccessModal = (title, description) => {
    setModalContent({ title, description });
    setShowSuccessModal(true);
  };

  const chartData = {
    labels: graphData.labels,
    datasets: [
      {
        label: "Referral Earnings",
        data: graphData.values,
        fill: true,
        backgroundColor: "rgba(255, 229, 153, 0.3)",
        borderColor: "#FFD700",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
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
      {window.innerWidth <= 1023 ? (
        <div className="mobile-main-container">
          <SuccessModal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            title={modalContent.title}
            description={modalContent.description}
          />
          {isUpdating && (
            <div className="loading-overlay">
              <LoadingIndicator text="Updating profile..." />
            </div>
          )}
          <div className="mobile-content-split">
            <div className="mobile-left-panel">
              <div className="mobile-left-inner">
                <p>Your Referral Balance</p>
                <div className="balance-display">
                  <h1 className="balance-value">
                    0<span className="sub">AED</span>
                  </h1>
                </div>
                <button className="payout-button-2">Request Payout</button>
              </div>
            </div>
            <div className="mobile-right-panel">
              <div className="mobile-right-top">
                <p>Your referral code</p>
                <h1 className="referral-code">Y4053</h1>
              </div>
              <div className="mobile-right-bottom">
                <p>Learn more about referrals</p>
              </div>
            </div>
          </div>

          <div className="mobile-stats-section">
            <div className="mobile-stats-left">
              <p>
                invite your friends to join flyfish and get 20+ AED payment
                directly to your account
              </p>
            </div>
            <div className="mobile-stats-right">
             <Image src="/refferal.png" alt="Settings" width={30} height={30} />
            </div>
          </div>
          <div className="mobile-stats-section">
            <p>Payouts</p>
            <p>Users Referred</p>
          </div>
          <div className="mobile-table-section">
            <table className="referral-table">
              <thead>
                <tr className="table-header">
                  <th className="table-cell">Date</th>
                  <th className="table-cell">Amount</th>
                  <th className="table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-cell">{row.date}</td>
                    <td className="table-cell">{row.amount}</td>
                    <td className="table-cell">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="main-content">
          {/* Left Section: Balance and Button */}
          <div className="balance-section">
            <p className="balance-title">Referral Balance</p>
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
                    strokeDashoffset="170"
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
            {/* Right Section: Graph */}
            <div className="header-section">
              <p>Your Referral Code: Y4053</p>
            </div>
            <div className="graphs">
              <Line data={chartData} options={chartOptions} />
          </div>
        </div>
        </div>
      )}

      {/* Table Section - Only for desktop */}
      {window.innerWidth > 1023 && (
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
      )}
    </div>
  );
};

export default ReferralDashboard;
