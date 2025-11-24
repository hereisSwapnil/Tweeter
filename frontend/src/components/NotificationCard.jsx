import React from "react";
import { FaHeart, FaUser, FaComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { convertPostDate } from "../utils/convertPostDate";

const NotificationCard = ({
  username,
  profilePicture,
  activity,
  details,
  seen = false,
  createdAt,
}) => {
  const format = (details) => {
    if (details.length > 50) {
      return details.slice(0, 50) + "...";
    } else {
      return details;
    }
  };

  const getIcon = () => {
    switch (activity) {
      case "like":
        return <FaHeart className="text-pink-500" size={20} />;
      case "follow":
        return <FaUser className="text-primary-500" size={20} />;
      case "comment":
        return <FaComment className="text-blue-400" size={20} />;
      default:
        return null;
    }
  };

  const getMessage = () => {
    switch (activity) {
      case "like":
        return "liked your post";
      case "follow":
        return "followed you";
      case "comment":
        return "commented on your post";
      default:
        return "";
    }
  };

  return (
    <Link to={`/${username}`} className="block w-full">
      <div
        className={`flex gap-4 p-4 border-b border-light-border dark:border-dark-border hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${
          !seen ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
        }`}
      >
        <div className="w-8 flex-shrink-0 flex justify-end pt-1">
          {getIcon()}
        </div>
        
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={profilePicture}
              alt={username}
            />
          </div>
          
          <div className="text-sm">
            <span className="font-bold hover:underline">{username}</span>{" "}
            <span className="text-gray-600 dark:text-gray-400">{getMessage()}</span>
          </div>

          {details && (
            <p className="text-gray-500 dark:text-gray-500 text-sm line-clamp-2">
              {format(details)}
            </p>
          )}
          
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
            {convertPostDate(createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NotificationCard;
