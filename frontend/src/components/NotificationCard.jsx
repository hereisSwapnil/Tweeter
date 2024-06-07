import React from "react";
import { FaHeart, FaUser, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotificationCard = ({
  username,
  profilePicture,
  activity,
  details,
  seen = false,
}) => {
  const format = (details) => {
    if (details.length > 20) {
      return details.slice(0, 20) + "...";
    } else {
      return details;
    }
  };

  if (activity == "like") {
    return (
      <div
        className={`flex flex-row gap-4 w-full border-b-[#ffffff30] border-b-[1px] px-3 rounded-md py-4 ${
          !seen ? "bg-[#1e99eb5e]" : ""
        }`}
      >
        <div className="w-10">
          <FaHeart color="red" size={30} />
        </div>
        <Link to={`/${username}`}>
          <div className="flex flex-col gap-2">
            <img
              className="border-0 rounded-full h-[40px] w-[40px] md:h-auto md:w-[40px] bg-cover bg-center"
              src={profilePicture}
              alt=""
            />
            <div className="flex flex-col">
              <p>
                <b>@{username}</b> liked your post
              </p>
              <p className="text-sm text-[#ffffff5e]">{format(details)}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  } else if (activity == "follow") {
    return (
      <div
        className={`flex flex-row gap-4 w-full border-b-[#ffffff30] border-b-[1px] px-3 rounded-md py-4 ${
          !seen ? "bg-[#1e99eb5e]" : ""
        }`}
      >
        {" "}
        <div className="w-10">
          <FaUser color="white" size={30} />
        </div>
        <Link to={`/${username}`}>
          <div className="flex flex-col gap-2">
            <img
              className="border-0 rounded-full h-[40px] w-[40px] md:h-auto md:w-[40px] bg-cover bg-center"
              src={profilePicture}
              alt=""
            />
            <div className="flex flex-col">
              <p>
                <b>@{username}</b> followed you
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  } else if (activity == "comment") {
    return (
      <div
        className={`flex flex-row gap-4 w-full border-b-[#ffffff30] border-b-[1px] px-3 rounded-md py-4 ${
          !seen ? "bg-[#1e99eb5e]" : ""
        }`}
      >
        {" "}
        <div className="w-10">
          <svg
            className="mr-2 cursor-pointer hidden dark:flex"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            id="comment"
            height={35}
          >
            <path
              fill="#fff"
              d="m23.751 21.127.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z"
            ></path>
            <path
              fill="#fff"
              d="M25.784 21.017A10.992 10.992 0 0 0 27 16c0-6.065-4.935-11-11-11S5 9.935 5 16s4.935 11 11 11c1.742 0 3.468-.419 5.018-1.215l4.74 1.185a.996.996 0 0 0 .949-.263 1 1 0 0 0 .263-.95l-1.186-4.74zm-2.033.11.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z"
            ></path>
          </svg>
        </div>
        <Link to={`/${username}`}>
          <div className="flex flex-col gap-2">
            <img
              className="border-0 rounded-full h-[40px] w-[40px] md:h-auto md:w-[40px] bg-cover bg-center"
              src={profilePicture}
              alt=""
            />
            <div className="flex flex-col">
              <p>
                <b>@{username}</b> commented on your post
              </p>
              <p className="text-sm text-[#ffffff5e]">{format(details)}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
};

export default NotificationCard;
