import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import RecommendationBar from "../components/RecommendationBar";
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
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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
        console.log(response.data);
        setAnalytics(response.data);
        dispatch(setLoading(false));
      } catch (error) {
        console.error("Error fetching analytics:", error);
        dispatch(setLoading(false));
      }
    };

    fetchAnalytics();
  }, []);

  // Prepare data for the graph
  const labels = analytics.interactions.map(
    (interaction) => `${interaction.day}`
  );
  const data = {
    labels,
    datasets: [
      {
        label: "Likes",
        data: analytics.interactions.map(
          (interaction) => interaction.totalLikes
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Comments",
        data: analytics.interactions.map(
          (interaction) => interaction.totalComments
        ),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <Sidebar />
      <div className="mt-[8vh] px-2 md:px-0">
        <h1 className="text-3xl font-semibold mb-5">Analytics</h1>
        {user?.isGuest && (
          <p className="text-left text-gray-500 mb-5">
            Sign in to view your analytics
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">Total Posts</h2>
            <p className="text-2xl">{analytics.postCount}</p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">Total Likes</h2>
            <p className="text-2xl">{analytics.likeCount}</p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">Total Followers</h2>
            <p className="text-2xl">{analytics.followerCount}</p>
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-8">Interactions Over Time</h2>
        <div className="mt-4">
          <Line data={data} />
        </div>
      </div>
      <RecommendationBar />
    </div>
  );
};

export default Analytics;
