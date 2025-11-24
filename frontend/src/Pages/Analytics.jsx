import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../app/features/loadingSlice";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [analytics, setAnalytics] = useState({
    postCount: 0,
    likeCount: 0,
    followerCount: 0,
    interactions: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        if (user?.isGuest) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/analytics`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAnalytics(response.data);
        dispatch(setLoading(false));
      } catch (error) {
        console.error("Error fetching analytics:", error);
        dispatch(setLoading(false));
      }
    };

    fetchAnalytics();
  }, [dispatch, user]);

  // Prepare data for the graph
  const labels = analytics.interactions.map(
    (interaction) => `${interaction.day}`
  );
  
  const isDarkMode = document.documentElement.classList.contains("dark");
  
  const data = {
    labels,
    datasets: [
      {
        label: "Likes",
        data: analytics.interactions.map(
          (interaction) => interaction.totalLikes
        ),
        borderColor: "#ec4899", // Pink-500
        backgroundColor: "rgba(236, 72, 153, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#ec4899",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#ec4899",
      },
      {
        label: "Comments",
        data: analytics.interactions.map(
          (interaction) => interaction.totalComments
        ),
        borderColor: "#3b82f6", // Blue-500
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#3b82f6",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#e5e7eb' : '#374151',
          font: {
            family: "'Inter', sans-serif",
            weight: 500
          }
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
        titleColor: isDarkMode ? '#f3f4f6' : '#111827',
        bodyColor: isDarkMode ? '#e5e7eb' : '#374151',
        borderColor: isDarkMode ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      }
    },
    scales: {
      y: {
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: isDarkMode ? '#9ca3af' : '#6b7280',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDarkMode ? '#9ca3af' : '#6b7280',
        }
      }
    }
  };

  return (
    <div className="w-full pb-20 md:pb-0">
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-light-border dark:border-dark-border px-4 py-3">
        <h1 className="text-xl font-bold">Analytics</h1>
      </div>

      <div className="p-4">
        {user?.isGuest ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-xl font-bold mb-2">Track your performance.</p>
            <p className="text-gray-500 mb-6">Sign up to view your analytics.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-gray-500 dark:text-gray-400 font-medium mb-2">Total Posts</h2>
                <p className="text-4xl font-bold text-black dark:text-white">{analytics.postCount}</p>
              </div>
              <div className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-gray-500 dark:text-gray-400 font-medium mb-2">Total Likes</h2>
                <p className="text-4xl font-bold text-pink-500">{analytics.likeCount}</p>
              </div>
              <div className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-gray-500 dark:text-gray-400 font-medium mb-2">Total Followers</h2>
                <p className="text-4xl font-bold text-primary-500">{analytics.followerCount}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Interactions Over Time</h2>
              <div className="h-[300px] w-full">
                <Line data={data} options={options} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
