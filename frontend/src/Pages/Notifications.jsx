import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  }, [dispatch, user]);

  return (
    <div className="w-full pb-20 md:pb-0">
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-light-border dark:border-dark-border px-4 py-3">
        <h1 className="text-xl font-bold">Notifications</h1>
      </div>

      {user?.isGuest ? (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4">
          <p className="text-xl font-bold mb-2">Join Tweeter today.</p>
          <p className="text-gray-500 mb-6">Sign up to see your notifications.</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
              <p className="text-lg font-semibold">No notifications yet</p>
              <p className="text-sm">When someone interacts with you, it will show up here.</p>
            </div>
          )}
          
          {notifications.slice(0, showAll ? undefined : 10).map((notification) => (
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
          
          {notifications.length > 10 && !showAll && (
            <button
              className="w-full py-4 text-primary-500 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors font-medium"
              onClick={() => setShowAll(true)}
            >
              Show more
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
