import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RecommendationBar from "../components/RecommendationBar";
import Sidebar from "../components/Sidebar";
import { setLoading } from "../app/features/loadingSlice";
import NotificationCard from "../components/NotificationCard";

const Notifications = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (user?.isGuest) return;
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/notifications`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications: ", error);
      }
    };

    fetchNotifications();
    dispatch(setLoading(false));
  }, [dispatch]);

  return (
    <div>
      <Sidebar />
      <div className={`mt-[8vh] px-2 md:px-0`}>
        <h1 className="text-3xl font-semibold mb-5">Notifications</h1>
        {user?.isGuest && (
          <p className="text-left text-gray-500">
            Sign in to view your notifications
          </p>
        )}
        {notifications.slice(0, 5).map((notification) => (
          <NotificationCard
            key={notification._id}
            username={notification.userId.username}
            profilePicture={notification.userId.profilePicture}
            activity={notification.type}
            details={notification.postId ? notification.postId.content : ""}
            seen={notification.read}
            createdAt={notification.createdAt}
          />
        ))}
        {notifications.length > 5 && (
          <p
            className="text-right text-blue-500 cursor-pointer hover:text-blue-600 hover:underline mt-3 font-semibold"
            onClick={() => {
              setShowAll(true);
            }}
          >
            View more
          </p>
        )}
      </div>
      <RecommendationBar />
    </div>
  );
};

export default Notifications;
